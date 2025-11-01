import { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import StatCard from '../components/StatCard';
import { useDashboard } from '../context/DashboardContext';
import { AlertRecord } from '../data/types';

const formatDateTime = (timestamp: string) =>
  new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

const HomePage = () => {
  const {
    alerts,
    pendingPlacement,
    pendingIntake,
    activeReferrals,
    completedReferrals,
    markAlertsRead,
    markAlertsImportant,
    deleteAlerts,
    takeAlertAction,
  } = useDashboard();

  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modalAlert, setModalAlert] = useState<AlertRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const unreadAlerts = useMemo(
    () => alerts.filter((alert) => !alert.read && alert.showOnHome),
    [alerts]
  );
  const alertsToShow = unreadAlerts.slice(0, visibleCount);
  const canLoadMore = visibleCount < unreadAlerts.length;
  const allSelected =
    alertsToShow.length > 0 &&
    alertsToShow.every((alert) => selectedIds.includes(alert.id));

  const quickStats = [
    {
      label: 'Pending Placement Referrals',
      value: pendingPlacement.length,
    },
    {
      label: 'Pending Intake Referrals',
      value: pendingIntake.length,
    },
    {
      label: 'Active Referrals',
      value: activeReferrals.length,
    },
    {
      label: 'Points Earned (Current Month)',
      value: 64,
    },
    {
      label: 'Reports Due Today',
      value: alerts.filter((alert) =>
        alert.summary.toLowerCase().includes('due today') && !alert.read
      ).length,
    },
    {
      label: 'Reports Past Due',
      value: alerts.filter((alert) =>
        alert.summary.toLowerCase().includes('past due') && !alert.read
      ).length,
    },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((alertId) => alertId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(alertsToShow.map((alert) => alert.id));
    } else {
      setSelectedIds((prev) => prev.filter((id) => !alertsToShow.some((a) => a.id === id)));
    }
  };

  const handleMarkRead = () => {
    if (selectedIds.length === 0) return;
    markAlertsRead(selectedIds, 'home');
    setFeedback('Selected alerts marked as read and removed from the home view.');
    setSelectedIds([]);
  };

  const handleMarkImportant = () => {
    if (selectedIds.length === 0) return;
    markAlertsImportant(selectedIds);
    setFeedback('Selected alerts flagged as important and removed from home view.');
    setSelectedIds([]);
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    const result = deleteAlerts(selectedIds, { origin: 'home' });
    const messageParts: string[] = [];
    if (result.deleted.length) {
      messageParts.push(`${result.deleted.length} alert(s) deleted.`);
    }
    if (result.blocked.length) {
      messageParts.push(
        `${result.blocked.length} alert(s) require action and were only removed from the homepage.`
      );
    }
    setFeedback(messageParts.join(' '));
    setSelectedIds([]);
  };

  const openModal = (alert: AlertRecord) => {
    setModalAlert(alert);
  };

  const closeModal = () => setModalAlert(null);

  const handleTakeAction = (alert: AlertRecord) => {
    takeAlertAction(alert.id);
    setFeedback(`Action recorded for alert ${alert.id}.`);
  };

  return (
    <div className="home-page">
      <section className="section-card">
        <h2>Quick Stats</h2>
        <div className="quick-stats-grid">
          {quickStats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2>Unread Alerts</h2>
            <p className="helper-text">
              Manage high-priority notifications. Alerts that require action stay accessible on the Alerts page.
            </p>
          </div>
          <div className="action-group">
            <label className="helper-text">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(event) => toggleSelectAll(event.target.checked)}
              />
              Select All
            </label>
            <button type="button" className="secondary" onClick={() => setSelectedIds([])}>
              Deselect All
            </button>
          </div>
        </div>

        <div className="action-bar">
          <div className="helper-text">
            {selectedIds.length} selected
          </div>
          <div className="action-group">
            <button
              type="button"
              className="secondary"
              onClick={handleDelete}
              title="Remove selected alerts from the homepage"
            >
              Delete Selected
            </button>
            <button
              type="button"
              className="secondary"
              onClick={handleMarkImportant}
              title="Flag selected alerts as important"
            >
              Mark Selected as Important
            </button>
            <button
              type="button"
              className="primary"
              onClick={handleMarkRead}
              title="Mark selected alerts as read"
            >
              Mark Selected as Read
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table className="table" aria-label="Unread alerts">
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Summary</th>
                <th scope="col">Date/Time</th>
                <th scope="col">Sender</th>
                <th scope="col">Status</th>
                <th scope="col">Take Action</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {alertsToShow.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-data">
                    All caught up! No unread alerts on the home page.
                  </td>
                </tr>
              ) : (
                alertsToShow.map((alert) => {
                  const selected = selectedIds.includes(alert.id);
                  return (
                    <tr
                      key={alert.id}
                      className={`alert-row unread ${alert.important ? 'important' : ''}`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleSelect(alert.id)}
                          aria-label={`Select alert ${alert.id}`}
                        />
                      </td>
                      <td>
                        <div className="summary" title={alert.details}>
                          {alert.summary}
                          {alert.important ? (
                            <span className="badge-important" title="Important alert">
                              ❗
                            </span>
                          ) : null}
                        </div>
                        {alert.actionableReason ? (
                          <div className="helper-text">{alert.actionableReason}</div>
                        ) : null}
                      </td>
                      <td>{formatDateTime(alert.timestamp)}</td>
                      <td>{alert.sender}</td>
                      <td>{alert.requiresAction ? 'Action required' : 'FYI'}</td>
                      <td>
                        <button
                          type="button"
                          className="primary"
                          disabled={!alert.requiresAction || alert.actionTaken}
                          onClick={() => handleTakeAction(alert)}
                          title={
                            alert.requiresAction
                              ? alert.actionTaken
                                ? 'Action already recorded'
                                : 'Record that you have taken action for this alert'
                              : 'No action required'
                          }
                        >
                          {alert.actionTaken ? 'Completed' : 'Take Action'}
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="ghost"
                          onClick={() => openModal(alert)}
                          title="View full alert details"
                        >
                          ⌄
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="action-bar">
          <label className="helper-text">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(event) => toggleSelectAll(event.target.checked)}
            />
            Select All
          </label>
          <div className="action-group">
            <button type="button" className="secondary" onClick={handleDelete}>
              Delete Selected
            </button>
            <button type="button" className="secondary" onClick={handleMarkImportant}>
              Mark Selected as Important
            </button>
            <button type="button" className="primary" onClick={handleMarkRead}>
              Mark Selected as Read
            </button>
          </div>
        </div>

        {canLoadMore ? (
          <button
            type="button"
            className="primary"
            onClick={() => setVisibleCount((count) => count + 10)}
          >
            See More
          </button>
        ) : (
          <button type="button" className="secondary" disabled>
            All alerts loaded
          </button>
        )}

        {feedback ? <p className="helper-text" style={{ marginTop: 12 }}>{feedback}</p> : null}
      </section>

      {modalAlert ? (
        <Modal
          title={`Alert ${modalAlert.id}`}
          onClose={closeModal}
          footer={
            <>
              <button
                type="button"
                className="primary"
                disabled={!modalAlert.requiresAction || modalAlert.actionTaken}
                onClick={() => {
                  handleTakeAction(modalAlert);
                  closeModal();
                }}
              >
                Take Action
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  markAlertsImportant([modalAlert.id]);
                  closeModal();
                }}
              >
                Mark as Important
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  markAlertsRead([modalAlert.id], 'home');
                  closeModal();
                }}
              >
                Mark as Read
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  deleteAlerts([modalAlert.id], { origin: 'home' });
                  closeModal();
                }}
              >
                Delete
              </button>
            </>
          }
        >
          <p className="helper-text">{formatDateTime(modalAlert.timestamp)}</p>
          <p>{modalAlert.details}</p>
          <p className="helper-text">Sender: {modalAlert.sender}</p>
          {modalAlert.requiresAction ? (
            <p className="helper-text">Action required: {modalAlert.actionableReason}</p>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
};

export default HomePage;

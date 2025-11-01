import { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';
import { AlertRecord } from '../data/types';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDateTime = (timestamp: string) =>
  new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

const AlertsPage = () => {
  const {
    alerts,
    markAlertsRead,
    markAlertsImportant,
    deleteAlerts,
    takeAlertAction,
  } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modalAlert, setModalAlert] = useState<AlertRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const sortedAlerts = useMemo(
    () =>
      [...alerts].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [alerts]
  );

  const filteredAlerts = useMemo(() => {
    const filtered = sortedAlerts.filter((alert) => {
      const matchesSearch = searchTerm
        ? alert.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.details.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesMonth = selectedMonth
        ? new Date(alert.timestamp).getMonth() === months.indexOf(selectedMonth)
        : true;
      const matchesYear = selectedYear
        ? new Date(alert.timestamp).getFullYear().toString() === selectedYear
        : true;
      return matchesSearch && matchesMonth && matchesYear;
    });
    return filtered;
  }, [searchTerm, selectedMonth, selectedYear, sortedAlerts]);

  const alertsToShow = filteredAlerts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredAlerts.length;
  const allSelected =
    alertsToShow.length > 0 &&
    alertsToShow.every((alert) => selectedIds.includes(alert.id));

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
    if (!selectedIds.length) return;
    markAlertsRead(selectedIds);
    setFeedback('Selected alerts marked as read.');
    setSelectedIds([]);
  };

  const handleMarkImportant = () => {
    if (!selectedIds.length) return;
    markAlertsImportant(selectedIds);
    setFeedback('Selected alerts flagged as important.');
    setSelectedIds([]);
  };

  const handleDelete = () => {
    if (!selectedIds.length) return;
    const result = deleteAlerts(selectedIds, { origin: 'alerts' });
    const parts: string[] = [];
    if (result.deleted.length) {
      parts.push(`${result.deleted.length} alert(s) deleted.`);
    }
    if (result.blocked.length) {
      parts.push(
        `${result.blocked.length} alert(s) require action before deletion and were kept.`
      );
    }
    setFeedback(parts.join(' '));
    setSelectedIds([]);
  };

  const handleRowDelete = (alert: AlertRecord) => {
    const result = deleteAlerts([alert.id], { origin: 'alerts' });
    if (result.blocked.length) {
      setFeedback('Complete the required action before deleting this alert.');
    } else {
      setFeedback(`Alert ${alert.id} deleted.`);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('');
    setSelectedYear('');
    setVisibleCount(20);
    setSelectedIds([]);
  };

  const yearsAvailable = useMemo(() => {
    const years = new Set<string>();
    alerts.forEach((alert) => {
      years.add(new Date(alert.timestamp).getFullYear().toString());
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [alerts]);

  return (
    <div className="alerts-page">
      <section className="section-card">
        <h2>Search &amp; Filter</h2>
        <div className="grid-2">
          <div>
            <label htmlFor="alert-search">Search alerts</label>
            <input
              id="alert-search"
              type="text"
              placeholder="Search by keyword"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="grid-2">
            <div>
              <label htmlFor="alert-month">Month</label>
              <select
                id="alert-month"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
              >
                <option value="">Any month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="alert-year">Year</label>
              <select
                id="alert-year"
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
              >
                <option value="">Any year</option>
                {yearsAvailable.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="action-group" style={{ marginTop: 16 }}>
          <button type="button" className="primary" onClick={() => setVisibleCount(20)}>
            Search
          </button>
          <button type="button" className="secondary" onClick={handleClearFilters}>
            Clear
          </button>
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2>Alerts</h2>
            <p className="helper-text">
              Showing {alertsToShow.length} of {filteredAlerts.length} alerts
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
          <div className="helper-text">{selectedIds.length} selected</div>
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

        <div className="table-scroll">
          <table className="table" aria-label="Alerts">
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Summary</th>
                <th scope="col">Date / Time</th>
                <th scope="col">Sender</th>
                <th scope="col">Action</th>
                <th scope="col">Important</th>
                <th scope="col">Delete</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {alertsToShow.length === 0 ? (
                <tr>
                  <td colSpan={8} className="no-data">
                    No alerts match your filters.
                  </td>
                </tr>
              ) : (
                alertsToShow.map((alert) => {
                  const selected = selectedIds.includes(alert.id);
                  return (
                    <tr key={alert.id} className={`${alert.read ? '' : 'alert-row unread'} ${alert.important ? 'important' : ''}`}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleSelect(alert.id)}
                          aria-label={`Select alert ${alert.id}`}
                        />
                      </td>
                      <td>
                        <div className="summary">{alert.summary}</div>
                        <div className="helper-text">{alert.details}</div>
                      </td>
                      <td>{formatDateTime(alert.timestamp)}</td>
                      <td>{alert.sender}</td>
                      <td>
                        <button
                          type="button"
                          className="primary"
                          disabled={!alert.requiresAction || alert.actionTaken}
                          onClick={() => takeAlertAction(alert.id)}
                          title={
                            alert.requiresAction
                              ? alert.actionTaken
                                ? 'Action already recorded'
                                : 'Record completion of the required action'
                              : 'No action required'
                          }
                        >
                          {alert.requiresAction
                            ? alert.actionTaken
                              ? 'Completed'
                              : 'Take Action'
                            : 'No Action'}
                        </button>
                      </td>
                      <td>
                        {alert.important ? (
                          <span className="badge-important" title="Important alert">
                            ❗
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => markAlertsImportant([alert.id])}
                          >
                            Mark Important
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="secondary"
                          disabled={alert.requiresAction && !alert.actionTaken}
                          onClick={() => handleRowDelete(alert)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="ghost"
                          onClick={() => setModalAlert(alert)}
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
            onClick={() => setVisibleCount((count) => count + 20)}
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
          onClose={() => setModalAlert(null)}
          footer={
            <>
              <button
                type="button"
                className="primary"
                disabled={!modalAlert.requiresAction || modalAlert.actionTaken}
                onClick={() => {
                  takeAlertAction(modalAlert.id);
                  setModalAlert(null);
                }}
              >
                Take Action
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  markAlertsImportant([modalAlert.id]);
                  setModalAlert(null);
                }}
              >
                Mark as Important
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  markAlertsRead([modalAlert.id]);
                  setModalAlert(null);
                }}
              >
                Mark as Read
              </button>
              <button
                type="button"
                className="secondary"
                disabled={modalAlert.requiresAction && !modalAlert.actionTaken}
                onClick={() => {
                  handleRowDelete(modalAlert);
                  setModalAlert(null);
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
            <p className="helper-text">
              Action required: {modalAlert.actionableReason ?? 'Complete the requested workflow.'}
            </p>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
};

export default AlertsPage;

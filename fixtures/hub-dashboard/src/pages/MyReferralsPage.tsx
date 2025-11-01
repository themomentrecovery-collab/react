import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';
import { referralDetailsMap } from '../data/initialData';
import { facilityDirectory } from '../data/facilities';
import {
  PendingPlacementReferral,
  PendingIntakeReferral,
  ActiveReferral,
  CompletedReferral,
} from '../data/types';

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

const formatCountdown = (targetDate: string, now: number) => {
  const diff = new Date(targetDate).getTime() - now;
  if (diff <= 0) {
    return '00:00:00';
  }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return [hours, minutes, seconds]
    .map((unit) => unit.toString().padStart(2, '0'))
    .join(':');
};

interface DetailsModalState {
  id: string;
  section: 'pendingPlacement' | 'pendingIntake' | 'active' | 'completed';
}

interface FacilityModalState {
  facilityId: string;
  referralName: string;
}

const MyReferralsPage = () => {
  const navigate = useNavigate();
  const {
    pendingPlacement,
    pendingIntake,
    activeReferrals,
    completedReferrals,
    setSelectedMatchingReferralId,
  } = useDashboard();

  const [expandedSections, setExpandedSections] = useState({
    pendingPlacement: false,
    pendingIntake: false,
    active: false,
    completed: false,
  });
  const [detailsModal, setDetailsModal] = useState<DetailsModalState | null>(null);
  const [facilityModal, setFacilityModal] = useState<FacilityModalState | null>(null);
  const [editReferral, setEditReferral] = useState<DetailsModalState | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const toggleExpanded = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMatch = (referral: PendingPlacementReferral) => {
    setSelectedMatchingReferralId(referral.id);
    navigate('/matching');
  };

  const handleDownload = (referralId: string) => {
    window.alert(`Opening downloadable content for ${referralId}.`);
  };

  const handleSaveEdit = () => {
    setFeedback('Changes saved for the referral.');
    setEditReferral(null);
  };

  const resolveDetails = (modal: DetailsModalState | null) => {
    if (!modal) return undefined;
    return referralDetailsMap[modal.id];
  };

  const detailsRecord = resolveDetails(detailsModal ?? editReferral);

  const renderPendingPlacementRow = (referral: PendingPlacementReferral) => (
    <tr key={referral.id}>
      <td>{referral.name}</td>
      <td>{referral.id}</td>
      <td>{referral.stage}</td>
      <td>{formatCountdown(referral.timerEndsAt, now)}</td>
      <td>
        <button type="button" className="primary" onClick={() => handleMatch(referral)}>
          Match
        </button>
      </td>
      <td>
        <button type="button" className="secondary" onClick={() => handleDownload(referral.id)}>
          Download
        </button>
      </td>
      <td>
        <button
          type="button"
          className="secondary"
          onClick={() => setEditReferral({ id: referral.id, section: 'pendingPlacement' })}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="ghost"
          onClick={() => setDetailsModal({ id: referral.id, section: 'pendingPlacement' })}
        >
          ⌄
        </button>
      </td>
    </tr>
  );

  const renderPendingIntakeRow = (referral: PendingIntakeReferral) => (
    <tr key={referral.id}>
      <td>{referral.name}</td>
      <td>{referral.id}</td>
      <td>
        {referral.facilityName}{' '}
        <button
          type="button"
          className="ghost"
          title="Facility details"
          onClick={() =>
            setFacilityModal({ facilityId: referral.facilityId, referralName: referral.name })
          }
        >
          ⌄
        </button>
      </td>
      <td>{formatDate(referral.intakeDateTime)}</td>
      <td>
        <button type="button" className="secondary" onClick={() => handleDownload(referral.id)}>
          Download
        </button>
      </td>
      <td>
        <button
          type="button"
          className="secondary"
          onClick={() => setEditReferral({ id: referral.id, section: 'pendingIntake' })}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="ghost"
          onClick={() => setDetailsModal({ id: referral.id, section: 'pendingIntake' })}
        >
          ⌄
        </button>
      </td>
    </tr>
  );

  const renderActiveRow = (referral: ActiveReferral) => (
    <tr key={referral.id}>
      <td>{referral.name}</td>
      <td>{referral.id}</td>
      <td>
        {referral.facilityName}{' '}
        <button
          type="button"
          className="ghost"
          onClick={() =>
            setFacilityModal({ facilityId: referral.facilityId, referralName: referral.name })
          }
        >
          ⌄
        </button>
      </td>
      <td>{formatDate(referral.startDate)}</td>
      <td>{formatDate(referral.endDate)}</td>
      <td>
        <button type="button" className="secondary" onClick={() => handleDownload(referral.id)}>
          Download
        </button>
      </td>
      <td>
        <button type="button" className="secondary" disabled>
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="ghost"
          onClick={() => setDetailsModal({ id: referral.id, section: 'active' })}
        >
          ⌄
        </button>
      </td>
    </tr>
  );

  const renderCompletedRow = (referral: CompletedReferral) => (
    <tr key={referral.id}>
      <td>{referral.name}</td>
      <td>{referral.id}</td>
      <td>
        {referral.facilityName}{' '}
        <button
          type="button"
          className="ghost"
          onClick={() =>
            setFacilityModal({ facilityId: referral.facilityId, referralName: referral.name })
          }
        >
          ⌄
        </button>
      </td>
      <td>{formatDate(referral.startDate)}</td>
      <td>{formatDate(referral.endDate)}</td>
      <td>
        <button type="button" className="secondary" onClick={() => handleDownload(referral.id)}>
          Download
        </button>
      </td>
      <td>
        <button type="button" className="secondary" disabled>
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="ghost"
          onClick={() => setDetailsModal({ id: referral.id, section: 'completed' })}
        >
          ⌄
        </button>
      </td>
    </tr>
  );

  const renderTable = <T,>(
    data: T[],
    renderRow: (item: T) => JSX.Element,
    section: keyof typeof expandedSections,
    headers: string[]
  ) => {
    const visible = expandedSections[section] ? data : data.slice(0, 10);
    return (
      <>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td className="no-data" colSpan={headers.length}>
                    No referrals in this view.
                  </td>
                </tr>
              ) : (
                visible.map((item) => renderRow(item))
              )}
            </tbody>
          </table>
        </div>
        {data.length > 10 ? (
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              type="button"
              className="secondary"
              onClick={() => toggleExpanded(section)}
            >
              {expandedSections[section] ? 'See Less' : 'See More'}
            </button>
          </div>
        ) : null}
      </>
    );
  };

  const renderFacilityModal = () => {
    if (!facilityModal) return null;
    const facility = facilityDirectory[facilityModal.facilityId];
    if (!facility) return null;
    return (
      <Modal
        title={`Facility — ${facility.name}`}
        onClose={() => setFacilityModal(null)}
        size="large"
        footer={
          <>
            <button type="button" className="primary" onClick={() => window.alert('Referral sent to facility.')}>Send Referral</button>
            <button
              type="button"
              className="secondary"
              onClick={() => window.alert('Skip recorded for facility.')}
            >
              Skip
            </button>
          </>
        }
      >
        <p>
          Address: {facility.address}
          <br />County: {facility.county}
          <br />Phone: {facility.phone}
          <br />Email: {facility.email ?? 'Not provided'}
        </p>
        <p>
          Contact: {facility.contactName} ({facility.contactPhone})
          {facility.contactEmail ? ` — ${facility.contactEmail}` : ''}
        </p>
        <p>
          Treatment Types: {facility.treatmentTypes.join(', ')}
          <br />MAT Services: {facility.matServices ? 'Yes' : 'No'}
        </p>
        <p>
          Beds Available: {facility.availableBeds} of {facility.totalBeds}
          <br />Next Available Bed: {facility.nextAvailableBedDate}
          <br />Last Update: {formatDate(facility.lastUpdate)}
        </p>
        {facility.notes ? <p>{facility.notes}</p> : null}
      </Modal>
    );
  };

  const renderDetailsModal = () => {
    if (!detailsModal || !detailsRecord) return null;
    return (
      <Modal
        title={`Referral ${detailsModal.id}`}
        onClose={() => setDetailsModal(null)}
        size="large"
        footer={
          <>
            <button type="button" className="primary" onClick={() => window.alert('Match started.')}>Match</button>
            <button type="button" className="secondary" onClick={() => window.alert('Document uploaded.')}>Upload Document</button>
            <button type="button" className="secondary" onClick={() => handleDownload(detailsModal.id)}>
              Downloadable Content
            </button>
          </>
        }
      >
        <p>
          Client: {detailsRecord.client.firstName} {detailsRecord.client.lastName} ({detailsRecord.client.age})
          <br />Program: {detailsRecord.requestedProgramType} ({detailsRecord.requestedDuration})
          <br />Drug of Choice: {detailsRecord.substanceOfAbuse}
          <br />Languages: {detailsRecord.preferredLanguage}
          {detailsRecord.secondaryLanguages?.length
            ? `, ${detailsRecord.secondaryLanguages.join(', ')}`
            : ''}
        </p>
        <p>
          Contact: {detailsRecord.contact.firstName} {detailsRecord.contact.lastName} —{' '}
          {detailsRecord.contact.email} ({detailsRecord.contact.phone})
        </p>
        <p>
          Emergency Contact: {detailsRecord.emergencyContact.name} —{' '}
          {detailsRecord.emergencyContact.relationship} ({detailsRecord.emergencyContact.phone})
        </p>
        <p>
          Insurance: {detailsRecord.insurance?.type ?? 'Not provided'} | Policy:{' '}
          {detailsRecord.insurance?.policyNumber ?? 'N/A'}
        </p>
        {detailsRecord.notes ? <p>Notes: {detailsRecord.notes}</p> : null}
      </Modal>
    );
  };

  const renderEditModal = () => {
    if (!editReferral || !detailsRecord) return null;
    return (
      <Modal
        title={`Edit Referral ${editReferral.id}`}
        onClose={() => setEditReferral(null)}
        footer={
          <>
            <button type="button" className="secondary" onClick={() => setEditReferral(null)}>
              Cancel
            </button>
            <button type="button" className="primary" onClick={handleSaveEdit}>
              Save Changes
            </button>
          </>
        }
      >
        <div className="grid-2">
          <label>
            Referral Name
            <input defaultValue={`${detailsRecord.client.firstName} ${detailsRecord.client.lastName}`} />
          </label>
          <label>
            Contact Phone
            <input defaultValue={detailsRecord.contact.phone} />
          </label>
          <label>
            Contact Email
            <input defaultValue={detailsRecord.contact.email} />
          </label>
          <label>
            Notes
            <textarea defaultValue={detailsRecord.notes ?? ''} rows={4} />
          </label>
        </div>
      </Modal>
    );
  };

  return (
    <div className="my-referrals-page">
      <section className="section-card">
        <div className="section-header">
          <h2>Pending Placement</h2>
          <span className="badge">{pendingPlacement.length}</span>
        </div>
        {renderTable(
          pendingPlacement,
          renderPendingPlacementRow,
          'pendingPlacement',
          ['Referral Name', 'Referral ID', 'Stage', 'Timer', 'Match', 'Download', 'Edit', 'More']
        )}
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2>Pending Intake</h2>
          <span className="badge">{pendingIntake.length}</span>
        </div>
        {renderTable(
          pendingIntake,
          renderPendingIntakeRow,
          'pendingIntake',
          ['Referral Name', 'Referral ID', 'Facility', 'Intake Date & Time', 'Download', 'Edit', 'More']
        )}
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2>Active Referrals</h2>
          <span className="badge">{activeReferrals.length}</span>
        </div>
        {renderTable(
          activeReferrals,
          renderActiveRow,
          'active',
          ['Referral Name', 'Referral ID', 'Facility', 'Start Date', 'End Date', 'Download', 'Edit', 'More']
        )}
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2>Completed Referrals</h2>
          <span className="badge">{completedReferrals.length}</span>
        </div>
        {renderTable(
          completedReferrals,
          renderCompletedRow,
          'completed',
          ['Referral Name', 'Referral ID', 'Facility', 'Start Date', 'End Date', 'Download', 'Edit', 'More']
        )}
      </section>

      {feedback ? <p className="helper-text">{feedback}</p> : null}
      {renderFacilityModal()}
      {renderDetailsModal()}
      {renderEditModal()}
    </div>
  );
};

export default MyReferralsPage;

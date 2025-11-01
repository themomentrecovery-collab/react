import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';
import { facilityDirectory } from '../data/facilities';
import { referralDetailsMap } from '../data/initialData';
import { HoldQueueReferral } from '../data/types';

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

const HoldQueuePage = () => {
  const navigate = useNavigate();
  const { holdQueue, setSelectedMatchingReferralId } = useDashboard();
  const [facilityModal, setFacilityModal] = useState<HoldQueueReferral | null>(null);
  const [referralModal, setReferralModal] = useState<HoldQueueReferral | null>(null);
  const [cancelModal, setCancelModal] = useState<HoldQueueReferral | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStart = (referral: HoldQueueReferral) => {
    setSelectedMatchingReferralId(referral.id);
    navigate('/matching');
  };

  const handleCancel = () => {
    if (!cancelModal) return;
    if (!cancelReason.trim()) {
      setFeedback('Provide a reason before submitting the cancellation.');
      return;
    }
    setFeedback('Cancellation submitted for admin review.');
    setCancelModal(null);
    setCancelReason('');
  };

  const renderRow = (referral: HoldQueueReferral) => (
    <tr key={referral.id}>
      <td>{referral.name}</td>
      <td>{referral.id}</td>
      <td>{formatDate(referral.queueDate)}</td>
      <td>{referral.reason}</td>
      <td>{referral.nextAvailableBedDate}</td>
      <td>
        {referral.facilityName}{' '}
        <button
          type="button"
          className="ghost"
          onClick={() => setFacilityModal(referral)}
        >
          ⌄
        </button>
      </td>
      <td>
        <div className="action-group">
          <button type="button" className="primary" onClick={() => handleStart(referral)}>
            {referral.status === 'retry' ? 'Retry' : 'Start'}
          </button>
          <button type="button" className="secondary" onClick={() => window.alert('Download opened')}>
            Download
          </button>
          <button type="button" className="secondary" onClick={() => window.alert('Edit modal coming soon')}>
            Edit
          </button>
          <button type="button" className="secondary" onClick={() => setReferralModal(referral)}>
            Details
          </button>
          <button type="button" className="secondary" onClick={() => setCancelModal(referral)}>
            Cancel/Delete
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="hold-queue-page">
      <section className="section-card">
        <div className="section-header">
          <h2>Hold Queue</h2>
          <span className="badge">{holdQueue.length}</span>
        </div>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Referral Name</th>
                <th>Referral ID</th>
                <th>Queue Date</th>
                <th>Reason for Hold</th>
                <th>Next Available Bed</th>
                <th>Facility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdQueue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-data">
                    No referrals are currently in the hold queue.
                  </td>
                </tr>
              ) : (
                holdQueue.map((referral) => renderRow(referral))
              )}
            </tbody>
          </table>
        </div>
        {feedback ? <p className="helper-text" style={{ marginTop: 12 }}>{feedback}</p> : null}
      </section>

      {facilityModal ? (
        <Modal
          title={`Facility — ${facilityModal.facilityName}`}
          onClose={() => setFacilityModal(null)}
          size="large"
          footer={
            <>
              <button type="button" className="primary" onClick={() => window.alert('Referral sent to facility')}>
                Send Referral
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => window.alert('Skip recorded for facility')}
              >
                Skip
              </button>
            </>
          }
        >
          {(() => {
            const facility = facilityDirectory[facilityModal.facilityId];
            return facility ? (
              <>
                <p>
                  Address: {facility.address}
                  <br />County: {facility.county}
                  <br />Phone: {facility.phone}
                  <br />Email: {facility.email ?? 'Not provided'}
                </p>
                <p>
                  Treatment Types: {facility.treatmentTypes.join(', ')}
                  <br />MAT Services: {facility.matServices ? 'Yes' : 'No'}
                  <br />Beds Available: {facility.availableBeds} / {facility.totalBeds}
                  <br />Next Available Bed: {facility.nextAvailableBedDate}
                  <br />Last Update: {formatDate(facility.lastUpdate)}
                </p>
              </>
            ) : (
              <p>No additional facility information.</p>
            );
          })()}
        </Modal>
      ) : null}

      {referralModal ? (
        <Modal
          title={`Referral ${referralModal.id}`}
          onClose={() => setReferralModal(null)}
          size="large"
        >
          {(() => {
            const details = referralDetailsMap[referralModal.id];
            return details ? (
              <>
                <p>
                  Client: {details.client.firstName} {details.client.lastName} ({details.client.age})
                  <br />Program: {details.requestedProgramType} ({details.requestedDuration})
                  <br />Drug of Choice: {details.substanceOfAbuse}
                </p>
                <p>
                  Emergency Contact: {details.emergencyContact.name} — {details.emergencyContact.relationship}
                  ({details.emergencyContact.phone})
                </p>
                <p>Insurance: {details.insurance?.type ?? 'Not provided'}</p>
              </>
            ) : (
              <p>No additional referral information.</p>
            );
          })()}
        </Modal>
      ) : null}

      {cancelModal ? (
        <Modal
          title={`Cancel referral ${cancelModal.id}`}
          onClose={() => setCancelModal(null)}
          footer={
            <>
              <button type="button" className="secondary" onClick={() => setCancelModal(null)}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={handleCancel}>
                Confirm
              </button>
            </>
          }
        >
          <p>Please provide a reason for cancellation. Your request will be routed to an admin for approval.</p>
          <textarea
            rows={4}
            value={cancelReason}
            onChange={(event) => setCancelReason(event.target.value)}
            placeholder="Reason for cancellation"
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default HoldQueuePage;

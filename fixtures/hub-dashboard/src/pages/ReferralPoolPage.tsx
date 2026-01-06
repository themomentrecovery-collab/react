import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';
import { referralDetailsMap } from '../data/initialData';

const ReferralPoolPage = () => {
  const navigate = useNavigate();
  const { referralPool, claimReferralById } = useDashboard();
  const [detailReferralId, setDetailReferralId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleClaim = (referralId: string) => {
    const result = claimReferralById(referralId);
    if (!result) {
      setFeedback('Referral is no longer available to claim.');
      return;
    }
    setFeedback(result.message);
    if (result.type === 'matching') {
      navigate('/matching');
    } else {
      navigate('/hold-queue');
    }
  };

  const referralCount = referralPool.length;
  const selectedDetails = detailReferralId
    ? referralDetailsMap[detailReferralId]
    : undefined;

  return (
    <div className="referral-pool-page">
      <section className="section-card">
        <div className="section-header">
          <h2>Unclaimed Referrals</h2>
          <span className="badge" aria-live="polite">
            {referralCount} available
          </span>
        </div>
        <div className="table-scroll">
          <table className="table" aria-label="Unclaimed referrals">
            <thead>
              <tr>
                <th scope="col">Referral Name</th>
                <th scope="col">Referral ID</th>
                <th scope="col">Program Type</th>
                <th scope="col">Requested Duration</th>
                <th scope="col">Total Points</th>
                <th scope="col">Created</th>
                <th scope="col">Originating County</th>
                <th scope="col">Priority</th>
                <th scope="col">Claim</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {referralPool.length === 0 ? (
                <tr>
                  <td colSpan={10} className="no-data">
                    No referrals are currently available in the pool.
                  </td>
                </tr>
              ) : (
                referralPool.map((referral) => (
                  <tr key={referral.id}>
                    <td>{referral.name}</td>
                    <td>{referral.id}</td>
                    <td>{referral.programType}</td>
                    <td>{referral.duration}</td>
                    <td>{referral.totalReferralPoints}</td>
                    <td>
                      {new Date(referral.creationDate).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>{referral.originatingCounty}</td>
                    <td>{referral.highPriority ? 'High Priority' : 'Standard'}</td>
                    <td>
                      <button
                        type="button"
                        className="primary"
                        onClick={() => handleClaim(referral.id)}
                        title="Claim this referral"
                      >
                        Claim
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => setDetailReferralId(referral.id)}
                        title="View referral details"
                      >
                        ⌄
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {feedback ? <p className="helper-text" style={{ marginTop: 12 }}>{feedback}</p> : null}
      </section>

      {detailReferralId && selectedDetails ? (
        <Modal
          title={`Referral ${detailReferralId} Details`}
          onClose={() => setDetailReferralId(null)}
          size="large"
          footer={
            <button
              type="button"
              className="primary"
              onClick={() => {
                handleClaim(detailReferralId);
                setDetailReferralId(null);
              }}
            >
              Claim
            </button>
          }
        >
          <div className="grid-2">
            <div>
              <h3>Agency Information</h3>
              <p>
                <strong>{selectedDetails.agencyName}</strong>
                <br />
                Contact: {selectedDetails.contact.firstName} {selectedDetails.contact.lastName}
                <br />
                Title: {selectedDetails.contact.title}
                <br />
                Phone: {selectedDetails.contact.phone}
                <br />
                Email: {selectedDetails.contact.email}
              </p>
            </div>
            <div>
              <h3>Referral Overview</h3>
              <p>
                Program: {selectedDetails.requestedProgramType} ({selectedDetails.requestedDuration})
                <br />
                Court Order: {selectedDetails.courtOrder ? 'Yes' : 'No'}
                <br />
                ASAM Level: {selectedDetails.asamLevel ?? 'Not provided'}
                <br />
                Progress Reports: {selectedDetails.progressReportFrequency}
              </p>
            </div>
          </div>
          <h3>Client Details</h3>
          <p>
            {selectedDetails.client.firstName}{' '}
            {selectedDetails.client.middleInitial ? `${selectedDetails.client.middleInitial}. ` : ''}
            {selectedDetails.client.lastName} ({selectedDetails.client.age})
            <br />
            DOB: {selectedDetails.client.dateOfBirth}
            <br />
            Phone: {selectedDetails.client.phone}
            <br />
            Email: {selectedDetails.client.email}
            <br />
            Address: {selectedDetails.client.address}
            <br />
            County: {selectedDetails.client.county}
            <br />
            Preferred Language: {selectedDetails.preferredLanguage}
            {selectedDetails.secondaryLanguages?.length
              ? `, Secondary: ${selectedDetails.secondaryLanguages.join(', ')}`
              : ''}
          </p>
          <h3>Needs &amp; Requirements</h3>
          <ul>
            <li>Drug of Choice: {selectedDetails.substanceOfAbuse}</li>
            <li>ADA Accommodation: {selectedDetails.client.adaAccommodation}</li>
            <li>MAT Requirement: {selectedDetails.client.matRequirement}</li>
            <li>Pregnancy Status: {selectedDetails.client.pregnancyStatus}</li>
            <li>Minor Status: {selectedDetails.client.minorStatus}</li>
            <li>
              Willing to place outside county: {selectedDetails.willingOutsideCounty ? 'Yes' : 'No'}
            </li>
          </ul>
          <h3>Emergency Contact</h3>
          <p>
            {selectedDetails.emergencyContact.name} — {selectedDetails.emergencyContact.relationship}
            <br />
            Phone: {selectedDetails.emergencyContact.phone}
          </p>
          <h3>Insurance</h3>
          <p>
            Type: {selectedDetails.insurance?.type ?? 'Not provided'}
            <br />
            Policy: {selectedDetails.insurance?.policyNumber ?? 'N/A'}
            <br />
            SSN: {selectedDetails.insurance?.socialSecurity ?? 'N/A'}
          </p>
          {selectedDetails.notes ? (
            <p>
              <strong>Notes:</strong> {selectedDetails.notes}
            </p>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
};

export default ReferralPoolPage;

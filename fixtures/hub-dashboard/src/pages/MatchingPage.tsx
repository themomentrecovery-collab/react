import { useEffect, useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';
import { referralDetailsMap } from '../data/initialData';
import { PendingPlacementReferral, FacilityOption } from '../data/types';

const formatCountdown = (target: string, now: number) => {
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return '00:00:00';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return [hours, minutes, seconds]
    .map((unit) => unit.toString().padStart(2, '0'))
    .join(':');
};

const MatchingPage = () => {
  const {
    pendingPlacement,
    selectedMatchingReferralId,
    setSelectedMatchingReferralId,
  } = useDashboard();
  const [now, setNow] = useState(() => Date.now());
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedFacilityIndex, setSelectedFacilityIndex] = useState(0);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [skipReason, setSkipReason] = useState('');
  const [skipDate, setSkipDate] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const sortedReferrals = useMemo(
    () =>
      [...pendingPlacement].sort(
        (a, b) => a.matchDueInMinutes - b.matchDueInMinutes
      ),
    [pendingPlacement]
  );

  useEffect(() => {
    if (selectedMatchingReferralId) {
      setSelectedFacilityIndex(0);
      const referralDetails = referralDetailsMap[selectedMatchingReferralId];
      if (referralDetails) {
        setSelectedCounty(referralDetails.client.county);
      }
    } else if (sortedReferrals[0]) {
      setSelectedMatchingReferralId(sortedReferrals[0].id);
      const details = referralDetailsMap[sortedReferrals[0].id];
      if (details) {
        setSelectedCounty(details.client.county);
      }
    }
  }, [selectedMatchingReferralId, setSelectedMatchingReferralId, sortedReferrals]);

  const selectedReferral: PendingPlacementReferral | undefined = sortedReferrals.find(
    (referral) => referral.id === selectedMatchingReferralId
  );

  const referralDetails = selectedReferral
    ? referralDetailsMap[selectedReferral.id]
    : undefined;

  useEffect(() => {
    if (referralDetails) {
      setSelectedCounty(referralDetails.client.county);
    }
  }, [referralDetails]);

  const countyOptions = referralDetails
    ? [
        referralDetails.client.county,
        referralDetails.willingOutsideCounty ? 'Pierce County' : null,
        referralDetails.willingOutsideCounty ? 'Snohomish County' : null,
      ].filter(Boolean) as string[]
    : [];

  const selectedFacility: FacilityOption | undefined = selectedReferral?.facilityRotation?.[
    selectedFacilityIndex
  ];

  const handleFacilityChange = (index: number) => {
    setSelectedFacilityIndex(index);
    setFeedback(null);
  };

  const handleSendReferral = () => {
    setFeedback('Referral sent to facility. Awaiting response.');
  };

  const handleQueueReferral = () => {
    setFeedback('Referral queued. We will notify you when a bed is available.');
  };

  const handleSkipFacility = () => {
    if (!skipReason || !skipDate) {
      setFeedback('Provide a skip reason and next bed date to continue.');
      return;
    }
    setFeedback(`Facility skipped: ${skipReason} (next bed ${skipDate}).`);
    setShowSkipModal(false);
    setSkipReason('');
    setSkipDate('');
    setSelectedFacilityIndex((index) => {
      if (!selectedReferral) return index;
      const nextIndex = index + 1;
      return nextIndex >= (selectedReferral.facilityRotation?.length ?? 1)
        ? index
        : nextIndex;
    });
  };

  return (
    <div className="matching-page">
      <section className="section-card">
        <h2>Matching Workflow</h2>
        <div className="grid-2">
          <label>
            Select Referral
            <select
              value={selectedReferral?.id ?? ''}
              onChange={(event) => setSelectedMatchingReferralId(event.target.value)}
            >
              {sortedReferrals.map((referral) => (
                <option key={referral.id} value={referral.id}>
                  {referral.name} ({referral.id}) — due in {referral.matchDueInMinutes} minutes
                </option>
              ))}
            </select>
          </label>
          <label>
            County Search Scope
            <select
              value={selectedCounty}
              onChange={(event) => setSelectedCounty(event.target.value)}
            >
              {countyOptions.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {selectedReferral && referralDetails ? (
        <section className="section-card">
          <div className="section-header">
            <div>
              <h3>{referralDetails.client.firstName} {referralDetails.client.lastName}</h3>
              <p className="helper-text">
                Program: {referralDetails.requestedProgramType} ({referralDetails.requestedDuration})
              </p>
            </div>
            <div className="badge">Timer {formatCountdown(selectedReferral.timerEndsAt, now)}</div>
          </div>
          <div className="grid-2">
            <div>
              <p>
                DOB: {referralDetails.client.dateOfBirth} ({referralDetails.client.age})
                <br />Language: {referralDetails.preferredLanguage}
                {referralDetails.secondaryLanguages?.length
                  ? `, ${referralDetails.secondaryLanguages.join(', ')}`
                  : ''}
                <br />Drug of Choice: {referralDetails.substanceOfAbuse}
                <br />ADA Needs: {referralDetails.client.adaAccommodation}
              </p>
            </div>
            <div>
              <p>
                Contact: {referralDetails.contact.firstName} {referralDetails.contact.lastName}
                <br />Phone: {referralDetails.contact.phone}
                <br />Email: {referralDetails.contact.email}
                <br />Reports: {referralDetails.progressReportFrequency}
              </p>
            </div>
          </div>
          <button type="button" className="secondary" onClick={() => setShowReferralModal(true)}>
            More Info
          </button>
        </section>
      ) : null}

      <section className="section-card">
        <div className="section-header">
          <h3>Facility Options</h3>
          <div className="action-group">
            {selectedReferral?.facilityRotation?.map((facility, index) => (
              <button
                key={facility.id}
                type="button"
                className={
                  index === selectedFacilityIndex ? 'primary' : 'secondary'
                }
                onClick={() => handleFacilityChange(index)}
              >
                {facility.name}
              </button>
            ))}
          </div>
        </div>

        {selectedFacility ? (
          <div>
            <p>
              {selectedFacility.name}
              <br />Phone: {selectedFacility.phone}
              <br />Beds Available: {selectedFacility.bedsAvailable}
              <br />Next Available Bed: {selectedFacility.nextAvailableBedDate}
            </p>
            <div className="action-group" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="primary"
                onClick={handleSendReferral}
                title="Send referral packet to facility"
              >
                Send Referral
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setShowSkipModal(true)}
                title="Skip this facility"
              >
                Skip
              </button>
              <button
                type="button"
                className="secondary"
                onClick={handleQueueReferral}
                title="Queue for next available bed"
              >
                Queue
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setShowFacilityModal(true)}
              >
                More Info
              </button>
            </div>
          </div>
        ) : (
          <p className="helper-text">
            No facilities are currently available in the selected county. Queue is recommended.
          </p>
        )}
      </section>

      {feedback ? <p className="helper-text">{feedback}</p> : null}

      {showReferralModal && referralDetails ? (
        <Modal
          title={`Referral ${selectedReferral?.id}`}
          onClose={() => setShowReferralModal(false)}
          size="large"
        >
          <p>
            Client: {referralDetails.client.firstName} {referralDetails.client.lastName}
            <br />DOB: {referralDetails.client.dateOfBirth} — Age {referralDetails.client.age}
            <br />Address: {referralDetails.client.address}
            <br />County: {referralDetails.client.county}
          </p>
          <p>
            Court Order: {referralDetails.courtOrder ? 'Yes' : 'No'}
            <br />ASAM Level: {referralDetails.asamLevel ?? 'N/A'}
            <br />Program Start: {referralDetails.requestedProgramType}
            <br />Duration: {referralDetails.requestedDuration}
          </p>
          <p>
            Emergency Contact: {referralDetails.emergencyContact.name} —{' '}
            {referralDetails.emergencyContact.relationship} ({referralDetails.emergencyContact.phone})
          </p>
          <p>
            Insurance: {referralDetails.insurance?.type ?? 'Not provided'} — Policy{' '}
            {referralDetails.insurance?.policyNumber ?? 'N/A'}
          </p>
        </Modal>
      ) : null}

      {showFacilityModal && selectedFacility ? (
        <Modal
          title={selectedFacility.name}
          onClose={() => setShowFacilityModal(false)}
          size="large"
        >
          <p>
            Address: {selectedFacility.address}
            <br />County: {selectedFacility.county}
            <br />Phone: {selectedFacility.phone}
            <br />MAT Services: {selectedFacility.matServices ? 'Yes' : 'No'}
            <br />Total Beds: {selectedFacility.totalBeds}
          </p>
          <p>
            Contact: {selectedFacility.contactName} ({selectedFacility.contactPhone})
            <br />Email: {selectedFacility.contactEmail ?? 'Not provided'}
          </p>
        </Modal>
      ) : null}

      {showSkipModal ? (
        <Modal
          title="Skip Facility"
          onClose={() => setShowSkipModal(false)}
          footer={
            <>
              <button type="button" className="secondary" onClick={() => setShowSkipModal(false)}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={handleSkipFacility}>
                Confirm Skip
              </button>
            </>
          }
        >
          <label>
            Reason for skipping
            <textarea
              value={skipReason}
              onChange={(event) => setSkipReason(event.target.value)}
              rows={3}
            />
          </label>
          <label>
            Next available bed date
            <input
              type="date"
              value={skipDate}
              onChange={(event) => setSkipDate(event.target.value)}
            />
          </label>
        </Modal>
      ) : null}
    </div>
  );
};

export default MatchingPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import DownloadReportsModal from '../components/DownloadReportsModal';
import './QuickActionsBar.css';

const QuickActionsBar = () => {
  const navigate = useNavigate();
  const {
    claimNextReferral,
    startMatching,
    reports,
    selectedReportId,
    setSelectedReportId,
  } = useDashboard();
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleClaimReferral = () => {
    const result = claimNextReferral();
    if (!result) {
      setFeedback('All referrals in the pool are currently claimed.');
      return;
    }

    if (result.type === 'matching') {
      navigate('/matching');
    } else {
      navigate('/hold-queue');
    }
    setFeedback(result.message);
  };

  const handleStartMatching = () => {
    const referral = startMatching();
    if (!referral) {
      setFeedback('No pending placement referrals are available for matching.');
      return;
    }
    navigate('/matching');
    setFeedback(`Matching started for ${referral.name} (ID ${referral.id}).`);
  };

  return (
    <div className="quick-actions" role="region" aria-label="Quick actions">
      <div className="quick-actions-buttons">
        <button
          type="button"
          className="quick-action-button"
          onClick={handleClaimReferral}
          title="Claim the next oldest referral available in the pool"
        >
          <span className="quick-action-icon">📥</span>
          Claim Referral
        </button>
        <button
          type="button"
          className="quick-action-button"
          onClick={handleStartMatching}
          title="Jump to the matching workflow for the most urgent referral in your queue"
        >
          <span className="quick-action-icon">⚙️</span>
          Start Matching
        </button>
        <button
          type="button"
          className="quick-action-button"
          onClick={() => setShowReportsModal(true)}
          title="Download referral-specific reports"
        >
          <span className="quick-action-icon">⬇️</span>
          Download Reports
        </button>
      </div>
      {feedback ? <div className="quick-actions-feedback">{feedback}</div> : null}
      {showReportsModal ? (
        <DownloadReportsModal
          reports={reports}
          selectedReportId={selectedReportId}
          onChangeReport={setSelectedReportId}
          onClose={() => setShowReportsModal(false)}
        />
      ) : null}
    </div>
  );
};

export default QuickActionsBar;

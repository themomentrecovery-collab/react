import { useState } from 'react';
import Modal from './Modal';
import { ReportOption } from '../data/types';

interface DownloadReportsModalProps {
  reports: ReportOption[];
  selectedReportId: string | null;
  onChangeReport: (id: string | null) => void;
  onClose: () => void;
}

const DownloadReportsModal = ({
  reports,
  selectedReportId,
  onChangeReport,
  onClose,
}: DownloadReportsModalProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedReportId) {
      setError('Please select a referral to continue.');
      return;
    }
    setError(null);
    window.alert(`Download started for report ${selectedReportId}.`);
    onClose();
  };

  return (
    <Modal
      title="Download Referral Reports"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="primary" onClick={handleConfirm}>
            Confirm
          </button>
        </>
      }
    >
      <p>Select the referral to view downloadable data.</p>
      <label className="helper-text" htmlFor="reports-select">
        Active referrals
      </label>
      <select
        id="reports-select"
        value={selectedReportId ?? ''}
        onChange={(event) => onChangeReport(event.target.value || null)}
      >
        <option value="">Choose referral</option>
        {reports.map((report) => (
          <option key={report.id} value={report.id}>
            {report.referralName} ({report.referralId}) — {report.description}
          </option>
        ))}
      </select>
      {error ? <p className="helper-text" style={{ color: '#dc2626' }}>{error}</p> : null}
    </Modal>
  );
};

export default DownloadReportsModal;

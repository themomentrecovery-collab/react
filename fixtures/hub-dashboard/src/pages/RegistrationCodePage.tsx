import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorderedInput from '../components/BorderedInput';
import { registrationCodes } from '../data/authData';

const RegistrationCodePage = () => {
  const [registrationCode, setRegistrationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    const normalized = registrationCode.trim();
    if (!normalized) {
      setCodeError('Please enter your registration code.');
      return;
    }

    const record = registrationCodes.find(
      (item) => item.code === normalized && item.active
    );
    if (!record) {
      setCodeError('That registration code is invalid or inactive.');
      return;
    }

    setCodeError('');
    if (record.flow === 'employee') {
      navigate('/register/employee');
    } else if (record.flow === 'facility-rep') {
      navigate('/register/facility');
    } else {
      navigate('/register/referral');
    }
  };

  return (
    <div className="auth-stack">
      <div className="auth-logo">
        <span className="auth-logo-mark">MC</span>
        <span>Moment Connect</span>
      </div>
      <h1 className="auth-title">Create account</h1>
      <p className="auth-subtitle">Enter your registration code to get started.</p>
      <BorderedInput
        id="registration-code"
        label="Registration code"
        value={registrationCode}
        onChange={(value) => {
          setRegistrationCode(value);
          setCodeError('');
        }}
        placeholder="Enter your registration code"
      />
      {codeError ? <div className="auth-error">{codeError}</div> : null}
      <button
        className="primary auth-primary"
        type="button"
        onClick={handleNext}
        disabled={!registrationCode.trim()}
      >
        Next
      </button>
      <div className="auth-separator" />
      <p className="auth-message">
        Don’t have a registration code? Call 949-354-3577
      </p>
    </div>
  );
};

export default RegistrationCodePage;

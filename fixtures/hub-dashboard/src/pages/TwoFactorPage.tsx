import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BorderedInput from '../components/BorderedInput';
import { accountsData, dashboardRouteByType } from '../data/authData';

const TwoFactorPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as { username?: string } | null)?.username;

  const accountType = useMemo(() => {
    const account = accountsData.find(
      (item) => item.username.toLowerCase() === (username ?? '').toLowerCase()
    );
    return account?.type ?? 'referral-agency';
  }, [username]);

  const handleVerify = () => {
    if (!code.trim()) {
      setError('Please enter your verification code.');
      return;
    }

    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit code from your authenticator.');
      return;
    }

    setError('');
    navigate(dashboardRouteByType[accountType], { state: { accountType } });
  };

  return (
    <div className="auth-stack">
      <div className="auth-logo">
        <span className="auth-logo-mark">MC</span>
        <span>Moment Connect</span>
      </div>
      <h1 className="auth-title">Two-factor authentication</h1>
      <p className="auth-subtitle">
        Enter the 6-digit code from your authenticator to continue.
      </p>
      <BorderedInput
        id="two-factor-code"
        label="Verification code"
        value={code}
        onChange={(value) => {
          setCode(value);
          setError('');
        }}
        placeholder="123456"
      />
      {error ? <div className="auth-error">{error}</div> : null}
      <button className="primary auth-primary" type="button" onClick={handleVerify}>
        Verify & Continue
      </button>
    </div>
  );
};

export default TwoFactorPage;

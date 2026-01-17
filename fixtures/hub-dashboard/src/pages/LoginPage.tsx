import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorderedInput from '../components/BorderedInput';
import {
  accountsData,
  dashboardRouteByType,
  registrationCodes,
} from '../data/authData';

type LoginStatus = 'idle' | 'invalid' | 'locked' | 'success';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [registrationCode, setRegistrationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [, setAuditLog] = useState<
    { username: string; success: boolean; timestamp: string }[]
  >([]);
  const navigate = useNavigate();

  const loginMessage = useMemo(() => {
    if (status === 'invalid') {
      return 'Invalid username or password. Please try again.';
    }
    if (status === 'locked') {
      return 'This account is temporarily locked due to multiple failed attempts.';
    }
    if (status === 'success') {
      return 'Login successful. Redirecting you now.';
    }
    return '';
  }, [status]);

  const handleLogin = () => {
    const normalized = username.trim().toLowerCase();
    const account = accountsData.find(
      (item) => item.username.toLowerCase() === normalized
    );

    const nextAttempts = {
      ...attempts,
      [normalized]: (attempts[normalized] ?? 0) + 1,
    };
    setAttempts(nextAttempts);

    const success = Boolean(account && account.password === password);
    setAuditLog((prev) => [
      ...prev,
      {
        username: normalized || 'unknown',
        success,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (!success) {
      setStatus(nextAttempts[normalized] >= 3 ? 'locked' : 'invalid');
      return;
    }

    setStatus('success');
    if (account.twoFactorEnabled) {
      navigate('/two-factor', { state: { username: normalized } });
      return;
    }

    navigate(dashboardRouteByType[account.type]);
  };

  const handleRegistrationCode = () => {
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
      <h1 className="auth-title">Login</h1>
      {loginMessage ? <div className="auth-error">{loginMessage}</div> : null}
      <BorderedInput
        id="login-username"
        label="Username"
        value={username}
        onChange={setUsername}
        autoComplete="username"
      />
      <BorderedInput
        id="login-password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        rightAdornment={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        }
      />
      <div className="auth-link-row">
        <a href="/forgot-password">Forgot password?</a>
      </div>
      <div className="auth-actions">
        <button className="primary auth-primary" type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
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
        onClick={handleRegistrationCode}
        disabled={!registrationCode.trim()}
      >
        Next
      </button>
      <div className="auth-separator" />
      <button
        className="secondary auth-secondary"
        type="button"
        onClick={() => navigate('/registration-code')}
      >
        Create Account
      </button>
    </div>
  );
};

export default LoginPage;

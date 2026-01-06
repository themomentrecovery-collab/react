import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import './Header.css';

const Header = () => {
  const { user } = useDashboard();
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <header className="dashboard-header" role="banner">
      <div className="logo" aria-label="The Moment Connect">
        <span className="logo-mark">TM</span>
        <span className="logo-text">The Moment Connect</span>
      </div>
      <div className="header-meta">
        <div className="user-name" aria-live="polite">
          {user.name}
        </div>
        <div className="live-clock" aria-live="polite" aria-label="Current time">
          {formatTime(clock)}
        </div>
      </div>
    </header>
  );
};

export default Header;

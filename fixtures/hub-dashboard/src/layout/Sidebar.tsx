import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import './Sidebar.css';

const navItems = [
  { label: 'Home', to: '/home', badgeKey: undefined },
  { label: 'Alerts', to: '/alerts', badgeKey: 'alerts' },
  { label: 'Referral Pool', to: '/referral-pool', badgeKey: 'referralPool' },
  { label: 'My Referrals', to: '/my-referrals', badgeKey: undefined },
  { label: 'Matching', to: '/matching', badgeKey: undefined },
  { label: 'Hold Queue', to: '/hold-queue', badgeKey: undefined },
  { label: 'Messages', to: '/messages', badgeKey: 'messages' },
  { label: 'Performance', to: '/performance', badgeKey: undefined },
  { label: 'Preferences', to: '/preferences', badgeKey: undefined },
  { label: 'Support', to: '/support', badgeKey: undefined },
  { label: 'Logout', to: '/logout', badgeKey: undefined },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCounts } = useDashboard();

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="dashboard-sidebar"
      >
        ☰
      </button>
      <aside
        id="dashboard-sidebar"
        className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to === '/logout' ? '/home' : item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <span>{item.label}</span>
              {item.badgeKey && unreadCounts[item.badgeKey] ? (
                <span className="nav-badge" aria-live="polite">
                  {unreadCounts[item.badgeKey]}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="sidebar-spacer" aria-hidden />
    </>
  );
};

export default Sidebar;

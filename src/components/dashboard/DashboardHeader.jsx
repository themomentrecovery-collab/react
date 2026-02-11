import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../../contexts/AuthContext';
import {useNotifications} from '../../contexts/NotificationContext';

function DashboardHeader({title, subtitle, actions, breadcrumbs, environmentLabel}) {
  const {user, isAuthenticated} = useAuth();
  const {notifications} = useNotifications();

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const userInitials = useMemo(() => {
    if (!user || !user.name) {
      return 'MC';
    }

    return user.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => segment[0].toUpperCase())
      .join('');
  }, [user]);

  const resolvedEnvironmentLabel = environmentLabel || user?.organization || 'Unified hub workspace';

  return (
    <div className="hub-header">
      <div className="hub-header__primary-row">
        <div className="hub-header__brand" aria-label="Moment Connect navigation">
          <span className="hub-header__logo" aria-hidden="true">
            MC
          </span>
          <div className="hub-header__brand-copy">
            <span className="hub-header__product">Moment Connect</span>
            <span className="hub-header__environment">{resolvedEnvironmentLabel}</span>
          </div>
        </div>
        <label className="hub-header__search">
          <span className="visually-hidden">Search the hub</span>
          <input
            type="search"
            name="hub-search"
            placeholder="Search referrals, facilities, or contacts"
            autoComplete="off"
          />
        </label>
        <div className="hub-header__command-bar">
          <button type="button" className="hub-header__global-primary">
            New referral
          </button>
          <button type="button" className="hub-header__global-secondary">
            Log update
          </button>
          <button
            type="button"
            className="hub-header__notifications"
            aria-label={`View ${unreadCount} unread notifications`}
          >
            <span aria-hidden="true">🔔</span>
            {unreadCount > 0 ? <span className="hub-header__badge">{unreadCount}</span> : null}
          </button>
          <div className="hub-header__user" aria-live="polite">
            <div className="hub-header__avatar" aria-hidden="true">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="" />
              ) : (
                <span>{userInitials}</span>
              )}
            </div>
            <div className="hub-header__user-meta">
              <span className="hub-header__user-name">
                {isAuthenticated && user ? user.name || 'Authenticated user' : 'Guest session'}
              </span>
              <span className="hub-header__user-role">
                {isAuthenticated && user ? user.role || 'Team member' : 'Sign in for full access'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hub-header__secondary-row">
        <div className="hub-header__page-meta">
          {breadcrumbs && breadcrumbs.length ? (
            <nav aria-label="Breadcrumb">
              <ol className="hub-header__breadcrumbs">
                {breadcrumbs.map((crumb) => (
                  <li key={crumb.label} className="hub-header__breadcrumb">
                    {crumb.to ? <a href={crumb.to}>{crumb.label}</a> : crumb.label}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="hub-header__page-titles">
            <h1 className="hub-header__title">{title}</h1>
            {subtitle ? <p className="hub-header__subtitle">{subtitle}</p> : null}
          </div>
        </div>
        {actions ? <div className="hub-header__page-actions">{actions}</div> : null}
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ),
  environmentLabel: PropTypes.string,
};

DashboardHeader.defaultProps = {
  subtitle: null,
  actions: null,
  breadcrumbs: null,
  environmentLabel: undefined,
};

export default DashboardHeader;

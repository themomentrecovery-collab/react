import React from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../../contexts/AuthContext';
import {useNotifications} from '../../contexts/NotificationContext';

function DashboardHeader({title}) {
  const {user, isAuthenticated} = useAuth();
  const {notifications} = useNotifications();

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="dashboard-header" role="banner">
      <div className="dashboard-header__title-group">
        <h1 className="dashboard-header__title">{title}</h1>
        {isAuthenticated && user ? (
          <p className="dashboard-header__subtitle">Welcome back, {user.name || 'Guest'}.</p>
        ) : (
          <p className="dashboard-header__subtitle">You are currently browsing as a guest.</p>
        )}
      </div>
      <div className="dashboard-header__meta" aria-live="polite">
        <span className="dashboard-header__notifications" title="Unread notifications">
          🔔 {unreadCount}
        </span>
        {isAuthenticated && user && user.role ? (
          <span className="dashboard-header__role">Role: {user.role}</span>
        ) : null}
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string,
};

DashboardHeader.defaultProps = {
  title: 'Dashboard',
};

export default DashboardHeader;

import React from 'react';
import PropTypes from 'prop-types';
import {AuthProvider} from '../contexts/AuthContext';
import {NotificationProvider} from '../contexts/NotificationContext';

function DashboardLayout({
  header,
  sidebar,
  children,
  initialUser,
  initialNotifications,
}) {
  return (
    <AuthProvider initialUser={initialUser}>
      <NotificationProvider initialNotifications={initialNotifications}>
        <div className="dashboard-layout">
          <header className="dashboard-layout__header">{header}</header>
          <div className="dashboard-layout__body">
            <aside className="dashboard-layout__sidebar">{sidebar}</aside>
            <main className="dashboard-layout__content" role="main">
              {children}
            </main>
          </div>
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

DashboardLayout.propTypes = {
  header: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  initialUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    role: PropTypes.string,
  }),
  initialNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string.isRequired,
      type: PropTypes.string,
      read: PropTypes.bool,
      timestamp: PropTypes.string,
    }),
  ),
};

DashboardLayout.defaultProps = {
  initialUser: null,
  initialNotifications: undefined,
};

export default DashboardLayout;

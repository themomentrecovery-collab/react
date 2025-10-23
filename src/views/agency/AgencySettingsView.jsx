import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

function AgencySettingsView() {
  const {user, login, logout, isAuthenticated} = useAuth();

  const toggleSession = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login({
        id: 'agency-admin',
        name: 'Agency Admin',
        role: 'Agency manager',
      });
    }
  };

  return (
    <section className="dashboard-view dashboard-view--settings">
      <header>
        <h2>Agency settings</h2>
        <p>Configure agency team access, communication preferences, and session state.</p>
      </header>
      <article>
        <p>
          {isAuthenticated && user
            ? `Signed in as ${user.name || 'Unnamed agency user'}`
            : 'You are not signed in. Activate an agency session to make updates.'}
        </p>
        <button type="button" onClick={toggleSession}>
          {isAuthenticated ? 'Sign out of agency session' : 'Sign in as agency admin'}
        </button>
      </article>
    </section>
  );
}

export default AgencySettingsView;

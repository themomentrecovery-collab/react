import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

function FacilitySettingsView() {
  const {user, login, logout, isAuthenticated} = useAuth();

  const toggleSession = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login({
        id: 'facility-director',
        name: 'Facility Director',
        role: 'Facility administrator',
      });
    }
  };

  return (
    <section className="dashboard-view dashboard-view--settings">
      <header>
        <h2>Facility settings</h2>
        <p>Update facility contacts, escalation rules, and login status.</p>
      </header>
      <article>
        <p>
          {isAuthenticated && user
            ? `Signed in as ${user.name || 'Facility user'}`
            : 'You are not signed in. Authenticate to adjust facility preferences.'}
        </p>
        <button type="button" onClick={toggleSession}>
          {isAuthenticated ? 'Sign out of facility session' : 'Sign in as facility director'}
        </button>
      </article>
    </section>
  );
}

export default FacilitySettingsView;

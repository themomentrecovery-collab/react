import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

const escalationContacts = [
  {
    id: 'nurse-oncall',
    role: 'On-call nurse',
    name: 'Jamie Rivera',
    phone: '(555) 214-9843',
    hours: 'Weeknights 5p-7a',
  },
  {
    id: 'weekend-supervisor',
    role: 'Weekend supervisor',
    name: 'Alex Morgan',
    phone: '(555) 317-4421',
    hours: 'Weekends',
  },
  {
    id: 'maintenance-lead',
    role: 'Maintenance lead',
    name: 'Taylor Brooks',
    phone: '(555) 403-8802',
    hours: 'All days',
  },
];

const notificationPreferences = [
  {
    id: 'shift-handoff',
    label: 'Shift handoff summary',
    description: 'Send the unit status email at every shift change.',
    defaultChecked: true,
  },
  {
    id: 'incident-alerts',
    label: 'Incident alerts',
    description: 'Notify leadership when incident reports are submitted.',
    defaultChecked: true,
  },
  {
    id: 'maintenance-updates',
    label: 'Maintenance updates',
    description: 'Share scheduled maintenance and outage notifications.',
    defaultChecked: false,
  },
];

function FacilitySettingsView() {
  const {user, login, logout, isAuthenticated} = useAuth();

  const handleSessionToggle = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login({
        id: 'facility-director',
        name: 'Taylor Facility',
        role: 'Facility administrator',
        organization: 'Taylor Transitional Care',
      });
    }
  };

  return (
    <div className="hub-view hub-view--facility-settings">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Facility profile</h2>
          <p>Verify facility contacts and escalation details shared with agency partners.</p>
        </header>
        <div className="hub-card hub-card--form">
          <dl className="hub-definition-list">
            <div className="hub-definition-list__row">
              <dt>Facility name</dt>
              <dd>{user?.organization || 'Taylor Transitional Care'}</dd>
            </div>
            <div className="hub-definition-list__row">
              <dt>Primary administrator</dt>
              <dd>{user?.name || 'Unassigned'}</dd>
            </div>
            <div className="hub-definition-list__row">
              <dt>Role</dt>
              <dd>{user?.role || 'Facility administrator'}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Escalation contacts</h3>
              <p>Who to call for after-hours coordination.</p>
            </div>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {escalationContacts.map((contact) => (
                <tr key={contact.id}>
                  <th scope="row">{contact.role}</th>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <form className="hub-card hub-card--form" aria-labelledby="facility-notifications">
          <header className="hub-card__header">
            <div>
              <h3 id="facility-notifications">Notification preferences</h3>
              <p>Choose which alerts reach the facility leadership team.</p>
            </div>
          </header>
          <fieldset className="hub-fieldset">
            <legend className="visually-hidden">Facility notification preferences</legend>
            {notificationPreferences.map((preference) => (
              <label key={preference.id} className="hub-toggle">
                <input
                  type="checkbox"
                  name="facility-notifications"
                  defaultChecked={preference.defaultChecked}
                  id={preference.id}
                />
                <span className="hub-toggle__label">
                  <span>{preference.label}</span>
                  <span className="hub-toggle__description">{preference.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </form>
      </section>

      <section className="hub-section">
        <div className="hub-card hub-card--actions">
          <div>
            <h3>Session control</h3>
            <p>
              {isAuthenticated && user
                ? `Signed in as ${user.name}. Updates here sync instantly with agency dashboards.`
                : 'You are in read-only mode. Sign in as the facility administrator to update preferences.'}
            </p>
          </div>
          <button type="button" className="hub-card__action" onClick={handleSessionToggle}>
            {isAuthenticated ? 'Sign out of facility session' : 'Sign in as facility director'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default FacilitySettingsView;

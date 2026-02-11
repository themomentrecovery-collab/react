import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

const notificationChannels = [
  {
    id: 'email-updates',
    label: 'Email updates',
    description: 'Send daily digest of referral assignments and SLA breaches.',
    defaultChecked: true,
  },
  {
    id: 'sms-alerts',
    label: 'SMS alerts',
    description: 'Text critical alerts to on-call placement coordinators.',
    defaultChecked: false,
  },
  {
    id: 'in-app',
    label: 'In-app notifications',
    description: 'Display alerts within the hub notification center.',
    defaultChecked: true,
  },
];

const integrationPreferences = [
  {
    id: 'ehr-sync',
    label: 'EHR sync',
    description: 'Automatically pull clinical summaries from the hospital EHR.',
    defaultChecked: true,
  },
  {
    id: 'calendar-handoff',
    label: 'Calendar handoff',
    description: 'Create calendar invites for scheduled facility walkthroughs.',
    defaultChecked: true,
  },
  {
    id: 'slack-bridge',
    label: 'Slack bridge',
    description: 'Post referral alerts into the agency operations Slack channel.',
    defaultChecked: false,
  },
];

function AgencySettingsView() {
  const {user, login, logout, isAuthenticated} = useAuth();

  const handleSessionToggle = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login({
        id: 'agency-admin',
        name: 'Jordan Agency',
        role: 'Agency manager',
        organization: 'Northstar Placement Agency',
      });
    }
  };

  return (
    <div className="hub-view hub-view--agency-settings">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Agency profile</h2>
          <p>Manage organization identity and collaboration preferences.</p>
        </header>
        <div className="hub-card hub-card--form">
          <dl className="hub-definition-list">
            <div className="hub-definition-list__row">
              <dt>Agency name</dt>
              <dd>{user?.organization || 'Northstar Placement Agency'}</dd>
            </div>
            <div className="hub-definition-list__row">
              <dt>Primary contact</dt>
              <dd>{user?.name || 'Unassigned'}</dd>
            </div>
            <div className="hub-definition-list__row">
              <dt>Role</dt>
              <dd>{user?.role || 'Pending assignment'}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="hub-section hub-section--split">
        <form className="hub-card hub-card--form" aria-labelledby="agency-notifications">
          <header className="hub-card__header">
            <div>
              <h3 id="agency-notifications">Notification channels</h3>
              <p>Choose how coordinators are alerted about referral activity.</p>
            </div>
          </header>
          <fieldset className="hub-fieldset">
            <legend className="visually-hidden">Notification channels</legend>
            {notificationChannels.map((channel) => (
              <label key={channel.id} className="hub-toggle">
                <input
                  type="checkbox"
                  name="notification-channels"
                  defaultChecked={channel.defaultChecked}
                  id={channel.id}
                />
                <span className="hub-toggle__label">
                  <span>{channel.label}</span>
                  <span className="hub-toggle__description">{channel.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </form>

        <form className="hub-card hub-card--form" aria-labelledby="agency-integrations">
          <header className="hub-card__header">
            <div>
              <h3 id="agency-integrations">Integrations</h3>
              <p>Control which partner systems sync with Moment Connect.</p>
            </div>
          </header>
          <fieldset className="hub-fieldset">
            <legend className="visually-hidden">Integration settings</legend>
            {integrationPreferences.map((integration) => (
              <label key={integration.id} className="hub-toggle">
                <input
                  type="checkbox"
                  name="integration-preferences"
                  defaultChecked={integration.defaultChecked}
                  id={integration.id}
                />
                <span className="hub-toggle__label">
                  <span>{integration.label}</span>
                  <span className="hub-toggle__description">{integration.description}</span>
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
                ? `Signed in as ${user.name}. Use this control to manage administrative updates.`
                : 'You are browsing in a limited demo mode. Sign in to apply agency-wide updates.'}
            </p>
          </div>
          <button type="button" className="hub-card__action" onClick={handleSessionToggle}>
            {isAuthenticated ? 'Sign out of agency session' : 'Sign in as agency admin'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default AgencySettingsView;

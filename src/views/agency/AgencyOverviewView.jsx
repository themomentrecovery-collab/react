import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

const pipelineMetrics = [
  {label: 'Active referrals', value: 128, delta: '+12 this week', tone: 'positive'},
  {label: 'Placement rate', value: '76%', delta: '+4% vs last month', tone: 'positive'},
  {label: 'Average response time', value: '3.2 hrs', delta: '-0.5 hr vs SLA', tone: 'positive'},
  {label: 'Open tasks', value: 18, delta: '6 due today', tone: 'caution'},
];

const pipelineStages = [
  {stage: 'New', count: 24, owners: 'Casey, Morgan', sla: '2h'},
  {stage: 'Screening', count: 31, owners: 'Dana, Riley', sla: '4h'},
  {stage: 'Matching', count: 19, owners: 'Phoenix, Lee', sla: '6h'},
  {stage: 'Placement', count: 11, owners: 'Quinn', sla: '12h'},
];

const activityFeed = [
  {
    time: '9:24 AM',
    summary: 'Referred Sam Lee to Hopeview Recovery. Awaiting facility acceptance.',
    actor: 'Morgan Ruiz',
  },
  {
    time: '8:58 AM',
    summary: 'Marked referral MC-1423 as urgent and notified facility partner list.',
    actor: 'Dana Patel',
  },
  {
    time: '8:15 AM',
    summary: 'Uploaded discharge summary for patient Collins and shared with partners.',
    actor: 'Casey Young',
  },
];

const alertTasks = [
  {
    title: 'Escalate high acuity referral MC-1482',
    detail: 'Needs placement within 3 hours. Confirm capacity with priority facilities.',
    tone: 'critical',
  },
  {
    title: 'Finalize contract renewal for Harborview network',
    detail: 'Legal review complete. Capture executive signature by Wednesday.',
    tone: 'neutral',
  },
  {
    title: 'Schedule onboarding for two new agency coordinators',
    detail: 'Invite training cohort and assign mentors from the agency team.',
    tone: 'caution',
  },
];

function AgencyOverviewView() {
  const {user} = useAuth();

  return (
    <div className="hub-view hub-view--agency-overview">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Pipeline health</h2>
          <p>
            {user?.name
              ? `${user.name}, your agency pipeline is refreshed with live referral counts and SLA pacing.`
              : 'Sign in to personalize this overview with your agency roster and referral ownership.'}
          </p>
        </header>
        <div className="hub-metric-grid">
          {pipelineMetrics.map((metric) => (
            <article key={metric.label} className={`hub-metric hub-metric--${metric.tone}`}>
              <header>
                <p className="hub-metric__label">{metric.label}</p>
                <p className="hub-metric__value">{metric.value}</p>
              </header>
              <p className="hub-metric__delta">{metric.delta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Referral pipeline</h3>
              <p>Stage-by-stage view of referrals with assigned owners and SLA pacing.</p>
            </div>
            <button type="button" className="hub-card__action">
              View referral board
            </button>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">In queue</th>
                <th scope="col">Owners</th>
                <th scope="col">SLA</th>
              </tr>
            </thead>
            <tbody>
              {pipelineStages.map((stage) => (
                <tr key={stage.stage}>
                  <th scope="row">{stage.stage}</th>
                  <td>{stage.count}</td>
                  <td>{stage.owners}</td>
                  <td>{stage.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <aside className="hub-card hub-card--list">
          <header className="hub-card__header">
            <div>
              <h3>Team activity</h3>
              <p>Recent actions from agency coordinators across the network.</p>
            </div>
          </header>
          <ol className="hub-feed" aria-live="polite">
            {activityFeed.map((item) => (
              <li key={`${item.time}-${item.actor}`} className="hub-feed__item">
                <p className="hub-feed__timestamp">{item.time}</p>
                <p className="hub-feed__summary">{item.summary}</p>
                <p className="hub-feed__actor">{item.actor}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="hub-section">
        <article className="hub-card hub-card--alerts">
          <header className="hub-card__header">
            <div>
              <h3>Alerts &amp; tasks</h3>
              <p>Prioritized follow-ups synchronized with your notification center.</p>
            </div>
            <button type="button" className="hub-card__action">
              Manage tasks
            </button>
          </header>
          <ul className="hub-alerts">
            {alertTasks.map((alert) => (
              <li key={alert.title} className={`hub-alert hub-alert--${alert.tone}`}>
                <h4 className="hub-alert__title">{alert.title}</h4>
                <p className="hub-alert__detail">{alert.detail}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}

export default AgencyOverviewView;

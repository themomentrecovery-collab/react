import React from 'react';
import {useNotifications} from '../../contexts/NotificationContext';

const conversionHighlights = [
  {label: 'Inquiry to screening', value: '68%', trend: '+6% WoW'},
  {label: 'Screening to match', value: '54%', trend: '+3% WoW'},
  {label: 'Match to placement', value: '82%', trend: '+2% WoW'},
];

const serviceLevels = [
  {metric: 'Median placement time', current: '36 hrs', goal: '48 hrs'},
  {metric: 'Referral acceptance rate', current: '92%', goal: '88%'},
  {metric: 'Follow-up SLA adherence', current: '87%', goal: '90%'},
  {metric: 'Average facility responses', current: '3.4', goal: '3.0'},
];

const topFacilities = [
  {name: 'Hopeview Recovery', placements: 12, acceptance: '94%'},
  {name: 'Harborview Wellness', placements: 9, acceptance: '89%'},
  {name: 'Cedar Creek Care', placements: 7, acceptance: '91%'},
];

function AgencyAnalyticsView() {
  const {addNotification} = useNotifications();

  const handleQueueExport = () => {
    addNotification('Analytics export queued. We will email you when it is ready.', {
      type: 'success',
    });
  };

  return (
    <div className="hub-view hub-view--agency-analytics">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Performance analytics</h2>
          <p>Track referral conversion, placement velocity, and partner performance trends.</p>
        </header>
        <div className="hub-metric-grid hub-metric-grid--narrow">
          {conversionHighlights.map((highlight) => (
            <article key={highlight.label} className="hub-metric hub-metric--insight">
              <header>
                <p className="hub-metric__label">{highlight.label}</p>
                <p className="hub-metric__value">{highlight.value}</p>
              </header>
              <p className="hub-metric__delta">{highlight.trend}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--chart">
          <header className="hub-card__header">
            <div>
              <h3>Weekly referral volume</h3>
              <p>Seven-day rolling average compared with last month's baseline.</p>
            </div>
          </header>
          <figure className="hub-chart" role="img" aria-label="Chart placeholder for weekly referral volume">
            <div className="hub-chart__placeholder">Line chart: referrals per day</div>
          </figure>
        </article>
        <article className="hub-card hub-card--chart">
          <header className="hub-card__header">
            <div>
              <h3>Conversion funnel</h3>
              <p>Compare stage-to-stage drop-off for the last 30 days.</p>
            </div>
          </header>
          <figure className="hub-chart" role="img" aria-label="Chart placeholder for conversion funnel">
            <div className="hub-chart__placeholder">Funnel chart: conversion percentages</div>
          </figure>
        </article>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Service level adherence</h3>
              <p>Monitor progress toward key SLAs and operational targets.</p>
            </div>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col">Current</th>
                <th scope="col">Goal</th>
              </tr>
            </thead>
            <tbody>
              {serviceLevels.map((row) => (
                <tr key={row.metric}>
                  <th scope="row">{row.metric}</th>
                  <td>{row.current}</td>
                  <td>{row.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Top performing facilities</h3>
              <p>Facilities ranked by placement volume and acceptance rate.</p>
            </div>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Facility</th>
                <th scope="col">Placements</th>
                <th scope="col">Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {topFacilities.map((facility) => (
                <tr key={facility.name}>
                  <th scope="row">{facility.name}</th>
                  <td>{facility.placements}</td>
                  <td>{facility.acceptance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>

      <section className="hub-section">
        <div className="hub-card hub-card--actions">
          <div>
            <h3>Share analytics package</h3>
            <p>Queue a downloadable analytics snapshot for offline review or distribution.</p>
          </div>
          <button
            type="button"
            className="hub-card__action hub-card__action--primary"
            onClick={handleQueueExport}
          >
            Queue export
          </button>
        </div>
      </section>
    </div>
  );
}

export default AgencyAnalyticsView;

import React from 'react';

const complianceReports = [
  'State contract compliance summary',
  'Client retention performance',
  'Monthly placement outcomes',
];

function AgencyReportsView() {
  return (
    <section className="dashboard-view dashboard-view--reports">
      <header>
        <h2>Agency reports</h2>
        <p>Review exports required for grants, audits, and partner compliance.</p>
      </header>
      <article>
        <ul>
          {complianceReports.map((report) => (
            <li key={report}>{report}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default AgencyReportsView;

import React from 'react';

const facilityReports = [
  'Daily census export',
  'Medication administration log',
  'Work order completion summary',
];

function FacilityReportsView() {
  return (
    <section className="dashboard-view dashboard-view--reports">
      <header>
        <h2>Facility reports</h2>
        <p>Download operational reports to coordinate with central agency staff.</p>
      </header>
      <article>
        <ul>
          {facilityReports.map((report) => (
            <li key={report}>{report}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default FacilityReportsView;

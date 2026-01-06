import { useMemo, useState } from 'react';
import StatCard from '../components/StatCard';
import { useDashboard } from '../context/DashboardContext';

const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hours, minutes, secs]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':');
};

const PerformancePage = () => {
  const { performanceSnapshots } = useDashboard();
  const [period, setPeriod] = useState<'pay-period' | 'one-month' | 'one-year'>(
    'pay-period'
  );

  const snapshot = useMemo(
    () => performanceSnapshots.find((item) => item.timePeriod === period) ?? performanceSnapshots[0],
    [performanceSnapshots, period]
  );

  if (!snapshot) {
    return <p className="helper-text">Performance data is not available.</p>;
  }

  const cards = [
    { label: 'Pending Placement', value: snapshot.stats.pendingPlacement },
    { label: 'Pending Intake', value: snapshot.stats.pendingIntake },
    { label: 'Active', value: snapshot.stats.active },
    { label: 'Completed', value: snapshot.stats.completed },
    { label: 'Points Earned', value: snapshot.stats.pointsEarned },
    { label: 'Points Outstanding', value: snapshot.stats.pointsOutstanding },
    { label: 'Claimed Referrals', value: snapshot.stats.claimed },
    {
      label: 'Average Placement Time',
      value: formatSeconds(snapshot.stats.averagePlacementSeconds),
    },
    { label: 'Lost Referrals', value: snapshot.stats.lost },
    { label: 'Hours Worked', value: snapshot.stats.hoursWorked },
  ];

  const barGraphMetrics = [
    {
      key: 'claimed',
      label: 'Claimed Referrals',
    },
    {
      key: 'pointsEarned',
      label: 'Points Earned',
    },
    {
      key: 'lost',
      label: 'Lost Referrals',
    },
    {
      key: 'averagePlacementSeconds',
      label: 'Average Placement Time',
      format: formatSeconds,
    },
  ] as const;

  const computeBarHeight = (value: number, max: number) => {
    if (max === 0) return 0;
    return Math.round((value / max) * 100);
  };

  return (
    <div className="performance-page">
      <section className="section-card" style={{ textAlign: 'center' }}>
        <div className="action-group" style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className={period === 'pay-period' ? 'primary' : 'secondary'}
            onClick={() => setPeriod('pay-period')}
          >
            Pay Period
          </button>
          <button
            type="button"
            className={period === 'one-month' ? 'primary' : 'secondary'}
            onClick={() => setPeriod('one-month')}
          >
            One Month
          </button>
          <button
            type="button"
            className={period === 'one-year' ? 'primary' : 'secondary'}
            onClick={() => setPeriod('one-year')}
          >
            One Year
          </button>
        </div>
      </section>

      <section className="section-card">
        <h2>Performance Overview</h2>
        <div className="quick-stats-grid">
          {cards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} />
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2>Comparative Metrics</h2>
        <div className="bar-graph" style={{ display: 'grid', gap: 24 }}>
          {barGraphMetrics.map((metric) => {
            const userValue = snapshot.stats[metric.key];
            const topValue = snapshot.topPerformer[metric.key];
            const avgValue = snapshot.officeAverage[metric.key];
            const maxValue = Math.max(userValue, topValue, avgValue);
            return (
              <div key={metric.key}>
                <h3 style={{ marginBottom: 12 }}>{metric.label}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 160 }}>
                  {[{ label: 'You', color: '#22c55e', value: userValue },
                    { label: snapshot.topPerformer.name, color: '#ef4444', value: topValue },
                    { label: 'Office Average', color: '#3b82f6', value: avgValue },
                  ].map((bar) => (
                    <div key={bar.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div
                        style={{
                          height: `${computeBarHeight(bar.value, maxValue)}%`,
                          background: bar.color,
                          borderRadius: '12px 12px 0 0',
                          transition: 'height 0.3s ease',
                        }}
                        aria-label={`${bar.label} ${metric.label}`}
                      />
                      <div style={{ marginTop: 8, fontWeight: 600 }}>{bar.label}</div>
                      <div className="helper-text">
                        {metric.format ? metric.format(bar.value) : bar.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PerformancePage;

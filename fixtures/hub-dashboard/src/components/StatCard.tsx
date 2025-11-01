import './StatCard.css';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
}

const StatCard = ({ label, value, sublabel }: StatCardProps) => {
  return (
    <div className="stat-card">
      <h4>{label}</h4>
      <strong>{value}</strong>
      {sublabel ? <span>{sublabel}</span> : null}
    </div>
  );
};

export default StatCard;

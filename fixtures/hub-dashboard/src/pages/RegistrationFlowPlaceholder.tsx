interface RegistrationFlowPlaceholderProps {
  title: string;
  description: string;
}

const RegistrationFlowPlaceholder = ({
  title,
  description,
}: RegistrationFlowPlaceholderProps) => {
  return (
    <div className="auth-stack">
      <div className="auth-logo">
        <span className="auth-logo-mark">MC</span>
        <span>Moment Connect</span>
      </div>
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">{description}</p>
      <p className="auth-message">
        This is a placeholder for the multi-step registration wizard.
      </p>
    </div>
  );
};

export default RegistrationFlowPlaceholder;

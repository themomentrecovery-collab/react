interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch = ({ id, label, checked, onChange }: ToggleSwitchProps) => {
  return (
    <label htmlFor={id} className="toggle-row">
      <span>{label}</span>
      <span
        className={`toggle-switch ${checked ? 'on' : ''}`}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onChange(!checked);
          }
        }}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="toggle-handle" />
      </span>
    </label>
  );
};

export default ToggleSwitch;

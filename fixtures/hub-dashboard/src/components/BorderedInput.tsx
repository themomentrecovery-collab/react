import type { ReactNode } from 'react';
import './BorderedInput.css';

interface BorderedInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  rightAdornment?: ReactNode;
}

const BorderedInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  rightAdornment,
}: BorderedInputProps) => {
  return (
    <div className="bordered-input">
      <label className="bordered-input-label" htmlFor={id}>
        {label}
      </label>
      <div className="bordered-input-field">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={rightAdornment ? 'has-adornment' : undefined}
        />
        {rightAdornment ? (
          <div className="bordered-input-adornment">{rightAdornment}</div>
        ) : null}
      </div>
    </div>
  );
};

export default BorderedInput;

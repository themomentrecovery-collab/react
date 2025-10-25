import { useForm } from 'react-hook-form';
import type { FC } from 'react';

type Props = {
  onSubmit: (values: FormValues) => Promise<void>;
  loading: boolean;
};

type FormValues = {
  email: string;
  password: string;
  token: string;
};

const LoginForm: FC<Props> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div className="card" style={{ maxWidth: 420, margin: '8rem auto' }}>
      <h2>The Moment Connect</h2>
      <p>Secure access with MFA</p>
      <form
        onSubmit={handleSubmit(async values => {
          await onSubmit(values);
        })}
      >
        <label>
          Email
          <input type="email" placeholder="agency@example.com" {...register('email', { required: true })} />
        </label>
        {errors.email && <small>Email is required.</small>}
        <label>
          Password
          <input type="password" {...register('password', { required: true })} />
        </label>
        {errors.password && <small>Password is required.</small>}
        <label>
          MFA Token
          <input type="text" placeholder="123456" {...register('token', { required: true })} />
        </label>
        {errors.token && <small>MFA token is required.</small>}
        <button className="primary-btn" disabled={loading} type="submit">
          {loading ? 'Verifying…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import AgencyDashboard from './components/AgencyDashboard';
import AdminDashboard from './components/AdminDashboard';
import FacilityDashboard from './components/FacilityDashboard';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { session, login, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: login,
    onError: () => {
      setError('Invalid credentials or MFA token.');
    },
    onSuccess: () => {
      setError(null);
    },
  });

  if (!session) {
    return (
      <>
        <LoginForm
          onSubmit={async values => {
            await loginMutation.mutateAsync(values);
          }}
          loading={loginMutation.isPending}
        />
        {error && (
          <p style={{ textAlign: 'center', color: '#f87171' }}>
            {error}
          </p>
        )}
      </>
    );
  }

  if (session.role === 'agency') {
    return <AgencyDashboard onLogout={logout} userName={session.name} />;
  }
  if (session.role === 'admin') {
    return <AdminDashboard onLogout={logout} userName={session.name} />;
  }
  return <FacilityDashboard onLogout={logout} userName={session.name} />;
};

export default App;

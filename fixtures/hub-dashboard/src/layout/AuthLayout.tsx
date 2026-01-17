import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-shell">
      <div className="auth-content">
        <div className="auth-grid">
          <div className="auth-column" aria-hidden="true" />
          <div className="auth-center">
            <Outlet />
          </div>
          <div className="auth-column" aria-hidden="true" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;

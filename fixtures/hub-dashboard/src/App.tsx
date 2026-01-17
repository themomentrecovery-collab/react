import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import AuthLayout from './layout/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegistrationCodePage from './pages/RegistrationCodePage';
import TwoFactorPage from './pages/TwoFactorPage';
import EmployeeRegistrationPage from './pages/EmployeeRegistrationPage';
import FacilityRegistrationPage from './pages/FacilityRegistrationPage';
import ReferralAgencyRegistrationPage from './pages/ReferralAgencyRegistrationPage';
import HomePage from './pages/HomePage';
import AlertsPage from './pages/AlertsPage';
import ReferralPoolPage from './pages/ReferralPoolPage';
import MyReferralsPage from './pages/MyReferralsPage';
import MatchingPage from './pages/MatchingPage';
import HoldQueuePage from './pages/HoldQueuePage';
import MessagesPage from './pages/MessagesPage';
import PerformancePage from './pages/PerformancePage';
import PreferencesPage from './pages/PreferencesPage';
import SupportPage from './pages/SupportPage';
import { DashboardProvider } from './context/DashboardContext';

const App = () => {
  return (
    <DashboardProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration-code" element={<RegistrationCodePage />} />
          <Route path="/two-factor" element={<TwoFactorPage />} />
          <Route path="/register/employee" element={<EmployeeRegistrationPage />} />
          <Route path="/register/facility" element={<FacilityRegistrationPage />} />
          <Route path="/register/referral" element={<ReferralAgencyRegistrationPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard/referral-agency" element={<HomePage />} />
          <Route path="/dashboard/facility" element={<HomePage />} />
          <Route path="/dashboard/hub-admin" element={<HomePage />} />
          <Route path="/dashboard/hub-user" element={<HomePage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/referral-pool" element={<ReferralPoolPage />} />
          <Route path="/my-referrals" element={<MyReferralsPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/hold-queue" element={<HoldQueuePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>
      </Routes>
    </DashboardProvider>
  );
};

export default App;

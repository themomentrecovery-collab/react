import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
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
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
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

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-shell">
      <Header />
      <QuickActionsBar />
      <div className="dashboard-main">
        <Sidebar />
        <main className="dashboard-content" role="main">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

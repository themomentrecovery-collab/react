import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import AgencyOverviewView from '../views/agency/AgencyOverviewView';
import AgencyAnalyticsView from '../views/agency/AgencyAnalyticsView';
import AgencyReportsView from '../views/agency/AgencyReportsView';
import AgencySettingsView from '../views/agency/AgencySettingsView';
import FacilityOverviewView from '../views/facility/FacilityOverviewView';
import FacilityAnalyticsView from '../views/facility/FacilityAnalyticsView';
import FacilityReportsView from '../views/facility/FacilityReportsView';
import FacilitySettingsView from '../views/facility/FacilitySettingsView';

const baseSidebarSections = [
  {
    key: 'overview',
    label: 'Overview',
    icon: '📊',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: '📈',
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: '📄',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: '⚙️',
  },
];

const createSidebarSections = (basePath) =>
  baseSidebarSections.map((section, index) => ({
    path: section.key,
    label: section.label,
    icon: section.icon,
    to: index === 0 ? basePath : `${basePath}/${section.key}`,
    end: index === 0,
  }));

const dashboardDefinitions = [
  {
    key: 'agency',
    basePath: '/dashboard/agency',
    title: 'Agency dashboard',
    initialUser: {
      id: 'agency-1',
      name: 'Jordan Agency',
      role: 'Agency manager',
    },
    initialNotifications: [
      {
        id: 'agency-welcome',
        message: 'Agency metrics refreshed. Review new partner referrals.',
        type: 'info',
        read: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'agency-compliance',
        message: 'Compliance filing due Friday for state contract #18.',
        type: 'warning',
        read: false,
        timestamp: new Date().toISOString(),
      },
    ],
    views: {
      overview: <AgencyOverviewView />,
      analytics: <AgencyAnalyticsView />,
      reports: <AgencyReportsView />,
      settings: <AgencySettingsView />,
    },
  },
  {
    key: 'facility',
    basePath: '/dashboard/facility',
    title: 'Facility dashboard',
    initialUser: {
      id: 'facility-5',
      name: 'Taylor Facility',
      role: 'Facility administrator',
    },
    initialNotifications: [
      {
        id: 'facility-maintenance',
        message: 'HVAC maintenance planned tonight for west building.',
        type: 'info',
        read: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'facility-census',
        message: 'Daily census ready for confirmation.',
        type: 'success',
        read: false,
        timestamp: new Date().toISOString(),
      },
    ],
    views: {
      overview: <FacilityOverviewView />,
      analytics: <FacilityAnalyticsView />,
      reports: <FacilityReportsView />,
      settings: <FacilitySettingsView />,
    },
  },
];

const dashboardRoutes = dashboardDefinitions.map((dashboard) => ({
  path: dashboard.basePath,
  element: (
    <DashboardLayout
      header={<DashboardHeader title={dashboard.title} />}
      sidebar={<DashboardSidebar sections={createSidebarSections(dashboard.basePath)} />}
      initialUser={dashboard.initialUser}
      initialNotifications={dashboard.initialNotifications}
    >
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {index: true, element: dashboard.views.overview},
    {path: 'analytics', element: dashboard.views.analytics},
    {path: 'reports', element: dashboard.views.reports},
    {path: 'settings', element: dashboard.views.settings},
  ],
}));

const hubRoutes = [
  {
    path: '/dashboard',
    element: <Navigate to="/dashboard/agency" replace />,
  },
  ...dashboardRoutes,
];

export default hubRoutes;

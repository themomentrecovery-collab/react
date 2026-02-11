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

const createSidebarGroups = (basePath, groups) =>
  groups.map((group) => ({
    ...group,
    items: group.items.map((item, index) => ({
      ...item,
      to: item.key === 'overview' ? basePath : `${basePath}/${item.key}`,
      end: item.key === 'overview',
      key: item.key || `${group.id || 'group'}-${index}`,
    })),
  }));

const agencySidebarConfig = [
  {
    id: 'agency-hub',
    label: 'Agency hub',
    items: [
      {
        key: 'overview',
        label: 'Command center',
        icon: '🏢',
        description: 'Live referral snapshot and alerts',
      },
    ],
  },
  {
    id: 'agency-insights',
    label: 'Insights',
    items: [
      {
        key: 'analytics',
        label: 'Analytics',
        icon: '📊',
        description: 'Funnel conversion and trend analysis',
      },
      {
        key: 'reports',
        label: 'Reports & exports',
        icon: '📄',
        description: 'Scheduled report delivery center',
      },
    ],
  },
  {
    id: 'agency-admin',
    label: 'Administration',
    items: [
      {
        key: 'settings',
        label: 'Settings',
        icon: '⚙️',
        description: 'Team access and communication preferences',
      },
    ],
  },
];

const facilitySidebarConfig = [
  {
    id: 'facility-hub',
    label: 'Facility hub',
    items: [
      {
        key: 'overview',
        label: 'Operations overview',
        icon: '🏥',
        description: 'Census, waitlist, and alert status',
      },
    ],
  },
  {
    id: 'facility-insights',
    label: 'Insights',
    items: [
      {
        key: 'analytics',
        label: 'Analytics',
        icon: '📈',
        description: 'Capacity trends and acuity mix',
      },
      {
        key: 'reports',
        label: 'Reports',
        icon: '🗂️',
        description: 'Compliance packets and exports',
      },
    ],
  },
  {
    id: 'facility-admin',
    label: 'Administration',
    items: [
      {
        key: 'settings',
        label: 'Settings',
        icon: '🛠️',
        description: 'Staff notifications and preferences',
      },
    ],
  },
];

const dashboardDefinitions = [
  {
    key: 'agency',
    basePath: '/dashboard/agency',
    header: {
      title: 'Agency command center',
      subtitle:
        'Coordinate partner referrals, monitor placement velocity, and surface urgent tasks in one view.',
      environmentLabel: 'Agency workspace',
      breadcrumbs: [
        {label: 'Dashboards', to: '/dashboard'},
        {label: 'Agency'},
      ],
      renderActions: () => (
        <div className="hub-header__page-action-group">
          <button type="button" className="hub-header__page-action">
            Share snapshot
          </button>
          <button type="button" className="hub-header__page-action hub-header__page-action--primary">
            Export summary
          </button>
        </div>
      ),
    },
    initialUser: {
      id: 'agency-1',
      name: 'Jordan Agency',
      role: 'Agency manager',
      organization: 'Northstar Placement Agency',
    },
    initialNotifications: [
      {
        id: 'agency-welcome',
        message: 'Referral pipeline refreshed. Review 6 new partner submissions.',
        type: 'info',
        read: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'agency-critical',
        message: 'Two high acuity referrals require placement within 4 hours.',
        type: 'warning',
        read: false,
        timestamp: new Date().toISOString(),
      },
    ],
    sidebarConfig: agencySidebarConfig,
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
    header: {
      title: 'Facility operations center',
      subtitle:
        'Track capacity, watch clinical alerts, and keep facility teams aligned with agency partners.',
      environmentLabel: 'Facility workspace',
      breadcrumbs: [
        {label: 'Dashboards', to: '/dashboard'},
        {label: 'Facility'},
      ],
      renderActions: () => (
        <div className="hub-header__page-action-group">
          <button type="button" className="hub-header__page-action">
            Update census
          </button>
          <button type="button" className="hub-header__page-action hub-header__page-action--primary">
            Download daily brief
          </button>
        </div>
      ),
    },
    initialUser: {
      id: 'facility-5',
      name: 'Taylor Facility',
      role: 'Facility administrator',
      organization: 'Taylor Transitional Care',
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
      {
        id: 'facility-quality',
        message: 'Quality review follow-up needed for incident report MC-1093.',
        type: 'warning',
        read: false,
        timestamp: new Date().toISOString(),
      },
    ],
    sidebarConfig: facilitySidebarConfig,
    views: {
      overview: <FacilityOverviewView />,
      analytics: <FacilityAnalyticsView />,
      reports: <FacilityReportsView />,
      settings: <FacilitySettingsView />,
    },
  },
];

const dashboardRoutes = dashboardDefinitions.map((dashboard) => {
  const sidebarGroups = createSidebarGroups(dashboard.basePath, dashboard.sidebarConfig);
  const headerActions = dashboard.header.renderActions ? dashboard.header.renderActions() : null;

  return {
    path: dashboard.basePath,
    element: (
      <DashboardLayout
        header={
          <DashboardHeader
            title={dashboard.header.title}
            subtitle={dashboard.header.subtitle}
            breadcrumbs={dashboard.header.breadcrumbs}
            environmentLabel={dashboard.header.environmentLabel}
            actions={headerActions}
          />
        }
        sidebar={<DashboardSidebar sections={sidebarGroups} />}
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
  };
});

const hubRoutes = [
  {
    path: '/dashboard',
    element: <Navigate to="/dashboard/agency" replace />,
  },
  ...dashboardRoutes,
];

export default hubRoutes;

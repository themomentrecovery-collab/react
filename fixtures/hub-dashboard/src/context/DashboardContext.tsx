import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {
  AlertRecord,
  ReportOption,
  ReferralPoolRecord,
  PendingPlacementReferral,
  PendingIntakeReferral,
  ActiveReferral,
  CompletedReferral,
  HoldQueueReferral,
  Conversation,
  PerformanceSnapshot,
  PreferenceSettings,
} from '../data/types';
import {
  userProfile,
  alertsData,
  reportsData,
  referralPoolData,
  pendingPlacementData,
  pendingIntakeData,
  activeReferralData,
  completedReferralData,
  holdQueueData,
  conversationsData,
  performanceData,
  preferenceDefaults,
} from '../data/initialData';

interface ClaimReferralResult {
  type: 'matching' | 'hold';
  message: string;
  referral: ReferralPoolRecord;
}

interface DashboardContextValue {
  user: typeof userProfile;
  alerts: AlertRecord[];
  referralPool: ReferralPoolRecord[];
  pendingPlacement: PendingPlacementReferral[];
  pendingIntake: PendingIntakeReferral[];
  activeReferrals: ActiveReferral[];
  completedReferrals: CompletedReferral[];
  holdQueue: HoldQueueReferral[];
  conversations: Conversation[];
  reports: ReportOption[];
  selectedReportId: string | null;
  setSelectedReportId: (value: string | null) => void;
  selectedMatchingReferralId: string | null;
  setSelectedMatchingReferralId: (id: string | null) => void;
  claimNextReferral: () => ClaimReferralResult | null;
  claimReferralById: (referralId: string) => ClaimReferralResult | null;
  startMatching: () => PendingPlacementReferral | null;
  markAlertsRead: (ids: string[], origin?: 'home' | 'alerts') => void;
  markAlertsImportant: (ids: string[]) => void;
  deleteAlerts: (
    ids: string[],
    options?: { origin?: 'home' | 'alerts' }
  ) => { deleted: string[]; retained: string[]; blocked: string[] };
  takeAlertAction: (id: string) => void;
  unreadCounts: {
    alerts: number;
    referralPool: number;
    messages: number;
  };
  performanceSnapshots: PerformanceSnapshot[];
  preferenceSettings: PreferenceSettings;
  updatePreferenceSettings: (settings: Partial<PreferenceSettings>) => void;
  sendMessage: (conversationId: string, body: string) => void;
  markConversationRead: (conversationId: string) => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertRecord[]>(alertsData);
  const [referralPool, setReferralPool] = useState<ReferralPoolRecord[]>(
    referralPoolData
  );
  const [pendingPlacement, setPendingPlacement] = useState<
    PendingPlacementReferral[]
  >(pendingPlacementData);
  const [pendingIntake, setPendingIntake] = useState<PendingIntakeReferral[]>(
    pendingIntakeData
  );
  const [activeReferrals] = useState<ActiveReferral[]>(activeReferralData);
  const [completedReferrals] = useState<CompletedReferral[]>(
    completedReferralData
  );
  const [holdQueue, setHoldQueue] = useState<HoldQueueReferral[]>(
    holdQueueData
  );
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationsData
  );
  const [reports] = useState<ReportOption[]>(reportsData);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    reportsData[0]?.id ?? null
  );
  const [selectedMatchingReferralId, setSelectedMatchingReferralId] =
    useState<string | null>(pendingPlacementData[0]?.id ?? null);
  const [preferenceSettings, setPreferenceSettings] = useState<
    PreferenceSettings
  >(preferenceDefaults);

  const claimNextReferral = (): ClaimReferralResult | null => {
    if (referralPool.length === 0) {
      return null;
    }

    const sorted = [...referralPool].sort((a, b) =>
      new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
    );
    const next = sorted[0];
    return claimReferralById(next.id);
  };

  const claimReferralById = (referralId: string): ClaimReferralResult | null => {
    const referral = referralPool.find((item) => item.id === referralId);
    if (!referral) {
      return null;
    }

    setReferralPool((prev) => prev.filter((item) => item.id !== referralId));

    if (referral.placeImmediately) {
      const newPending: PendingPlacementReferral = {
        id: referral.id,
        name: referral.name,
        stage: 'Claimed',
        timerEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        highPriority: referral.highPriority,
        matchDueInMinutes: referral.highPriority ? 120 : 360,
        facilityRotation: [],
        programType: referral.programType,
        duration: referral.duration,
      };
      setPendingPlacement((prev) => [newPending, ...prev]);
      setSelectedMatchingReferralId(newPending.id);
      return {
        type: 'matching',
        message: `${referral.name} claimed. Matching workflow ready.`,
        referral,
      };
    }

    if (referral.futurePlacement) {
      const newHold: HoldQueueReferral = {
        id: referral.id,
        name: referral.name,
        queueDate: new Date().toISOString(),
        reason: 'Requested Delayed Placement',
        nextAvailableBedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        facilityName: 'TBD',
        facilityId: 'TBD',
        status: 'start',
      };
      setHoldQueue((prev) => [newHold, ...prev]);
      return {
        type: 'hold',
        message: `${referral.name} moved to Hold Queue for future placement.`,
        referral,
      };
    }

    const newPending: PendingPlacementReferral = {
      id: referral.id,
      name: referral.name,
      stage: 'Claimed',
      timerEndsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      highPriority: referral.highPriority,
      matchDueInMinutes: 24 * 60,
      facilityRotation: [],
      programType: referral.programType,
      duration: referral.duration,
    };
    setPendingPlacement((prev) => [newPending, ...prev]);
    setSelectedMatchingReferralId(newPending.id);
    return {
      type: 'matching',
      message: `${referral.name} claimed and ready for placement.`,
      referral,
    };
  };

  const startMatching = (): PendingPlacementReferral | null => {
    if (pendingPlacement.length === 0) {
      return null;
    }

    const sorted = [...pendingPlacement].sort(
      (a, b) => a.matchDueInMinutes - b.matchDueInMinutes
    );
    const next = sorted[0];
    setSelectedMatchingReferralId(next.id);
    return next;
  };

  const markAlertsRead = (ids: string[], origin: 'home' | 'alerts' = 'alerts') => {
    setAlerts((prev) =>
      prev.map((alert) =>
        ids.includes(alert.id)
          ? {
              ...alert,
              read: true,
              showOnHome: origin === 'home' ? false : alert.showOnHome,
            }
          : alert
      )
    );
  };

  const markAlertsImportant = (ids: string[]) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        ids.includes(alert.id)
          ? {
              ...alert,
              important: true,
              read: true,
              showOnHome: false,
            }
          : alert
      )
    );
  };

  const deleteAlerts = (
    ids: string[],
    options: { origin?: 'home' | 'alerts' } = {}
  ) => {
    const origin = options.origin ?? 'alerts';
    const deleted: string[] = [];
    const retained: string[] = [];
    const blocked: string[] = [];

    setAlerts((prev) => {
      const nextAlerts: AlertRecord[] = [];
      prev.forEach((alert) => {
        if (!ids.includes(alert.id)) {
          nextAlerts.push(alert);
          return;
        }

        if (origin === 'home' && alert.requiresAction) {
          blocked.push(alert.id);
          nextAlerts.push({ ...alert, read: true, showOnHome: false });
          return;
        }

        if (origin === 'home' && !alert.requiresAction) {
          deleted.push(alert.id);
          return;
        }

        if (alert.requiresAction && !alert.actionTaken) {
          blocked.push(alert.id);
          nextAlerts.push(alert);
          return;
        }

        deleted.push(alert.id);
        // omit from array to delete fully
      });
      return nextAlerts;
    });

    return { deleted, retained, blocked };
  };

  const takeAlertAction = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              actionTaken: true,
              read: true,
              showOnHome: false,
            }
          : alert
      )
    );
  };

  const unreadCounts = useMemo(
    () => ({
      alerts: alerts.filter((alert) => !alert.read).length,
      referralPool: referralPool.length,
      messages: conversations.reduce(
        (total, conversation) => total + conversation.unreadCount,
        0
      ),
    }),
    [alerts, referralPool, conversations]
  );

  const updatePreferenceSettings = (settings: Partial<PreferenceSettings>) => {
    setPreferenceSettings((prev) => ({
      ...prev,
      ...settings,
      homeAddress: settings.homeAddress ?? prev.homeAddress,
      notifications: settings.notifications ?? prev.notifications,
    }));
  };

  const sendMessage = (conversationId: string, body: string) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: `MSG-${Math.random().toString(36).slice(2, 8)}`,
                  sender: 'hubUser',
                  body,
                  sentAt: new Date().toISOString(),
                },
              ],
              unreadCount: conversation.unreadCount,
            }
          : conversation
      )
    );
  };

  const markConversationRead = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      )
    );
  };

  const value: DashboardContextValue = {
    user: userProfile,
    alerts,
    referralPool,
    pendingPlacement,
    pendingIntake,
    activeReferrals,
    completedReferrals,
    holdQueue,
    conversations,
    reports,
    selectedReportId,
    setSelectedReportId,
    selectedMatchingReferralId,
    setSelectedMatchingReferralId,
    claimNextReferral,
    claimReferralById,
    startMatching,
    markAlertsRead,
    markAlertsImportant,
    deleteAlerts,
    takeAlertAction,
    unreadCounts,
    performanceSnapshots: performanceData,
    preferenceSettings,
    updatePreferenceSettings,
    sendMessage,
    markConversationRead,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

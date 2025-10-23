import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

const NotificationContext = createContext(undefined);

export function NotificationProvider({children, initialNotifications = []}) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const addNotification = useCallback((message, options = {}) => {
    setNotifications((current) => [
      ...current,
      {
        id: options.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        message,
        type: options.type ?? 'info',
        read: false,
        timestamp: options.timestamp ?? new Date().toISOString(),
      },
    ]);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? {...notification, read: true} : notification,
      ),
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = useMemo(
    () => ({notifications, addNotification, markAsRead, clearNotifications}),
    [notifications, addNotification, markAsRead, clearNotifications],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }

  return context;
}

export default NotificationContext;

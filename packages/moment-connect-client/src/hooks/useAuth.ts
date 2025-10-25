import { useState } from 'react';
import api from '../api';

type LoginPayload = {
  email: string;
  password: string;
  token: string;
};

type UserSession = {
  token: string;
  role: 'agency' | 'admin' | 'facility';
  name: string;
};

export function useAuth() {
  const [session, setSession] = useState<UserSession | null>(() => {
    const cached = localStorage.getItem('moment-connect-session');
    return cached ? (JSON.parse(cached) as UserSession) : null;
  });

  async function login(payload: LoginPayload) {
    const { data } = await api.post<UserSession>('/auth/login', payload);
    localStorage.setItem('moment-connect-token', data.token);
    localStorage.setItem('moment-connect-session', JSON.stringify(data));
    setSession(data);
  }

  function logout() {
    localStorage.removeItem('moment-connect-token');
    localStorage.removeItem('moment-connect-session');
    setSession(null);
  }

  return { session, login, logout };
}

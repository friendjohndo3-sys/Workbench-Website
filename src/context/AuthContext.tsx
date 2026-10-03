import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface DevUser {
  id: string;
  email: string;
  name: string;
  role: 'lead_developer' | 'engine_developer' | 'content_manager';
  lastLogin: string;
}

interface AuthContextType {
  user: DevUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  authProviderName: string;
}

const STORAGE_KEY = 'workbench_dev_auth_session';

/**
 * DEVELOPMENT AUTHENTICATION LAYER
 * 
 * Production Connection Notice:
 * This layer isolates developer authentication state for the client-side single page app.
 * In a production backend setup, replace the development credential verification below with
 * a secure server call:
 *    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
 *    const { token, user } = await res.json();
 * No secret credentials should be hardcoded in client source.
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DevUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore authenticated session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      // Clear corrupt session data
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim();
    const trimmedPass = pass.trim();

    if (!trimmedEmail || !trimmedPass) {
      return { success: false, error: 'Please enter both developer email and password.' };
    }

    // Basic format validation
    if (!trimmedEmail.includes('@') && trimmedEmail !== 'admin' && trimmedEmail !== 'dev') {
      return { success: false, error: 'Please enter a valid developer email or username.' };
    }

    // Development authentication gate:
    // Requires non-empty credentials. In development mode, developer credentials
    // (e.g. dev@workbench.engine or team accounts) authorize the session.
    if (trimmedPass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const devUser: DevUser = {
      id: 'dev-session-' + Date.now(),
      email: trimmedEmail,
      name: trimmedEmail.split('@')[0].toUpperCase(),
      role: 'lead_developer',
      lastLogin: new Date().toISOString(),
    };

    setUser(devUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(devUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        authProviderName: 'Workbench Isolated Dev Auth (Pluggable)',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

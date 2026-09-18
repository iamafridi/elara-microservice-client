'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  UserSession,
  AuthResponse,
  authApi,
  getStoredToken,
  getStoredUser,
  clearAuthSession,
} from '../lib/api-client';

interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  sendOtp: (phone: string) => Promise<{ success: boolean; code?: string; error?: string }>;
  verifyOtp: (phone: string, code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchPersona: (role: 'user' | 'merchant' | 'rider' | 'tasker' | 'admin') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Real seeded demo credentials for 1-click persona switching
const REAL_PERSONA_CREDENTIALS = {
  user: { email: 'rahim.ahmed@elara.com.bd', password: 'Password@123', redirect: '/customer' },
  merchant: { email: 'kacchi.bhai@elara.com.bd', password: 'Password@123', redirect: '/merchant' },
  rider: { email: 'tanvir.rider@elara.com.bd', password: 'Password@123', redirect: '/rider' },
  tasker: { email: 'karigor.electric@elara.com.bd', password: 'Password@123', redirect: '/tasker' },
  admin: { email: 'admin@elara.com.bd', password: 'Admin@123', redirect: '/admin' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Restore session on mount
    const savedToken = getStoredToken();
    const savedUser = getStoredUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await authApi.login(identifier, password);
    setIsLoading(false);

    if (data && data.user) {
      setUser(data.user);
      setToken(data.accessToken);
      return { success: true };
    }
    return { success: false, error: error || 'Login failed' };
  };

  const sendOtp = async (phone: string) => {
    const { data, error } = await authApi.sendOtp(phone);
    if (data) {
      return { success: true, code: data.code };
    }
    return { success: false, error: error || 'Failed to send OTP' };
  };

  const verifyOtp = async (phone: string, code: string) => {
    setIsLoading(true);
    const { data, error } = await authApi.verifyOtp(phone, code);
    setIsLoading(false);

    if (data && data.user) {
      setUser(data.user);
      setToken(data.accessToken);
      return { success: true };
    }
    return { success: false, error: error || 'Invalid OTP code' };
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  const switchPersona = async (role: 'user' | 'merchant' | 'rider' | 'tasker' | 'admin') => {
    const cred = REAL_PERSONA_CREDENTIALS[role];
    if (!cred) return false;

    const res = await login(cred.email, cred.password);
    if (res.success) {
      router.push(cred.redirect);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        sendOtp,
        verifyOtp,
        logout,
        switchPersona,
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

// Private Route Guard Component (RBAC)
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'user' | 'merchant' | 'rider' | 'tasker' | 'admin'>;
  fallbackWorkstationName?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackWorkstationName = 'Restricted Workstation',
}) => {
  const { user, isAuthenticated, isLoading, switchPersona } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-white/50 font-mono tracking-wider">VERIFYING BACKEND JWT SESSION...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with callback URL
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0D111A] border border-red-500/30 rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-11a4 4 0 00-8 0v4h8V6z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            This workstation requires a verified JWT session from the Elara NestJS backend. Please log in with your verified credentials.
          </p>
          <button
            onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            Go to Secure Login
          </button>
        </div>
      </div>
    );
  }

  // If user role is not authorized for this specific workstation
  const normalizedUserRole = (user.role as string) === 'customer' ? 'user' : user.role;
  const hasAccess =
    !allowedRoles ||
    allowedRoles.includes(user.role) ||
    allowedRoles.includes(normalizedUserRole as any) ||
    user.role === 'admin';

  if (!hasAccess) {
    const requiredRole = allowedRoles[0];
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0D111A] border border-amber-500/30 rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Access Restricted (RBAC)</h2>
          <p className="text-xs text-amber-400/90 font-mono mb-3">
            Logged in as: {user.name} ({user.role.toUpperCase()})
          </p>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            The <span className="text-white font-medium">{fallbackWorkstationName}</span> requires a verified <span className="text-emerald-400 font-semibold">{requiredRole.toUpperCase()}</span> backend role.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => switchPersona(requiredRole)}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Switch to {requiredRole.toUpperCase()} Account (Real Auth)
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white/70 font-semibold rounded-xl text-xs transition-all"
            >
              Back to Login Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

/* elara-stage-179 */

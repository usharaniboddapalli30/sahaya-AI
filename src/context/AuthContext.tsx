import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LanguageCode } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isPinLocked: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    pass: string,
    avatar: 'lotus' | 'sunrise' | 'zen' | 'heart' | 'wave',
    pin?: string,
    language?: LanguageCode
  ) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: (nickname?: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  unlockWithPin: (pin: string) => boolean;
  lockSession: () => void;
  incrementBreathingStat: () => void;
  incrementJournalStat: () => void;
  incrementSessionStat: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial demo user to make testing effortless
const DEFAULT_DEMO_USER = {
  id: 'user_demo_01',
  name: 'Aria Sharma',
  email: 'demo@sahaya.ai',
  passwordHash: 'peaceful123',
  avatar: 'lotus' as const,
  isAnonymous: false,
  createdAt: '2026-09-15',
  privacyPin: '1234',
  stats: {
    sessionsCount: 14,
    breathingCompleted: 26,
    journalEntriesCount: 5,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('sahaya_current_user');
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  });

  const [isPinLocked, setIsPinLocked] = useState<boolean>(false);

  // Initialize storage with demo account if empty
  useEffect(() => {
    try {
      const existingUsers = localStorage.getItem('sahaya_registered_users');
      if (!existingUsers) {
        localStorage.setItem(
          'sahaya_registered_users',
          JSON.stringify([DEFAULT_DEMO_USER])
        );
      }
    } catch {}
  }, []);

  // Sync user state with localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sahaya_current_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sahaya_current_user');
      }
    } catch {}
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 450)); // realistic soothing transition

    try {
      const stored = localStorage.getItem('sahaya_registered_users');
      const users = stored ? JSON.parse(stored) : [DEFAULT_DEMO_USER];

      const found = users.find(
        (u: any) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!found) {
        return { success: false, error: 'No account found with this email. Please check your spelling or register.' };
      }

      if (found.passwordHash !== pass) {
        return { success: false, error: 'Incorrect password. Please try again or use Guest mode.' };
      }

      const userProfile: UserProfile = {
        id: found.id,
        name: found.name,
        email: found.email,
        avatar: found.avatar || 'lotus',
        isAnonymous: false,
        createdAt: found.createdAt,
        privacyPin: found.privacyPin,
        preferredLanguage: found.preferredLanguage || 'en',
        stats: found.stats || {
          sessionsCount: 1,
          breathingCompleted: 0,
          journalEntriesCount: 0,
        },
      };

      // Increment session count
      userProfile.stats.sessionsCount += 1;

      setUser(userProfile);
      setIsPinLocked(false);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Unable to sign in. Please try again.' };
    }
  };

  const register = async (
    name: string,
    email: string,
    pass: string,
    avatar: 'lotus' | 'sunrise' | 'zen' | 'heart' | 'wave',
    pin?: string,
    language: LanguageCode = 'en'
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 500));

    try {
      const stored = localStorage.getItem('sahaya_registered_users');
      const users = stored ? JSON.parse(stored) : [DEFAULT_DEMO_USER];

      if (users.some((u: any) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        return { success: false, error: 'An account with this email already exists. Try signing in instead.' };
      }

      const newUserRecord = {
        id: 'usr_' + Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: pass,
        avatar,
        isAnonymous: false,
        createdAt: new Date().toISOString().slice(0, 10),
        privacyPin: pin || undefined,
        preferredLanguage: language,
        stats: {
          sessionsCount: 1,
          breathingCompleted: 0,
          journalEntriesCount: 0,
        },
      };

      users.push(newUserRecord);
      localStorage.setItem('sahaya_registered_users', JSON.stringify(users));

      const { passwordHash, ...profile } = newUserRecord;
      setUser(profile as UserProfile);
      setIsPinLocked(false);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
  };

  const loginAsGuest = (nickname?: string) => {
    const guestUser: UserProfile = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      name: nickname?.trim() || 'Mindful Guest',
      email: 'guest@sahaya.internal',
      avatar: 'wave',
      isAnonymous: true,
      createdAt: new Date().toISOString().slice(0, 10),
      stats: {
        sessionsCount: 1,
        breathingCompleted: 0,
        journalEntriesCount: 0,
      },
    };

    setUser(guestUser);
    setIsPinLocked(false);
  };

  const logout = () => {
    setUser(null);
    setIsPinLocked(false);
    localStorage.removeItem('sahaya_current_user');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const newProfile = { ...user, ...updated };
    setUser(newProfile);

    // Update in registered users list if not guest
    if (!user.isAnonymous) {
      try {
        const stored = localStorage.getItem('sahaya_registered_users');
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u: any) => u.id === user.id);
          if (idx !== -1) {
            users[idx] = { ...users[idx], ...updated };
            localStorage.setItem('sahaya_registered_users', JSON.stringify(users));
          }
        }
      } catch {}
    }
  };

  const unlockWithPin = (enteredPin: string): boolean => {
    if (!user?.privacyPin) {
      setIsPinLocked(false);
      return true;
    }
    if (user.privacyPin === enteredPin) {
      setIsPinLocked(false);
      return true;
    }
    return false;
  };

  const lockSession = () => {
    if (user?.privacyPin) {
      setIsPinLocked(true);
    }
  };

  const incrementBreathingStat = () => {
    if (!user) return;
    const updated = {
      ...user,
      stats: {
        ...user.stats,
        breathingCompleted: (user.stats?.breathingCompleted || 0) + 1,
      },
    };
    setUser(updated);
  };

  const incrementJournalStat = () => {
    if (!user) return;
    const updated = {
      ...user,
      stats: {
        ...user.stats,
        journalEntriesCount: (user.stats?.journalEntriesCount || 0) + 1,
      },
    };
    setUser(updated);
  };

  const incrementSessionStat = () => {
    if (!user) return;
    const updated = {
      ...user,
      stats: {
        ...user.stats,
        sessionsCount: (user.stats?.sessionsCount || 0) + 1,
      },
    };
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPinLocked,
        login,
        register,
        loginAsGuest,
        logout,
        updateProfile,
        unlockWithPin,
        lockSession,
        incrementBreathingStat,
        incrementJournalStat,
        incrementSessionStat,
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

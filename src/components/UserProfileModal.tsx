import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Heart, 
  Wind, 
  PenLine, 
  KeyRound, 
  Check, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, lockSession } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [newPin, setNewPin] = useState(user?.privacyPin || '');
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen || !user) return null;

  const avatarIcons: { [key: string]: { icon: string; bg: string } } = {
    lotus: { icon: '🪷', bg: 'bg-rose-100 dark:bg-rose-950/60' },
    sunrise: { icon: '🌅', bg: 'bg-amber-100 dark:bg-amber-950/60' },
    zen: { icon: '🪨', bg: 'bg-stone-200 dark:bg-stone-800' },
    heart: { icon: '💖', bg: 'bg-pink-100 dark:bg-pink-950/60' },
    wave: { icon: '🌊', bg: 'bg-sky-100 dark:bg-sky-950/60' },
  };

  const currentAvatar = avatarIcons[user.avatar] || avatarIcons.lotus;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim() || user.name,
      privacyPin: newPin ? newPin.slice(0, 4) : undefined,
    });
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition z-10"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Summary */}
        <div className="p-6 bg-gradient-to-b from-amber-50/80 to-transparent dark:from-stone-850 dark:to-transparent border-b border-stone-100 dark:border-stone-800 text-center">
          <div className={`w-20 h-20 rounded-3xl ${currentAvatar.bg} mx-auto flex items-center justify-center text-4xl shadow-sm mb-3 border border-stone-200/50 dark:border-stone-700`}>
            {currentAvatar.icon}
          </div>

          <h2 id="profile-modal-title" className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            {user.name}
          </h2>

          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 flex items-center justify-center gap-1">
            {user.isAnonymous ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-medium">
                🪶 Anonymous Guest Session
              </span>
            ) : (
              <span>{user.email}</span>
            )}
          </p>

          <div className="text-[11px] text-stone-400 dark:text-stone-500 mt-2">
            Member of SAHAYA Sanctuary since {user.createdAt}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 divide-x divide-stone-200 dark:divide-stone-800 bg-stone-50/70 dark:bg-stone-850 border-b border-stone-100 dark:border-stone-800 text-center py-3">
          <div>
            <span className="block text-lg font-bold font-serif text-amber-700 dark:text-amber-400">
              {user.stats?.sessionsCount || 1}
            </span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">
              Sessions
            </span>
          </div>

          <div>
            <span className="block text-lg font-bold font-serif text-emerald-700 dark:text-emerald-400">
              {user.stats?.breathingCompleted || 0}
            </span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">
              Breath Cycles
            </span>
          </div>

          <div>
            <span className="block text-lg font-bold font-serif text-purple-700 dark:text-purple-400">
              {user.stats?.journalEntriesCount || 0}
            </span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">
              Reflections
            </span>
          </div>
        </div>

        {/* Body & Settings */}
        <div className="p-6 space-y-4">
          {savedNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>Profile preferences updated.</span>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-xs">
                  <KeyRound className="w-4 h-4 text-stone-400" />
                  <div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                      Privacy PIN Lock
                    </span>
                    <span className="text-stone-400 text-[11px]">
                      {user.privacyPin ? 'Enabled (4-digit PIN active)' : 'Not configured'}
                    </span>
                  </div>
                </div>

                {user.privacyPin && (
                  <button
                    onClick={() => {
                      lockSession();
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-300 transition"
                  >
                    Lock Now
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              >
                Edit Nickname & PIN
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 border border-rose-200/80 dark:border-rose-900/60 transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out of This Device
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Display Nickname
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  4-Digit Privacy PIN (Leave empty to remove)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 1234"
                  className="w-full px-3.5 py-2 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

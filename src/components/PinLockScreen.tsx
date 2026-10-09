import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PinLockScreen: React.FC = () => {
  const { user, unlockWithPin, logout } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockWithPin(pin);
    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FAF7F2]/95 dark:bg-[#12161F]/95 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-stone-850 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 mx-auto flex items-center justify-center text-2xl mb-4 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
          Sanctuary Locked
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
          Hello {user?.name}. Please enter your 4-digit Privacy PIN to unlock your private reflections.
        </p>

        {error && (
          <div className="p-2.5 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Incorrect PIN. Try again.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            maxLength={4}
            autoFocus
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/[^0-9]/g, ''));
              setError(false);
            }}
            placeholder="••••"
            className="w-40 mx-auto text-center font-mono text-2xl tracking-[0.4em] py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            disabled={pin.length < 4}
            className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-semibold text-xs transition cursor-pointer"
          >
            Unlock Sanctuary
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <button
            onClick={logout}
            className="hover:text-rose-500 transition"
          >
            Sign Out
          </button>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Encrypted Device Privacy
          </span>
        </div>
      </div>
    </div>
  );
};

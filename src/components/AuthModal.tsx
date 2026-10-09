import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Heart, 
  Sun, 
  Waves, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LanguageCode } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentLanguage }) => {
  const { login, register, loginAsGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'guest'>('signin');

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPin, setRegPin] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<'lotus' | 'sunrise' | 'zen' | 'heart' | 'wave'>('lotus');

  // Guest State
  const [guestNickname, setGuestNickname] = useState('');

  // Status & Error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const avatars = [
    { id: 'lotus', label: 'Lotus', desc: 'Resilience', icon: '🪷', bg: 'bg-rose-100 text-rose-800' },
    { id: 'sunrise', label: 'Sunrise', desc: 'New Day', icon: '🌅', bg: 'bg-amber-100 text-amber-800' },
    { id: 'zen', label: 'Zen Stone', desc: 'Stillness', icon: '🪨', bg: 'bg-stone-200 text-stone-800' },
    { id: 'heart', label: 'Gentle Heart', desc: 'Self-Care', icon: '💖', bg: 'bg-pink-100 text-pink-800' },
    { id: 'wave', label: 'Ocean Tide', desc: 'Flow', icon: '🌊', bg: 'bg-sky-100 text-sky-800' },
  ] as const;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    const result = await login(loginEmail, loginPassword);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage('Welcome back to your safe space.');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setErrorMessage(result.error || 'Failed to sign in.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMessage('Please fill in your name, email, and password.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    const result = await register(
      regName,
      regEmail,
      regPassword,
      selectedAvatar,
      regPin || undefined,
      currentLanguage
    );
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage('Account created safely. Welcome to SAHAYA AI.');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setErrorMessage(result.error || 'Failed to create account.');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest(guestNickname || undefined);
    setSuccessMessage('Entering private guest haven...');
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const fillDemoCredentials = () => {
    setLoginEmail('demo@sahaya.ai');
    setLoginPassword('peaceful123');
    setErrorMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-amber-50/70 to-transparent dark:from-stone-850 dark:to-transparent border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs font-serif font-bold">
              S
            </div>
            <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
              SAHAYA AI Account
            </span>
          </div>
          <h2 id="auth-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            {activeTab === 'signin' && 'Welcome Back to Your Sanctuary'}
            {activeTab === 'signup' && 'Create Your Personal Safe Haven'}
            {activeTab === 'guest' && 'Private Incognito Guest Mode'}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {activeTab === 'signin' && 'Sign in to access your saved reflections, past sessions, and personalized settings.'}
            {activeTab === 'signup' && 'Create a private profile with end-to-end local encryption and privacy pin.'}
            {activeTab === 'guest' && 'No email, no password, zero trace. Talk freely without creating an account.'}
          </p>

          {/* Tab Selector */}
          <div className="flex gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl mt-4">
            <button
              onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
                activeTab === 'signin'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
                activeTab === 'signup'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => { setActiveTab('guest'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
                activeTab === 'guest'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Guest Pass
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 pt-4 max-h-[70vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. SIGN IN TAB */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Quick Button */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-amber-700 dark:text-amber-400 font-medium hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Fill Demo Account (demo@sahaya.ai)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('guest')}
                  className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
                >
                  Enter as Guest
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? 'Verifying Safe Session...' : 'Sign In to SAHAYA'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 2. CREATE ACCOUNT TAB */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Name or Safe Nickname
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Maya, Traveler, or your name"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Create Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Choose a gentle password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                  Choose Your Sanctuary Avatar
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {avatars.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`p-2 rounded-2xl text-center border transition flex flex-col items-center ${
                        selectedAvatar === av.id
                          ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 ring-2 ring-amber-400/40'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-xl mb-1">{av.icon}</span>
                      <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300">
                        {av.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional 4-Digit Privacy PIN */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-stone-400" />
                    Optional 4-Digit Privacy PIN
                  </label>
                  <span className="text-[10px] text-stone-400">Protects sensitive journal logs</span>
                </div>
                <input
                  type="password"
                  maxLength={4}
                  value={regPin}
                  onChange={(e) => setRegPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 1234 (optional)"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? 'Creating Sanctuary...' : 'Complete & Open SAHAYA'}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 3. GUEST TAB */}
          {activeTab === 'guest' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 mx-auto flex items-center justify-center text-white text-2xl shadow-sm">
                🪶
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Total Anonymity, Zero Friction
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto mt-1 leading-relaxed">
                  When you are hurting or exhausted, passwords should not be an obstacle. Enter immediately as an incognito guest.
                </p>
              </div>

              <div className="text-left max-w-sm mx-auto">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Optional Pseudonym or Call Name
                </label>
                <input
                  type="text"
                  value={guestNickname}
                  onChange={(e) => setGuestNickname(e.target.value)}
                  placeholder="e.g. Seeking Peace, Quiet Friend"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 text-left flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Your guest conversation is held only within this browser session. Clearing your browser cache will reset it.
                </span>
              </div>

              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enter as Anonymous Guest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-stone-50 dark:bg-stone-850 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>No ads • No data selling • 100% private mental well-being space</span>
        </div>
      </div>
    </div>
  );
};

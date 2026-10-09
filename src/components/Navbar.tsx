import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquareHeart, 
  Wind, 
  BookOpen, 
  Cpu, 
  ShieldAlert, 
  Sun, 
  Moon, 
  Languages, 
  Menu, 
  X,
  User,
  LogIn
} from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/constants';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'home' | 'chat' | 'agentic';
  setActiveTab: (tab: 'home' | 'chat' | 'agentic') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  openCrisisModal: () => void;
  openAuthModal: () => void;
  openProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isDarkMode,
  toggleDarkMode,
  openCrisisModal,
  openAuthModal,
  openProfileModal
}) => {
  const { user, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'chat', label: 'Talk to SAHAYA', icon: MessageSquareHeart },
    { id: 'agentic', label: 'Agentic Architecture', icon: Cpu },
  ] as const;

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const avatarIcons: { [key: string]: string } = {
    lotus: '🪷',
    sunrise: '🌅',
    zen: '🪨',
    heart: '💖',
    wave: '🌊',
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group transition focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-300 to-purple-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif text-white font-bold text-lg select-none">S</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl tracking-tight text-stone-900 dark:text-stone-100">
                SAHAYA <span className="text-amber-600 dark:text-amber-400 font-sans text-xs font-semibold px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 uppercase">AI</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:block -mt-0.5">
              Listens, understands and supports
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 dark:bg-stone-800/70 p-1.5 rounded-2xl border border-stone-200/50 dark:border-stone-700/50">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-700/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* User Auth / Profile Button */}
          {isAuthenticated && user ? (
            <button
              onClick={openProfileModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-400 transition cursor-pointer shadow-2xs"
              title="View your sanctuary profile"
            >
              <span className="text-base leading-none">
                {avatarIcons[user.avatar] || '🪷'}
              </span>
              <span className="text-xs font-semibold hidden sm:inline max-w-[100px] truncate">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs hover:shadow-amber-600/20 transition cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
              title="Change language"
              aria-expanded={isLangDropdownOpen}
            >
              <Languages className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">{currentLang.native}</span>
              <span className="sm:hidden uppercase">{currentLang.code}</span>
            </button>

            {isLangDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-44 bg-white dark:bg-stone-850 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 py-1 z-50 animate-scale-in"
                onMouseLeave={() => setIsLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-800 transition ${
                      language === lang.code ? 'font-bold text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20' : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[11px] text-stone-400 font-normal">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Crisis SOS Help Button */}
          <button
            onClick={openCrisisModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60 shadow-xs transition cursor-pointer"
            title="Immediate human crisis helplines"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Crisis Support</span>
            <span className="sm:hidden">Help</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-900 px-4 pt-3 pb-6 space-y-1">
          {isAuthenticated && user && (
            <div className="p-3 mb-2 rounded-2xl bg-amber-50 dark:bg-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{avatarIcons[user.avatar] || '🪷'}</span>
                <div>
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-200">{user.name}</div>
                  <div className="text-[11px] text-stone-400">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openProfileModal();
                }}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Profile
              </button>
            </div>
          )}

          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 font-semibold shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-850'
                }`}
              >
                <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

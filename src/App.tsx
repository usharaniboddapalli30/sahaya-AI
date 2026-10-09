/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { AgenticArchitecture } from './components/AgenticArchitecture';
import { CrisisModal } from './components/CrisisModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { PinLockScreen } from './components/PinLockScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageCode } from './types';
import { ShieldAlert, LogIn } from 'lucide-react';

function AppContent() {
  const { user, isAuthenticated, isPinLocked } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'agentic'>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  
  // Modals state
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sahaya_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('sahaya_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('sahaya_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleStartChat = () => {
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewArchitecture = () => {
    setActiveTab('agentic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#12161F] text-stone-800 dark:text-stone-100 font-sans transition-colors duration-300">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        openCrisisModal={() => setIsCrisisModalOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        openProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main App Content View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onStartChat={handleStartChat}
            onViewArchitecture={handleViewArchitecture}
            openCrisisModal={() => setIsCrisisModalOpen(true)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatInterface
            language={language}
            setLanguage={setLanguage}
            openCrisisModal={() => setIsCrisisModalOpen(true)}
          />
        )}

        {activeTab === 'agentic' && (
          <AgenticArchitecture
            onStartChat={handleStartChat}
          />
        )}
      </main>

      {/* Auth Modal (Sign In, Register, Guest Pass) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLanguage={language}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Crisis Helplines Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />

      {/* PIN Security Screen if Locked */}
      {isPinLocked && <PinLockScreen />}

      {/* Floating Immediate Help SOS pill in bottom corner (when not in full chat to avoid overlap) */}
      {activeTab !== 'chat' && (
        <aside aria-label="Crisis Support" className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
          {!isAuthenticated && (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-md border border-stone-200 dark:border-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-600" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={() => setIsCrisisModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 text-xs font-semibold hover:scale-105 transition cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Crisis Help 24/7</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

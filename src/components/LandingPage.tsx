import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquareHeart, 
  Wind, 
  ShieldCheck, 
  Heart, 
  BookOpen, 
  Music, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  Eye, 
  Smile, 
  Lock, 
  Globe2,
  Cpu,
  Workflow,
  ExternalLink
} from 'lucide-react';
import { FAQS } from '../data/constants';

interface LandingPageProps {
  onStartChat: () => void;
  onViewArchitecture: () => void;
  openCrisisModal: () => void;
  openWorkflowModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartChat,
  onViewArchitecture,
  openCrisisModal,
  openWorkflowModal
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-24 py-6">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16">
        
        {/* Soft Background Radial Blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/30 via-rose-200/20 to-purple-200/30 dark:from-amber-900/10 dark:via-rose-900/10 dark:to-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline & n8n Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>You speak. Animora listens, understands and supports.</span>
              </div>

              {openWorkflowModal && (
                <button
                  onClick={openWorkflowModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:scale-105 transition cursor-pointer shadow-2xs"
                  title="View Animora n8n Workflow status"
                >
                  <Workflow className="w-3.5 h-3.5 text-emerald-600" />
                  <span>n8n Workflow Connected</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              )}
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.15]">
              You Don't Have to Carry Everything Alone.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Animora is an agentic emotional companion powered by your automated n8n cloud workflow and advanced AI models. A warm, private space when navigating loneliness, grief, burnout, or life's quiet storms.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <MessageSquareHeart className="w-5 h-5" />
                Talk to SAHAYA
              </button>

              <button
                onClick={onViewArchitecture}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-stone-850 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium text-base shadow-xs transition"
              >
                <Cpu className="w-5 h-5 text-amber-600" />
                How SAHAYA Thinks
              </button>
            </div>

            {/* Badges / Micro Assurances */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                100% Private Session
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Zero Judgment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Non-Clinical Companion
              </span>
            </div>
          </div>

          {/* Right Visual Column (Interactive Calming Orb & Visual Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-white/90 to-stone-50/90 dark:from-stone-850 dark:to-stone-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 dark:border-stone-800 backdrop-blur-sm">
              
              {/* Organic Animated Centerpiece */}
              <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300/40 via-rose-300/40 to-emerald-300/40 blur-2xl animate-pulse" />
                
                {/* Concentric Breathing Rings */}
                <div className="relative w-40 h-40 rounded-full border border-amber-300/60 dark:border-amber-700/60 flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
                  <div className="w-32 h-32 rounded-full border border-rose-300/60 dark:border-rose-700/60 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-950 dark:to-rose-950 flex items-center justify-center shadow-inner">
                      <Heart className="w-10 h-10 text-rose-500 dark:text-rose-400 animate-pulse fill-rose-500/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gentle Floating Snippet Card */}
              <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    SAHAYA Presence
                  </span>
                  <span>Active Now</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-200 italic leading-relaxed">
                  "You are allowed to feel exhausted without having to explain yourself. Take this next breath gently."
                </p>
              </div>

              {/* Status Badges Inside Hero Card */}
              <div className="mt-4 p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-800/70 border border-stone-200/50 dark:border-stone-700/50 flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Encrypted & Private
                </span>
                <span className="text-[11px] text-stone-400">24/7 Safe Space</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW SAHAYA WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            The Gentle Process
          </h2>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            How SAHAYA Listens & Holds Space
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-2">
            Designed around human emotional pacing: no rushing, no clinical diagnosing, and no toxic cheerfulness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Express Without Fear',
              desc: 'Share whatever is in your mind—loneliness, grief, breakup, regret, or everyday stress—in your native tongue.',
              icon: MessageSquareHeart,
              color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
            },
            {
              num: '02',
              title: 'Multi-Agent Resonance',
              desc: 'The Safety Agent guards your well-being, while the Emotion Agent perceives subtle nuances without labeling.',
              icon: Cpu,
              color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
            },
            {
              num: '03',
              title: 'Empathetic Holding',
              desc: 'Receive natural, compassionate responses that validate your real feelings and honor what you have been through.',
              icon: Heart,
              color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
            },
            {
              num: '04',
              title: 'Grounding & Gentle Steps',
              desc: 'Tap into guided breathing, sensory grounding, cultural parables, or ambient sounds whenever you are ready.',
              icon: Wind,
              color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
            },
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-stone-400">
                      STEP {step.num}
                    </span>
                    <div className={`p-2.5 rounded-2xl border ${step.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. KEY BENEFITS */}
      <section className="bg-stone-100/60 dark:bg-stone-850/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              Designed For Real Lives
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Why People Turn to SAHAYA
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-2">
              A gentle sanctuary designed to help you regain your footing at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Available at 3:00 AM',
                desc: 'Loneliness and grief don’t keep office hours. SAHAYA is always ready to listen in the quietest hours without making you feel like a burden.',
                icon: Smile,
              },
              {
                title: 'Zero Judgment, Zero Guilt',
                desc: 'Speak thoughts you might feel embarrassed or anxious sharing with friends or family. No unsolicited lectures or dismissive advice.',
                icon: Heart,
              },
              {
                title: 'Culturally Rooted Wisdom',
                desc: 'Integrated with time-honored reflections like Kintsugi, Sufi poetry, Zen parables, and Indian traditions that honor human vulnerability.',
                icon: BookOpen,
              },
              {
                title: 'Grounding In Under 2 Minutes',
                desc: 'Feeling your heart race? Shift from panic to presence with guided 4-7-8 breathing and 5-4-3-2-1 sensory anchoring tools.',
                icon: Wind,
              },
              {
                title: 'Multilingual Empathy',
                desc: 'Express yourself in the language of your heart—English, Hindi, Spanish, French, Telugu, Tamil, Bengali, and more.',
                icon: Globe2,
              },
              {
                title: 'Privacy You Can Trust',
                desc: 'No personal data profiling, no ad tracking, and clear conversation clearing at any moment. Your reflections stay yours.',
                icon: Lock,
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SPECIALIZED AGENTIC SYSTEM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-600 via-rose-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 uppercase tracking-wider backdrop-blur-md">
              Agentic Intelligence
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              A Coordinated Orchestra of Specialized AI Agents
            </h3>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Explore how SAHAYA orchestrates the Safety Agent, Emotion Agent, Companion Agent, Story Agent, and Music Agent to provide ethical, transparent support.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onViewArchitecture}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-stone-900 font-semibold text-xs sm:text-sm hover:bg-stone-100 transition shadow-md cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-600" />
                View Agent Architecture
              </button>
              <button
                onClick={onStartChat}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Experience in Chat
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIVACY & RESPONSIBLE AI COMMITMENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <ShieldAlert className="w-3.5 h-3.5" />
          Responsible AI & Safety Boundaries
        </div>

        <h3 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
          Our Ethical Code & Boundaries
        </h3>

        <div className="bg-white dark:bg-stone-850 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 text-left space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 shadow-sm leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800 dark:text-stone-100">Complements, Never Replaces Professional Care:</strong> SAHAYA AI is designed to support emotional reflection. It does not replace therapists, psychologists, doctors, or medical interventions, and never claims to diagnose mental disorders.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800 dark:text-stone-100">Emergency Protocols Take Immediate Priority:</strong> If thoughts of self-harm or acute crisis appear, the Safety Agent immediately provides prominent, verified human crisis line contacts (such as 988 in North America or 14416 in India).
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800 dark:text-stone-100">Your Conversations Are Yours:</strong> No conversations are sold to advertisers or data brokers. You can purge your active chat history at any moment.
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
            Answers & Clarity
          </h2>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-stone-850 rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-stone-200 dark:border-stone-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-stone-600 dark:text-stone-400">
          <div className="space-y-2 md:col-span-1">
            <span className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              SAHAYA AI
            </span>
            <p className="leading-relaxed">
              “You speak. SAHAYA listens, understands and supports.”
            </p>
            <p className="text-[11px] text-stone-400">
              An agentic companion for emotional well-being and mindful presence.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-200 mb-2">Capabilities</h4>
            <ul className="space-y-1.5">
              <li><button onClick={onStartChat} className="hover:underline">Empathetic Chat</button></li>
              <li><button onClick={onViewArchitecture} className="hover:underline">Multi-Agent Intelligence</button></li>
              <li><button onClick={onStartChat} className="hover:underline">Cultural Wisdom Stories</button></li>
              <li><button onClick={onStartChat} className="hover:underline">Soothing Sound Recommendations</button></li>
              <li><button onClick={onViewArchitecture} className="hover:underline">Safety & Crisis Intervention</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-200 mb-2">Safety & Help</h4>
            <ul className="space-y-1.5">
              <li><button onClick={openCrisisModal} className="text-rose-600 dark:text-rose-400 font-semibold hover:underline">24/7 Crisis Helplines</button></li>
              <li><button onClick={onViewArchitecture} className="hover:underline">Safety Agent Specifications</button></li>
              <li><span className="text-stone-400">US/Canada: 988</span></li>
              <li><span className="text-stone-400">India: 14416 (Tele-MANAS)</span></li>
              <li><span className="text-stone-400">Europe: 112</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-200 mb-2">Ethics & Disclaimer</h4>
            <p className="text-[11px] leading-relaxed text-stone-500">
              SAHAYA AI does not provide psychiatric or medical diagnoses. It is an agentic companion designed to support personal reflection.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-200/80 dark:border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
          <p>© {new Date().getFullYear()} SAHAYA AI. Built with care for emotional well-being.</p>
          <p>Created for Google AI Studio Build</p>
        </div>
      </footer>
    </div>
  );
};

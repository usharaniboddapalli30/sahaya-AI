import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Languages, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Music, 
  Wind, 
  Phone,
  Heart,
  Info,
  Layers,
  Cpu
} from 'lucide-react';
import { ChatMessage, LanguageCode, AgentOrchestrationInfo } from '../types';
import { QUICK_START_PROMPTS, SUPPORTED_LANGUAGES } from '../data/constants';
import { useAuth } from '../context/AuthContext';

interface ChatInterfaceProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  openCrisisModal: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  language,
  setLanguage,
  openCrisisModal
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('sahaya_chat_session');
      if (saved) return JSON.parse(saved);
    } catch {}

    return [
      {
        id: 'welcome-1',
        role: 'assistant',
        content: `Welcome to SAHAYA AI. I am here to listen with an open, non-judgmental heart. 

Whether you are carrying loneliness, grief, heavy stress, past heartache, or simply need a quiet space to put your thoughts into words—take your time. You don't have to carry it all by yourself today.

What is on your mind right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orchestration: {
          safetyCheck: { status: 'safe', note: 'Session initiated safely.' },
          detectedEmotion: { emotion: 'Open Presence', nuance: 'Welcoming space established for gentle sharing.' },
          activeAgents: ['Orchestrator Agent', 'Companion Agent', 'Safety Agent'],
          reasoning: 'Session initialized. Prepared to support in preferred language with deep respect.'
        }
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedInspectorId, setExpandedInspectorId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [selectedAgentShortcut, setSelectedAgentShortcut] = useState<'auto' | 'story' | 'music' | 'grounding'>('auto');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Persist session to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sahaya_chat_session', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Speech Recognition (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'es' ? 'es-ES' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Text to Speech (SpeechSynthesis API)
  const toggleSpeechSynthesis = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92; // Slightly slower, calm cadence
    utterance.pitch = 1.0;

    // Language matching
    if (language === 'hi') utterance.lang = 'hi-IN';
    else if (language === 'es') utterance.lang = 'es-ES';
    else if (language === 'fr') utterance.lang = 'fr-FR';
    else utterance.lang = 'en-US';

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string, agentMode = selectedAgentShortcut) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          language,
          requestedAgent: agentMode === 'auto' ? undefined : agentMode
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach SAHAYA AI service');
      }

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orchestration: data.orchestration
      };

      setMessages(prev => [...prev, botMsg]);

      // If crisis was detected, expand inspector automatically to show safety protocols
      if (data.orchestration?.safetyCheck?.status === 'crisis') {
        setExpandedInspectorId(botMsg.id);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      // Gentle empathetic fallback message even in connection issues
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I am right here with you. While my server connection had a brief moment of pause, please know you are not alone. 

Take one gentle breath. If you are going through an intense moment, remember that our 24/7 human helplines (like 988 or 14416) are always available. Would you like to try our breathing exercise in the meantime?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setSelectedAgentShortcut('auto');
    }
  };

  const clearChat = () => {
    if (window.confirm('Would you like to clear your active conversation history? This will reset the session.')) {
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'I have refreshed our space. Whenever you are ready to talk, I am here.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      localStorage.removeItem('sahaya_chat_session');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Top Session Bar */}
      <div className="bg-white dark:bg-stone-850 rounded-2xl p-3.5 mb-3 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Active Agents Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200/60 dark:border-amber-800/60 shrink-0">
            <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Orchestrator Active</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-xs font-semibold border border-rose-200/60 dark:border-rose-800/60 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Safety Guard Active</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 text-xs font-semibold border border-purple-200/60 dark:border-purple-800/60 shrink-0">
            <Compass className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Emotion Perception</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={clearChat}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-2.5 py-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>

          <button
            onClick={openCrisisModal}
            className="flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-200/60 hover:bg-rose-100 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Helplines</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Window */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3 scroll-smooth">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isInspectorOpen = expandedInspectorId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              <div className="flex items-end gap-2 max-w-[88%] md:max-w-[80%]">
                
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-purple-400 flex items-center justify-center text-white text-xs font-serif font-bold shadow-xs shrink-0 select-none mb-1">
                    S
                  </div>
                )}

                {/* Bubble Container */}
                <div
                  className={`rounded-3xl p-4 md:p-5 shadow-xs transition-all ${
                    isUser
                      ? 'bg-stone-800 dark:bg-amber-600 text-white rounded-br-xs'
                      : 'bg-white dark:bg-stone-850 text-stone-800 dark:text-stone-100 border border-stone-200/70 dark:border-stone-800 rounded-bl-xs'
                  }`}
                >
                  {/* Content Text */}
                  <div className="text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </div>

                  {/* Recommendation Card (Story, Music, or Hotline) */}
                  {!isUser && msg.orchestration?.recommendation && (
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                      
                      {/* Breathing Reflection */}
                      {msg.orchestration.recommendation.type === 'breathing' && (
                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5">
                          <Wind className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                              {msg.orchestration.recommendation.title}
                            </p>
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                              Take a slow 4-second breath in, hold gently, and exhale all tension.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Wisdom Story Recommendation */}
                      {msg.orchestration.recommendation.type === 'story' && (
                        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 mb-1.5">
                            <BookOpen className="w-4 h-4 text-amber-600" />
                            {msg.orchestration.recommendation.title}
                          </div>
                          {msg.orchestration.recommendation.payload?.reflection && (
                            <p className="text-xs text-stone-600 dark:text-stone-300 italic">
                              "{msg.orchestration.recommendation.payload.reflection}"
                            </p>
                          )}
                        </div>
                      )}

                      {/* Music Suggestion Card */}
                      {msg.orchestration.recommendation.type === 'music' && (
                        <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center gap-2.5">
                          <Music className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-purple-900 dark:text-purple-200">
                              {msg.orchestration.recommendation.title}
                            </p>
                            <p className="text-[11px] text-purple-700 dark:text-purple-400">
                              {msg.orchestration.recommendation.payload?.genre} • {msg.orchestration.recommendation.payload?.mood}
                            </p>
                            {msg.orchestration.recommendation.payload?.description && (
                              <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-1">
                                {msg.orchestration.recommendation.payload.description}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Hotline Alert Card */}
                      {msg.orchestration.recommendation.type === 'hotline' && (
                        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200">
                          <div className="flex items-center gap-2 font-bold text-xs mb-2">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <span>Immediate Human Support Available 24/7</span>
                          </div>
                          <p className="text-xs mb-3 text-rose-800 dark:text-rose-300">
                            Please connect with a kind, trained counselor who can be present with you right now.
                          </p>
                          <button
                            onClick={openCrisisModal}
                            className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition cursor-pointer"
                          >
                            View Emergency Lifelines (988, 14416, 112)
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bubble Footer & Inspector Toggle */}
                  <div className="flex items-center justify-between gap-3 mt-3 pt-2 text-[11px] text-stone-400 dark:text-stone-500">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-2">
                        {/* Audio readout button */}
                        <button
                          onClick={() => toggleSpeechSynthesis(msg.id, msg.content)}
                          className="p-1 hover:text-amber-600 dark:hover:text-amber-400 transition"
                          title="Listen to SAHAYA's voice"
                        >
                          {speakingMessageId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Inspector Toggle */}
                        {msg.orchestration && (
                          <button
                            onClick={() => setExpandedInspectorId(isInspectorOpen ? null : msg.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-400 hover:underline"
                            title="Inspect Agent Orchestration"
                          >
                            <Layers className="w-3 h-3" />
                            <span>Agent Mind</span>
                            {isInspectorOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Agent Orchestration Inspector Dropdown */}
              {!isUser && msg.orchestration && isInspectorOpen && (
                <div className="mt-2 ml-10 max-w-[85%] bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 text-xs space-y-2.5 animate-scale-in">
                  <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                    <span className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-600" />
                      Agentic Coordination Trace
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      msg.orchestration.safetyCheck.status === 'crisis'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Safety: {msg.orchestration.safetyCheck.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="font-semibold text-stone-500">Emotion Hypothesis:</span>
                      <p className="text-stone-700 dark:text-stone-300 font-medium">
                        {msg.orchestration.detectedEmotion.emotion}
                      </p>
                      <p className="text-[10px] text-stone-400 italic">
                        {msg.orchestration.detectedEmotion.nuance}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-stone-500">Active Agents:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {msg.orchestration.activeAgents.map((ag, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-[10px] text-stone-700 dark:text-stone-300 font-mono">
                            {ag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-850 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
                    <span className="font-semibold text-stone-500 block mb-0.5">Orchestrator Reasoning:</span>
                    {msg.orchestration.reasoning}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 animate-fade-in pl-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-purple-400 flex items-center justify-center text-white text-xs font-serif font-bold animate-pulse">
              S
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 text-stone-500 text-xs flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span className="font-medium text-[11px] text-stone-500">SAHAYA is holding space and formulating a response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      {messages.length <= 4 && (
        <div className="mb-3 overflow-x-auto py-1">
          <div className="flex gap-2 text-xs">
            {QUICK_START_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.text, prompt.agent as any)}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-300 shrink-0 text-xs transition shadow-2xs"
              >
                "{prompt.text}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Composer & Toolbar */}
      <div className="bg-white dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-800 p-2 sm:p-3 shadow-md">
        
        {/* Agent Shortcut Badges */}
        <div className="flex items-center gap-1.5 px-2 pb-2 border-b border-stone-100 dark:border-stone-800 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 mr-1">Focus:</span>
          {[
            { id: 'auto', label: 'Adaptive Orchestration', icon: Cpu },
            { id: 'story', label: 'Wisdom Story', icon: BookOpen },
            { id: 'music', label: 'Soothing Music', icon: Music },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedAgentShortcut === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedAgentShortcut(item.id as any)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium transition ${
                  isSelected
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Text Area and Controls */}
        <div className="flex items-end gap-2 pt-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={
              language === 'hi' 
                ? 'अपने मन की बात यहाँ साझा करें...' 
                : 'Share whatever is in your heart. Press Enter to send...'
            }
            className="flex-1 bg-transparent px-3 py-2 text-stone-900 dark:text-stone-100 text-sm focus:outline-none resize-none max-h-32 min-h-[42px]"
          />

          {/* Speech-to-text mic */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-2xl transition ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title="Voice input (Speech to text)"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:hover:bg-amber-600 text-white transition shadow-sm cursor-pointer shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <p className="text-[11px] text-center text-stone-500 dark:text-stone-400 mt-2 px-2 flex items-center justify-center gap-1">
        <Info className="w-3 h-3 text-stone-400 shrink-0" />
        SAHAYA is an AI companion for emotional reflection, not a medical or diagnostic service. In a crisis, human care is paramount.
      </p>
    </div>
  );
};

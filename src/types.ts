export type LanguageCode = 
  | 'en' 
  | 'hi' 
  | 'es' 
  | 'fr' 
  | 'te' 
  | 'ta' 
  | 'bn' 
  | 'de' 
  | 'ja' 
  | 'ar';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  native: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  orchestration?: AgentOrchestrationInfo;
}

export interface AgentOrchestrationInfo {
  safetyCheck: {
    status: 'safe' | 'caution' | 'crisis';
    note: string;
    isCrisis?: boolean;
  };
  detectedEmotion: {
    emotion: string;
    nuance: string;
  };
  activeAgents: string[];
  recommendation?: {
    type: 'breathing' | 'grounding' | 'story' | 'music' | 'journal' | 'hotline';
    title: string;
    payload?: any;
  };
  reasoning: string;
}

export interface CulturalStory {
  id: string;
  title: string;
  culture: string;
  summary: string;
  reflection: string;
  tags: string[];
}

export interface MusicTrack {
  title: string;
  artist: string;
  genre: string;
  mood: string;
  description: string;
  embedQuery: string;
}

export interface CrisisContact {
  name: string;
  contact: string;
  url?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  emotion: string;
  prompt: string;
  content: string;
  compassionateReframe: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: 'lotus' | 'sunrise' | 'zen' | 'heart' | 'wave';
  isAnonymous: boolean;
  createdAt: string;
  privacyPin?: string;
  preferredLanguage?: LanguageCode;
  stats: {
    sessionsCount: number;
    breathingCompleted: number;
    journalEntriesCount: number;
  };
}


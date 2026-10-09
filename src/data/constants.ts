import { LanguageOption, CulturalStory, MusicTrack } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
];

export const QUICK_START_PROMPTS = [
  {
    text: 'I want to talk about something.',
    description: 'A gentle, open space to share what is on your mind.',
    agent: 'companion',
  },
  {
    text: 'I have been feeling overwhelmed.',
    description: 'When mental weight or pressure feels too heavy to carry.',
    agent: 'grounding',
  },
  {
    text: 'Can you help me reflect on my feelings?',
    description: 'Untangle thoughts with gentle, clarifying prompts.',
    agent: 'companion',
  },
  {
    text: 'Suggest something calming.',
    description: 'Peaceful sounds, music, or a slow breathing rhythm.',
    agent: 'music',
  },
  {
    text: 'I feel so lonely today.',
    description: 'When isolation aches and you need an attentive, warm presence.',
    agent: 'companion',
  },
  {
    text: 'Tell me a comforting wisdom story.',
    description: 'Timeless parables about healing, resilience, and letting go.',
    agent: 'story',
  },
];

export const DEFAULT_STORIES: CulturalStory[] = [
  {
    id: 'kintsugi',
    title: 'Kintsugi: The Gold in the Broken Places',
    culture: 'Japanese Philosophy',
    summary: 'When ceramic pottery breaks, masters repair it using lacquer mixed with powdered gold, silver, or platinum. They do not hide the damage; they illuminate the fractures. The bowl becomes far more prized, not despite being broken, but because of its history.',
    reflection: 'The cracks you carry from painful experiences are not flaws to hide in shame. They are where wisdom and compassionate strength grow.',
    tags: ['brokenness', 'grief', 'healing', 'past']
  },
  {
    id: 'monks-river',
    title: 'The Two Monks and the River',
    culture: 'Zen Buddhist Parable',
    summary: 'An elder and junior monk arrived at a swollen river where a person needed help crossing. The elder carried her across on his shoulders and set her down gently. Ten miles later, the junior monk blurted out: "Why did you touch her? That breaks our vows!" The elder monk replied: "I put her down miles ago. Why are you still carrying her?"',
    reflection: 'Much of our exhaustion comes from replaying words, events, and regrets long after the river has been crossed. You have permission to lay down yesterday’s weight.',
    tags: ['letting-go', 'regret', 'stress', 'overwhelm']
  },
  {
    id: 'guest-house',
    title: 'The Guest House',
    culture: 'Rumi (Sufi Wisdom)',
    summary: '“This being human is a guest house. Every morning a new arrival: joy, sadness, anxiety, a sudden realization. Welcome and entertain them all! Even if they are a crowd of sorrows who violently sweep your house clean of furniture, treat each guest honorably. They may be clearing you out for some new delight.”',
    reflection: 'You do not have to fight the heavy feelings. Allow them to sit for a moment, be acknowledged, and in their own time, they will move on.',
    tags: ['loneliness', 'sadness', 'grief', 'acceptance']
  },
  {
    id: 'farmer-horse',
    title: 'The Taoist Farmer: Who Knows What Is Good or Bad?',
    culture: 'Taoist Philosophy',
    summary: 'A farmer’s horse ran away; neighbors called it bad luck. "Maybe," said the farmer. The horse returned with three wild horses; neighbors cried good luck. "Maybe," said the farmer. His son broke his leg taming one; neighbors mourned bad luck. "Maybe," said the farmer. The next day, the army drafted all young men for war except the injured son. The farmer gently smiled: "Maybe."',
    reflection: 'Life unfolds in waves beyond what our immediate judgment can see. When everything feels uncertain, patience and gentle breath can hold us steady.',
    tags: ['anxiety', 'uncertainty', 'fear', 'life changes']
  },
  {
    id: 'mustard-seed',
    title: 'The Mustard Seed of Shared Humanity',
    culture: 'Ancient Indian Tradition',
    summary: 'A grieving mother carried her deceased child, pleading for medicine. The wise teacher asked her to bring a tiny mustard seed from any house that had never witnessed death. She knocked on every door, but every household had lost grandparents, parents, or children. In realizing her grief was shared across all human hearts, isolation dissolved into universal tenderness.',
    reflection: 'Grief can make us feel intensely isolated, as though we are on a remote island. Yet grief is the silent chord that unites all human hearts in profound empathy.',
    tags: ['grief', 'loss', 'loneliness', 'death']
  }
];

export const DEFAULT_MUSIC: MusicTrack[] = [
  {
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    genre: 'Classical Minimalist Piano',
    mood: 'Melancholic, Slow, Tender',
    description: 'Floating, unhurried chords designed to lower tension and steady rapid breathing.',
    embedQuery: 'Erik Satie Gymnopedie No 1'
  },
  {
    title: 'Nuvole Bianche',
    artist: 'Ludovico Einaudi',
    genre: 'Neo-Classical Piano',
    mood: 'Healing, Gentle Release, Hope',
    description: 'Touches the deep unsaid emotions with moving simplicity and warmth.',
    embedQuery: 'Ludovico Einaudi Nuvole Bianche'
  },
  {
    title: 'Spiegel im Spiegel',
    artist: 'Arvo Pärt',
    genre: 'Sacred Minimalist Violin & Piano',
    mood: 'Stillness, Solitude, Sacred Peace',
    description: 'Like watching ripples settle on undisturbed clear water at dawn.',
    embedQuery: 'Arvo Part Spiegel im Spiegel'
  },
  {
    title: 'Bansuri Evening Raga Yaman',
    artist: 'Pandit Hariprasad Chaurasia',
    genre: 'Indian Bamboo Flute',
    mood: 'Grounding, Centering, Breath',
    description: 'Deep resonant wooden flute tones carrying centuries of meditative grace.',
    embedQuery: 'Hariprasad Chaurasia Bansuri Meditation'
  },
  {
    title: 'Weightless',
    artist: 'Marconi Union',
    genre: 'Acoustic Sound Therapy',
    mood: 'Calms Nervous System & Heart Rate',
    description: 'Composed with sound therapists to slow heart rate toward 60 beats per minute.',
    embedQuery: 'Marconi Union Weightless'
  }
];

export const CRISIS_HELPLINES = [
  {
    region: 'United States & Canada',
    name: '988 Suicide & Crisis Lifeline',
    dial: '988',
    hours: '24/7, Free & Confidential',
    details: 'Call or text 988 anytime. Available in English & Spanish, with interpretation in 240+ languages.'
  },
  {
    region: 'Crisis Text Line',
    name: 'Global Text Support',
    dial: 'Text HOME to 741741',
    hours: '24/7, Free via SMS',
    details: 'Connect with a crisis counselor via SMS in the US, UK, and Canada.'
  },
  {
    region: 'India',
    name: 'Tele-MANAS (Ministry of Health)',
    dial: '14416 or 1800-891-4416',
    hours: '24/7, Toll-free, Multilingual',
    details: 'National tele-mental health programme of India offering free counseling in 20+ regional languages.'
  },
  {
    region: 'United Kingdom',
    name: 'Samaritans',
    dial: '116 123',
    hours: '24/7, Free call',
    details: 'Compassionate, judgment-free listening support for anyone going through difficult moments.'
  },
  {
    region: 'European Union',
    name: 'European Emergency Helpline',
    dial: '112',
    hours: '24/7, Free',
    details: 'Universal emergency service across all EU member states.'
  },
  {
    region: 'Australia',
    name: 'Lifeline Australia',
    dial: '13 11 14',
    hours: '24/7, Free & Confidential',
    details: 'Short-term crisis support, suicide prevention services, and mental health referrals.'
  },
  {
    region: 'Worldwide',
    name: 'Befrienders Worldwide',
    dial: 'befrienders.org',
    hours: 'Global Directory',
    details: 'Directory of emotional support helplines in over 30 countries worldwide.'
  }
];

export const FAQS = [
  {
    q: 'What is SAHAYA AI?',
    a: 'SAHAYA AI is an agentic emotional well-being companion created to give you a warm, private, non-judgmental space to express difficult feelings like loneliness, grief, heartbreak, burnout, or life stress. Its tagline is: "You speak. SAHAYA listens, understands and supports."'
  },
  {
    q: 'Can SAHAYA diagnose mental health conditions or replace therapy?',
    a: 'No. SAHAYA is designed to complement—never replace—mental health professionals, psychiatrists, doctors, or human support systems. SAHAYA never diagnoses illness, never prescribes medication, and never claims to cure trauma. It is a compassionate conversational and reflective companion.'
  },
  {
    q: 'How does the Multi-Agent System work?',
    a: 'Instead of a single blunt chatbot, SAHAYA coordinates specialized agentic modules: an Orchestrator Agent (conductor), a Safety Agent (prioritizes crisis detection and resources), an Emotion & Context Agent (detects nuanced emotional cues without clinical labels), a Companion Agent (generates empathetic responses), a Story & Wisdom Agent (shares cultural parables), and a Music & Calming Sound Agent (suggests melodies and ambient sounds).'
  },
  {
    q: 'Is my conversation private?',
    a: 'Yes. Your session is kept private. We do not sell your personal data or conversation transcripts to third parties. You can clear your active conversation history at any time with a single click.'
  },
  {
    q: 'What languages does SAHAYA support?',
    a: 'SAHAYA supports multilingual conversations including English, Hindi (हिन्दी), Spanish (Español), French (Français), Telugu (తెలుగు), Tamil (தமிழ்), Bengali (বাংলা), German (Deutsch), Japanese (日本語), and Arabic (العربية).'
  },
  {
    q: 'What should I do if I or someone I know is in immediate crisis?',
    a: 'If you are experiencing thoughts of self-harm, severe distress, or immediate danger, please reach out to professional human crisis services right away. You can call or text 988 in the US/Canada, 14416 in India (Tele-MANAS), 116 123 in the UK, 112 in Europe, or visit our Emergency Help panel for international helplines.'
  }
];

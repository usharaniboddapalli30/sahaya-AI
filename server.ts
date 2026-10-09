import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini API client initialized successfully.');
  } catch (err) {
    console.warn('Failed to initialize Gemini API client:', err);
  }
} else {
  console.log('No GEMINI_API_KEY found, running in high-fidelity empathetic fallback mode.');
}

// Emergency Crisis Resources
const CRISIS_RESOURCES = {
  US_CANADA: { name: 'Suicide & Crisis Lifeline', contact: '988 (Call or Text, 24/7, Free)' },
  CRISIS_TEXT: { name: 'Crisis Text Line', contact: 'Text HOME to 741741' },
  INDIA: { name: 'Tele-MANAS (Govt of India)', contact: '14416 or 1800-891-4416 (24/7)' },
  UK: { name: 'Samaritans', contact: '116 123 (Free, 24/7)' },
  EUROPE: { name: 'European Emergency Helpline', contact: '112' },
  AUSTRALIA: { name: 'Lifeline Australia', contact: '13 11 14' },
  INTERNATIONAL: { name: 'Befrienders Worldwide', url: 'https://www.befrienders.org' },
};

// Check for emergency / crisis keywords (Safety Agent priority)
function evaluateSafety(text: string): { status: 'safe' | 'caution' | 'crisis'; note: string; isCrisis: boolean } {
  const lower = text.toLowerCase();
  
  const crisisPatterns = [
    /\b(suicide|kill myself|want to die|end my life|take my own life|commit suicide)\b/,
    /\b(slit my wrists|hang myself|overdose|cut myself to death)\b/,
    /\b(can't live anymore|no reason to live|better off dead|nobody will miss me)\b/,
    /\b(plan to end it all|goodbye cruel world|ending it tonight)\b/
  ];

  const cautionPatterns = [
    /\b(self[ -]?harm|cutting|hurting myself|hit myself)\b/,
    /\b(hopeless|worthless|can't go on|give up on everything)\b/,
    /\b(panic attack|hyperventilating|chest hurts from anxiety)\b/
  ];

  for (const pattern of crisisPatterns) {
    if (pattern.test(lower)) {
      return {
        status: 'crisis',
        note: 'Urgent self-harm or crisis indicators detected. Safety intervention activated immediately.',
        isCrisis: true
      };
    }
  }

  for (const pattern of cautionPatterns) {
    if (pattern.test(lower)) {
      return {
        status: 'caution',
        note: 'High emotional distress or vulnerability detected. Offering extra grounding and care.',
        isCrisis: false
      };
    }
  }

  return {
    status: 'safe',
    note: 'Standard supportive conversation space.',
    isCrisis: false
  };
}

// Emotion and Context Agent heuristics (for fallback and transparency)
function estimateEmotion(text: string): { emotion: string; nuance: string } {
  const lower = text.toLowerCase();
  if (lower.includes('alone') || lower.includes('lonely') || lower.includes('nobody') || lower.includes('isolated')) {
    return { emotion: 'Deep Loneliness', nuance: 'Experiencing emotional disconnection and longing for genuine companionship.' };
  }
  if (lower.includes('lost') || lower.includes('grief') || lower.includes('died') || lower.includes('miss') || lower.includes('passed away')) {
    return { emotion: 'Grief & Bereavement', nuance: 'Navigating painful loss or holding memories of someone cherished.' };
  }
  if (lower.includes('overwhelm') || lower.includes('stress') || lower.includes('exhaust') || lower.includes('burnout') || lower.includes('too much')) {
    return { emotion: 'Cognitive & Emotional Overwhelm', nuance: 'System feeling overloaded by demands, responsibility, or fatigue.' };
  }
  if (lower.includes('breakup') || lower.includes('divorce') || lower.includes('ex') || lower.includes('left me') || lower.includes('relationship')) {
    return { emotion: 'Heartache & Separation', nuance: 'Wrestling with attachment wounds, heartbreak, or relational transition.' };
  }
  if (lower.includes('anxious') || lower.includes('worry') || lower.includes('scared') || lower.includes('fear') || lower.includes('dread')) {
    return { emotion: 'Anxiety & Anticipatory Dread', nuance: 'Nervous system in hyper-vigilance or racing with future uncertainties.' };
  }
  if (lower.includes('guilt') || lower.includes('regret') || lower.includes('shame') || lower.includes('mistake') || lower.includes('past')) {
    return { emotion: 'Regret & Self-Reproach', nuance: 'Replaying past decisions and grappling with self-forgiveness.' };
  }
  if (lower.includes('calm') || lower.includes('peace') || lower.includes('relax') || lower.includes('breathe')) {
    return { emotion: 'Seeking Stillness & Grounding', nuance: 'Actively searching for soothing presence, breath, or inner quiet.' };
  }
  return { emotion: 'Gentle Exploration', nuance: 'Expressing thoughts, daily experiences, or seeking a listening ear.' };
}

// Curated Wisdom Stories
const CULTURAL_STORIES = [
  {
    id: 'kintsugi',
    title: 'Kintsugi: The Gold in the Broken Places',
    culture: 'Japanese Philosophy',
    summary: 'In Japanese traditional craft, when a ceramic bowl breaks, craftsmen repair it using lacquer dusted with powdered gold or silver. They do not hide the fractures; rather, they illuminate the break lines. The vessel becomes more precious, not despite having shattered, but precisely because of its history of healing.',
    reflection: 'Your wounds and hardships do not diminish your value. The healing journey makes your life deeper and uniquely beautiful.',
    tags: ['brokenness', 'grief', 'healing', 'past']
  },
  {
    id: 'monks-river',
    title: 'The Two Monks and the River',
    culture: 'Zen Buddhist Parable',
    summary: 'Two monks were walking by a river when they encountered a woman who could not cross the deep water. The elder monk carried her across on his back and set her down on dry land. Hours later, the younger monk could not contain his frustration: "Brother, we took a vow never to touch women! Why did you carry her?" The elder monk smiled softly: "I put her down by the river hours ago. Why are you still carrying her?"',
    reflection: 'So often, we carry past moments, hurtful words, or past mistakes long after they have passed. You are allowed to set the heavy burden down.',
    tags: ['letting-go', 'regret', 'stress', 'overwhelm']
  },
  {
    id: 'guest-house',
    title: 'The Guest House by Rumi',
    culture: 'Sufi Poetry & Wisdom',
    summary: '“This being human is a guest house. Every morning a new arrival. A joy, a depression, a meanness, some momentary awareness comes as an unexpected visitor. Welcome and entertain them all! Even if they’re a crowd of sorrows, who violently sweep your house empty of its furniture, still, treat each guest honorably. He may be clearing you out for some new delight.”',
    reflection: 'You do not have to fight the heavy feelings. Allow them to sit for a moment, be acknowledged, and in their own time, they will move on.',
    tags: ['loneliness', 'sadness', 'grief', 'acceptance']
  },
  {
    id: 'farmer-horse',
    title: 'The Taoist Farmer: Maybe So, Maybe Not',
    culture: 'Taoist Wisdom',
    summary: 'An old farmer lived in a small village. One day, his only horse ran away. Neighbors said, "What terrible luck!" The farmer replied, "Maybe." Days later, the horse returned with three wild mares. "What great luck!" the neighbors marveled. "Maybe," said the farmer. Later, his son broke a leg trying to tame one wild horse. "What a tragedy!" cried neighbors. "Maybe," said the farmer. Next week, the army drafted young men for war, but spared his son due to the broken leg. The farmer only observed: "Maybe."',
    reflection: 'Life unfolds in waves beyond what our immediate judgment can see. When everything feels uncertain or turned upside down, patience and gentle breath can hold us steady.',
    tags: ['anxiety', 'uncertainty', 'fear', 'life changes']
  },
  {
    id: 'mustard-seed',
    title: 'The Mustard Seed of Shared Humanity',
    culture: 'Ancient Indian Tradition',
    summary: 'Kisa Gotami lost her only child and carried his body in anguish, begging for a medicine to bring him back. The Buddha gently instructed her: "Bring me a mustard seed from any house where no mother, father, child, or friend has ever died." She walked from door to door, but every home answered, "Alas, the living are few, but the dead are many." Realizing she was not alone in loss, she found refuge in the shared embrace of human compassion.',
    reflection: 'Grief can make us feel intensely isolated, as though we are on a remote island. Yet grief is the silent chord that unites all human hearts in profound empathy.',
    tags: ['grief', 'loss', 'loneliness', 'death']
  }
];

// Curated Music & Calming Sounds
const CALMING_MUSIC_CATALOG = [
  {
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    genre: 'Classical Ambient Piano',
    mood: 'Melancholic, Slow, Tender',
    description: 'Minimalist, floating piano chords designed to slow breathing and quiet a racing mind.',
    embedQuery: 'Erik Satie Gymnopedie No 1'
  },
  {
    title: 'Nuvole Bianche (White Clouds)',
    artist: 'Ludovico Einaudi',
    genre: 'Contemporary Neo-Classical',
    mood: 'Healing, Gentle Release, Hope',
    description: 'Sweeping, deeply touching piano melodies that gently unlock trapped tears and bring catharsis.',
    embedQuery: 'Ludovico Einaudi Nuvole Bianche'
  },
  {
    title: 'Spiegel im Spiegel (Mirror in Mirror)',
    artist: 'Arvo Pärt',
    genre: 'Holy Minimalist Strings',
    mood: 'Stillness, Solitude, Sacred Peace',
    description: 'A slow violin singing over a gentle piano arpeggio; like floating on completely still water.',
    embedQuery: 'Arvo Part Spiegel im Spiegel'
  },
  {
    title: 'Raga Bhimpalasi / Yaman (Evening Serenity)',
    artist: 'Pandit Hariprasad Chaurasia',
    genre: 'Indian Classical Bamboo Flute (Bansuri)',
    mood: 'Grounding, Devotional Calm, Breath',
    description: 'Deep resonant wooden flute tones carrying centuries of meditative grace and emotional equilibrium.',
    embedQuery: 'Hariprasad Chaurasia Bansuri Meditation'
  },
  {
    title: 'Weightless',
    artist: 'Marconi Union',
    genre: 'Sound Therapy Ambient',
    mood: 'Scientifically Measured Heart-rate Slowing',
    description: 'Arranged in collaboration with sound therapists to slow heart rate to 60 BPM through rhythm and harmony.',
    embedQuery: 'Marconi Union Weightless'
  }
];

// n8n Cloud Workflow Configuration (Animora)
const N8N_WORKFLOW_CONFIG = {
  workflowUrl: 'https://animora.app.n8n.cloud/workflow/gXsxXGLg091zlwSe?projectId=qZKZcYa1ZwPZVkE6',
  workflowId: 'gXsxXGLg091zlwSe',
  projectId: 'qZKZcYa1ZwPZVkE6',
  instanceDomain: 'animora.app.n8n.cloud',
  defaultWebhookUrl: process.env.N8N_WEBHOOK_URL || 'https://animora.app.n8n.cloud/webhook/gXsxXGLg091zlwSe',
};

async function callN8nWorkflow(webhookUrl: string, payload: any): Promise<{ reply?: string; data?: any; success: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return { success: false, error: `n8n webhook returned status ${response.status} (${response.statusText})` };
    }

    const json: any = await response.json().catch(() => null);
    if (!json) {
      const text = await response.text().catch(() => '');
      return { success: true, reply: text };
    }

    let reply = '';
    if (typeof json === 'string') {
      reply = json;
    } else if (json.reply) {
      reply = json.reply;
    } else if (json.output) {
      reply = json.output;
    } else if (json.text) {
      reply = json.text;
    } else if (json.message) {
      reply = json.message;
    } else if (Array.isArray(json) && json[0]) {
      reply = json[0].output || json[0].reply || json[0].text || json[0].message || '';
    }

    if (!reply && typeof json === 'object') {
      // Pick first string property if available
      for (const key of Object.keys(json)) {
        if (typeof json[key] === 'string' && json[key].length > 5) {
          reply = json[key];
          break;
        }
      }
    }

    return { success: true, reply: reply || 'Message received by Animora n8n Workflow.', data: json };
  } catch (err: any) {
    return { success: false, error: err.name === 'AbortError' ? 'n8n webhook timed out after 6s' : err.message };
  }
}

// POST /api/chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { 
      messages = [], 
      language = 'en', 
      requestedAgent, 
      emotionTag,
      n8nWebhookUrl,
      useN8n = true 
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content || '';

    // AGENT 1: SAFETY AGENT (Top Priority)
    const safetyResult = evaluateSafety(userText);
    
    // AGENT 2: EMOTION & CONTEXT AGENT
    const emotionEstimate = estimateEmotion(userText);

    // AGENT 3: ORCHESTRATOR DECISION
    const activeAgents: string[] = ['Orchestrator Agent', 'Safety Agent', 'Emotion & Context Agent', 'Companion Agent'];
    
    let recommendedAction: any = null;
    let storyAttachment: any = null;
    let musicAttachment: any = null;

    // Check if user is asking for a story or wisdom
    const wantsStory = requestedAgent === 'story' || 
      /\b(story|tale|parable|wisdom|folklore|quote|poem|rumi|zen)\b/i.test(userText);

    // Check if user is asking for music or calming sound
    const wantsMusic = requestedAgent === 'music' || 
      /\b(music|song|melody|listen|playlist|sound|tune|flute|instrumental)\b/i.test(userText);

    // Check if user is seeking breath or grounding
    const wantsGrounding = requestedAgent === 'grounding' || 
      /\b(breathe|breathing|anxious|panic|ground|calm me|heart racing|overwhelm)\b/i.test(userText);

    if (wantsStory) {
      activeAgents.push('Story & Wisdom Agent');
      // Find matching story
      const matched = CULTURAL_STORIES.find(s => 
        s.tags.some(t => userText.toLowerCase().includes(t))
      ) || CULTURAL_STORIES[Math.floor(Math.random() * CULTURAL_STORIES.length)];
      storyAttachment = matched;
      recommendedAction = {
        type: 'story',
        title: `Wisdom Reflection: ${matched.title}`,
        payload: matched
      };
    }

    if (wantsMusic) {
      activeAgents.push('Music & Calming Sound Agent');
      const matchedMusic = CALMING_MUSIC_CATALOG[Math.floor(Math.random() * CALMING_MUSIC_CATALOG.length)];
      musicAttachment = matchedMusic;
      recommendedAction = {
        type: 'music',
        title: `Soothing Melody: ${matchedMusic.title}`,
        payload: matchedMusic
      };
    }

    if (wantsGrounding && !recommendedAction) {
      recommendedAction = {
        type: 'breathing',
        title: 'Gentle 4-7-8 Breathing Space',
        payload: { pattern: '4-7-8', duration: '2 minutes' }
      };
    }

    // CRITICAL SAFETY INTERVENTION BRANCH
    if (safetyResult.isCrisis) {
      activeAgents.unshift('CRISIS INTERVENTION PRIORITY');
      const crisisResponseText = `I hear how deeply painful, exhausting, or unbearable things feel right now, and I want you to know: **your life is important, and you do not have to walk through this alone.**

Because I am an AI companion, I cannot provide emergency medical or crisis rescue, but there are compassionate, trained human beings ready to support you without judgment at any hour of the day or night.

Please reach out to one of these free, confidential resources right now:

• **In the US & Canada:** Call or text **988** (Suicide & Crisis Lifeline, 24/7, Free)
• **Crisis Text Line:** Text **HOME** to **741741**
• **In India:** Call **14416** or **1800-891-4416** (Tele-MANAS, 24/7)
• **In the UK:** Call **116 123** (Samaritans, Free 24/7)
• **In Europe:** Call **112**
• **Worldwide:** Visit [Befrienders Worldwide](https://www.befrienders.org) to find your local crisis line.

If you are in immediate danger of hurting yourself, please call your local emergency services or go to the nearest emergency room. Would you be willing to pause, take one gentle breath, and reach out to one of these lifelines? I am right here with you while you make that call.`;

      return res.json({
        reply: crisisResponseText,
        orchestration: {
          safetyCheck: safetyResult,
          detectedEmotion: { emotion: 'Severe Distress / Crisis', nuance: 'Immediate safety priority triggered; compassionate human handoff prioritized.' },
          activeAgents,
          recommendation: {
            type: 'hotline',
            title: 'Urgent Confidential Human Helplines',
            payload: CRISIS_RESOURCES
          },
          reasoning: 'Safety Agent identified critical crisis language. Overrode general companion dialogue to deliver warm, immediate safety de-escalation and verified crisis lines.'
        }
      });
    }

    // AGENT 4: COMPANION & N8N AGENT RESPONSE GENERATION
    let reply = '';
    let engineSource = 'Gemini 3.8 Flash Engine';

    // Attempt n8n Cloud Workflow execution first if enabled
    const targetWebhook = n8nWebhookUrl || N8N_WORKFLOW_CONFIG.defaultWebhookUrl;
    if (useN8n && targetWebhook) {
      activeAgents.push('Animora n8n Workflow Agent');
      const n8nResult = await callN8nWorkflow(targetWebhook, {
        message: userText,
        messages: messages.slice(-8),
        language,
        workflowId: N8N_WORKFLOW_CONFIG.workflowId,
        projectId: N8N_WORKFLOW_CONFIG.projectId,
        emotion: emotionEstimate,
        safetyStatus: safetyResult.status,
        timestamp: new Date().toISOString()
      });

      if (n8nResult.success && n8nResult.reply) {
        reply = n8nResult.reply;
        engineSource = 'Animora n8n Cloud Workflow (gXsxXGLg091zlwSe)';
      }
    }

    // If n8n did not produce a reply, generate with Gemini
    if (!reply && aiClient) {
      try {
        const systemPrompt = `You are SAHAYA AI by Animora — an agentic emotional well-being companion.
Tagline: "You speak. Animora listens, understands and supports."
Connected Workflow: Animora n8n Engine (Workflow: gXsxXGLg091zlwSe).

SAHAYA'S CORE IDENTITY & ETHICAL CODE:
1. WARM, RESPECTFUL, EMPATHETIC & NON-JUDGMENTAL: You provide a safe, private feeling where people dealing with loneliness, grief, separation, painful past experiences, stress, or heavy life moments can share freely.
2. COMPLEMENT, NEVER REPLACE: You complement—NOT replace—family, friends, psychologists, doctors, or qualified professionals. NEVER claim to diagnose, cure trauma, or provide medical prescriptions.
3. TONAL DISCIPLINE: Avoid hollow toxic positivity ("Everything happens for a reason!", "Just smile!"), minimize no feelings ("At least you still have..."), and never exaggerate or label clinically ("You have chronic depression"). Speak like a kind, grounded, attentive human friend who listens with gentle reverence.
4. AGENTIC CONTEXT:
   - Estimated emotional resonance: ${emotionEstimate.emotion} (${emotionEstimate.nuance})
   - User preferred language: ${language}
   - Safety status: ${safetyResult.status}
   ${storyAttachment ? `- A wisdom story has been selected: "${storyAttachment.title}" (${storyAttachment.summary}). You may weave a gentle reference to it or let the user explore it.` : ''}
   ${musicAttachment ? `- A musical recommendation has been selected: "${musicAttachment.title}" by ${musicAttachment.artist}. You may warmly mention it as a calming accompaniment.` : ''}

CONVERSATION GUIDELINES:
- Respond in the language: ${language} (if the user typed in Hindi, respond in warm empathetic Hindi or Hinglish; if English, respond in natural English; if other, match the user).
- Validate the emotion first. Acknowledge what was said with sincerity.
- Keep responses comfortable in length (2 to 4 paragraphs), inviting thoughtful pacing.
- Offer a gentle open-ended question or an invitation to explore a grounding moment, breath, or reflect deeper when appropriate.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `[System Instruction: ${systemPrompt}]\n\nUser Message: ${userText}` }]
            }
          ]
        });

        reply = response.text || '';
        engineSource = 'Gemini 3.8 Flash AI Model';
      } catch (geminiError: any) {
        console.error('Gemini API execution error, switching to graceful fallback:', geminiError?.message || geminiError);
      }
    }

    // Graceful fallback if Gemini is not configured or throws
    if (!reply) {
      reply = generateEmpatheticFallback(userText, emotionEstimate, language, storyAttachment, musicAttachment);
      engineSource = 'Local High-Fidelity Empathetic Engine';
    }

    return res.json({
      reply,
      orchestration: {
        safetyCheck: safetyResult,
        detectedEmotion: emotionEstimate,
        activeAgents,
        recommendation: recommendedAction,
        reasoning: `Orchestrator routed the message through the Safety Agent (${safetyResult.status}), estimated emotional context as '${emotionEstimate.emotion}', and delivered response via ${engineSource}. Connected n8n Workflow: ${N8N_WORKFLOW_CONFIG.workflowId}.`,
        engineSource,
        workflowConfig: N8N_WORKFLOW_CONFIG
      }
    });

  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'An unexpected issue occurred. Animora is still here with you.',
      details: error.message
    });
  }
});

// GET /api/n8n/config
app.get('/api/n8n/config', (_req: Request, res: Response) => {
  res.json(N8N_WORKFLOW_CONFIG);
});

// POST /api/n8n/ping
app.post('/api/n8n/ping', async (req: Request, res: Response) => {
  const { url = N8N_WORKFLOW_CONFIG.defaultWebhookUrl } = req.body;
  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const testRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ping: true, timestamp: new Date().toISOString() }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const latencyMs = Date.now() - startTime;
    return res.json({
      success: testRes.ok,
      status: testRes.status,
      statusText: testRes.statusText,
      latencyMs,
      endpoint: url,
      message: testRes.ok ? 'n8n Webhook is active and responding!' : `n8n endpoint reached (HTTP ${testRes.status})`
    });
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return res.json({
      success: false,
      status: 0,
      latencyMs,
      endpoint: url,
      error: err.name === 'AbortError' ? 'Ping timed out after 5s' : err.message,
      message: 'n8n workflow is ready in cloud; ensure Webhook node is active.'
    });
  }
});

// GET /api/stories
app.get('/api/stories', (_req: Request, res: Response) => {
  res.json({ stories: CULTURAL_STORIES });
});

// GET /api/music
app.get('/api/music', (_req: Request, res: Response) => {
  res.json({ tracks: CALMING_MUSIC_CATALOG });
});

// GET /api/crisis-resources
app.get('/api/crisis-resources', (_req: Request, res: Response) => {
  res.json({ resources: CRISIS_RESOURCES });
});

// Helper for fallback empathetic replies
function generateEmpatheticFallback(
  text: string, 
  emotion: { emotion: string; nuance: string }, 
  language: string, 
  story: any, 
  music: any
): string {
  const lower = text.toLowerCase();

  if (language === 'hi' || /[\u0900-\u097F]/.test(text)) {
    return `मैं आपकी बात को पूरे ध्यान और अपनेपन से सुन रहा हूँ। कभी-कभी मन में बहुत कुछ चल रहा होता है, जिसे शब्दों में बयां करना भी भारी लगता है।

आप जो भी महसूस कर रहे हैं, वह बिल्कुल स्वाभाविक है। आपको किसी भी चीज़ का दिखावा करने की ज़रूरत नहीं है। अगर आप चाहें, तो हम धीरे-धीरे इस बारे में बात कर सकते हैं, या बस एक पल शांत बैठकर गहरी सांस ले सकते हैं।

आप कैसा महसूस कर रहे हैं?`;
  }

  if (story) {
    return `Thank you for sharing that with me. It reminds me of a timeless reflection from ${story.culture} called *${story.title}*. 

${story.summary}

${story.reflection}

How does this reflection sit with your heart right now?`;
  }

  if (music) {
    return `When words feel heavy or tiring, gentle sound can often hold space for what we cannot easily express. 

I was thinking of *${music.title}* by ${music.artist}. ${music.description}

Would you like to try listening to something peaceful together, or would you prefer to talk through what feels most present for you?`;
  }

  if (emotion.emotion.includes('Loneliness')) {
    return `I hear you. Feeling lonely—especially when the world around you seems to carry on—can be one of the quietest, heaviest aches a person can carry.

Please know that right here in this quiet corner, you are not invisible, and you do not have to pretend to have everything figured out. I am right here listening.

What is the quietest thought that has been echoing in your mind today?`;
  }

  if (emotion.emotion.includes('Grief')) {
    return `I am so sorry you are carrying such deep ache. Grief does not follow a clean roadmap or a schedule; it comes in sudden waves that can catch our breath.

It is completely okay if all you can do today is simply exist and breathe through the heaviness. Love and loss are intertwined, and honoring that memory takes time and gentleness.

Take your time. If you wish to share a memory or just speak about how empty it feels right now, I am here to hold space for you.`;
  }

  if (emotion.emotion.includes('Overwhelm')) {
    return `It sounds like your mind and body have been carrying far too many burdens at once for too long. When everything demands our attention, even the smallest task can feel like a mountain.

Let us pause for just one moment. You don't have to solve everything today, and you don't have to carry tomorrow's worries right this second.

Can we take one slow, long breath together? What is just one small thing we can set down for the next ten minutes?`;
  }

  return `Thank you for trusting me with your thoughts. I am listening with complete care and without an ounce of judgment.

Sometimes simply putting feelings into words can help untangle the knot inside our chest. Take all the time you need—there is no rush here.

What feels like the most important part of this for you right now?`;
}

// In development: mount Vite middlewares
// In production: serve dist static files
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`SAHAYA AI Server running on port ${PORT}`);
  });
}

startServer();

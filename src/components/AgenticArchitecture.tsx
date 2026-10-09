import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  BookOpen, 
  Music, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Compass,
  Workflow,
  ExternalLink
} from 'lucide-react';

interface AgenticArchitectureProps {
  onStartChat: () => void;
  openWorkflowModal?: () => void;
}

export const AgenticArchitecture: React.FC<AgenticArchitectureProps> = ({ 
  onStartChat,
  openWorkflowModal 
}) => {
  const agents = [
    {
      name: 'Animora n8n Workflow Engine',
      role: 'Cloud Automation & Webhook Orchestrator',
      icon: Workflow,
      color: 'from-amber-600 to-rose-600',
      badge: 'Live n8n Cloud',
      description: 'Dispatches user queries, conversation state, and emotional context to your hosted n8n Cloud Workflow (gXsxXGLg091zlwSe on animora.app.n8n.cloud) with automatic Gemini fallback.',
      keyPrinciple: 'Empowers visual workflow editing, custom tool calling, and automated response pipelines in n8n.'
    },
    {
      name: 'Orchestrator Agent',
      role: 'Master Conductor & Router',
      icon: Cpu,
      color: 'from-amber-500 to-amber-600',
      badge: 'Coordination Engine',
      description: 'Coordinates specialized sub-agents in a strict priority chain. Assesses user intent, decides when to trigger grounding, story, or sound agents, and synthesizes the final empathetic output.',
      keyPrinciple: 'Runs Safety Agent checks before all other features; synchronizes context without overwhelming the user.'
    },
    {
      name: 'Safety Agent',
      role: 'Guardian & Crisis Protocol',
      icon: ShieldCheck,
      color: 'from-rose-500 to-rose-600',
      badge: 'Priority 1 Guardrail',
      description: 'Continuously monitors conversation for signs of self-harm, severe distress, or emergency danger. If detected, overrides conversational flow to deliver warm, compassionate human hotline handoffs.',
      keyPrinciple: 'Safety always supersedes companion conversation. Recommends verified human resources immediately.'
    },
    {
      name: 'Emotion & Context Agent',
      role: 'Nuance & Cue Perception',
      icon: Compass,
      color: 'from-purple-500 to-purple-600',
      badge: 'Non-Clinical Listener',
      description: 'Reads emotional themes—loneliness, grief, separation, burnout, fatigue—as gentle, uncertain hypotheses rather than rigid clinical categories.',
      keyPrinciple: 'Never diagnoses psychiatric disorders or applies medical labels. Validates the human experience.'
    },
    {
      name: 'Companion Agent',
      role: 'Empathetic Core Dialogue',
      icon: HeartHandshake,
      color: 'from-emerald-500 to-emerald-600',
      badge: 'Voice of Animora',
      description: 'Generates the primary warm, respectful, and comforting dialogue in the user’s preferred tongue. Uses conversational validation and pacing without toxic positivity.',
      keyPrinciple: 'Zero judgment. Acknowledges feelings with gentle reverence and presence.'
    },
    {
      name: 'Story & Wisdom Agent',
      role: 'Cultural & Reflective Parables',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      badge: 'Timeless Solace',
      description: 'Brings forth time-tested parables from Japanese Kintsugi, Sufi poetry, Zen parables, and ancient folk wisdom to provide comforting shifts in perspective.',
      keyPrinciple: 'Presented as gentle reflective metaphors, never as curative or medical therapy.'
    },
    {
      name: 'Music & Calming Sound Agent',
      role: 'Acoustic Regulation',
      icon: Music,
      color: 'from-amber-500 to-orange-500',
      badge: 'Sensory Soothing',
      description: 'Suggests verified classical and ambient tracks (Erik Satie, Ludovico Einaudi, Hariprasad Chaurasia) and powers in-browser synthesized nature soundscapes.',
      keyPrinciple: 'Never fabricates playable links; recommends legitimate artists and synthesizes local audio.'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 mb-3 border border-amber-200 dark:border-amber-800">
          <Layers className="w-3.5 h-3.5" />
          Transparent Multi-Agent Architecture
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          How SAHAYA Thinks & Cares
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base mt-3 leading-relaxed">
          Rather than relying on a single generic chatbot, SAHAYA AI operates as a collaborative collective of specialized agents—ensuring safety, emotional nuance, cultural wisdom, and responsible boundaries.
        </p>
      </div>

      {/* Execution Flow Diagram */}
      <div className="bg-white dark:bg-stone-850 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-800 shadow-sm mb-12">
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
          The 4-Stage Agentic Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            {
              step: '01',
              title: 'Safety Evaluation',
              agent: 'Safety Agent',
              desc: 'High-priority scan for self-harm or acute crisis. If detected, immediate crisis handoff triggers.',
              status: 'Priority 1',
              borderColor: 'border-rose-400 dark:border-rose-800',
              badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            },
            {
              step: '02',
              title: 'Emotional Context',
              agent: 'Emotion & Context Agent',
              desc: 'Explores conversational nuance (loneliness, grief, fatigue) without clinical labeling.',
              status: 'Nuance Analysis',
              borderColor: 'border-purple-400 dark:border-purple-800',
              badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
            },
            {
              step: '03',
              title: 'Agent Orchestration',
              agent: 'Orchestrator Agent',
              desc: 'Determines whether stories, ambient sounds, breathing rhythms, or quiet listening are best suited.',
              status: 'Decision Loop',
              borderColor: 'border-amber-400 dark:border-amber-800',
              badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            },
            {
              step: '04',
              title: 'Empathetic Synthesis',
              agent: 'Companion & Tool Agents',
              desc: 'Formulates a warm, validating response in user’s native language with actionable calm.',
              status: 'Final Delivery',
              borderColor: 'border-emerald-400 dark:border-emerald-800',
              badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            },
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border-2 bg-stone-50/70 dark:bg-stone-900/60 flex flex-col justify-between ${item.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-stone-400">
                    STAGE {item.step}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  {item.agent}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {agents.map((agent, idx) => {
          const Icon = agent.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-stone-850 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {agent.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  {agent.name}
                </h3>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-3">
                  {agent.role}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {agent.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 italic flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{agent.keyPrinciple}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Agent Transparency CTA */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 dark:from-amber-950/40 dark:via-rose-950/40 dark:to-purple-950/40 rounded-3xl p-8 border border-amber-200 dark:border-amber-800 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Experience the Agentic Inspector in Live Chat
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-xl mx-auto mb-6">
          Every response from SAHAYA includes an inspectable Agent Mind toggle. You can view exactly which agents were active, the detected emotional resonance, and safety status.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStartChat}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md transition cursor-pointer"
          >
            Talk to Animora Now
            <ArrowRight className="w-4 h-4" />
          </button>

          {openWorkflowModal && (
            <button
              onClick={openWorkflowModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-semibold text-sm shadow-xs transition cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-amber-600" />
              Configure n8n Workflow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

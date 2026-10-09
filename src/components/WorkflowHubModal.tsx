import React, { useState } from 'react';
import { 
  X, 
  Workflow, 
  ExternalLink, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Copy, 
  Check, 
  Cpu, 
  ShieldCheck,
  RefreshCw,
  Terminal,
  Layers,
  Globe
} from 'lucide-react';

interface WorkflowHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  useN8n: boolean;
  setUseN8n: (enabled: boolean) => void;
}

export const WorkflowHubModal: React.FC<WorkflowHubModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  setWebhookUrl,
  useN8n,
  setUseN8n,
}) => {
  const [pingStatus, setPingStatus] = useState<{
    tested: boolean;
    loading: boolean;
    success?: boolean;
    status?: number;
    latencyMs?: number;
    message?: string;
  }>({
    tested: false,
    loading: false,
  });

  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!isOpen) return null;

  const WORKFLOW_URL = 'https://animora.app.n8n.cloud/workflow/gXsxXGLg091zlwSe?projectId=qZKZcYa1ZwPZVkE6';
  const WORKFLOW_ID = 'gXsxXGLg091zlwSe';
  const PROJECT_ID = 'qZKZcYa1ZwPZVkE6';
  const INSTANCE_DOMAIN = 'animora.app.n8n.cloud';

  const handlePing = async () => {
    setPingStatus({ tested: false, loading: true });
    try {
      const res = await fetch('/api/n8n/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: webhookUrl }),
      });
      const data = await res.json();
      setPingStatus({
        tested: true,
        loading: false,
        success: data.success,
        status: data.status,
        latencyMs: data.latencyMs,
        message: data.message || (data.success ? 'n8n workflow online' : 'Webhook unreachable'),
      });
    } catch (err: any) {
      setPingStatus({
        tested: true,
        loading: false,
        success: false,
        status: 0,
        message: err.message || 'Network error',
      });
    }
  };

  const samplePayload = {
    message: "I have been feeling overwhelmed lately...",
    language: "en",
    workflowId: WORKFLOW_ID,
    projectId: PROJECT_ID,
    emotion: {
      emotion: "Cognitive & Emotional Overwhelm",
      nuance: "System feeling overloaded by demands, responsibility, or fatigue."
    },
    safetyStatus: "safe",
    timestamp: new Date().toISOString()
  };

  const copySamplePayload = () => {
    navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workflow-hub-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-amber-50/80 to-transparent dark:from-stone-850 dark:to-transparent border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-xs">
              <Workflow className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              n8n Cloud Automation Bridge
            </span>
          </div>

          <h2 id="workflow-hub-title" className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Animora Workflow Integration
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Connected to your live n8n workflow at <strong className="font-mono text-amber-700 dark:text-amber-400">{INSTANCE_DOMAIN}</strong>.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Active Workflow Card */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Live Cloud Workflow
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  Animora Agent Pipeline
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Active
                  </span>
                </h3>
              </div>

              <a
                href={WORKFLOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition"
              >
                <span>Open in n8n Cloud</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block font-sans font-semibold">Workflow ID</span>
                <span className="text-stone-800 dark:text-stone-200 truncate block">{WORKFLOW_ID}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block font-sans font-semibold">Project ID</span>
                <span className="text-stone-800 dark:text-stone-200 truncate block">{PROJECT_ID}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block font-sans font-semibold">Cloud Domain</span>
                <span className="text-stone-800 dark:text-stone-200 truncate block">{INSTANCE_DOMAIN}</span>
              </div>
            </div>
          </div>

          {/* Webhook Configuration & Live Ping */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                n8n Webhook Endpoint URL
              </label>
              
              {/* Toggle n8n routing */}
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={useN8n}
                  onChange={(e) => setUseN8n(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer accent-amber-600"
                />
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  Route chats through n8n
                </span>
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://animora.app.n8n.cloud/webhook/gXsxXGLg091zlwSe"
                className="flex-1 font-mono text-xs px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <button
                type="button"
                onClick={handlePing}
                disabled={pingStatus.loading}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200 dark:border-stone-700 transition cursor-pointer shrink-0"
              >
                {pingStatus.loading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                ) : (
                  <Activity className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>Test Ping</span>
              </button>
            </div>

            {/* Ping Result Banner */}
            {pingStatus.tested && (
              <div className={`p-3 rounded-2xl text-xs flex items-center justify-between gap-2 border animate-fade-in ${
                pingStatus.success 
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' 
                  : 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2">
                  {pingStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{pingStatus.message}</span>
                </div>
                {pingStatus.latencyMs !== undefined && (
                  <span className="font-mono text-[11px] opacity-80 shrink-0">
                    {pingStatus.latencyMs}ms
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quick Guide: How to connect your n8n workflow */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-600" />
              How your n8n Workflow Interacts with this App
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
              <li>Add a <strong>Webhook node</strong> in your workflow with HTTP Method: <code>POST</code>.</li>
              <li>Set path to <code>gXsxXGLg091zlwSe</code> (or custom webhook path).</li>
              <li>Connect your AI Agent / LLM node to process the incoming <code>message</code> and <code>emotion</code> context.</li>
              <li>End with a <strong>Respond to Webhook</strong> node returning <code>{"{ reply: \"Your response here\" }"}</code>.</li>
              <li>If the workflow is offline or inactive, SAHAYA AI seamlessly responds via Gemini 3.8 Flash without interruption!</li>
            </ol>
          </div>

          {/* Payload JSON Inspector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px]">
                Payload Sent to n8n Webhook Node
              </span>
              <button
                type="button"
                onClick={copySamplePayload}
                className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 hover:underline font-medium"
              >
                {copiedPayload ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedPayload ? 'Copied' : 'Copy JSON Schema'}
              </button>
            </div>
            <pre className="p-3.5 rounded-2xl bg-stone-900 text-stone-200 font-mono text-[11px] overflow-x-auto max-h-40 leading-relaxed">
              {JSON.stringify(samplePayload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-850 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Automatic Fallback to Gemini 3.8 Flash Enabled
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 font-semibold transition"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Phone, ShieldAlert, X, Heart, ExternalLink, Globe } from 'lucide-react';
import { CRISIS_HELPLINES } from '../data/constants';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-rose-200 dark:border-rose-900/50 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          aria-label="Close crisis resources dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-2xl shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 mb-1 border border-rose-200 dark:border-rose-800">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              Immediate Care & Support
            </div>
            <h2 id="crisis-title" className="text-xl md:text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
              You Are Never Alone. Help is Right Here.
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
              SAHAYA AI is a gentle companion, but when thoughts feel heavy or unbearable, speaking with a caring human counselor can save lives. These services are free, confidential, and available 24/7.
            </p>
          </div>
        </div>

        {/* Emergency Alert Box */}
        <div className="p-4 mb-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm">
          <p className="font-semibold mb-1">In Immediate Physical Danger?</p>
          <p>
            Please call your local emergency service immediately (<strong>911</strong> in the US, <strong>112</strong> in Europe/India, <strong>999</strong> in the UK) or go to the nearest emergency medical room.
          </p>
        </div>

        {/* Helplines List */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Confidential 24/7 Crisis Helplines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CRISIS_HELPLINES.map((line, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 hover:border-rose-300 dark:hover:border-rose-800 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                      {line.region}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium">
                      {line.hours}
                    </span>
                  </div>
                  <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm mb-1">
                    {line.name}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                    {line.details}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                  {line.dial.startsWith('http') || line.dial.includes('.org') ? (
                    <a
                      href={`https://${line.dial.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Visit {line.dial}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <a
                      href={line.dial.startsWith('Text') ? 'sms:741741' : `tel:${line.dial.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Contact: {line.dial}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer reassurance */}
        <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <p>You matter. Take this moment one gentle breath at a time.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium transition"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, BookOpen, Layers, Mic, Volume2, RotateCcw } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  masteredCount: number;
  totalCards: number;
  autoPlayCue: boolean;
  onToggleAutoPlayCue: () => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  masteredCount,
  totalCards,
  autoPlayCue,
  onToggleAutoPlayCue,
  onResetProgress,
}) => {
  const percent = Math.round((masteredCount / totalCards) * 100) || 0;

  return (
    <header className="w-full bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Role Identity */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-lg text-amber-100 tracking-wide">
                    Musical Textbuch
                  </h1>
                  <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Rolle: Ella
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Dialog-Flashcards & Souffleur-Trainer
                </p>
              </div>
            </div>

            {/* Progress pill on small screens */}
            <div className="md:hidden flex items-center gap-1.5 text-xs bg-stone-800/80 px-2.5 py-1 rounded-lg border border-stone-700">
              <span className="text-emerald-400 font-bold">{masteredCount}/{totalCards}</span>
              <span className="text-stone-400">gelernt</span>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs sm:text-sm">
            <button
              id="view-flashcards-btn"
              onClick={() => onViewChange('flashcards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                currentView === 'flashcards'
                  ? 'bg-amber-600 text-stone-950 shadow font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Karteikarten</span>
            </button>

            <button
              id="view-souffleur-btn"
              onClick={() => onViewChange('souffleur')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                currentView === 'souffleur'
                  ? 'bg-amber-600 text-stone-950 shadow font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Souffleur-Test</span>
            </button>

            <button
              id="view-script-btn"
              onClick={() => onViewChange('script')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                currentView === 'script'
                  ? 'bg-amber-600 text-stone-950 shadow font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Textbuch</span>
            </button>
          </div>

          {/* Controls & Progress bar */}
          <div className="hidden md:flex items-center gap-4">
            {/* Auto-readout switch */}
            <button
              onClick={onToggleAutoPlayCue}
              title={autoPlayCue ? 'Stichwort automatisch vorlesen: AN' : 'Stichwort automatisch vorlesen: AUS'}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition ${
                autoPlayCue
                  ? 'bg-stone-800 text-amber-300 border-amber-500/40'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-300'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${autoPlayCue ? 'text-amber-400' : ''}`} />
              <span>Stichwort-Audio</span>
            </button>

            {/* Overall Mastery Progress */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-400">Gelernt:</span>
                <span className="font-semibold text-emerald-400">
                  {masteredCount} von {totalCards} ({percent}%)
                </span>
              </div>
              <div className="w-36 h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Reset progress */}
            <button
              onClick={onResetProgress}
              title="Fortschritt zurücksetzen"
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Search, PlayCircle, Star, Copy, Check, Filter } from 'lucide-react';
import { DialogueCard, CardProgress } from '../types';
import { SpeakerBadge } from './SpeakerBadge';
import { RAW_ANKI_DATA } from '../data/dialogues';

interface ScriptViewProps {
  cards: DialogueCard[];
  progressMap: Record<number, CardProgress>;
  onPracticeCard: (cardId: number) => void;
  onToggleStar: (cardId: number) => void;
}

export const ScriptView: React.FC<ScriptViewProps> = ({
  cards,
  progressMap,
  onPracticeCard,
  onToggleStar,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScene, setSelectedScene] = useState<number | 'all'>('all');
  const [copiedAnki, setCopiedAnki] = useState(false);
  const [showAnkiModal, setShowAnkiModal] = useState(false);

  const filteredCards = cards.filter((card) => {
    if (selectedScene !== 'all' && card.sceneNumber !== selectedScene) {
      return false;
    }
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      card.cueSpeaker.toLowerCase().includes(term) ||
      card.cueText.toLowerCase().includes(term) ||
      card.ellaText.toLowerCase().includes(term) ||
      (card.cueStageDirection && card.cueStageDirection.toLowerCase().includes(term)) ||
      (card.ellaStageDirection && card.ellaStageDirection.toLowerCase().includes(term))
    );
  });

  const handleCopyAnki = () => {
    navigator.clipboard.writeText(RAW_ANKI_DATA);
    setCopiedAnki(true);
    setTimeout(() => setCopiedAnki(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-4">
      {/* Top Controls: Search, Scene Filter, Anki Export */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Textbuch durchsuchen (z.B. Gedichte, Jugendheim...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs sm:text-sm bg-stone-950 text-stone-200 pl-9 pr-3 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Scene filter & Anki button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Filter className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={selectedScene}
              onChange={(e) => setSelectedScene(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-stone-950 text-stone-300 border border-stone-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Alle 4 Szenen ({cards.length} Einsätze)</option>
              <option value={1}>Szene 1: Erste Begegnung</option>
              <option value={2}>Szene 2: Jugendheim</option>
              <option value={3}>Szene 3: Die Band</option>
              <option value={4}>Szene 4: Der Song</option>
            </select>
          </div>

          <button
            onClick={() => setShowAnkiModal(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Anki-Format</span>
          </button>
        </div>
      </div>

      {/* Script lines continuous listing */}
      <div className="flex flex-col gap-4">
        {filteredCards.length === 0 ? (
          <div className="p-8 text-center text-stone-400 bg-stone-900/40 rounded-xl border border-stone-800">
            Keine Dialoge gefunden für diesen Suchbegriff.
          </div>
        ) : (
          filteredCards.map((card, idx) => {
            const isFirstInScene = idx === 0 || filteredCards[idx - 1].sceneNumber !== card.sceneNumber;
            const progress = progressMap[card.id];

            return (
              <React.Fragment key={card.id}>
                {isFirstInScene && (
                  <div className="pt-4 pb-2 border-b border-stone-800 flex items-center justify-between">
                    <h3 className="font-serif font-bold text-amber-200/90 text-sm sm:text-base tracking-wide flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {card.sceneName}
                    </h3>
                    <span className="text-xs text-stone-500">
                      Einsätze #{card.sceneNumber === 1 ? '1–9' : card.sceneNumber === 2 ? '10–14' : card.sceneNumber === 3 ? '15–19' : '20–24'}
                    </span>
                  </div>
                )}

                <div className="bg-stone-900/90 rounded-2xl p-5 border border-stone-800/90 hover:border-stone-700 transition flex flex-col gap-4 shadow-sm group">
                  {/* Stichwort (Cue Partner) */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-stone-500 font-mono">#{card.id}</span>
                        <SpeakerBadge speaker={card.cueSpeaker} />
                        {card.cueStageDirection && (
                          <span className="text-xs italic text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded">
                            {card.cueStageDirection}
                          </span>
                        )}
                      </div>
                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed pl-1">
                        „{card.cueText}“
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleStar(card.id)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-amber-400 transition"
                        title="Favorit"
                      >
                        <Star className={`w-4 h-4 ${progress?.isStarred ? 'text-amber-400 fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => onPracticeCard(card.id)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition font-medium"
                        title="Diesen Einsatz als Flashcard üben"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Üben</span>
                      </button>
                    </div>
                  </div>

                  {/* Ella's Response Line (Highlighted) */}
                  <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl p-4 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <SpeakerBadge speaker="Ella" isElla />
                      {card.ellaStageDirection && (
                        <span className="text-xs italic text-amber-200/80 bg-amber-500/20 px-2 py-0.5 rounded">
                          {card.ellaStageDirection}
                        </span>
                      )}
                      {progress?.rating === 'mastered' && (
                        <span className="ml-auto text-xs text-emerald-400 font-medium">
                          ✓ Sitzt
                        </span>
                      )}
                      {progress?.rating === 'hard' && (
                        <span className="ml-auto text-xs text-rose-400 font-medium">
                          • Noch unsicher
                        </span>
                      )}
                    </div>
                    <p className="text-stone-100 font-serif text-sm sm:text-base md:text-lg leading-relaxed pt-1">
                      „{card.ellaText}“
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>

      {/* Anki Raw Modal */}
      {showAnkiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-stone-100">
                Anki-Format (Semikolon-getrennt)
              </h3>
              <button
                onClick={() => setShowAnkiModal(false)}
                className="text-stone-400 hover:text-stone-200 text-sm px-2 py-1 rounded"
              >
                ✕ Schließen
              </button>
            </div>
            <p className="text-xs text-stone-400">
              Dies sind alle 24 Zeilen im originalen Anki-Format (Frage/Stichwort; Antwort/Ella). Du kannst sie jederzeit kopieren:
            </p>
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 font-mono text-xs text-stone-300 max-h-64 overflow-y-auto leading-relaxed">
              <pre className="whitespace-pre-wrap">{RAW_ANKI_DATA}</pre>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCopyAnki}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition"
              >
                {copiedAnki ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAnki ? 'Kopiert!' : 'In Zwischenablage kopieren'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

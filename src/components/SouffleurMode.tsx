import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Eye,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Keyboard,
  ArrowRight
} from 'lucide-react';
import { DialogueCard, CardProgress, CardRating } from '../types';
import { SpeakerBadge } from './SpeakerBadge';
import { speakText, stopSpeaking } from '../utils/speech';

interface SouffleurModeProps {
  cards: DialogueCard[];
  progressMap: Record<number, CardProgress>;
  onRateCard: (cardId: number, rating: CardRating) => void;
}

export const SouffleurMode: React.FC<SouffleurModeProps> = ({
  cards,
  progressMap,
  onRateCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [revealedWordCount, setRevealedWordCount] = useState(0);
  const [isFullAnswerRevealed, setIsFullAnswerRevealed] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [inputMode, setInputMode] = useState<'speak_aloud' | 'type_check'>('speak_aloud');

  const card = cards[currentIndex];
  const ellaWords = card ? card.ellaText.trim().split(/\s+/) : [];

  useEffect(() => {
    setTypedAnswer('');
    setRevealedWordCount(0);
    setIsFullAnswerRevealed(false);
    setShowComparison(false);
    stopSpeaking();
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const handleRevealNextWord = () => {
    if (revealedWordCount < ellaWords.length) {
      setRevealedWordCount((prev) => prev + 1);
    }
  };

  const handleRevealAll = () => {
    setIsFullAnswerRevealed(true);
    setRevealedWordCount(ellaWords.length);
    setShowComparison(true);
  };

  const playCueAudio = () => {
    if (!card) return;
    speakText(`${card.cueSpeaker} sagt: ${card.cueText}`);
  };

  const playEllaAudio = () => {
    if (!card) return;
    speakText(`Ella: ${card.ellaText}`);
  };

  const calculateSimilarity = (a: string, b: string) => {
    const cleanA = a.toLowerCase().replace(/[^a-zäöüß0-9]/gi, '');
    const cleanB = b.toLowerCase().replace(/[^a-zäöüß0-9]/gi, '');
    if (!cleanA || !cleanB) return 0;
    if (cleanA === cleanB) return 100;

    const wordsA = a.toLowerCase().split(/\s+/).filter(Boolean);
    const wordsB = b.toLowerCase().split(/\s+/).filter(Boolean);
    let matched = 0;
    wordsA.forEach((w) => {
      const cleanW = w.replace(/[^a-zäöüß0-9]/gi, '');
      if (cleanB.includes(cleanW)) matched++;
    });

    return Math.min(100, Math.round((matched / Math.max(wordsA.length, wordsB.length)) * 100));
  };

  if (!card) return null;

  const similarityScore = typedAnswer.trim() ? calculateSimilarity(typedAnswer, card.ellaText) : null;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-5 py-4">
      {/* Souffleur Header / Instructions */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div>
          <h2 className="font-serif font-bold text-base text-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Souffleur-Probemodus
          </h2>
          <p className="text-xs text-stone-400">
            Höre oder lies das Stichwort, sprich deinen Text laut aus und teste, wie sicher du bist.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => setInputMode('speak_aloud')}
            className={`px-3 py-1.5 rounded-lg transition ${
              inputMode === 'speak_aloud'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Laut aufsagen
          </button>
          <button
            onClick={() => setInputMode('type_check')}
            className={`px-3 py-1.5 rounded-lg transition ${
              inputMode === 'type_check'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Tipp-Abfrage
          </button>
        </div>
      </div>

      {/* Cue Card: What the partner says */}
      <div className="bg-stone-900 rounded-2xl p-6 border border-stone-800 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-500">
              Einsatz {currentIndex + 1} von {cards.length}
            </span>
            <SpeakerBadge speaker={card.cueSpeaker} />
            {card.cueStageDirection && (
              <span className="text-xs italic text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded">
                {card.cueStageDirection}
              </span>
            )}
          </div>

          <button
            onClick={playCueAudio}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Stichwort hören</span>
          </button>
        </div>

        <div className="py-2">
          <p className="text-lg sm:text-xl font-serif text-stone-100 leading-relaxed">
            „{card.cueText}“
          </p>
        </div>
      </div>

      {/* Prompter Interaction Area */}
      <div className="bg-stone-900/80 rounded-2xl p-6 border border-stone-800/80 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <SpeakerBadge speaker="Ella" isElla />
            {card.ellaStageDirection && (
              <span className="text-xs italic text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Regie: {card.ellaStageDirection}
              </span>
            )}
          </div>

          <span className="text-xs text-stone-400">
            Länge: {ellaWords.length} Wörter
          </span>
        </div>

        {/* Input Mode: Speak aloud or type */}
        {inputMode === 'type_check' ? (
          <div className="flex flex-col gap-2">
            <label className="text-xs text-stone-400">
              Tippe Ellas Text aus dem Gedächtnis ein:
            </label>
            <textarea
              rows={3}
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Ellas Erwiderung hier eintippen..."
              className="w-full bg-stone-950 text-stone-100 p-3.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-sm font-sans"
            />
            {similarityScore !== null && (
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-stone-400">Wort-Übereinstimmung:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    similarityScore >= 80
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : similarityScore >= 50
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {similarityScore}%
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Speak Aloud mode helper */
          <div className="text-center py-2">
            <p className="text-sm text-stone-300 font-medium">
              Sprich deinen Einsatz jetzt laut aus.
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Bist du dir unsicher? Nutze die Souffleur-Hilfe unten, um dir Wort für Wort vorsagen zu lassen!
            </p>
          </div>
        )}

        {/* Word-by-Word Souffleur Assistant */}
        <div className="flex flex-col gap-2 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Souffleur-Flüsterer:</span>
            <span>
              {revealedWordCount} von {ellaWords.length} Wörtern aufgedeckt
            </span>
          </div>

          <div className="min-h-[50px] flex flex-wrap items-center gap-1.5 p-2 bg-stone-950 rounded-lg border border-stone-800/60">
            {ellaWords.map((word, idx) => {
              const isRevealed = idx < revealedWordCount || isFullAnswerRevealed;
              return (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded text-sm transition-all duration-200 ${
                    isRevealed
                      ? 'bg-amber-500/20 text-amber-200 font-serif font-medium border border-amber-500/30'
                      : 'bg-stone-900 text-stone-600 select-none font-mono text-xs border border-stone-800'
                  }`}
                >
                  {isRevealed ? word : '••••'}
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={handleRevealNextWord}
              disabled={revealedWordCount >= ellaWords.length || isFullAnswerRevealed}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 text-xs font-medium border border-stone-700 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Nächstes Wort einflüstern</span>
            </button>

            <button
              onClick={handleRevealAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium border border-amber-500/40 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ganzen Text prüfen</span>
            </button>

            {isFullAnswerRevealed && (
              <button
                onClick={playEllaAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition ml-auto"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Laut vorlesen</span>
              </button>
            )}
          </div>
        </div>

        {/* Revealed target box if checked */}
        {isFullAnswerRevealed && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-col gap-2 animate-in fade-in">
            <span className="text-xs uppercase font-semibold text-amber-400">
              Originaltext von Ella:
            </span>
            <p className="text-stone-100 font-serif text-base sm:text-lg leading-relaxed">
              „{card.ellaText}“
            </p>

            {/* Assessment buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-amber-500/20 mt-1">
              <span className="text-xs text-stone-400">Wie war dein Einsatz?</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    onRateCard(card.id, 'hard');
                    handleNext();
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 text-xs hover:bg-rose-900 transition"
                >
                  Noch üben
                </button>
                <button
                  onClick={() => {
                    onRateCard(card.id, 'good');
                    handleNext();
                  }}
                  className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 text-xs hover:bg-amber-900 transition"
                >
                  Geht so
                </button>
                <button
                  onClick={() => {
                    onRateCard(card.id, 'mastered');
                    handleNext();
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs hover:bg-emerald-900 transition"
                >
                  Sitzt!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm border border-stone-800 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voriger Einsatz</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm border border-stone-800 transition"
        >
          <span>Nächster Einsatz</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

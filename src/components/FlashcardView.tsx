import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Star,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Repeat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DialogueCard, CardProgress, CardRating, FilterMode } from '../types';
import { SpeakerBadge } from './SpeakerBadge';
import { speakText, stopSpeaking } from '../utils/speech';

interface FlashcardViewProps {
  cards: DialogueCard[];
  progressMap: Record<number, CardProgress>;
  onRateCard: (cardId: number, rating: CardRating) => void;
  onToggleStar: (cardId: number) => void;
  autoPlayCue: boolean;
  selectedSceneFilter: string;
  onSceneFilterChange: (scene: string) => void;
  sceneList: string[];
  initialCardId?: number | null;
  onClearInitialCardId?: () => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  cards,
  progressMap,
  onRateCard,
  onToggleStar,
  autoPlayCue,
  selectedSceneFilter,
  onSceneFilterChange,
  sceneList,
  initialCardId,
  onClearInitialCardId,
}) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Jump to specific card if requested from script view
  useEffect(() => {
    if (initialCardId !== null && initialCardId !== undefined) {
      setFilterMode('all');
      onSceneFilterChange('Alle Szenen');
      const idx = cards.findIndex((c) => c.id === initialCardId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
      onClearInitialCardId?.();
    }
  }, [initialCardId, cards, onSceneFilterChange, onClearInitialCardId]);

  // Filter cards based on active scene filter and mastery filter
  const filteredCards = React.useMemo(() => {
    let result = cards.filter((c) => {
      // Scene check
      if (selectedSceneFilter !== 'Alle Szenen' && !selectedSceneFilter.includes(`Szene ${c.sceneNumber}`)) {
        return false;
      }

      const p = progressMap[c.id];
      if (filterMode === 'hard') return p?.rating === 'hard';
      if (filterMode === 'mastered') return p?.rating === 'mastered';
      if (filterMode === 'unrated') return !p?.rating || p.rating === 'unrated';
      if (filterMode === 'starred') return !!p?.isStarred;
      return true;
    });

    if (isShuffled) {
      // Deterministic shuffle seed or simple shuffle copy
      result = [...result].sort((a, b) => ((a.id * 97) % 23) - ((b.id * 97) % 23));
    }

    return result;
  }, [cards, selectedSceneFilter, filterMode, progressMap, isShuffled]);

  // Adjust index if out of bounds
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(Math.max(0, filteredCards.length - 1));
    }
  }, [filteredCards.length, currentIndex]);

  const currentCard = filteredCards[currentIndex];
  const currentProgress = currentCard ? progressMap[currentCard.id] : undefined;

  // Reset flip & hint when changing cards
  useEffect(() => {
    setIsFlipped(false);
    setHintLevel(0);
    stopSpeaking();
    setIsPlayingAudio(false);

    // Auto-play cue if enabled
    if (autoPlayCue && currentCard) {
      playCueAudio(currentCard);
    }
  }, [currentIndex, currentCard?.id, autoPlayCue]);

  const playCueAudio = useCallback((card: DialogueCard) => {
    setIsPlayingAudio(true);
    speakText(`${card.cueSpeaker} sagt: ${card.cueText}`, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  }, []);

  const playEllaAudio = useCallback((card: DialogueCard) => {
    setIsPlayingAudio(true);
    speakText(`Ella: ${card.ellaText}`, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  }, []);

  const handleNext = useCallback(() => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  const handleRate = useCallback(
    (rating: CardRating) => {
      if (!currentCard) return;
      onRateCard(currentCard.id, rating);
      // Automatically advance to the next card after rating
      handleNext();
    },
    [currentCard, onRateCard, handleNext]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        e.preventDefault();
        handleRate('hard');
      } else if (e.key === '2') {
        e.preventDefault();
        handleRate('good');
      } else if (e.key === '3') {
        e.preventDefault();
        handleRate('mastered');
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setHintLevel((h) => (h + 1) % 4);
      } else if (e.key.toLowerCase() === 's' && currentCard) {
        e.preventDefault();
        if (isFlipped) {
          playEllaAudio(currentCard);
        } else {
          playCueAudio(currentCard);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleRate, currentCard, isFlipped, playCueAudio, playEllaAudio]);

  // Generate Souffleur-Hint string
  const getHintContent = () => {
    if (!currentCard || hintLevel === 0) return null;
    const cleanText = currentCard.ellaText.trim();
    const words = cleanText.split(/\s+/);

    if (hintLevel === 1) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-mono bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <span>Erstes Wort:</span>
          <span className="font-bold underline">{words[0]}...</span>
        </div>
      );
    }

    if (hintLevel === 2) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-mono bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <span>Anfangssatz:</span>
          <span className="font-bold underline">{words.slice(0, 3).join(' ')}...</span>
        </div>
      );
    }

    // Level 3: First letter of every word
    const acronym = words
      .map((w) => {
        const firstChar = w[0];
        const punctuation = w.slice(-1).match(/[,.!?„“]/) ? w.slice(-1) : '';
        return firstChar + (punctuation !== firstChar ? punctuation : '') + ' ';
      })
      .join('');

    return (
      <div className="flex flex-col gap-1 text-xs text-amber-300/90 font-mono bg-amber-950/40 px-3 py-2 rounded-lg border border-amber-500/20">
        <span className="text-stone-400">Anfangsbuchstaben aller Wörter ({words.length} Wörter):</span>
        <span className="font-bold tracking-wider">{acronym}</span>
      </div>
    );
  };

  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-stone-900/60 rounded-2xl border border-stone-800 my-8">
        <Sparkles className="w-12 h-12 text-amber-400 mb-3 opacity-80" />
        <h3 className="text-lg font-semibold text-stone-200 mb-1">Keine Karten gefunden</h3>
        <p className="text-sm text-stone-400 mb-4 max-w-sm">
          Für die gewählten Filter (Szene oder Lernstatus) gibt es aktuell keine Dialogzeilen.
        </p>
        <button
          onClick={() => {
            setFilterMode('all');
            onSceneFilterChange('Alle Szenen');
          }}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold rounded-lg transition"
        >
          Alle Filter zurücksetzen
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 py-4">
      {/* Top Controls: Scene Filter & Status Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/80 p-3 rounded-2xl border border-stone-800 shadow-sm backdrop-blur-sm">
        {/* Scene Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="scene-select" className="text-xs text-stone-400 font-medium">
            Szene:
          </label>
          <select
            id="scene-select"
            value={selectedSceneFilter}
            onChange={(e) => onSceneFilterChange(e.target.value)}
            className="text-xs bg-stone-950 text-stone-200 border border-stone-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            {sceneList.map((scene) => (
              <option key={scene} value={scene}>
                {scene}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterMode === 'all'
                ? 'bg-stone-700 text-white font-medium'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Alle ({cards.length})
          </button>
          <button
            onClick={() => setFilterMode('hard')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              filterMode === 'hard'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 font-medium'
                : 'text-stone-400 hover:text-rose-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Noch üben
          </button>
          <button
            onClick={() => setFilterMode('mastered')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              filterMode === 'mastered'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-medium'
                : 'text-stone-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Sitzt
          </button>
          <button
            onClick={() => setFilterMode('starred')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              filterMode === 'starred'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40 font-medium'
                : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            Favoriten
          </button>
        </div>

        {/* Shuffle Toggle */}
        <button
          onClick={() => setIsShuffled(!isShuffled)}
          title={isShuffled ? 'Zufallswiedergabe: AN' : 'Reihenfolge: Chronologisch'}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition ${
            isShuffled
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-300'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{isShuffled ? 'Gemischt' : 'Chronologisch'}</span>
        </button>
      </div>

      {/* Card Counter & Scene Context */}
      <div className="flex items-center justify-between px-2 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-300">
            Karte {currentIndex + 1} von {filteredCards.length}
          </span>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400">{currentCard.sceneName}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Badge */}
          {currentProgress?.rating === 'mastered' && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sitzt
            </span>
          )}
          {currentProgress?.rating === 'hard' && (
            <span className="inline-flex items-center gap-1 text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> Wiederholen
            </span>
          )}
          {currentProgress?.rating === 'good' && (
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <HelpCircle className="w-3.5 h-3.5" /> Geht so
            </span>
          )}

          {/* Star toggle */}
          <button
            onClick={() => onToggleStar(currentCard.id)}
            title="Zu Favoriten hinzufügen"
            className="p-1 rounded-md text-stone-400 hover:text-amber-400 transition"
          >
            <Star
              className={`w-4 h-4 ${
                currentProgress?.isStarred ? 'text-amber-400 fill-amber-400' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* The Flashcard Container */}
      <div className="relative w-full min-h-[380px] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCard.id}-${isFlipped ? 'back' : 'front'}`}
            initial={{ opacity: 0, rotateY: isFlipped ? 90 : -90, scale: 0.98 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: isFlipped ? -90 : 90, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full min-h-[380px] rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer border shadow-xl select-none transition-colors ${
              isFlipped
                ? 'bg-gradient-to-br from-stone-900 via-amber-950/30 to-stone-900 border-amber-500/40 text-stone-100'
                : 'bg-stone-900/95 border-stone-800 hover:border-stone-700 text-stone-200'
            }`}
          >
            {/* Card Header Info */}
            <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                {isFlipped ? (
                  <SpeakerBadge speaker="Ella" isElla />
                ) : (
                  <SpeakerBadge speaker={currentCard.cueSpeaker} />
                )}

                {/* Stage directions */}
                {!isFlipped && currentCard.cueStageDirection && (
                  <span className="text-xs italic text-stone-400 bg-stone-800/60 px-2 py-0.5 rounded-md border border-stone-700/50">
                    {currentCard.cueStageDirection}
                  </span>
                )}
                {isFlipped && currentCard.ellaStageDirection && (
                  <span className="text-xs italic text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    Regie: {currentCard.ellaStageDirection}
                  </span>
                )}
              </div>

              {/* Audio playback button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFlipped) {
                    playEllaAudio(currentCard);
                  } else {
                    playCueAudio(currentCard);
                  }
                }}
                title={isFlipped ? "Ella's Antwort vorlesen" : 'Stichwort vorlesen'}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-amber-400 animate-pulse' : ''}`} />
                <span className="hidden sm:inline">Vorlesen</span>
              </button>
            </div>

            {/* Card Main Body */}
            <div className="py-6 flex flex-col justify-center items-center text-center my-auto">
              {!isFlipped ? (
                /* FRONT: Cue from partner */
                <div className="flex flex-col items-center max-w-2xl gap-4">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                    Stichwort für Ella
                  </span>
                  <p className="text-lg sm:text-2xl font-serif leading-relaxed text-stone-100">
                    „{currentCard.cueText}“
                  </p>
                  <p className="text-xs text-stone-500 mt-2">
                    Was antwortet Ella jetzt? (Klicken oder Leertaste zum Aufdecken)
                  </p>

                  {/* Souffleur-Hint Display */}
                  {hintLevel > 0 && (
                    <div className="mt-3 animate-in fade-in zoom-in-95 duration-200">
                      {getHintContent()}
                    </div>
                  )}
                </div>
              ) : (
                /* BACK: Ella's Response */
                <div className="flex flex-col items-center max-w-2xl gap-4">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Dein Text (Ella)
                  </span>
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif leading-relaxed text-amber-50 selection:bg-amber-500/30">
                    „{currentCard.ellaText}“
                  </p>
                  <p className="text-xs text-stone-400 mt-2">
                    Wie gut saß dieser Einsatz? Bewerte dich unten (1, 2 oder 3):
                  </p>
                </div>
              )}
            </div>

            {/* Card Bottom: Flip hint or hints toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800/80 text-xs text-stone-500">
              {!isFlipped ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHintLevel((h) => (h + 1) % 4);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium border ${
                      hintLevel > 0
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-stone-800/80 text-stone-400 border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>
                      {hintLevel === 0 && 'Souffleur-Tipp (H)'}
                      {hintLevel === 1 && 'Tipp 1/3: Erstes Wort'}
                      {hintLevel === 2 && 'Tipp 2/3: Erste 3 Wörter'}
                      {hintLevel === 3 && 'Tipp 3/3: Anfangsbuchstaben'}
                    </span>
                  </button>

                  <span className="flex items-center gap-1 text-stone-400">
                    <span>Einsatz aufdecken</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </>
              ) : (
                <>
                  <span className="text-stone-400">
                    Klicke die Karte, um das Stichwort nochmals zu sehen
                  </span>
                  <span className="text-amber-400 font-medium flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> Umdrehen
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Rating Buttons (When flipped or practicing) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900/80 p-3 rounded-2xl border border-stone-800">
        {/* Previous Card */}
        <button
          onClick={handlePrev}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium border border-stone-700 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Zurück (←)</span>
        </button>

        {/* Rating Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <button
            onClick={() => handleRate('hard')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/60 text-xs sm:text-sm font-medium transition shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Noch unsicher</span>
            <kbd className="hidden sm:inline text-[10px] bg-rose-900/60 px-1.5 py-0.5 rounded border border-rose-700 text-rose-300">1</kbd>
          </button>

          <button
            onClick={() => handleRate('good')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-800/60 text-xs sm:text-sm font-medium transition shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Geht so</span>
            <kbd className="hidden sm:inline text-[10px] bg-amber-900/60 px-1.5 py-0.5 rounded border border-amber-700 text-amber-300">2</kbd>
          </button>

          <button
            onClick={() => handleRate('mastered')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/60 text-xs sm:text-sm font-medium transition shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Sitzt!</span>
            <kbd className="hidden sm:inline text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-700 text-emerald-300">3</kbd>
          </button>
        </div>

        {/* Next Card */}
        <button
          onClick={handleNext}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium border border-stone-700 transition"
        >
          <span>Weiter (→)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint Footnote */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-stone-500 text-center pt-1">
        <span><kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">Leertaste</kbd> Aufdecken</span>
        <span><kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">H</kbd> Souffleur-Tipp</span>
        <span><kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">S</kbd> Vorlesen</span>
        <span><kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">1</kbd> <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">2</kbd> <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">3</kbd> Bewerten</span>
        <span><kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">←</kbd> <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-stone-400">→</kbd> Navigieren</span>
      </div>
    </div>
  );
};

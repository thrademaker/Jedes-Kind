import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FlashcardView } from './components/FlashcardView';
import { ScriptView } from './components/ScriptView';
import { SouffleurMode } from './components/SouffleurMode';
import { DIALOGUE_CARDS, SCENE_NAMES } from './data/dialogues';
import { CardProgress, CardRating, ViewMode } from './types';

const STORAGE_KEY = 'ella_flashcards_progress_v1';
const AUTOPLAY_KEY = 'ella_flashcards_autoplay_cue';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('flashcards');
  const [selectedSceneFilter, setSelectedSceneFilter] = useState<string>('Alle Szenen');
  const [progressMap, setProgressMap] = useState<Record<number, CardProgress>>({});
  const [autoPlayCue, setAutoPlayCue] = useState<boolean>(false);
  const [targetPracticeCardId, setTargetPracticeCardId] = useState<number | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgressMap(JSON.parse(saved));
      }
      const savedAutoplay = localStorage.getItem(AUTOPLAY_KEY);
      if (savedAutoplay !== null) {
        setAutoPlayCue(JSON.parse(savedAutoplay));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save progress
  const saveProgress = (newMap: Record<number, CardProgress>) => {
    setProgressMap(newMap);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
    } catch {
      // Ignore
    }
  };

  const handleRateCard = (cardId: number, rating: CardRating) => {
    const existing = progressMap[cardId] || { rating: 'unrated', reviewCount: 0 };
    const updated: Record<number, CardProgress> = {
      ...progressMap,
      [cardId]: {
        ...existing,
        rating,
        reviewCount: (existing.reviewCount || 0) + 1,
        lastReviewed: Date.now(),
      },
    };
    saveProgress(updated);
  };

  const handleToggleStar = (cardId: number) => {
    const existing = progressMap[cardId] || { rating: 'unrated', reviewCount: 0 };
    const updated: Record<number, CardProgress> = {
      ...progressMap,
      [cardId]: {
        ...existing,
        isStarred: !existing.isStarred,
      },
    };
    saveProgress(updated);
  };

  const handleResetProgress = () => {
    if (window.confirm('Möchtest du deinen gesamten Lernfortschritt wirklich auf 0 zurücksetzen?')) {
      saveProgress({});
    }
  };

  const handleToggleAutoPlayCue = () => {
    const next = !autoPlayCue;
    setAutoPlayCue(next);
    try {
      localStorage.setItem(AUTOPLAY_KEY, JSON.stringify(next));
    } catch {
      // Ignore
    }
  };

  const handlePracticeCard = (cardId: number) => {
    setTargetPracticeCardId(cardId);
    setCurrentView('flashcards');
  };

  const masteredCount = Object.values(progressMap).filter(
    (p) => p.rating === 'mastered'
  ).length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-100">
      {/* Header with Navigation and Progress */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        masteredCount={masteredCount}
        totalCards={DIALOGUE_CARDS.length}
        autoPlayCue={autoPlayCue}
        onToggleAutoPlayCue={handleToggleAutoPlayCue}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === 'flashcards' && (
          <FlashcardView
            cards={DIALOGUE_CARDS}
            progressMap={progressMap}
            onRateCard={handleRateCard}
            onToggleStar={handleToggleStar}
            autoPlayCue={autoPlayCue}
            selectedSceneFilter={selectedSceneFilter}
            onSceneFilterChange={setSelectedSceneFilter}
            sceneList={SCENE_NAMES}
            initialCardId={targetPracticeCardId}
            onClearInitialCardId={() => setTargetPracticeCardId(null)}
          />
        )}

        {currentView === 'souffleur' && (
          <SouffleurMode
            cards={DIALOGUE_CARDS}
            progressMap={progressMap}
            onRateCard={handleRateCard}
          />
        )}

        {currentView === 'script' && (
          <ScriptView
            cards={DIALOGUE_CARDS}
            progressMap={progressMap}
            onPracticeCard={handlePracticeCard}
            onToggleStar={handleToggleStar}
          />
        )}
      </main>

      {/* Subtle Theater Footer */}
      <footer className="w-full border-t border-stone-900 bg-stone-950/80 py-4 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Musical Rollen-Trainer: Ella • 24 Dialogkarten (4 Szenen)</span>
          <span className="text-stone-400">
            Tipp: Nutze die Leertaste zum schnellen Aufdecken und Pfeiltasten zum Weiterschalten
          </span>
        </div>
      </footer>
    </div>
  );
}

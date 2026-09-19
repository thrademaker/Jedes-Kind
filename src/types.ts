export type CardRating = 'unrated' | 'hard' | 'good' | 'mastered';

export interface DialogueCard {
  id: number;
  cueSpeaker: string;
  cueStageDirection?: string;
  cueText: string;
  cueRaw: string;
  ellaStageDirection?: string;
  ellaText: string;
  ellaRaw: string;
  sceneName: string;
  sceneNumber: number;
}

export interface CardProgress {
  rating: CardRating;
  reviewCount: number;
  lastReviewed?: number;
  isStarred?: boolean;
}

export type ViewMode = 'flashcards' | 'script' | 'souffleur';

export type FilterMode = 'all' | 'unrated' | 'hard' | 'mastered' | 'starred';

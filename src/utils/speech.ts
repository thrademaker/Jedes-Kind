/**
 * Web Speech Synthesis helper for rehearsing lines
 */

export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: () => void;
  }
) {
  if (!('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip stage directions like (schnauft) or (lacht) for natural speech playback if desired
  const cleanedText = text.replace(/\([^)]*\)/g, '').trim();
  if (!cleanedText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = 'de-DE';
  utterance.rate = options?.rate ?? 0.95; // slightly deliberate pace for rehearsal
  utterance.pitch = options?.pitch ?? 1.0;

  // Try to find a German voice
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find((v) => v.lang.startsWith('de')) || voices.find((v) => v.lang.includes('DE'));
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  if (options?.onEnd) {
    utterance.onend = () => options.onEnd?.();
  }
  if (options?.onError) {
    utterance.onerror = () => options.onError?.();
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

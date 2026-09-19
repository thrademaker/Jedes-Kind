import React from 'react';

interface SpeakerBadgeProps {
  speaker: string;
  isElla?: boolean;
}

export const SpeakerBadge: React.FC<SpeakerBadgeProps> = ({ speaker, isElla = false }) => {
  if (isElla) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        Ella (Deine Rolle)
      </span>
    );
  }

  const s = speaker.toLowerCase().trim();

  let style = 'bg-sky-500/15 text-sky-300 border-sky-500/30';
  if (s.includes('timmi')) {
    style = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
  } else if (s.includes('matze')) {
    style = 'bg-orange-500/15 text-orange-300 border-orange-500/30';
  } else if (s.includes('bibi') || s.includes('bibiana')) {
    style = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
  } else if (s.includes('neumann')) {
    style = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  } else if (s.includes('shari')) {
    style = 'bg-teal-500/15 text-teal-300 border-teal-500/30';
  } else if (s.includes('alle')) {
    style = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border ${style}`}>
      Stichwort von: {speaker}
    </span>
  );
};

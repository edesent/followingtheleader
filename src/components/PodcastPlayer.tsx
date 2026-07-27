"use client";

import { useRef, useState } from "react";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/** Compact custom audio player for the featured podcast episode. */
export default function PodcastPlayer({
  src,
  title,
  blurb,
}: {
  src: string;
  title: string;
  blurb?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current;
    if (!a || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * dur;
    setCur(a.currentTime);
  }

  const pct = dur ? (cur / dur) * 100 : 0;

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-7">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause episode" : "Play episode"}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-dawn text-ink shadow-lg transition-transform hover:scale-105"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold leading-snug text-white">{title}</p>
          {blurb && <p className="mt-1 text-sm leading-snug text-white/60">{blurb}</p>}
        </div>
      </div>

      <div className="mt-5">
        <div
          onClick={seek}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur)}
          aria-valuenow={Math.round(cur)}
          className="h-2 cursor-pointer rounded-full bg-white/15"
        >
          <div className="h-full rounded-full bg-dawn" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs tabular-nums text-white/55">
          <span>{fmt(cur)}</span>
          <span>{fmt(dur)}</span>
        </div>
      </div>
    </div>
  );
}

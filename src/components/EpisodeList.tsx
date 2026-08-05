"use client";

import { useRef, useState } from "react";
import type { Episode } from "@/lib/podcast";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

/**
 * Recent podcast episodes, read live from the feed (see lib/podcast.ts).
 *
 * One shared <audio> element drives the whole list, so starting a new episode
 * stops the previous one instead of two devotionals playing over each other.
 */
export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  function toggle(i: number) {
    const a = audioRef.current;
    if (!a) return;
    if (active === i) {
      if (a.paused) {
        void a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
      return;
    }
    setActive(i);
    setCur(0);
    setDur(0);
    a.src = episodes[i].audioUrl;
    void a.play();
    setPlaying(true);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current;
    if (!a || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * dur;
    setCur(a.currentTime);
  }

  return (
    <div>
      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />

      <ul className="space-y-3">
        {episodes.map((ep, i) => {
          const isActive = active === i;
          const isPlaying = isActive && playing;
          const pct = isActive && dur ? (cur / dur) * 100 : 0;
          return (
            <li
              key={ep.link || ep.audioUrl}
              className={`rounded-2xl border bg-paper p-5 transition-colors sm:p-6 ${
                isActive ? "border-dawn-deep/40 shadow-sm" : "border-hair"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={isPlaying ? `Pause ${ep.title}` : `Play ${ep.title}`}
                  className="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-dawn-deep text-white shadow-md transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-0.5" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {ep.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {ep.dateLabel}
                    {ep.duration && (
                      <>
                        <span className="mx-2 text-hair-2">·</span>
                        {ep.duration}
                      </>
                    )}
                  </p>
                  {ep.summary && (
                    <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-body">
                      {ep.summary}
                    </p>
                  )}
                </div>
              </div>

              {isActive && (
                <div className="mt-4">
                  <div
                    onClick={seek}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(dur)}
                    aria-valuenow={Math.round(cur)}
                    className="h-1.5 cursor-pointer rounded-full bg-cream-2"
                  >
                    <div className="h-full rounded-full bg-dawn-deep" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs tabular-nums text-muted">
                    <span>{fmt(cur)}</span>
                    <span>{fmt(dur)}</span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

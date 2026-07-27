"use client";

import { useRef, useState } from "react";

/**
 * Self-hosted (Vercel Blob) intro video. Shows a poster with a play button and
 * only starts loading the video once clicked — keeps the hero fast.
 */
export default function HeroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-2xl shadow-ink/25">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full"
        src={playing ? src : undefined}
        poster={poster}
        controls={playing}
        playsInline
        preload="none"
      />
      {!playing && (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            // start playback once the source is attached
            requestAnimationFrame(() => ref.current?.play());
          }}
          aria-label={label}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <span className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/20" />
          <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-xl shadow-ink/30 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-dawn-deep" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

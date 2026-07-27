"use client";

import { useState } from "react";

/**
 * A lightweight YouTube player. Shows the video's thumbnail with a play button
 * and only loads the actual player once clicked — keeps the page fast.
 */
export default function VideoEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-2xl shadow-ink/25">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            aria-hidden
            className="h-full w-full scale-[1.35] object-cover transition-transform duration-500 group-hover:scale-[1.4]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-ink/20 transition-colors group-hover:from-ink/50" />
          <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-xl shadow-ink/30 transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-8 w-8 fill-dawn-deep"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Muted looping clip that only plays while visible (rule 16) and never
 * autoplays under reduced motion: then it shows the poster and a play button.
 */
export const LoopVideo: React.FC<{
  src: string;
  poster: string;
  label: string;
  className?: string;
  eager?: boolean;
}> = ({ src, poster, label, className = "", eager = false }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [userPlay, setUserPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const canPlay = !reduced || userPlay;
        if (entry.isIntersecting && canPlay) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, userPlay]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <video
        ref={video}
        poster={poster}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      </video>
      {reduced && !playing && (
        <button
          type="button"
          onClick={() => {
            setUserPlay(true);
            video.current?.play().catch(() => {});
          }}
          className="absolute inset-0 grid place-items-center bg-ink/10"
          aria-label={`Reproducir: ${label}`}
        >
          <span className="grid place-items-center w-14 h-14 rounded-full bg-canvas/95 shadow-raised">
            <Play className="w-6 h-6 fill-ink text-ink ml-0.5" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
};

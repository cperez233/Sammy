/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import { LQIP } from "../lib/lqip";

/** An <img> that fades in once decoded, over the blurred preview painted by its frame. */
export const FadeImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className = "", onLoad, ...props }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  // The prerendered image can finish before hydration, so check once on mount too
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth) setLoaded(true);
  }, []);
  return (
    <img
      ref={ref}
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
};

/**
 * Playback coordinator: decoding several clips at once is what made the
 * gallery stutter on phones, so only the most visible ones play (2 on phones
 * and tablets, 3 on desktop) and the rest wait on their current frame.
 */
type Slot = { ratio: number; allowed: boolean; priority: boolean };
const visible = new Map<HTMLVideoElement, Slot>();
function schedule() {
  const max = window.matchMedia("(min-width: 1024px)").matches ? 3 : 2;
  const candidates = [...visible.entries()].filter(([, s]) => s.allowed && s.ratio >= 0.5);
  // The hero clip and the open viewer outrank the gallery behind them
  const top = candidates.some(([, s]) => s.priority) ? candidates.filter(([, s]) => s.priority) : candidates;
  const ranked = top
    .sort((a, b) => b[1].ratio - a[1].ratio)
    .slice(0, max)
    .map(([v]) => v);
  visible.forEach((_, v) => {
    if (ranked.includes(v)) {
      if (v.paused) v.play().catch(() => {});
    } else if (!v.paused) v.pause();
  });
}

/**
 * Muted looping clip in three layers so the frame is never empty: a blurred
 * preview (inline, instant), the poster (fades in when it arrives) and the
 * video (fades in only once it is actually playing). It starts downloading
 * one screen before it is reached, plays only while half of it is visible
 * (rule 16) and never autoplays under reduced motion.
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
  const [shown, setShown] = useState(false);

  // Warm up: start buffering about one screen ahead
  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v || eager) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        v.preload = "auto";
        v.load();
        io.disconnect();
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  // Play only while at least half of the clip is on screen, and only if it is among the most visible
  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;
    const allowed = !reduced || userPlay;
    visible.set(v, { ratio: 0, allowed, priority: eager });
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.set(v, { ratio: entry.isIntersecting ? entry.intersectionRatio : 0, allowed, priority: eager });
        schedule();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      visible.delete(v);
      v.pause();
      schedule();
    };
  }, [reduced, userPlay, eager]);

  const preview = LQIP[poster];

  return (
    <div
      ref={wrap}
      style={preview ? { backgroundImage: `url(${preview})` } : undefined}
      className={`relative overflow-hidden bg-cover bg-center ${className}`}
    >
      <FadeImg
        src={poster}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={video}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
        aria-label={label}
        onPlaying={() => {
          setPlaying(true);
          setShown(true);
        }}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
          shown ? "opacity-100" : "opacity-0"
        }`}
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

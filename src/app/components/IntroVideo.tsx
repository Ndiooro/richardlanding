import { useCallback, useEffect, useRef, useState } from "react";
import { SkipForward } from "lucide-react";

interface IntroVideoProps {
  onComplete: () => void;
  videoUrl?: string;
}

export function IntroVideo({ onComplete, videoUrl = "/intro.mp4" }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFadingRef = useRef(false);
  const [isFading, setIsFading] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const handleComplete = useCallback(() => {
    if (isFadingRef.current) return;

    if (introTimerRef.current) {
      clearTimeout(introTimerRef.current);
    }

    isFadingRef.current = true;
    setIsFading(true);
    closeTimerRef.current = setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch(() => {
      });
    }

    introTimerRef.current = setTimeout(handleComplete, 6000);

    return () => {
      if (introTimerRef.current) {
        clearTimeout(introTimerRef.current);
      }

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Introduction Richard AI"
      aria-modal="true"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleComplete}
        onError={() => {
          setHasVideoError(true);
          handleComplete();
        }}
        className="h-auto max-h-[78svh] w-full object-contain sm:h-[92svh] sm:max-h-none sm:w-[92vw] sm:object-contain"
      />

      {hasVideoError && (
        <p className="absolute left-6 top-6 max-w-xs text-sm text-white/70">
          La vidéo d’introduction n’est pas disponible.
        </p>
      )}

      <button
        type="button"
        onClick={handleComplete}
        className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-5 sm:top-5 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        Passer l’intro
        <SkipForward size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

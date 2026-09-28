"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface ScrollTriggeredVideoProps {
  src?: string;
  poster?: string;
  className?: string;
}

export default function ScrollTriggeredVideo({ 
  src = "/demo.mp4", 
  poster = "/demo-thumbnail.jpg",
  className = "w-full h-auto aspect-video object-cover" 
}: ScrollTriggeredVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We try to play immediately if it's already visible on mount/reload
    // The observer handles the scroll-based play/pause
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setHasStarted(true)).catch(() => {
            // Silently fail if blocked by browser
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 } // Lowered threshold so it plays more reliably on reload/entry
    );

    observer.observe(video);
    
    // Also try to play once on mount if we're somehow already in view 
    // or if the observer is delayed.
    const checkVisibilityAndPlay = () => {
      const rect = video.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        video.play().then(() => setHasStarted(true)).catch(() => {});
      }
    };
    checkVisibilityAndPlay();

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        playsInline
        preload="metadata"
        loop // Added loop property as requested
        autoPlay // Added autoPlay attribute to help with reload autoplay policies
        className={className}
      />

      {hasStarted && (
        <button
          onClick={() => setIsMuted((m) => !m)}
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 
                     flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      )}
    </div>
  );
}

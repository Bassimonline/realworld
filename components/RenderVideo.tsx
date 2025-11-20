// src/components/VideoOnlySection.tsx
import { useEffect, useRef } from "react";
import globe from "../newVideo/globe.webm"; // your new file

// bump this string whenever you replace the video to defeat caches
const CACHE_BUST = "2025-08-21-2";

const RenderVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const url = `${globe}?v=${CACHE_BUST}`; // forces a fresh URL
  // key={url} will remount the <video> when url changes

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const play = () => el.play().catch(() => {});
    play();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : el.pause()),
      { threshold: 0.1 }
    );
    io.observe(el);

    const onLoaded = () => {
      // helpful debug: verify which URL actually loaded
      // eslint-disable-next-line no-console
      console.log("Video loaded:", el.currentSrc);
    };
    el.addEventListener("loadedmetadata", onLoaded);

    return () => {
      io.disconnect();
      el.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  return (
    <section className="w-full py-6 sm:py-8">
      <div className="relative mx-auto max-w-[1059px] overflow-hidden rounded-2xl bg-black">
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px]">
          <video
            key={url}
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={url} type="video/webm" />
            {/* If you also have an mp4 fallback, add it here:
            <source src={mp4Url} type="video/mp4" />
            */}
          </video>
          {/* Optional subtle overlay for contrast */}
          {/* <div className="absolute inset-0 bg-black/10 pointer-events-none" /> */}
        </div>
      </div>
    </section>
  );
};

export default RenderVideo;

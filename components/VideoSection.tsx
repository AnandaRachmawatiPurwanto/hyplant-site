"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/**
 * Right after the intro: the HyPlant video. It plays on its own (muted, looping) while on screen and pauses when
 * scrolled away. The control bar has play/pause, a seek slider, the time, and sound on/off.
 * Once the viewer pauses it themselves, scrolling back does not restart it.
 */
export function VideoSection() {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // The metadata can load before React attaches its handlers, so read the length once here too.
    if (video.readyState >= 1) setDuration(video.duration);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.4, 1] }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seek = (value: number) => {
    const video = ref.current;
    if (!video) return;
    video.currentTime = value;
    setTime(value);
  };

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <section id="video" className="video-section" aria-label="Video HyPlant">
      <div className="wrap video-inner">
        <div className="video-head reveal">
          <p className="eyebrow">Kenalan dalam 1 menit</p>
          <h2>Telat cek tandon sekali, <span className="hl">layu semua</span>.</h2>
          <p className="lead">Lihat bagaimana HyPlant menjaga larutan nutrisi tetap pas, tanpa harus bolak-balik mengecek tandon.</p>
        </div>

        <div className={`video-frame ${playing ? "is-playing" : "is-paused"}`}>
          <video
            ref={ref}
            src="/video/hyplant.mp4"
            poster="/video/poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Video pengenalan HyPlant"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          />

          <div className="video-bar">
            <button className="vbtn" onClick={togglePlay} aria-label={playing ? "Jeda video" : "Putar video"}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                {playing
                  ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
                  : <path d="M8 5.5v13l11-6.5z" fill="currentColor" />}
              </svg>
            </button>

            <input
              className="video-seek"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Posisi video"
              aria-valuetext={`${fmt(time)} dari ${fmt(duration)}`}
              style={{ "--p": `${progress}%` } as React.CSSProperties}
            />

            <span className="video-time">{fmt(time)} / {fmt(duration)}</span>

            <button className="vbtn" onClick={toggleSound} aria-label={muted ? "Nyalakan suara" : "Matikan suara"} aria-pressed={!muted}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
                {muted
                  ? <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

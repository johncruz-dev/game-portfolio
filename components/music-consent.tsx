"use client";

import { Button } from "@/components/ui/button";
import {
  LOADER_HIDDEN_EVENT,
  registerMusicModalTrigger,
} from "@/lib/loading";
import {
  BACKGROUND_MUSIC_SRC,
  createBackgroundAudio,
  getBackgroundAudio,
} from "@/lib/preload-assets";
import { cn } from "@/lib/utils";
import { Music2, VolumeX } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export { BACKGROUND_MUSIC_SRC };

const glowText = {
  textShadow:
    "0 0 8px rgb(243, 230, 0), 0 0 20px rgba(243, 230, 0, 0.65), 0 0 36px rgba(243, 230, 0, 0.3)",
};

function getPlaybackErrorMessage(error: unknown, audio: HTMLAudioElement) {
  if (audio.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
    return "Music file not found. Add bacgkround-music.mp3 to the public/ folder.";
  }
  if (audio.error?.code === MediaError.MEDIA_ERR_NETWORK) {
    return "Network error while loading the music file. Refresh and try again.";
  }

  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Browser blocked playback. Click Enable music once more.";
    }
    if (error.name === "NotSupportedError") {
      return "This browser does not support the audio file format.";
    }
    return error.message;
  }

  return "Could not start playback. Check your browser audio settings.";
}

export function MusicConsent() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback(() => {
    setError(null);
    setVisible(true);
  }, []);

  useLayoutEffect(() => {
    return registerMusicModalTrigger(openModal);
  }, [openModal]);

  useEffect(() => {
    const onLoaderHidden = () => {
      window.setTimeout(openModal, 100);
    };

    window.addEventListener(LOADER_HIDDEN_EVENT, onLoaderHidden);
    return () => window.removeEventListener(LOADER_HIDDEN_EVENT, onLoaderHidden);
  }, [openModal]);

  const startPlayback = () => {
    const audio = audioRef.current ?? createBackgroundAudio();
    audioRef.current = audio;

    if (audio.error) {
      setError(getPlaybackErrorMessage(null, audio));
      return;
    }

    audio.volume = 0.35;
    audio.loop = true;

    if (audio.readyState === 0) {
      audio.load();
    }

    const playPromise = audio.play();

    if (!playPromise) {
      setPlaying(true);
      setVisible(false);
      setError(null);
      return;
    }

    playPromise
      .then(() => {
        setPlaying(true);
        setVisible(false);
        setError(null);
      })
      .catch((playError) => {
        setError(getPlaybackErrorMessage(playError, audio));
      });
  };

  const handleDecline = () => {
    const audio = audioRef.current ?? getBackgroundAudio();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setVisible(false);
    setError(null);
  };

  const handleStop = () => {
    const audio = audioRef.current ?? getBackgroundAudio();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="music-consent-title"
          aria-describedby="music-consent-desc"
        >
          <div
            className={cn(
              "relative w-full max-w-md border-2 border-[#f3e600]/70 bg-black p-6 sm:p-8",
              "shadow-[0_0_28px_rgba(243,230,0,0.35),0_0_56px_rgba(243,230,0,0.15),inset_0_0_24px_rgba(243,230,0,0.06)]"
            )}
            style={{
              clipPath:
                "polygon(16px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
              animation: "loader-pulse-glow 2.8s ease-in-out infinite",
            }}
          >
            <span
              className="absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-[#f3e600]"
              aria-hidden
            />
            <span
              className="absolute -top-1 -right-1 size-3 border-t-2 border-r-2 border-[#f3e600]"
              aria-hidden
            />

            <div className="mb-6 flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center border border-[#f3e600]/50 bg-[#f3e600]/10">
                <Music2 className="size-5 text-[#f3e600]" />
              </div>
              <div className="space-y-2">
                <p
                  id="music-consent-title"
                  className="font-display text-lg uppercase tracking-tight text-foreground"
                  style={glowText}
                >
                  Audio Signal Detected
                </p>
                <p
                  id="music-consent-desc"
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  This site includes ambient background music. Enable it for the
                  full experience, or continue silently.
                </p>
              </div>
            </div>

            {error && (
              <p className="mb-4 font-mono text-xs text-red-400">{error}</p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                className="flex-1"
                onPointerDown={(event) => {
                  event.preventDefault();
                  startPlayback();
                }}
              >
                <Music2 className="size-4" />
                Enable music
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleDecline}
              >
                <VolumeX className="size-4" />
                Continue silently
              </Button>
            </div>
          </div>
        </div>
      )}

      {playing && !visible && (
        <button
          type="button"
          onClick={handleStop}
          className="fixed bottom-4 right-4 z-40 flex size-10 items-center justify-center border border-[#f3e600]/40 bg-black/80 text-[#f3e600] backdrop-blur-sm transition-colors hover:border-[#f3e600] hover:bg-[#f3e600]/10"
          aria-label="Mute background music"
          title="Mute music"
        >
          <VolumeX className="size-4" />
        </button>
      )}
    </>
  );
}

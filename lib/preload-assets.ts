export const BACKGROUND_MUSIC_SRC = "/bacgkround-music.mp3";

const IMAGE_ASSETS = [
  "/project-placeholder-1.jpg",
  "/project-placeholder-2.jpg",
  "/project-placeholder-3.jpg",
] as const;

let backgroundAudio: HTMLAudioElement | null = null;
let preloadPromise: Promise<void> | null = null;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Failed to load ${src}`));
    image.src = src;
  });
}

export function preloadSiteAssets(
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  if (preloadPromise) return preloadPromise;

  const tasks = IMAGE_ASSETS.map((src) => preloadImage(src));
  const total = tasks.length;
  let loaded = 0;

  preloadPromise = Promise.all(
    tasks.map((task) =>
      task
        .then(() => {
          loaded += 1;
          onProgress?.(loaded, total);
        })
        .catch(() => {
          loaded += 1;
          onProgress?.(loaded, total);
        })
    )
  ).then(() => undefined);

  return preloadPromise;
}

export function getBackgroundAudio() {
  return backgroundAudio;
}

export function createBackgroundAudio() {
  if (backgroundAudio) return backgroundAudio;

  const audio = new Audio();
  audio.preload = "none";
  audio.src = BACKGROUND_MUSIC_SRC;
  backgroundAudio = audio;
  return audio;
}

export function isSiteAssetsPreloaded() {
  return preloadPromise !== null;
}

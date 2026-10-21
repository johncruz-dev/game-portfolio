export const LOADING_COMPLETE_EVENT = "app:loading-complete";
export const LOADER_HIDDEN_EVENT = "app:loader-hidden";

/** Minimum time the loading screen stays visible. */
export const MIN_LOADING_DURATION_MS = 5_000;

type LoaderHiddenListener = () => void;

let loadingComplete = false;
const loaderHiddenListeners = new Set<LoaderHiddenListener>();
let musicModalTrigger: (() => void) | null = null;

export function resetLoadingSession() {
  loadingComplete = false;
}

export function markLoadingComplete() {
  if (typeof window === "undefined" || loadingComplete) return;
  loadingComplete = true;
  window.dispatchEvent(new CustomEvent(LOADING_COMPLETE_EVENT));
}

export function isLoadingComplete() {
  return loadingComplete;
}

export function registerMusicModalTrigger(trigger: () => void) {
  musicModalTrigger = trigger;
  return () => {
    if (musicModalTrigger === trigger) musicModalTrigger = null;
  };
}

export function subscribeLoaderHidden(listener: LoaderHiddenListener) {
  loaderHiddenListeners.add(listener);
  return () => loaderHiddenListeners.delete(listener);
}

export function markLoaderHidden() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LOADER_HIDDEN_EVENT));
  loaderHiddenListeners.forEach((listener) => listener());
  musicModalTrigger?.();
}

export function showMusicModal() {
  musicModalTrigger?.();
}

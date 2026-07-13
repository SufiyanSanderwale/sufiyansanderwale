import buttonSound from "@/assets/sounds/button sound effect.mp3";
import navSound from "@/assets/sounds/navBar buttun sound.mp3";
import certSlideSound from "@/assets/sounds/certificate arrow to slid.mp3";

let clickAudio: HTMLAudioElement | null = null;
let navAudio: HTMLAudioElement | null = null;
let certSlideAudio: HTMLAudioElement | null = null;

// Preload the audio if running in browser
if (typeof window !== "undefined") {
  try {
    certSlideAudio = new Audio(certSlideSound);
    certSlideAudio.preload = "auto";
    certSlideAudio.volume = 0.35;
  } catch (e) {
    console.warn("Failed to preload audio assets:", e);
  }
}

/**
 * Plays the button click sound effect.
 * It reuses a single Audio instance for better performance.
 */
export function playClickSound() {
  try {
    if (typeof window === "undefined") return;

    if (!clickAudio) {
      clickAudio = new Audio(buttonSound);
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      clickAudio.volume = isMobile ? 1.2 : 0.37; // pleasant, balanced volume level
    } else {
      // Reset playback position if it's already playing or finished
      clickAudio.currentTime = 0;
    }

    clickAudio.play().catch((err) => {
      // Browsers often block sound play before user interaction
      console.debug("Audio playback postponed until user interaction:", err.message);
    });
  } catch (error) {
    console.warn("Failed to initialize sound playback:", error);
  }
}

/**
 * Plays the navigation click sound effect.
 * It reuses a single Audio instance for better performance.
 */
export function playNavClickSound() {
  try {
    if (typeof window === "undefined") return;

    if (!navAudio) {
      navAudio = new Audio(navSound);
      navAudio.volume = 0.19; // pleasant, balanced volume level
    } else {
      // Reset playback position if it's already playing or finished
      navAudio.currentTime = 0;
    }

    navAudio.play().catch((err) => {
      // Browsers often block sound play before user interaction
      console.debug("Navigation audio playback postponed until user interaction:", err.message);
    });
  } catch (error) {
    console.warn("Failed to initialize navigation sound playback:", error);
  }
}

/**
 * Plays the certificate carousel arrow slide sound effect.
 * It reuses a single Audio instance and restarts cleanly for rapid clicks.
 */
export function playCertSlideSound() {
  try {
    if (!certSlideAudio) {
      if (typeof window === "undefined") return;
      certSlideAudio = new Audio(certSlideSound);
      certSlideAudio.preload = "auto";
      certSlideAudio.volume = 0.35;
    } else {
      // Reset playback position so that rapid clicks restart cleanly
      certSlideAudio.currentTime = 0;
    }

    certSlideAudio.play().catch((err) => {
      console.debug("Certificate slide audio playback postponed:", err.message);
    });
  } catch (error) {
    console.warn("Failed to play certificate slide sound:", error);
  }
}

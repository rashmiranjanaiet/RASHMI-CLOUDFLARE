/**
 * Simple Global Audio Manager for background music
 */

let bgMusicAudio = null;
let isMuted = false;
let bgMusicStarted = false;
let globalVolume = 0.5;
let storageListenerInstalled = false;

const syncBackgroundAudio = () => {
    if (typeof window === 'undefined') return;
    isMuted = localStorage.getItem('audio_muted') === 'true';
    const savedVolume = Number.parseFloat(localStorage.getItem('audio_volume'));
    if (Number.isFinite(savedVolume)) globalVolume = Math.max(0, Math.min(1, savedVolume));
    if (bgMusicAudio) {
        bgMusicAudio.muted = isMuted;
        bgMusicAudio.volume = 0.3 * globalVolume;
        const owner = localStorage.getItem('audio_owner');
        if (owner && owner !== 'ppmake') {
            bgMusicAudio.pause();
        } else if (bgMusicStarted && !isMuted && bgMusicAudio.paused) {
            bgMusicAudio.play().catch(() => {});
        }
    }
};

// Initialize background music
export const initAudio = () => {
    if (typeof window === 'undefined') return;

    // Sync muted state from localStorage (same key as AudioManager context)
    syncBackgroundAudio();

    if (!bgMusicAudio) {
        // We use the file provided by the user in public/sounds/
        bgMusicAudio = new Audio('/sounds/cfl_turningpages-belem-breeze-487596.ogg');
        bgMusicAudio.preload = 'auto'; // Force browser to fetch data immediately
        bgMusicAudio.loop = true;
        bgMusicAudio.volume = 0.3 * globalVolume; // Respect the shared PPMake volume
        bgMusicAudio.muted = isMuted; // Apply synced mute state

        // Trigger background load
        bgMusicAudio.load();
    }

    if (!storageListenerInstalled) {
        window.addEventListener('storage', (event) => {
            if (['audio_muted', 'audio_volume', 'audio_owner'].includes(event.key)) {
                syncBackgroundAudio();
            }
        });
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin || event.source !== window.parent) return;
            if (!event.data || event.data.type !== 'PPMAKE_AUDIO_OWNER') return;
            if (event.data.owner === 'ppmake') {
                syncBackgroundAudio();
                bgMusicStarted = true;
                if (!isMuted && bgMusicAudio && bgMusicAudio.paused) {
                    bgMusicAudio.play().catch(() => {});
                }
            } else {
                pauseBackgroundMusic();
            }
        });
        storageListenerInstalled = true;
    }
};

export const playBackgroundMusic = () => {
    initAudio();
    bgMusicStarted = true;
    const owner = localStorage.getItem('audio_owner');
    const canPlay = !isMuted && (!owner || owner === 'ppmake');
    if (bgMusicAudio && bgMusicAudio.paused && canPlay) {
        // Only play if not muted and it's currently paused
        bgMusicAudio.play().catch((err) => {
            console.warn('Audio play failed/blocked by browser:', err);
        });
    }
};

export const pauseBackgroundMusic = () => {
    if (bgMusicAudio && !bgMusicAudio.paused) {
        bgMusicAudio.pause();
    }
};

export const toggleMute = () => {
    isMuted = !isMuted;
    if (bgMusicAudio) {
        bgMusicAudio.muted = isMuted;
    }
    return isMuted;
};

export const getIsMuted = () => isMuted;

export const setMusicVolume = (vol) => {
    globalVolume = Math.max(0, Math.min(1, vol));
    if (bgMusicAudio) {
        bgMusicAudio.volume = 0.3 * globalVolume;
        // Auto-unmute if user drags slider up
        if (vol > 0 && isMuted) {
            isMuted = false;
            bgMusicAudio.muted = false;
        }

        // Ensure playback continues if we unmute, ONLY if the music has actually been requested to start
        if (vol > 0 && bgMusicAudio.paused && bgMusicStarted) {
            bgMusicAudio.play().catch(e => console.warn(e));
        }
    }
    // Dispatch event so UI sliders can stay in sync if changed programmatically
    window.dispatchEvent(new CustomEvent('musicVolumeChanged', { detail: vol }));
};

export const getMusicVolume = () => {
    return bgMusicAudio ? bgMusicAudio.volume : 0.3;
};

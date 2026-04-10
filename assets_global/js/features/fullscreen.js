/**
 * Fullscreen System — Purpose
 * Programmatic Fullscreen (App-Controlled)
 * Use cases: presentation mode, bioinformatics visualization, lab/workspace focus
 */

export function initFullscreen() {
    // Init state tracking or any DOM observers needed for fullscreen
}

export function toggleFullscreen(element = document.documentElement) {
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

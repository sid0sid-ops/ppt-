import { toggleFullscreen } from './fullscreen.js';

/**
 * Global Keyboard Hook System
 * Handles F11 interception and ESC key unified exit routines.
 */
export function initKeyboardHooks() {
    window.addEventListener('keydown', (e) => {
        // ESC KEY (CONTROL EXIT SYSTEM)
        if (e.key === 'Escape') {
            handleEscape(e);
        }

        // F11 (BROWSER FULLSCREEN)
        if (e.key === 'F11') {
            // JS cannot inherently control the browser tab's true F11 fullscreen safely,
            // intercept to provide our programmatic presentation-level fullscreen.
            e.preventDefault();
            console.log("Intercepted F11: Providing seamless programmatic fullscreen instead.");
            toggleFullscreen();
        }
    });
}

function handleEscape(e) {
    // 1. Exit Fullscreen if active
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    // 2. Close active overlays and modals
    const activeModals = document.querySelectorAll('.modal-active');
    activeModals.forEach(modal => {
        modal.classList.remove('modal-active');
        // trigger specific close logic if component relies on specific events
    });

    // 3. Optional: Trigger global event for components to listen to
    window.dispatchEvent(new CustomEvent('bio-esc-pressed'));
}

import { initRouter } from './router.js';
import { initFullscreen } from '../features/fullscreen.js';
import { initKeyboardHooks } from '../features/keyboard.js';
import { initCursorSystem } from '../features/cursor.js';
import { PresentationEngine } from './presentationEngine.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Core System Services
    initRouter();
    initFullscreen();
    initKeyboardHooks();
    initCursorSystem();

    // Boot Zero-Latency Presentation Engine
    window.engine = new PresentationEngine();
    window.engine.init();

    console.log("BioAlign-Pro Engine Initialized");
});

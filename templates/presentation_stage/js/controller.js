import { BaseController } from '../../../assets_global/js/core/BaseController.js';
import { SLIDES } from '../../presentation_dashboard/js/content.js';

export class PresentationStageController extends BaseController {
    constructor() {
        super();
        this.currentIndex = parseInt(localStorage.getItem('bio_ppt_slide')) || 0;
        this.channel = new BroadcastChannel('bio_presentation_sync');

        // Listen to sync events from Presenter View
        this.channel.onmessage = (e) => {
            if (e.data.action === 'NAVIGATE') {
                if (this.currentIndex !== e.data.index) {
                    this.currentIndex = e.data.index;
                    this.renderSlide();
                }
            }
        };
    }

    async init() {
        await super.init();
        console.log("[Stage] Initializing Cinematic Presentation...");

        // Hide global Nav bar safely
        const nav = document.querySelector('nav');
        if (nav) nav.style.display = 'none';

        // Attempt Fullscreen
        if (document.documentElement.requestFullscreen && window.name !== 'Projector') {
            document.documentElement.requestFullscreen().catch(e => console.log("Fullscreen API error:", e));
        }

        // Adjust global appRoot margins that might be padded
        const appRoot = document.getElementById('appRoot');
        if (appRoot) {
            appRoot.classList.remove('p-6');
            appRoot.classList.add('p-0');
        }
    }

    mount(container) {
        super.mount(container);
        this.updateBackgroundForDarkness();
        this.bindEvents();
        this.renderSlide();
    }

    updateBackgroundForDarkness() {
        // Force the app into a cinematic state
        document.body.classList.add('bg-black');
    }

    bindEvents() {
        this.addSafeEventListener(window, 'keydown', (e) => {
            // S: Dual-Screen Spawn (Only from laptop origin window)
            if (e.key.toLowerCase() === 's' && window.name !== 'Projector') {
                e.preventDefault();
                console.log("[Stage] Spawning Projector Window and transforming to HUD...");
                window.open(window.location.href, 'Projector', 'width=1920,height=1080'); // Spawns the exact stage URL to new window
                window.location.hash = '#presenter_view'; // Convert current window to HUD
                return;
            }

            // Slide Navigation
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                this.navigate(1);
            }
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.navigate(-1);
            }
            if (e.key === 'Escape') {
                // Exit Stage cleanly and return to Dashboard
                window.location.hash = '#dashboard';
            }
        });
    }

    navigate(dir) {
        const next = this.currentIndex + dir;
        if (next >= 0 && next < SLIDES.length) {
            this.currentIndex = next;
            localStorage.setItem('bio_ppt_slide', this.currentIndex);
            this.renderSlide();
            this.channel.postMessage({ action: 'NAVIGATE', index: this.currentIndex });
        }
    }

    renderSlide() {
        const slide = SLIDES[this.currentIndex];
        const injection = this.container.querySelector('#slide-injection-point');
        if (!injection || !slide) return;

        if (slide.htmlContent) {
            injection.innerHTML = slide.htmlContent;
        } else {
            injection.innerHTML = `
                <div class="flex flex-col h-full w-full justify-center items-center text-center p-12 max-w-5xl mx-auto glass-panel">
                    <h1 class="text-4xl md:text-6xl font-bold mb-8 font-serif leading-tight">${slide.title}</h1>
                    <ul class="text-xl md:text-2xl text-left list-disc list-inside space-y-4 text-muted">
                        ${slide.content.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Fire global cursor re-init to grab newly injected glowing elements
        if (window.initCursorSystem) window.initCursorSystem();
    }

    destroy() {
        // Restore UI on exit
        const nav = document.querySelector('nav');
        if (nav) nav.style.display = 'flex';

        const appRoot = document.getElementById('appRoot');
        if (appRoot) {
            appRoot.classList.remove('p-0');
            appRoot.classList.add('p-6');
        }

        document.body.classList.remove('bg-black');

        if (document.fullscreenElement && window.name !== 'Projector') {
            document.exitFullscreen().catch(e => console.log(e));
        }

        this.channel.close();
        super.destroy();
    }
}

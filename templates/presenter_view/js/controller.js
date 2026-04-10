import { BaseController } from '../../../assets_global/js/core/BaseController.js';
import { SLIDES } from '../../presentation_dashboard/js/content.js';

export class PresenterViewController extends BaseController {
    constructor() {
        super();
        this.currentIndex = parseInt(localStorage.getItem('bio_ppt_slide')) || 0;
        this.broadcastChannel = new BroadcastChannel('bio_presentation_sync');
        this.startTime = Date.now();
        this.notesFontSize = 1.25; // rem

        // Listen to sync events from the Stage
        this.broadcastChannel.onmessage = (e) => {
            if (e.data.action === 'NAVIGATE') {
                if (this.currentIndex !== e.data.index) {
                    this.currentIndex = e.data.index;
                    this.updateHUD();
                }
            }
        };
    }

    async init() {
        await super.init();
        console.log("[Presenter] Initializing HUD...");

        // Hide global Nav bar for HUD immersion
        const nav = document.querySelector('nav');
        if (nav) nav.style.display = 'none';

        // Fix margins on app root
        const appRoot = document.getElementById('appRoot');
        if (appRoot) {
            appRoot.classList.remove('p-6');
            appRoot.classList.add('p-0');
        }
    }

    mount(container) {
        super.mount(container);
        this.setupBindings();
        this.startTimers();
        this.updateHUD();
    }

    setupBindings() {
        const btnNext = document.getElementById('btnNextHUD');
        const btnPrev = document.getElementById('btnPrevHUD');
        if (btnNext) this.addSafeEventListener(btnNext, 'click', () => this.navigate(1));
        if (btnPrev) this.addSafeEventListener(btnPrev, 'click', () => this.navigate(-1));

        // Font Resizers
        const btnInc = document.getElementById('btn-font-inc');
        const btnDec = document.getElementById('btn-font-dec');
        const notesContainer = document.getElementById('speaker-notes-content');

        if (btnInc && notesContainer) {
            this.addSafeEventListener(btnInc, 'click', () => {
                this.notesFontSize += 0.25;
                notesContainer.style.fontSize = `${this.notesFontSize}rem`;
            });
        }
        if (btnDec && notesContainer) {
            this.addSafeEventListener(btnDec, 'click', () => {
                this.notesFontSize = Math.max(0.75, this.notesFontSize - 0.25);
                notesContainer.style.fontSize = `${this.notesFontSize}rem`;
            });
        }

        // Keyboard Hooks
        this.addSafeEventListener(window, 'keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                this.navigate(1);
            }
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.navigate(-1);
            }
            if (e.key === 'Escape') {
                window.location.hash = '#dashboard';
            }
        });
    }

    navigate(direction) {
        const nextIndex = this.currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < SLIDES.length) {
            this.currentIndex = nextIndex;
            localStorage.setItem('bio_ppt_slide', this.currentIndex);
            this.updateHUD();
            this.broadcastChannel.postMessage({ action: 'NAVIGATE', index: this.currentIndex });
        }
    }

    updateHUD() {
        const slide = SLIDES[this.currentIndex];
        const nextSlide = SLIDES[this.currentIndex + 1] || null;

        document.getElementById('current-slide-label').innerText = `Slide ${this.currentIndex + 1} of ${SLIDES.length}`;
        const notesContainer = document.getElementById('speaker-notes-content');
        notesContainer.innerHTML = slide.notes ? `<p>${slide.notes}</p>` : `<p class="italic text-gray-500">No Notes.</p>`;

        const mainPreview = document.getElementById('main-slide-container');
        if (slide.htmlContent) {
            mainPreview.innerHTML = slide.htmlContent;
        } else {
            mainPreview.innerHTML = this.generatePlaceholderHTML(slide);
        }

        const nextPreviewLabel = document.getElementById('next-slide-label');
        const nextPreviewContainer = document.getElementById('next-slide-preview-container');
        if (nextSlide) {
            nextPreviewLabel.innerText = "Next slide";
            if (nextSlide.htmlContent) {
                // Keep next slide static
                nextPreviewContainer.innerHTML = `<div class="origin-top-left scale-[0.35] w-[285%] h-[285%] m-0 p-0 overflow-hidden relative pointer-events-none">${nextSlide.htmlContent}</div>`;
            } else {
                nextPreviewContainer.innerHTML = `<div class="text-xs p-4">${this.generatePlaceholderHTML(nextSlide)}</div>`;
            }
        } else {
            nextPreviewLabel.innerText = "End of slide show";
            nextPreviewContainer.innerHTML = `<div class="text-sm font-semibold">End of Slide Show</div>`;
        }
    }

    generatePlaceholderHTML(slide) {
        return `
            <div class="flex flex-col h-full w-full justify-center text-center p-4 text-black">
                <h1 class="text-2xl font-bold mb-2 font-serif">${slide.title}</h1>
                <ul class="text-sm list-disc list-inside text-gray-700 space-y-1">
                    ${slide.content.map(p => `<li>${p.slice(0, 40)}...</li>`).join('')}
                </ul>
            </div>
        `;
    }

    startTimers() {
        this.intervals.push(setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const h = Math.floor(elapsed / 3600000);
            const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
            const formattedTime = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
            const timerEl = document.getElementById('session-timer');
            if (timerEl) timerEl.innerText = formattedTime;
        }, 1000));

        this.intervals.push(setInterval(() => {
            const now = new Date();
            const clockEl = document.getElementById('system-clock');
            if (clockEl) clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 1000));
    }

    destroy() {
        // Restore styling
        const nav = document.querySelector('nav');
        if (nav) nav.style.display = 'flex';

        const appRoot = document.getElementById('appRoot');
        if (appRoot) {
            appRoot.classList.remove('p-0');
            appRoot.classList.add('p-6');
        }

        this.broadcastChannel.close();
        super.destroy();
    }
}

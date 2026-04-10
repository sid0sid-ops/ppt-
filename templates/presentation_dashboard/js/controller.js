import { BaseController } from '../../../assets_global/js/core/BaseController.js';
import { SLIDES } from './content.js';

export class DashboardController extends BaseController {
    constructor() {
        super();
        this.currentIndex = 0;
    }

    async init() {
        await super.init();
        console.log("[Dashboard] Controller core active. 14-Slide timeline ready.");
    }

    mount(container) {
        super.mount(container);
        this.renderThumbnails();
        this.previewSlide(this.currentIndex);
    }

    renderThumbnails() {
        const thumbContainer = this.container.querySelector('#slide-thumbnails-container');
        if (!thumbContainer) return;

        thumbContainer.innerHTML = SLIDES.map((slide, index) => {
            const isActive = index === this.currentIndex;
            return `
            <div class="slide-thumb-item cursor-pointer flex flex-col gap-1 p-2 rounded-lg transition-colors border ${isActive ? 'bg-black/5 dark:bg-white/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}" data-index="${index}">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-muted">${index + 1}</span>
                    <span class="text-xs font-semibold truncate text-black dark:text-white" title="${slide.title}">${slide.title}</span>
                </div>
                <div class="w-full aspect-video border border-border bg-black/5 dark:bg-black relative overflow-hidden flex items-center justify-center">
                    ${slide.htmlContent ? `<span class="text-[8px] text-blue-500 font-mono">CUSTOM HTML</span>` : `<span class="text-[8px] text-muted">STANDARD</span>`}
                </div>
            </div>
            `;
        }).join('');

        // Bind clicks to thumbnails safely
        const thumbs = thumbContainer.querySelectorAll('.slide-thumb-item');
        thumbs.forEach(thumb => {
            this.addSafeEventListener(thumb, 'click', () => {
                const idx = parseInt(thumb.dataset.index);
                this.currentIndex = idx;

                // Update UI visually
                thumbs.forEach(t => {
                    t.classList.remove('bg-black/5', 'dark:bg-white/10', 'border-blue-500', 'shadow-[0_0_15px_rgba(59,130,246,0.3)]');
                    t.classList.add('border-transparent');
                });
                thumb.classList.add('bg-black/5', 'dark:bg-white/10', 'border-blue-500', 'shadow-[0_0_15px_rgba(59,130,246,0.3)]');
                thumb.classList.remove('border-transparent');

                // Render Preview
                this.previewSlide(this.currentIndex);
            });
        });
    }

    previewSlide(index) {
        const slide = SLIDES[index];
        const previewContainer = this.container.querySelector('#dashboard-main-preview');
        const indicator = this.container.querySelector('#preview-slide-indicator');

        if (!previewContainer || !slide) return;

        indicator.innerText = `Slide ${index + 1} / ${SLIDES.length}`;

        if (slide.htmlContent) {
            // Apply scale logic to fit the full-sized 1920x1080 slide into the mini dashboard window
            // Since it's built using Tailwind absolute sizes, we scale down the wrapper.
            previewContainer.innerHTML = `
                <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
                    <!-- Scaling viewport. Adjust transform-scale based on container size if needed, or rely on responsive tailwind -->
                    <div class="preview-content w-full h-full flex flex-col p-8">
                        ${slide.htmlContent}
                    </div>
                </div>
            `;
        } else {
            // Standard placeholder
            previewContainer.innerHTML = `
                <div class="w-full h-full flex items-center justify-center flex-col p-10 text-center gap-6">
                    <h1 class="text-4xl font-bold font-serif text-black dark:text-white">${slide.title}</h1>
                    <ul class="text-left text-lg text-muted list-disc ml-8 space-y-3">
                        ${slide.content.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                    ${slide.figure ? `<div class="mt-4 p-4 border border-dashed border-border text-muted">Placeholder for: ${slide.figure}</div>` : ''}
                </div>
            `;
        }

        // Re-init cursor or specific JS events if needed for the preview content
        if (window.initCursorSystem) {
            window.initCursorSystem();
        }
    }
}

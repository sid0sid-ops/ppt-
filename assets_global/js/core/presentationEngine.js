import { SLIDES } from '../features/content.js';

export class PresentationEngine {
    constructor() {
        this.currentIndex = parseInt(sessionStorage.getItem('bio_ppt_slide')) || 0;
        this.broadcastChannel = new BroadcastChannel('bio_presentation_sync');
        this.startTime = Date.now();
        this.notesFontSize = 1.25;

        // View elements
        this.viewDashboard = document.getElementById('view-dashboard');
        this.viewStage = document.getElementById('view-stage');
        this.viewPresenter = document.getElementById('view-presenter');

        // Setup global window methods
        window.enterStage = () => this.enterStage();
        window.exitPresentation = () => this.exitPresentation();

        // Define Robust Auto-Scaler for DOM resize events
        this.resizer = new ResizeObserver(() => {
            requestAnimationFrame(() => this.scaleCanvases());
        });
    }

    init() {
        console.log("[Engine] Active. Booting Dual-View Systems zero-latency...");

        // Listen to cross-tab updates
        this.broadcastChannel.onmessage = (e) => {
            if (e.data.action === 'NAVIGATE') {
                if (this.currentIndex !== e.data.index) {
                    this.currentIndex = e.data.index;
                    this.syncAllViews();
                }
            } else if (e.data.action === 'EXIT') {
                this.exitPresentation(false);
            }
        };

        // Determine startup view configuration based on window Name
        if (window.name === 'Projector') {
            this.prepareStageDOM();
            // Browser security blocks automatic popup fullscreen, handle securely via user gesture overlay
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 z-[9999] bg-[#060410] text-gray-300 flex items-center justify-center cursor-pointer text-2xl tracking-widest uppercase hover:text-white transition';
            overlay.innerText = "[ Click once to lock Projector to Fullscreen ]";
            overlay.onclick = () => {
                if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
                overlay.remove();
            };
            document.body.appendChild(overlay);
        } else if (window.location.hash === '#presenter_view') {
            this.prepareHUDDOM();
        } else {
            this.prepareDashboardDOM();
        }

        this.bindEvents();
        this.startHUDTimers();
    }

    // --- DOM Preparation & View Switching ---

    prepareDashboardDOM() {
        this.showView('dashboard');

        const thumbContainer = document.getElementById('slide-thumbnails-container');
        if (thumbContainer) {
            thumbContainer.innerHTML = SLIDES.map((slide, index) => {
                const isActive = index === this.currentIndex;
                return `
                <div class="slide-thumb-item cursor-pointer flex flex-col gap-1 p-2 rounded-lg transition-colors border ${isActive ? 'bg-black/5 dark:bg-white/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}" onclick="window.engine.setSlide(${index})">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold text-muted">${index + 1}</span>
                        <span class="text-xs font-semibold truncate text-black dark:text-white" title="${slide.title}">${slide.title}</span>
                    </div>
                    <div class="w-full aspect-video border border-border bg-black/5 dark:bg-black relative overflow-hidden flex items-center justify-center">
                        <img src="./ppt/assets/thumb_${index + 1}.webp" class="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100" onerror="this.outerHTML='<span class=\\'text-[10px] text-muted font-bold tracking-widest\\'>THUMB_${index + 1}</span>'" alt="Slide ${index + 1} Thumbnail" />
                    </div>
                </div>
                `;
            }).join('');
        }

        this.renderDashboardPreview(this.currentIndex);
    }

    prepareStageDOM() {
        this.showView('stage');
        this.renderStage(this.currentIndex);
    }

    prepareHUDDOM() {
        this.showView('presenter');
        this.renderHUD(this.currentIndex);
    }

    showView(viewName) {
        // Toggle visibility
        this.viewDashboard.classList.add('hidden');
        this.viewStage.classList.add('hidden');
        this.viewPresenter.classList.add('hidden');

        // Toggle master Navigation
        const nav = document.querySelector('nav');
        if (nav) {
            if (viewName === 'dashboard') nav.style.display = 'flex';
            else nav.style.display = 'none';
        }

        if (viewName === 'dashboard') {
            this.viewDashboard.classList.remove('hidden');
            document.body.classList.remove('bg-black');
        } else if (viewName === 'stage') {
            this.viewStage.classList.remove('hidden');
            document.body.classList.add('bg-black');
        } else if (viewName === 'presenter') {
            this.viewPresenter.classList.remove('hidden');
            document.body.classList.add('bg-[#1a1a1a]');
        }
    }

    // --- Interactive Actions ---

    enterStage() {
        this.prepareStageDOM();
        const stageEl = this.viewStage;

        const requestFS = () => {
            if (stageEl.requestFullscreen) return stageEl.requestFullscreen();
            if (stageEl.webkitRequestFullscreen) return stageEl.webkitRequestFullscreen();
            if (stageEl.mozRequestFullScreen) return stageEl.mozRequestFullScreen();
            return Promise.resolve();
        };

        requestFS()
            .then(() => {
                // Recalculate scale after fullscreen viewport is established
                requestAnimationFrame(() => this.scaleCanvases());
                setTimeout(() => this.scaleCanvases(), 200);
            })
            .catch(e => {
                // Fullscreen blocked (e.g. not user gesture) — still show stage
                console.warn('[Engine] Fullscreen blocked:', e.message);
                requestAnimationFrame(() => this.scaleCanvases());
            });
    }

    exitPresentation(broadcastParam = true) {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(e => console.log(e));
        }
        window.location.hash = ''; // Clear hash if HUD

        // Memory cleanup: Delete the heavy Stage DOM rendering natively
        const stageInjection = document.getElementById('slide-injection-point');
        if (stageInjection) stageInjection.innerHTML = '';

        // Reset pipeline to Slide 1
        this.currentIndex = 0;
        sessionStorage.setItem('bio_ppt_slide', 0);

        this.prepareDashboardDOM();

        if (broadcastParam) {
            this.broadcastChannel.postMessage({ action: 'EXIT' });
        }

        // Ensure popups self-terminate to avoid lingering headless instances 
        if (window.name === 'Projector') {
            window.close();
        }
    }

    /**
     * Smart Projector Spawner
     * Strategy 1: Window Placement API (Chrome 100+) — places popup on physical second screen
     * Strategy 2: screen.width offset — pushes window to monitor 2 via coordinate math
     * Strategy 3: Graceful fallback — plain window.open with drag-to-projector overlay prompt
     */
    async spawnProjector() {
        const url = window.location.href.split('#')[0]; // clean URL
        const features = (left, top, w, h) =>
            `left=${left},top=${top},width=${w},height=${h},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`;

        let projWin = null;

        // --- Strategy 1: Window Placement API ---
        if ('getScreenDetails' in window) {
            try {
                const permission = await navigator.permissions.query({ name: 'window-placement' });
                if (permission.state !== 'denied') {
                    const screens = await window.getScreenDetails();
                    const secondScreen = screens.screens.find(s => !s.isPrimary) || screens.screens[0];
                    const { left, top, width, height } = secondScreen;
                    projWin = window.open(url, 'Projector', features(left, top, width, height));
                    console.log(`[Engine] Projector opened via Window Placement API on screen: ${secondScreen.label}`);
                }
            } catch (e) {
                console.warn('[Engine] Window Placement API failed, falling back.', e.message);
            }
        }

        // --- Strategy 2: screen.width offset (monitor to the right) ---
        if (!projWin) {
            const isMultiMonitor = window.screen.availWidth > window.screen.width * 0.95;
            const secondLeft = window.screen.width; // offset to physical right monitor
            const secW = window.screen.availWidth - window.screen.width || window.screen.width;
            const secH = window.screen.availHeight;

            projWin = window.open(url, 'Projector', features(secondLeft, 0, secW, secH));
            console.log(`[Engine] Projector opened via screen-offset fallback. left=${secondLeft}`);
        }

        // --- Switch local tab to Presenter HUD ---
        if (projWin) {
            window.location.hash = '#presenter_view';
            this.prepareHUDDOM();
        } else {
            alert('Could not spawn Projector window. Please allow popups for this site.');
        }
    }

    setSlide(index) {
        if (index >= 0 && index < SLIDES.length) {
            this.currentIndex = index;
            sessionStorage.setItem('bio_ppt_slide', this.currentIndex);
            this.syncAllViews();
            this.broadcastChannel.postMessage({ action: 'NAVIGATE', index: this.currentIndex });
        }
    }

    syncAllViews() {
        if (!this.viewDashboard.classList.contains('hidden')) this.prepareDashboardDOM();
        if (!this.viewStage.classList.contains('hidden')) this.renderStage(this.currentIndex);
        if (!this.viewPresenter.classList.contains('hidden')) this.renderHUD(this.currentIndex);
    }

    // --- Render Logic ---

    renderDashboardPreview(index) {
        const slide = SLIDES[index];
        const preview = document.getElementById('dashboard-main-preview');
        const indicator = document.getElementById('preview-slide-indicator');
        if (!preview || !slide) return;

        indicator.innerText = `Slide ${index + 1} / ${SLIDES.length}`;
        preview.innerHTML = `
            <div class="w-full h-full flex items-center justify-center p-4">
                <img src="./ppt/assets/thumb_${index + 1}.webp" class="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10" alt="Preview of Slide ${index + 1}" onerror="this.outerHTML='<div class=\\'w-full h-full flex items-center justify-center text-gray-500 bg-[#060410] rounded-xl border border-white/10\\'>Missing Thumbnail File: thumb_${index + 1}.webp</div>'"/>
            </div>
        `;

        if (window.initCursorSystem) window.initCursorSystem();
    }

    renderStage(index) {
        const slide = SLIDES[index];
        const injection = document.getElementById('slide-injection-point');
        if (!injection || !slide) return;
        injection.innerHTML = this.getSlideHTML(slide, 'stage');
        if (window.initCursorSystem) window.initCursorSystem();
    }

    renderHUD(index) {
        const slide = SLIDES[index];
        const nextSlide = SLIDES[index + 1] || null;

        document.getElementById('hud-slide-label').innerText = `Slide ${index + 1} of ${SLIDES.length}`;

        const notesContainer = document.getElementById('hud-notes-content');
        if (notesContainer) notesContainer.innerHTML = slide.notes ? `<p>${slide.notes}</p>` : `<p class="italic text-gray-500">No Notes.</p>`;

        const mainPreview = document.getElementById('hud-main-container');
        if (mainPreview) {
            mainPreview.innerHTML = this.getSlideHTML(slide, 'hud');
        }

        const nextPreviewLabel = document.getElementById('hud-next-label');
        const nextPreviewContainer = document.getElementById('hud-next-container');
        if (nextSlide && nextPreviewContainer) {
            nextPreviewLabel.innerText = "Next slide";
            nextPreviewContainer.innerHTML = `
                <img src="./ppt/assets/thumb_${index + 2}.webp" class="w-full h-full object-cover rounded-lg" alt="HUD Next Slide ${index + 2}" onerror="this.outerHTML='<div class=\\'text-gray-600 bg-black w-full h-full flex items-center justify-center text-xs border border-white/10 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]\\'>Waiting on Slide ${index + 2} thumb...</div>'"/>
            `;
        } else if (nextPreviewContainer) {
            nextPreviewLabel.innerText = "End of slide show";
            nextPreviewContainer.innerHTML = `<div class="text-sm font-semibold text-white w-full h-full flex items-center justify-center">End of Slide Show</div>`;
        }

        requestAnimationFrame(() => this.scaleCanvases());
        setTimeout(() => this.scaleCanvases(), 10);
    }

    getSlideHTML(slide, context = 'preview') {
        let contentHtml = slide.htmlContent;
        if (!contentHtml) {
            contentHtml = `
                <div class="absolute inset-0 bg-[#060410] flex items-center justify-center">
                    <div class="flex flex-col h-full w-full justify-center items-center text-center p-20 max-w-6xl mx-auto glass-panel">
                        <h1 class="text-6xl md:text-8xl font-bold mb-12 font-serif leading-tight text-white">${slide.title}</h1>
                        <ul class="text-3xl md:text-4xl text-left list-disc list-inside space-y-6 text-gray-300">
                            ${slide.content.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>`;
        }

        const events = context === 'stage' ? '' : 'pointer-events-none';

        return `
            <div class="slide-wrapper" style="
                position: absolute; inset: 0;
                width: 100%; height: 100%;
                background: #000;
                display: flex; align-items: center; justify-content: center;
                overflow: hidden;
            ">
                <div class="slide-canvas" style="
                    position: absolute;
                    width: 1920px; height: 1080px;
                    transform-origin: center center;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%) scale(1);
                    background: #060410;
                    overflow: hidden;
                    ${events ? 'pointer-events: none;' : ''}
                ">
                    ${contentHtml}
                </div>
            </div>`;
    }

    scaleCanvases() {
        const wrappers = document.querySelectorAll('.slide-wrapper');
        wrappers.forEach(wrapper => {
            const canvas = wrapper.querySelector('.slide-canvas');
            if (!canvas) return;

            // Use the wrapper's actual rendered size for all contexts (HUD, preview, etc.)
            // In true fullscreen the wrapper IS the viewport so clientWidth = screen width
            const ww = wrapper.clientWidth || wrapper.offsetWidth || window.innerWidth;
            const wh = wrapper.clientHeight || wrapper.offsetHeight || window.innerHeight;
            if (ww === 0 || wh === 0) return;

            const SLIDE_W = 1920;
            const SLIDE_H = 1080;
            const scale = Math.min(ww / SLIDE_W, wh / SLIDE_H);

            // Center the canvas exactly like PowerPoint does
            canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
            canvas.style.left = '50%';
            canvas.style.top = '50%';

            // Register this wrapper into the ResizeObserver exactly once
            if (!wrapper.dataset.observed) {
                this.resizer.observe(wrapper);
                wrapper.dataset.observed = 'true';
            }
        });
    }

    // --- Bindings & Timers ---

    bindEvents() {
        // Universal Keyboard Navigation
        window.addEventListener('keydown', (e) => {
            // S Key Dual-Spawn (Only valid if we are actively viewing Stage or Dashboard)
            if (e.key.toLowerCase() === 's' && window.name !== 'Projector' && !this.viewPresenter.classList.contains('hidden') === false) {
                e.preventDefault();
                console.log("[Engine] Spawning Projector...");
                this.spawnProjector();
                return;
            }

            // F Key to actively launch the currently focused slide from the Dashboard Pipeline
            if (e.key.toLowerCase() === 'f' && !this.viewDashboard.classList.contains('hidden')) {
                e.preventDefault();
                this.enterStage();
            }

            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                this.setSlide(this.currentIndex + 1);
            }
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.setSlide(this.currentIndex - 1);
            }
            if (e.key === 'Escape' && (!this.viewStage.classList.contains('hidden') || !this.viewPresenter.classList.contains('hidden'))) {
                this.exitPresentation();
            }
        });

        // CRITICAL FIX: Browsers eat the Escape key during fullscreen, so keydown never fires.
        // fullscreenchange fires reliably after the browser exits fullscreen (via Esc or F11).
        document.addEventListener('fullscreenchange', () => {
            // If no element is fullscreen but Stage is still showing, user exited via browser Esc
            if (!document.fullscreenElement) {
                if (!this.viewStage.classList.contains('hidden') || !this.viewPresenter.classList.contains('hidden')) {
                    this.exitPresentation(false); // false = don't broadcast again; just clean up locally
                }
            }
        });
        // Cross-browser support
        document.addEventListener('webkitfullscreenchange', () => {
            if (!document.webkitFullscreenElement) {
                if (!this.viewStage.classList.contains('hidden') || !this.viewPresenter.classList.contains('hidden')) {
                    this.exitPresentation(false);
                }
            }
        });

        // HUD Click Handlers
        const btnNext = document.getElementById('btnNextHUD');
        const btnPrev = document.getElementById('btnPrevHUD');
        if (btnNext) btnNext.addEventListener('click', () => this.setSlide(this.currentIndex + 1));
        if (btnPrev) btnPrev.addEventListener('click', () => this.setSlide(this.currentIndex - 1));

        const btnInc = document.getElementById('btn-font-inc');
        const btnDec = document.getElementById('btn-font-dec');
        if (btnInc) btnInc.addEventListener('click', () => {
            this.notesFontSize += 0.25;
            document.getElementById('hud-notes-content').style.fontSize = `${this.notesFontSize}rem`;
        });
        if (btnDec) btnDec.addEventListener('click', () => {
            this.notesFontSize = Math.max(0.75, this.notesFontSize - 0.25);
            document.getElementById('hud-notes-content').style.fontSize = `${this.notesFontSize}rem`;
        });
    }

    startHUDTimers() {
        setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const h = Math.floor(elapsed / 3600000);
            const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
            const timerEl = document.getElementById('session-timer');
            if (timerEl) timerEl.innerText = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;

            const now = new Date();
            const clockEl = document.getElementById('system-clock');
            if (clockEl) clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 1000);
    }
}

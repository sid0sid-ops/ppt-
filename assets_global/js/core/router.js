/**
 * ============================================================
 * Router — BioAlign-Pro Engine
 * ============================================================
 * Standardizes SPA navigation and lifecycle management.
 * Tracks current active controller and executes destroy() on switch.
 * ============================================================
 */

import { BaseController } from './BaseController.js';

class Router {
    constructor() {
        this.currentController = null;
        this.appContainer = document.getElementById('app-root'); // Mount point in index.html
    }

    init() {
        // Bind navigation hooks
        const btnBackToWork = document.getElementById("btnBackToWork");
        if (btnBackToWork) {
            btnBackToWork.addEventListener("click", () => history.back());
        }

        window.addEventListener('popstate', () => this.handleRouting());

        // Handle initial load
        this.handleRouting();
    }

    /**
     * UNIFIED NAVIGATION METHOD
     * Use this to switch tools programmatically and safely.
     */
    async navigate(ControllerClass) {
        // 1. Memory Cleanup: Destroy the previous view
        if (this.currentController) {
            this.currentController.destroy();
        }

        // 2. Instantiate and Register New Controller
        this.currentController = new ControllerClass();

        // 3. Mount to DOM
        if (this.appContainer) {
            await this.currentController.init();
            this.currentController.mount(this.appContainer);
        }

        console.log(`[Router] Navigated to ${ControllerClass.name} - Memory safe.`);
    }

    async handleRouting() {
        const hash = window.location.hash;
        const rawHash = hash.replace('#', '');
        const route = rawHash || 'dashboard';

        // Presentation Engine natively controls these routes via DOM toggling, no fetch required.
        if (route === 'dashboard' || route === 'presentation_stage' || route === 'presenter_view' || hash === '') {
            return;
        }

        console.log(`[Router] Route change detected: ${route}`);

        try {
            // 1. Fetch the HTML layout for the route
            const htmlRes = await fetch(`./templates/${route}/index.html`);
            if (!htmlRes.ok) throw new Error(`Route ${route} not found.`);
            const html = await htmlRes.text();

            // 2. Inject HTML
            if (this.appContainer) this.appContainer.innerHTML = html;

            // 3. Dynamically import class
            let ControllerClass = null;
            try {
                // Dynamically import the controller for this route
                const module = await import(`../../../templates/${route}/js/controller.js`);
                // Assume the export explicitly ends with Controller (e.g. DashboardController)
                const controllerKey = Object.keys(module).find(k => k.endsWith('Controller'));
                if (controllerKey) {
                    ControllerClass = module[controllerKey];
                }
            } catch (err) {
                console.log(`[Router] No valid Controller found for ${route}, running stateless HTML only.`);
            }

            // 4. Navigate using unified method if class found
            if (ControllerClass) {
                await this.navigate(ControllerClass);
            }

            // Re-init global features like skeleton loaders/cursor tracking for new DOM
            if (window.initCursorSystem) window.initCursorSystem();

        } catch (error) {
            console.error(`[Router] Navigation Error:`, error);
            this.appContainer.innerHTML = `<div class="p-10 text-xl font-bold text-red-500">404 - ${error.message}</div>`;
        }
    }
}

export const router = new Router();
export const initRouter = () => router.init();

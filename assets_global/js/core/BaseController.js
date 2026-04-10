/**
 * ============================================================
 * BaseController — BioAlign-Pro Engine
 * ============================================================
 * Standardizes the lifecycle of all tool views.
 * 
 * lifecycle:
 * 1. constructor() - Setup initial state
 * 2. init()        - Load data, start workers, fetch config
 * 3. mount(target) - Render to DOM, bind events
 * 4. destroy()     - WIPE EVERYTHING (remove events, stop workers, dispose 3D)
 * ============================================================
 */

import { ResourceManager } from '../utils/ResourceManager.js';

export class BaseController {
    constructor() {
        this.container = null;
        this.eventListeners = []; // Track to auto-remove
        this.intervals = [];      // Track to auto-clear
        this.timers = [];         // Track to auto-clear
        this.activeWorkers = [];  // Track to auto-terminate
    }

    /**
     * Entry point: Override to handle tool-specific setup
     */
    async init() {
        console.log(`[Lifecycle] Initializing ${this.constructor.name}`);
    }

    /**
     * DOM Attachment point
     */
    mount(targetElement) {
        this.container = targetElement;
        console.log(`[Lifecycle] Mounted ${this.constructor.name}`);
    }

    /**
     * SAFE EVENT BINDING
     * Use this instead of el.addEventListener directly.
     * It ensures the listener is tracked for the destroy phase.
     */
    addSafeEventListener(element, type, handler, options = {}) {
        element.addEventListener(type, handler, options);
        this.eventListeners.push({ element, type, handler });
    }

    /**
     * THE CLEANUP COMMAND
     * Must be called when switching views to prevent memory leaks.
     */
    destroy() {
        console.log(`[Lifecycle] Destroying ${this.constructor.name}...`);

        // 1. Remove all tracked event listeners
        this.eventListeners.forEach(({ element, type, handler }) => {
            element.removeEventListener(type, handler);
        });
        this.eventListeners = [];

        // 2. Clear intervals/timers
        this.intervals.forEach(clearInterval);
        this.timers.forEach(clearTimeout);
        this.intervals = [];
        this.timers = [];

        // 3. Terminate workers
        this.activeWorkers.forEach(worker => {
            try { worker.terminate(); } catch (e) { }
        });
        this.activeWorkers = [];

        // 4. Deep Clean DOM container
        if (this.container) {
            ResourceManager.disposeContainer(this.container);
            this.container.innerHTML = '';
            this.container = null;
        }

        console.log(`[Lifecycle] ${this.constructor.name} Memory Flushed ✅`);
    }
}

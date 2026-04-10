import { BaseController } from '../../../assets_global/js/core/BaseController.js';
import { ResourceManager } from '../../../assets_global/js/utils/ResourceManager.js';
import { WorkerManager } from '../../../assets_global/js/core/WorkerManager.js';

export class ToolController extends BaseController {
    constructor() {
        super();
        this.scene = null; // Three.js Scene ref
        this.renderer = null; // Three.js Renderer ref
    }

    async init() {
        await super.init();
        // Load configurations, matrices, or initial sequence data
    }

    mount(container) {
        super.mount(container);

        // 1. Setup UI Events safely
        const btnCalc = container.querySelector('#calculate-btn');
        if (btnCalc) {
            this.addSafeEventListener(btnCalc, 'click', () => this.handleCalculation());
        }

        // 2. Initialize 3D Visualization (Mockup)
        this.initThreeJS();
    }

    initThreeJS() {
        console.log("[Tool] Initializing 3D Context...");
        // this.scene = new THREE.Scene();
        // this.renderer = new THREE.WebGLRenderer();
    }

    async handleCalculation() {
        console.log("[Tool] Offloading to Web Worker...");

        try {
            const result = await WorkerManager.runTask(
                './js/workers/dataWorker.js',
                { sequence: 'ATGC', task: 'align' }
            );
            console.log("[Tool] Calculation Complete:", result);
        } catch (error) {
            console.error("[Tool] Worker Error:", error);
        }
    }

    /**
     * EXTENDED CLEANUP
     * This is where you kill the 3D scene manually.
     */
    destroy() {
        // 1. Deep dispose Three.js objects before the base class flushes the DOM
        if (this.scene) {
            ResourceManager.disposeThreeObject(this.scene);
        }

        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            this.renderer.domElement = null;
        }

        // 2. Clear references
        this.scene = null;
        this.renderer = null;

        // 3. Call base cleanup (removes events, clears workers, wipes DOM)
        super.destroy();
    }
}

import { ApiService } from '../services/apiService.js';
import { attachToolHooks } from '../utils/hooks.js';

export class MainController {
    constructor() {
        this.api = new ApiService();
        this.state = {
            isRunning: false,
            parameters: {}
        };
    }

    init() {
        console.log("Tool initialized");
        this.bindEvents();
        attachToolHooks(this);
    }

    bindEvents() {
        // Find local specific tool buttons. DO NOT duplicate global hooks like btnBackToWork here if handled by app router.
        // It's safe to add specific tool-level UI logic here.
        const startBtn = document.getElementById('btnStartTool');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.runProcess());
        }
    }

    runProcess() {
        this.state.isRunning = true;
        // Business logic interacting with workers/services
    }
}

// Auto-init for standalone views or managed through global router
document.addEventListener('DOMContentLoaded', () => {
    // Only init if tool container exists on currently visible DOM
    if (document.getElementById('tool-view-container')) {
        const controller = new MainController();
        controller.init();
    }
});

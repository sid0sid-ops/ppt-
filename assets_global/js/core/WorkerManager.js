/**
 * ============================================================
 * WorkerManager — BioAlign-Pro Engine
 * ============================================================
 * Simplifies the spawning and management of Web Workers.
 * Ensures the UI thread is never blocked by bioinformatics math.
 * ============================================================
 */

export class WorkerManager {
    /**
     * Spawns a worker and handles messaging with a Promise wrapper.
     */
    static runTask(workerPath, payload) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(workerPath);

            worker.onmessage = (event) => {
                resolve(event.data);
                worker.terminate();
            };

            worker.onerror = (error) => {
                reject(error);
                worker.terminate();
            };

            worker.postMessage(payload);
        });
    }

    /**
     * Spawns a long-lived worker (e.g. for streaming data).
     * Returns the worker instance.
     */
    static spawn(workerPath) {
        return new Worker(workerPath);
    }
}

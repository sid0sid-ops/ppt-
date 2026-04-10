/**
 * ============================================================
 * ResourceManager — BioAlign-Pro Engine
 * ============================================================
 * Handles the deep disposal of complex objects (Three.js, Canvas, etc.)
 * to prevent GPU memory leaks and heap accumulation.
 * ============================================================
 */

export const ResourceManager = {
    /**
     * Deeply disposes a container and all its children.
     * Searches for canvases, WebGL contexts, and Three.js objects.
     */
    disposeContainer(container) {
        if (!container) return;

        // 1. Handle Three.js Specifics (if any global refs exist)
        // Note: Usually handled by individual controllers, but this is a fail-safe.

        // 2. Clean up Canvases & Contexts
        const canvases = container.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (gl) {
                const extension = gl.getExtension('WEBGL_lose_context');
                if (extension) extension.loseContext();
            }
            canvas.width = 1;
            canvas.height = 1;
        });

        console.log(`[ResourceManager] DOM Container scrubbed.`);
    },

    /**
     * THREE.JS SPECIFIC DEEP DISPOSAL
     * Pass in a Scene, Group, or Mesh.
     */
    disposeThreeObject(obj) {
        if (!obj) return;

        obj.traverse((node) => {
            if (!node.isMesh) return;

            // Dispose Geometry
            if (node.geometry) {
                node.geometry.dispose();
            }

            // Dispose Materials
            if (node.material) {
                if (Array.isArray(node.material)) {
                    node.material.forEach(mat => this.disposeMaterial(mat));
                } else {
                    this.disposeMaterial(node.material);
                }
            }
        });

        console.log(`[ResourceManager] Three.js Object chain disposed.`);
    },

    disposeMaterial(material) {
        // Dispose Textures
        for (const key in material) {
            const value = material[key];
            if (value && typeof value === 'object' && 'minFilter' in value) {
                value.dispose();
            }
        }
        material.dispose();
    }
};

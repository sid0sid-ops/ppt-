export class CinematicTunnel {
    constructor(containerElement) {
        this.container = containerElement;
        this.isActive = false;
        this.currentT = 0;
        this.targetT = 0;
        this.accumulatedTime = 0;
    }

    init() {
        if (!window.THREE) {
            console.error('[Tunnel] Three.js not loaded on window.');
            return;
        }
        this.isActive = true;

        // 1. Scene setup with scientific depth fading
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x060410, 0.04); // Dark Navy fog blending

        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x060410, 1); // Dark Navy background (Projector friendly)
        
        // Lock behind slides
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '0'; 

        this.container.insertBefore(this.renderer.domElement, this.container.firstChild);

        // 2. Winding Binding-Pocket Math
        const points = [];
        const curveLength = 40;
        for(let i = 0; i <= curveLength; i++) {
            points.push(new THREE.Vector3(
                Math.sin(i * 0.4) * 12,
                Math.cos(i * 0.3) * 12,
                -i * 25 // depth
            ));
        }
        this.path = new THREE.CatmullRomCurve3(points);
        
        // 3. Grid geometry (Fabric representation) - DISTRACTING LINES REMOVED
        const geometry = new THREE.TubeGeometry(this.path, 150, 6, 16, false);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x38bdf8,
            wireframe: false,
            transparent: true,
            opacity: 0.0 // Completely invisible, no more distracting grid lines!
        });
        this.tube = new THREE.Mesh(geometry, material);
        // this.scene.add(this.tube); // Do not add the tube to the scene

        // 4. Subtle Flow Particles
        const particleGeo = new THREE.BufferGeometry();
        const particleCount = 1500;
        const posArray = new Float32Array(particleCount * 3);
        const lengths = this.path.getSpacedPoints(particleCount);
        
        for(let i = 0; i < particleCount; i++) {
            const pt = lengths[i];
            // Scatter around the tube's center line
            posArray[i*3] = pt.x + (Math.random() - 0.5) * 10;
            posArray[i*3+1] = pt.y + (Math.random() - 0.5) * 10;
            posArray[i*3+2] = pt.z + (Math.random() - 0.5) * 10;
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particleMat = new THREE.PointsMaterial({
            size: 0.25,
            color: 0xffffff,
            transparent: true,
            opacity: 0.85
        });
        this.particles = new THREE.Points(particleGeo, particleMat);
        this.scene.add(this.particles);

        window.addEventListener('resize', this.onResize);

        this.updateCameraPath(0);
        this.animate = this.animate.bind(this);
        this.rafId = requestAnimationFrame(this.animate);
    }

    onResize = () => {
        if (!this.isActive) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    navigateTo(slideIndex, totalSlides) {
        // Map presentation space to the 3D curve (0 to 0.95 to avoid staring off the math edge)
        this.targetT = (slideIndex / Math.max(1, totalSlides - 1)) * 0.95;
    }

    updateCameraPath(t) {
        // Look ahead mechanic for cinematic fluid camera bank
        const p1 = this.path.getPointAt(t);
        const p2 = this.path.getPointAt(Math.min(t + 0.02, 1.0)); 
        this.camera.position.copy(p1);
        this.camera.lookAt(p2);
        
        // Continuous, subtle biological rotation ONLY when camera is transitioning
        // Stop background movement when presentation is paused on a slide for narration
        const isMoving = Math.abs(this.targetT - this.currentT) > 0.001;
        if (isMoving) {
            // Speed up rotation based on velocity to emphasize transition
            this.accumulatedTime += 0.016 + Math.abs(this.targetT - this.currentT) * 0.2;
        }

        this.tube.rotation.z = this.accumulatedTime * 0.015;
        this.particles.rotation.z = this.accumulatedTime * 0.03;
    }

    animate() {
        if (!this.isActive) return;

        // Easing interpolation: Smoothly float towards the target slice of the curve
        this.currentT += (this.targetT - this.currentT) * 0.03; 
        
        this.updateCameraPath(this.currentT);
        this.renderer.render(this.scene, this.camera);
        
        this.rafId = requestAnimationFrame(this.animate);
    }

    dispose() {
        this.isActive = false;
        cancelAnimationFrame(this.rafId);
        window.removeEventListener('resize', this.onResize);
        
        // Ruthless GPU memory cleanup
        try {
            this.scene.remove(this.tube);
            this.scene.remove(this.particles);
            this.tube.geometry.dispose();
            this.tube.material.dispose();
            this.particles.geometry.dispose();
            this.particles.material.dispose();
            this.renderer.dispose();
            if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        } catch(e) {
            console.error("[Tunnel] Dispose Error: ", e);
        }
    }
}

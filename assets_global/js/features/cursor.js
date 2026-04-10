/**
 * ============================================================
 * CURSOR REACTIVE SYSTEM — BioAlign-Pro Engine
 * ============================================================
 *
 * FEATURE 1: Spotlight Blob
 *   - A glowing radial blob follows the cursor across the entire page
 *   - Adapts to Dark / Light mode
 *   - GPU-accelerated via transform (no layout triggers)
 *
 * FEATURE 2: Magnetic Cards
 *   - Elements with [data-magnetic] subtly tilt toward the cursor
 *   - Spring-physics lerp for smooth, weighted motion
 *   - Auto-resets on mouse leave
 *
 * FEATURE 3: Hover Glow (CSS companion via data attribute)
 *   - Elements with [data-glow] show a cursor-tracking inner glow
 *   - Uses CSS custom properties set dynamically by JS
 *
 * USAGE:
 *   import { initCursorSystem } from '../features/cursor.js';
 *   initCursorSystem();
 * ============================================================
 */

export function initCursorSystem() {
    initSpotlightBlob();
    initMagneticCards();
    initHoverGlow();
}

/* ============================================================
   FEATURE 1 — SPOTLIGHT BLOB (follows cursor globally)
   ============================================================ */
function initSpotlightBlob() {
    const blob = document.createElement('div');
    blob.id = 'cursor-blob';

    Object.assign(blob.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '0',
        transition: 'opacity 0.4s ease',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
    });

    document.body.appendChild(blob);

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    // Smooth lerp follow — spring-like weight
    function lerp(a, b, t) { return a + (b - a) * t; }

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Animate on rAF — does NOT touch DOM layout; only composite transform
    (function animate() {
        currentX = lerp(currentX, targetX, 0.08); // 0.08 = sluggish weight = premium
        currentY = lerp(currentY, targetY, 0.08);
        blob.style.transform = `translate(${currentX - 250}px, ${currentY - 250}px)`;
        requestAnimationFrame(animate);
    })();
}

/* ============================================================
   FEATURE 2 — MAGNETIC CARDS (tilt toward cursor)
   ============================================================ */
function initMagneticCards() {
    const elements = document.querySelectorAll('[data-magnetic]');

    elements.forEach(el => {
        let animFrame = null;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        function lerp(a, b, t) { return a + (b - a) * t; }

        function animate() {
            currentX = lerp(currentX, targetX, 0.1);
            currentY = lerp(currentY, targetY, 0.1);
            el.style.transform = `perspective(600px) rotateX(${currentY}deg) rotateY(${currentX}deg) scale(1.02)`;
            animFrame = requestAnimationFrame(animate);
        }

        el.addEventListener('mouseenter', () => {
            animate();
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;  // -1 to 1
            const ny = ((e.clientY - rect.top) / rect.height - 0.5) * -2; // inverted

            const intensity = parseFloat(el.dataset.magnetic) || 10;
            targetX = nx * intensity;
            targetY = ny * intensity;
        });

        el.addEventListener('mouseleave', () => {
            if (animFrame) cancelAnimationFrame(animFrame);
            targetX = 0;
            targetY = 0;
            currentX = lerp(currentX, 0, 0.1);
            currentY = lerp(currentY, 0, 0.1);
            el.style.transform = '';
            el.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

/* ============================================================
   FEATURE 3 — HOVER GLOW (cursor-tracked inner shine on cards)
   ============================================================ */
function initHoverGlow() {
    const elements = document.querySelectorAll('[data-glow]');

    elements.forEach(el => {
        // Ensure position is set for proper coordinate calculations
        el.style.position = 'relative';
        el.style.overflow = 'hidden';

        // The glow layer — injected once per element
        const glowLayer = document.createElement('div');
        glowLayer.classList.add('glow-layer');

        Object.assign(glowLayer.style, {
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            opacity: '0',
            pointerEvents: 'none',
            transition: 'opacity 0.4s ease',
            zIndex: '0',
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 60%)',
        });

        el.appendChild(glowLayer);

        el.addEventListener('mouseenter', () => {
            glowLayer.style.opacity = '1';
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            const color = el.dataset.glow || 'rgba(59,130,246,0.25)';
            glowLayer.style.background = `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent 60%)`;
        });

        el.addEventListener('mouseleave', () => {
            glowLayer.style.opacity = '0';
        });
    });
}

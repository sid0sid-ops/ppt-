// ============================================================
// BioAlign-Pro — Slide Content Manifest
// Edit htmlContent for each slide to customise the design.
// ============================================================

// Reusable background layer (space grid + cosmic glow)
const BG = (accentFrom = 'purple-900/40', accentTo = 'blue-900/30') => `
    <div class="absolute inset-0 z-0 bg-transparent overflow-hidden pointer-events-none">
        <div class="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-${accentFrom} to-transparent"></div>
        <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-${accentTo}/30 to-transparent"></div>
    </div>`;

// Reusable glass panel wrapper
const PANEL = (content) => `
    <div class="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
        <main class="w-full max-w-[1750px] h-full max-h-[980px] flex flex-col p-14 backdrop-blur-3xl rounded-[3rem] ppt-bg-glass relative pointer-events-auto border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.12)]" style="overflow:visible;">
            <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--ppt-accent-main)] to-transparent"></div>
            ${content}
        </main>
    </div>`;

// Reusable header row with icon + gradient title
const HDR = (icon, line1, line2) => `
    <header class="flex items-center gap-6 pb-6 border-b border-black/10 dark:border-white/10 mb-8 shrink-0">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style="background: linear-gradient(135deg, var(--ppt-accent-sec), var(--ppt-accent-main))">
            ${icon}
        </div>
        <div>
            <p class="text-sm font-bold tracking-[.2em] uppercase mb-1" style="color: var(--ppt-accent-main)">${line1}</p>
            <h2 class="text-5xl font-bold leading-tight ppt-text-main" style="font-family:'Inter',sans-serif">${line2}</h2>
        </div>
    </header>`;

// Reusable bullet list
const BULLETS = (items) => `
    <ul class="flex flex-col gap-6 flex-grow justify-center">
        ${items.map(([dot, text]) => `
        <li class="flex items-start gap-5 group">
            <div class="mt-2 w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-md" style="background: rgba(56, 189, 248, 0.1); border: 1px solid var(--ppt-accent-main)">
                <div class="w-2.5 h-2.5 rounded-full" style="background: var(--ppt-accent-main)"></div>
            </div>
            <p class="text-2xl leading-relaxed transition-colors group-hover:text-black dark:group-hover:text-white ppt-text-muted">${text}</p>
        </li>`).join('')}
    </ul>`;

// Figure placeholder
const FIG = (label = 'Figure Placeholder — Paste Image Here') => `
    <div class="flex-grow flex items-center justify-center mt-6">
        <div class="w-full max-w-[1200px] h-[480px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center bg-white/[.02] text-gray-500">
            <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <p class="text-lg font-semibold tracking-wide">${label}</p>
            <p class="text-sm mt-1 opacity-60">Replace this div with an &lt;img&gt; tag when ready</p>
        </div>
    </div>`;

// Actual image component for loaded figures
const IMG = (num, label) => `
    <div class="w-full flex flex-col items-center justify-start relative overflow-hidden" style="flex:1 1 0;min-height:0;max-height:100%;">
        <img src="./ppt/assets/Figure%20${num}.jpg" 
             onclick="if(window.engine){ window.engine.toggleZoom('${num}'); }" 
             class="w-auto h-auto ppt-img-smart cursor-zoom-in transition-transform duration-500 hover:scale-[1.02] hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)]" 
             style="max-width:100%;max-height:calc(100% - 3rem);object-fit:contain;border-radius:0;"
             alt="${label}" loading="lazy" decoding="async" />
        <div class="mt-3 backdrop-blur-md px-6 py-2 rounded-full shadow-lg shrink-0 ppt-caption-glass relative z-10 w-max max-w-full">
            <p class="text-sm font-bold tracking-widest text-center truncate">${label}</p>
        </div>
    </div>`;

// ─── Icon Definitions ────────────────────────────────────────────────────────
const ICON_BOLT = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
const ICON_DB = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7c0-1.1 3.58-2 8-2s8 .9 8 2v10c0 1.1-3.58 2-8 2s-8-.9-8-2V7z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12c0 1.1 3.58 2 8 2s8-.9 8-2"/></svg>`;
const ICON_CHART = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`;
const ICON_DNA = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4c2 0 4 1 6 3s4 3 6 3M4 20c2 0 4-1 6-3s4-3 6-3M4 12h16"/></svg>`;
const ICON_WARN = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
const ICON_STAR = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`;
const ICON_BOOK = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`;

export const slidesData = [
    // ─── SLIDE 1 ─────────────────────────────────────────────────────
    {
        id: 1, title: "Assessing Boltz-2 Performance for the Binding Classification of Docking Hits",
        notes: "Start: Welcome everyone. Today we analyse Boltz-2's capacity to translate raw sequence data into actionable drug-binding phenotypes.",
        content: [], figure: null,
        htmlContent: `
        <div class="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
            <main class="w-full max-w-[1750px] h-full max-h-[980px] flex flex-col justify-between px-16 py-12 relative overflow-hidden pointer-events-auto ppt-bg-glass rounded-[3rem] border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
                <!-- Top accent line -->
                <div class="absolute top-0 left-0 w-full h-[3px]" style="background:linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa);opacity:0.85;"></div>
                <!-- Decorative soft glows -->
                <div class="absolute pointer-events-none" style="top:-100px;right:180px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(196,210,255,0.4) 0%,transparent 70%);"></div>
                <div class="absolute pointer-events-none" style="bottom:-80px;left:-80px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(221,214,254,0.35) 0%,transparent 70%);"></div>

                <!-- TOP ROW: Journal (left) + DOI link (right) -->
                <div class="flex justify-between items-center z-10 w-full shrink-0">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-[0.85rem] flex items-center justify-center shrink-0" style="background:linear-gradient(135deg,#60a5fa,#6366f1);box-shadow:0 8px 18px rgba(99,102,241,0.25);">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                        </div>
                        <div>
                            <p style="font-size:0.7rem;font-weight:800;letter-spacing:0.18em;color:#3b82f6;text-transform:uppercase;">Journal of Chemical Information and Modeling (JCIM)</p>
                            <p style="font-size:0.85rem;color:#64748b;font-weight:600;margin-top:2px;">Published: January 27, 2026</p>
                        </div>
                    </div>
                    <a href="https://doi.org/10.1021/acs.jcim.5c02630" target="_blank"
                       style="display:flex;align-items:center;gap:8px;padding:8px 20px;border-radius:999px;background:rgba(255,255,255,0.92);border:1px solid rgba(148,163,184,0.3);color:#475569;font-size:0.88rem;font-weight:600;box-shadow:0 2px 10px rgba(0,0,0,0.06);text-decoration:none;transition:all .2s;"
                       onmouseover="this.style.borderColor='#93c5fd';this.style.color='#3b82f6';this.style.transform='translateY(-1px)'"
                       onmouseout="this.style.borderColor='rgba(148,163,184,0.3)';this.style.color='#475569';this.style.transform='translateY(0)'">
                        <i class="fa-solid fa-link" style="color:#93c5fd;"></i> https://doi.org/10.1021/acs.jcim.5c02630
                    </a>
                </div>

                <!-- MIDDLE: Hero title + info cards -->
                <div class="flex flex-col flex-grow justify-center z-10 w-full py-4">
                    <!-- Hero title -->
                    <div style="margin-bottom:2rem;">
                        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(2.6rem,4.2vw,5rem);font-weight:900;line-height:1.12;letter-spacing:-0.03em;margin:0;padding:0;">
                            <span style="display:block;color:#0f172a;">Assessing Boltz-2 Performance</span>
                            <span style="display:block;background:linear-gradient(95deg,#3b82f6,#6366f1,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:0.08em;">for the Binding Classification</span>
                            <span style="display:block;background:linear-gradient(95deg,#6366f1,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:0.08em;">of Docking Hits</span>
                        </h1>
                    </div>

                    <!-- Two cards: Authors (left) + Dataset (right) -->
                    <div style="display:grid;grid-template-columns:1.25fr 0.75fr;gap:1.25rem;">
                        <!-- Authors card -->
                        <div style="background:rgba(255,255,255,0.65);backdrop-filter:blur(14px);border-radius:1.4rem;padding:1.6rem 1.85rem;box-shadow:0 4px 20px rgba(0,0,0,0.055);border:1px solid rgba(255,255,255,0.85);">
                            <p style="font-size:0.64rem;font-weight:800;letter-spacing:0.2em;color:#94a3b8;text-transform:uppercase;margin-bottom:0.65rem;">Authors</p>
                            <p style="font-size:1.35rem;font-weight:600;color:#1e293b;line-height:1.35;">Guillaume Bret, François Sindt, and Didier Rognan</p>
                            <a href="https://maps.google.com/?q=Laboratoire+d+innovation+therapeutique+CNRS+Strasbourg" target="_blank"
                               style="display:flex;align-items:flex-start;gap:10px;margin-top:0.9rem;text-decoration:none;color:#64748b;transition:color .2s;"
                               onmouseover="this.style.color='#3b82f6'" onmouseout="this.style.color='#64748b'">
                                <div style="width:28px;height:28px;border-radius:50%;background:rgba(219,234,254,0.7);border:1px solid rgba(191,219,254,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
                                    <i class="fa-solid fa-location-dot" style="font-size:0.7rem;color:#60a5fa;"></i>
                                </div>
                                <span style="font-size:1.05rem;font-weight:500;line-height:1.45;">Laboratoire d&apos;Innovation Thérapeutique (LIT),<br/>CNRS-Université de Strasbourg, France</span>
                            </a>
                        </div>
                        <!-- Dataset card -->
                        <div style="background:rgba(245,243,255,0.72);backdrop-filter:blur(14px);border-radius:1.4rem;padding:1.6rem 1.85rem;box-shadow:0 4px 20px rgba(139,92,246,0.07);border:1px solid rgba(221,214,254,0.5);display:flex;flex-direction:column;justify-content:center;">
                            <p style="font-size:0.64rem;font-weight:800;letter-spacing:0.2em;color:#94a3b8;text-transform:uppercase;margin-bottom:0.75rem;">Evaluated Dataset</p>
                            <div style="display:flex;align-items:flex-start;gap:12px;">
                                <div style="width:42px;height:42px;border-radius:11px;background:rgba(237,233,254,0.9);border:1px solid rgba(221,214,254,0.7);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#7c3aed;font-size:1.15rem;">
                                    <i class="fa-solid fa-database"></i>
                                </div>
                                <div>
                                    <p style="font-size:1.5rem;font-weight:900;color:#6d28d9;line-height:1.2;">Ultralarge-Virtual-<br/>Screening Hits</p>
                                    <p style="font-size:0.92rem;color:#64748b;margin-top:0.5rem;font-weight:600;background:rgba(241,240,255,0.9);display:inline-block;padding:2px 11px;border-radius:7px;border:1px solid rgba(221,214,254,0.6);">Data Set (ULVSH)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BOTTOM ROW: Presenter card -->
                <div class="z-10 w-full shrink-0" style="background:rgba(255,255,255,0.6);backdrop-filter:blur(14px);border-radius:1.35rem;padding:1.2rem 1.85rem;display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,0.8);box-shadow:0 2px 14px rgba(0,0,0,0.05);">
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#e0e7ff,#ddd6fe);border:2px solid rgba(196,181,253,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="fa-solid fa-user" style="font-size:1.2rem;color:#a78bfa;"></i>
                        </div>
                        <div>
                            <p style="font-size:0.62rem;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:#60a5fa;margin-bottom:3px;">Presented By</p>
                            <p style="font-size:1.55rem;font-weight:800;color:#0f172a;line-height:1.1;margin:0;">Siddharth Tripathi</p>
                            <span style="font-size:0.68rem;font-weight:700;background:#ede9fe;color:#6d28d9;padding:2px 10px;border-radius:999px;border:1px solid #ddd6fe;text-transform:uppercase;letter-spacing:0.12em;display:inline-block;margin-top:4px;">M.Sc. - 1</span>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <a href="https://maps.google.com/?q=Centre+for+Systems+Biology+Panjab+University" target="_blank" style="text-decoration:none;"
                           onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
                            <p style="font-size:1.35rem;font-weight:800;color:#0f172a;line-height:1.25;"><strong>Centre for Systems Biology</strong> and Bioinformatics</p>
                            <p style="font-size:0.95rem;color:#64748b;font-weight:600;margin-top:5px;display:flex;align-items:center;justify-content:flex-end;gap:6px;">
                                <i class="fa-solid fa-building-columns" style="color:#94a3b8;"></i> Panjab University, Chandigarh
                            </p>
                        </a>
                    </div>
                </div>
            </main>
        </div>`
    },


    // ─── SLIDE 2 ─────────────────────────────────────────────────────
    {
        id: 2, title: "Background & Introduction",
        notes: "To begin, protein-ligand cofolding methods are highly promising for predicting 3D structures from simple 1D sequences. We are focusing on the recently developed Boltz-2 model, which simultaneously predicts structure, binding probability, and binding affinity. However, current AI models still severely struggle with ligand-induced conformational changes and allosteric modulators. This brings us to the core paradox highlighted by Bret et al.: a model's posing accuracy seems completely disconnected from its binding affinity predictions, strongly hinting that the AI is memorizing data rather than learning actual physics. We must also consider the training data anomaly noted on the slide regarding synthetic decoys.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_BOLT, 'Section 1 · Slide 2', 'Background & Introduction', 'indigo-400', 'purple-400')}
            ${BULLETS([
            ['blue-400', '<strong>Protein-Ligand Cofolding:</strong> Predicting 3D structures from simple 1D sequences (Desai <em>et al.</em>, 2024).'],
            ['purple-400', '<strong>The Boltz-2 Model:</strong> Simultaneously predicts structure (B2-S), binding probability (B2-C), and binding affinity (B2-A) (Passaro <em>et al.</em>, 2025).'],
            ['cyan-400', '<strong>Current AI Limitations:</strong> Models struggle with ligand-induced conformational changes (Olanders <em>et al.</em>, 2024) and allosteric modulators (Nittinger <em>et al.</em>, 2025).'],
            ['red-400', '<strong>The Core Paradox:</strong> Posing accuracy seems disconnected from binding affinity predictions, hinting at potential memorization over physical learning (Bret <em>et al.</em>, 2026; DeepMirror, 2025).'],
            ['yellow-400', '<strong>Training Data Anomaly:</strong> Boltz-2 classification relies on massive datasets augmented by artificial "synthetic decoys" (Passaro <em>et al.</em>, 2025).'],
        ])}
        `)}`
    },

    // ─── SLIDE 3 ─────────────────────────────────────────────────────
    {
        id: 3, title: "Aim of the Study",
        notes: "Because most benchmarks focus merely on structural accuracy, Bret et al. aimed to specifically challenge the binding affinity predictions of Boltz-2. They applied the model to the ULVSH dataset because, as previously shown by Sindt et al., state-of-the-art predictors had completely failed to properly discriminate true from false positives in this set. Inspired by recent findings on AI physics failures, Bret et al. used adversarial validation—specifically target mutation and target shuffling—to see if Boltz-2 actually calculates intermolecular physics. However, as highlighted on the slide, the target space they chose for this validation has remarkably low diversity.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_STAR, 'Section 1 · Slide 3', 'Aim of the Study', 'cyan-400', 'blue-400')}
            ${BULLETS([
            ['blue-400', '<strong>Aim:</strong> Challenge Boltz-2 binding affinity predictions for both the classifier (B2-C) and regressor (B2-A) models (Bret <em>et al.</em>, 2026).'],
            ['indigo-400', '<strong>The Problem:</strong> Previous state-of-the-art predictors completely failed to properly discriminate true from false positives in this specific ultralarge-virtual-screening hits (ULVSH) set (Sindt <em>et al.</em>, 2025).'],
            ['cyan-400', '<strong>Adversarial Validation:</strong> Using biological challenges like target mutation and target shuffling to test true physical learning (Bret <em>et al.</em>, 2026; Masters <em>et al.</em>, 2025).'],
            ['purple-400', '<strong>Target Bias Anomaly:</strong> The chosen ULVSH target space exhibits remarkably low diversity, heavily favoring a single receptor family (Sindt <em>et al.</em>, 2025).'],
        ])}
        `)}`
    },

    // ─── SLIDE 4 ─────────────────────────────────────────────────────
    {
        id: 4, title: "The ULVSH Dataset",
        notes: "Moving to the computational methods, Bret et al. utilized the ULVSH dataset, which contains 943 experimentally validated hits across ten targets. As previously detailed by Sindt et al., these hits originate from massive ultralarge docking screens evaluating up to 1.2 billion molecules, with all true positive binders rigorously confirmed by dose-response curves. However, Bret and colleagues draw specific attention to a major screening anomaly noted on the slide regarding this data: an unusually high primary hit rate of over 20 percent.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_DB, 'Section 1 · Slide 4', 'The ULVSH Dataset', 'blue-400', 'emerald-400')}
            <div class="flex flex-col gap-6 flex-grow justify-center mt-4">
                <div class="p-8 ppt-inner-box rounded-2xl shadow-sm border border-gray-200">
                    <p class="text-xs font-bold tracking-[.2em] uppercase text-blue-500 mb-4">Dataset Components</p>
                    ${BULLETS([
            ['blue-400', '<strong>The Dataset:</strong> 943 chemically diverse hits (364 true positives, 579 false positives) across 10 targets (Sindt <em>et al.</em>, 2025).'],
            ['blue-300', '<strong>Origin:</strong> Ultralarge docking screens evaluating up to 1.2 billion on-demand compounds (Sadybekov <em>et al.</em>, 2022; Sindt <em>et al.</em>, 2025).'],
        ])}
                </div>
                <div class="p-8 ppt-inner-box rounded-2xl shadow-sm border border-gray-200 mt-4">
                    <p class="text-xs font-bold tracking-[.2em] uppercase text-purple-600 mb-4">Anomalies & Validation</p>
                    ${BULLETS([
            ['purple-400', '<strong>Validation:</strong> All true positive binders confirmed via dose-response curves to determine inhibition constants or EC50 values (Sindt <em>et al.</em>, 2025).'],
            ['pink-400', '<strong>Screening Anomaly:</strong> Remarkably high primary hit rate (>20%) observed for these screens (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 5 ─────────────────────────────────────────────────────
    {
        id: 5, title: "Boltz-2 Cofolding Workflow",
        notes: "For the actual cofolding workflow, Bret et al. utilized Boltz-2 completely out-of-the-box, providing only the target's amino acid sequence and the ligand's 1D SMILES string as input. From this minimal data, the framework simultaneously predicted the 3D structure, binding probability, and continuous binding affinity. Bret and colleagues computed all of this on a standard NVIDIA GPU, which impressively averaged only two minutes per complex. However, we must draw careful attention to the training data anomaly noted on the slide regarding the 'distillation sets' used by the model's developers.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_BOLT, 'Section 1 · Slide 5', 'Boltz-2 Cofolding Workflow', 'indigo-400', 'blue-400')}
            ${BULLETS([
            ['indigo-400', '<strong>Model Implementation:</strong> Boltz-2 used entirely out-of-the-box, relying solely on target amino acid sequences and 1D ligand SMILES strings (Bret <em>et al.</em>, 2026).'],
            ['blue-400', '<strong>Triple Output:</strong> Simultaneously predicts 3D Structure (B2-S), Binding Probability (B2-C), and Binding Affinity (B2-A) (Passaro <em>et al.</em>, 2025).'],
            ['cyan-400', '<strong>Hardware Efficiency:</strong> Computed on an NVIDIA Tesla V100 GPU averaging roughly two minutes of wall-clock time per complex (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Training Data Anomaly:</strong> The model incorporates "distillation sets" containing an unknown number of AI-predicted structures from its predecessor (Passaro <em>et al.</em>, 2025).'],
        ])}
        `)}`
    },

    // ─── SLIDE 6 ─────────────────────────────────────────────────────
    {
        id: 6, title: "Similarity Analysis & Evaluation Metrics",
        notes: "To rule out the possibility that the AI merely memorized known drugs from its training data, Bret et al. computed the 2D and 3D chemical similarities of all hits against 2.4 million experimentally tested ChEMBL compounds. They also rigorously checked the structural accuracy of Boltz-2 by calculating RMSD values directly against the original docking poses. Finally, to evaluate if the actual intermolecular interactions were physically correct, Bret and colleagues utilized an unusual interaction metric. As highlighted on the slide by the 'Interaction Metric Anomaly', this specific metric somehow evaluates 3D interactions without even requiring a prior structural alignment of the complexes.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_CHART, 'Section 2 · Slide 6', 'Similarity Analysis & Evaluation Metrics', 'orange-400', 'purple-400')}
            ${BULLETS([
            ['orange-400', '<strong>Bias Checking:</strong> 2D and 3D similarities were computed against 2.4 million ChEMBL compounds to rule out training data memorization (Zdrazil <em>et al.</em>, 2024; Bret <em>et al.</em>, 2026).'],
            ['purple-400', '<strong>Similarity Tools:</strong> Morgan-2 fingerprints used for 2D similarity; ROCS overlay used for 3D shape and pharmacophore similarity (Eguida <em>et al.</em>, 2022; Bret <em>et al.</em>, 2026).'],
            ['yellow-400', '<strong>Structural Evaluation:</strong> Ligand and binding site RMSDs computed directly against the original ground-truth docking poses (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Interaction Metric Anomaly:</strong> Protein-ligand interactions were evaluated using a specific metric that explicitly does not require prior structural alignment (Mariani <em>et al.</em>, 2013; Skrinjar <em>et al.</em>, 2025).'],
        ])}
        `)}`
    },


    // ─── SLIDE 7 ─────────────────────────────────────────────────────
    {
        id: 7, title: "Results and Discussion Validation Protocol",
        notes: "Here we outline the four core phases of our validation protocol against Boltz-2.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_STAR, 'Section 3 · Slide 7', 'Results and Discussion', 'purple-400', 'blue-400')}
            ${BULLETS([
            ['blue-400', '<strong>Phase 1 — Classification Accuracy (Figure 1):</strong> Evaluating Boltz-2’s raw predictive power against rigorous empirical scoring functions (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
            ['purple-400', '<strong>Phase 2 — Similarity Biases (Figure 2):</strong> Probing 2D and 3D chemical similarity to ChEMBL to rule out training data memorization (Zdrazil <em>et al.</em>, 2024; Bret <em>et al.</em>, 2026).'],
            ['cyan-400', '<strong>Phase 3 — The Structural Paradox (Figures 3, 4, 5):</strong> Assessing if affinity predictions mathematically rely on accurate 3D poses and conserved physical interactions (Mariani <em>et al.</em>, 2013; Bret <em>et al.</em>, 2026).'],
            ['indigo-400', '<strong>Phase 4 — Adversarial Challenges (Figures 6, 7, 8):</strong> Deploying target mutation and target shuffling to definitively test physical learning vs. AI feature bypassing (Masters <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
        ])}
        `)}`
    },
    // ─── SLIDE 8 ─────────────────────────────────────────────────────
    {
        id: 8, title: "Classification Success vs. Affinity Failure",
        notes: "Moving to the results, let’s break down Figure 1. On the Y-axis, we have the ROC AUC, which measures classification accuracy, and on the X-axis, we have the different scoring functions. Bret et al. use a combined box-and-dot plot here. The boxes show the statistical spread—the interquartile range with the median as a solid line and the mean as an open square. But importantly, those individual black dots plotted alongside the boxes represent the exact score for each of the 10 specific targets. As you can see on the far right, Boltz-2’s probability (B2-C) and affinity (B2-A) models vastly outperform all older empirical methods. However, Bret and colleagues note a major paradox: while Boltz-2 excels at discriminating true from false positives, its actual affinity predictions don't correlate well with experimental values. Finally, as noted by the anomaly on the slide, it is highly suspicious that the AI succeeds here when rigorous PM6 quantum mechanics previously failed.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_CHART, 'Section 3 · Slide 8', 'Classification Success vs. Affinity Failure', 'indigo-400', 'blue-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['blue-400', '<strong>Graph Anatomy:</strong> Y-axis = ROC AUC (accuracy); X-axis = Scoring functions. Boxes = 1st/3rd quartiles; Line = Median; Square = Mean.'],
            ['indigo-400', '<strong>High Accuracy:</strong> Boltz-2 (B2-C and B2-A) excels at discriminating true vs. false positives, far better than prior methods (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
            ['cyan-400', '<strong>The Paradox:</strong> Despite high binary accuracy, correlations to experimental affinities for true positives remain remarkably poor (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Performance Anomaly:</strong> Boltz-2 succeeds here despite rigorous quantum mechanics (PM6) failing (Sindt <em>et al.</em>, 2025).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('1', 'Figure 1 — Baseline ROC AUC comparison')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 9 ─────────────────────────────────────────────────────
    {
        id: 9, title: "Search for Potential Similarity Biases",
        notes: "Let us examine Figure 2, where Bret et al. investigate if the AI simply memorized the training data. In Figures 2A and 2B, the Y-axis shows the frequency distribution, and the X-axis shows the similarity scores of our dataset compared to 2.4 million ChEMBL compounds. Figure 2A demonstrates very low 2D similarity, peaking around 0.30. However, Figure 2B reveals a drastic shift: almost all compounds have high 3D similarity, exceeding 1.2 on the TanimotoCombo scale. Despite this high 3D overlap, Bret and colleagues observed no relationship between Boltz-2’s predictions and the actual experimental affinities of these close 3D neighbors. We can see this in Figure 2C, the Neighborhood Anomaly, where multiple compounds share the exact same nearest 3D neighbor.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 3 · Slide 9', 'Search for Potential Similarity Biases', 'orange-400', 'purple-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['orange-400', '<strong>Graph Anatomy (2A & 2B):</strong> Y-axis = Frequency (%); X-axis = Ligand 2D/3D Similarity.'],
            ['purple-400', '<strong>2D Similarity (Fig 2A):</strong> Very low chemical similarity (Tanimoto ~0.30) to known ChEMBL compounds (Bret <em>et al.</em>, 2026).'],
            ['yellow-400', '<strong>3D Similarity (Fig 2B):</strong> Drastic shift to high 3D shape/pharmacophore similarity (TanimotoCombo > 1.2) (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Neighborhood Anomaly (Fig 2C):</strong> False positive hits frequently share the exact same highly potent 3D ChEMBL neighbor as true positive hits (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('2', 'Figure 2 — 2D vs 3D Similarity Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 10 ─────────────────────────────────────────────────────
    {
        id: 10, title: "Figure 3: Binding Site Pose Quality",
        notes: "8 out of 10 target binding sites are folded accurately. Use this to set up the paradox in slides 10 and 11.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_DNA, 'Section 4 · Slide 10', 'Figure 3: Binding Site Pose Quality', 'emerald-400', 'cyan-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['emerald-400', '<strong>Conformational Bias Anomaly:</strong> Boltz-2 predicts completely different activation states for CASR and SC6A4 than the original docking structures (Coleman <em>et al.</em>, 2019; Park <em>et al.</em>, 2021).'],
            ['cyan-400', '<strong>Graph Anatomy:</strong> Y-axis = Site RMSD in Ångströms, X-axis = The 10 specific targets.'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('3', 'Figure 3 — Binding Site RMSD per Target')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 11 ─────────────────────────────────────────────────────
    {
        id: 11, title: "Figure 4: Ligand Pose Deviations",
        notes: "Moving to Figure 4, Bret et al. assessed the actual ligand pose quality. The Y-axis represents Ligand RMSD in Ångströms, and the X-axis splits the compounds into true positives in green boxes and false positives in pink boxes for each target. The black dots once again represent the individual ligands. Bret and colleagues observed that the predicted ligand poses deviate significantly from the ground-truth docking poses, with dots scattering up to 10 Ångströms in several cases. Despite this exceptionally poor structural accuracy across targets like SGMR2 and SC6A4, Boltz-2 somehow maintains its classification performance, presenting a major anomaly.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 11', 'Figure 4: Ligand Pose Deviations', 'red-400', 'orange-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['blue-400', '<strong>Graph Anatomy:</strong> Y-axis = Ligand RMSD in Ångströms. X-axis = True Positives (TP, Green) vs False Positives (FP, Pink) across 10 separate target panels. Black dots = Individual ligands.'],
            ['pink-400', '<strong>Pose Deviation:</strong> Predicted ligand poses deviate significantly from the original docking poses considered as ground-truth (Bret <em>et al.</em>, 2026).'],
            ['yellow-400', '<strong>Deviation Consistency:</strong> Poses from false positives generally tend to deviate more from docking poses than those from true positives, though high scatter exists in both (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Affinity Anomaly:</strong> Poor pose accuracy does not prevent Boltz-2 from efficiently discriminating active from inactive compounds (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('4', 'Figure 4 — Ligand Pose RMSD Distribution')}
                </div>
            </div>
        `)}`
    },
    // ─── SLIDE 12 ─────────────────────────────────────────────────────
    {
        id: 12, title: "Figure 5: Conservation of Protein-Ligand Interactions",
        notes: "Let us move to Figure 5, where Bret et al. evaluated the actual conservation of specific protein-ligand interactions. On the Y-axis, we have the LDDT-PLI score, where a value above 0.80 is assumed to indicate conserved interactions. On the X-axis, the data is split into green true positives and pink false positives for the ten targets, with the black dots representing the individual compounds. Bret and colleagues observed that the conservation of physical interactions between Boltz-2 predictions and the ground-truth docking poses is rarely achieved; the vast majority of dots fall well below 0.80. However, as noted by the anomaly on the slide, the model somehow maintains high classification accuracy even when these critical physical interactions are absent.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 12', 'Figure 5: Conservation of Protein-Ligand Interactions', 'purple-400', 'red-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['blue-400', '<strong>Graph Anatomy:</strong> Y-axis = LDDT-PLI score (0 to 1.0). X-axis = True Positives (TP, Green) vs False Positives (FP, Pink). Boxes = 1st/3rd quartiles; Line = Median; Square = Mean; Black dots = Individual ligands.'],
            ['purple-400', '<strong>Interaction Metric:</strong> LDDT-PLI evaluates local interaction conservation without prior 3D alignment, assuming conservation if the score is > 0.80 (Mariani <em>et al.</em>, 2013; Skrinjar <em>et al.</em>, 2025).'],
            ['pink-400', '<strong>Poor Conservation:</strong> Conservation of exact protein-ligand interactions between Boltz-2 and original docking poses is rarely observed (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Interaction Anomaly:</strong> The classifier efficiently discriminates active from inactive hits even when massive numbers of expected intermolecular interactions are completely missing (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('5', 'Figure 5 — LDDT-PLI Score Distribution')}
                </div>
            </div>
        `)}`
    },
    // ─── SLIDE 13 ─────────────────────────────────────────────────────
    {
        id: 13, title: "Figure 6: Adversarial Challenge via Site-Directed Mutagenesis",
        notes: "Let us examine Figure 6, where Bret et al. deployed their first adversarial challenge. The Y-axis represents classification accuracy via ROC AUC. The X-axis compares wild-type targets in light red boxes against site-directed mutants in dark red boxes. These mutants are missing critical binding residues—such as the key aspartic acid at position 3.32 in monoamine receptors, which is known to completely suppress ligand binding. However, the dark red boxes show the model still efficiently discriminates binders from non-binders without a statistically significant drop in performance. As noted by the 'Physics Anomaly', this severely contradicts elementary physical principles.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 5 · Slide 13', 'Figure 6: Adversarial Challenge via Site-Directed Mutagenesis', 'yellow-400', 'red-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['indigo-400', '<strong>Graph Anatomy:</strong> Y-axis = ROC AUC (accuracy). X-axis = Wild Type (WT, light red) vs. Mutant (dark red). Boxes = 1st/3rd quartiles; Line = Median; Square = Mean; Black dots = Individual targets.'],
            ['yellow-400', '<strong>Target Mutation:</strong> Suppressing essential binding site interactions (e.g., Asp3.32) does not significantly alter classification accuracy (Venkatakrishnan <em>et al.</em>, 2013; Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Physics Anomaly:</strong> Maintaining high prediction accuracy on severely mutated targets contradicts the elementary physics of intermolecular interactions (Masters <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('6', 'Figure 6 — WT vs Mutant ROC AUC')}
                </div>
            </div>
        `)}`
    },
    // ─── SLIDE 14 ─────────────────────────────────────────────────────
    {
        id: 14, title: "Figure 7: Adversarial Challenge via Progressive Random Mutations",
        notes: "Backing up slightly to Figure 7, Bret et al. performed a deeper analysis to see how much progressive damage the model could tolerate. The Y-axis represents the change in classification accuracy, or Delta ROC AUC. The X-axis tracks an increasing number of random mutations. Panels A and C show mutations to the outer shell of the protein, while B and D target the actual binding site. As expected, mutating the outer shell doesn't change the accuracy. However, looking at panels B and D, mutating up to 6 residues directly inside the binding site barely alters the performance for 9 out of 10 targets. The variations are limited to plus or minus 0.10 units. This means the AI remains largely insensitive to the progressive destruction of the binding pocket.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 5 · Slide 14', 'Figure 7: Adversarial Challenge via Progressive Random Mutations', 'orange-400', 'red-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['blue-400', '<strong>Graph Anatomy:</strong> Y-axis = ΔROC AUC (Change in accuracy). X-axis = Number of mutations. Panels split by Outer Shell (A, C) and Binding Site (B, D).'],
            ['green-400', '<strong>Outer Shell Robustness:</strong> Increasing mutations outside the binding site (up to 59 residues) does not significantly affect binary classification (Bret <em>et al.</em>, 2026).'],
            ['orange-400', '<strong>Binding Site Insensitivity:</strong> Randomly mutating up to 6 residues directly inside the binding pocket yields remarkably limited accuracy variations (±0.10 units) for most targets (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Physics Anomaly:</strong> Boltz-2 maintains higher accuracy on severely degraded binding pockets than rigorous empirical scoring functions achieve on perfect wild-type structures (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('7', 'Figure 7 — Mutations vs ΔROC AUC')}
                </div>
            </div>
        `)}`
    },
    // ─── SLIDE 15 ─────────────────────────────────────────────────────
    {
        id: 15, title: "Figure 8: Adversarial Challenge via Target Shuffling",
        notes: "Moving to Figure 8, Bret and colleagues applied target shuffling, cofolding ligands with entirely unrelated proteins. On the X-axis, we now compare the wild type in light red to the shuffled targets in dark blue. Because every compound should act as a non-binder to an unrelated target, a true physics model should drop to a random ROC AUC score of 0.5. As expected, performance drops to random for half the targets. However, the dark blue boxes reveal that for five specific targets—including DRD3 and ROCK1—the AI still accurately predicts affinity. As highlighted by the anomaly on the slide, this indicates the model frequently ignores the target entirely.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 5 · Slide 15', 'Figure 8: Adversarial Challenge via Target Shuffling', 'pink-400', 'purple-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['indigo-400', '<strong>Graph Anatomy:</strong> Y-axis = ROC AUC (accuracy). X-axis = Wild Type (WT, light red) vs. Shuffling (dark blue). Boxes = 1st/3rd quartiles; Line = Median; Square = Mean; Black dots = Individual targets.'],
            ['pink-400', '<strong>Target Shuffling:</strong> Assigning ULVSH compounds to totally unrelated targets drops accuracy to random (ROC AUC &lt; 0.6) for half the dataset (Bret <em>et al.</em>, 2026).'],
            ['purple-400', '<strong>Target Independence:</strong> For five specific targets (e.g., DRD3, ROCK1), predictions remain almost entirely target-independent (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Target Ignorance Anomaly:</strong> The model frequently ignores the target entirely, rendering affinity predictions exclusively ligand-dependent (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('8', 'Figure 8 — Target Shuffling ROC AUC')}
                </div>
            </div>
        `)}`
    },
    // ─── SLIDE 16 ─────────────────────────────────────────────────────
    {
        id: 16, title: "CONCLUSIONS",
        notes: "To conclude, Bret et al. present a highly contradictory evaluation of Boltz-2. On the positive side, the model achieves exceptional binary classification on a highly challenging dataset where traditional physics-based models previously failed. However, on the negative side, the data proves that this success is an illusion of physics. Because the affinity predictions survive poor ligand poses, destroyed binding pockets, and even complete target shuffling, Bret and colleagues conclude that the AI is not calculating the physics of the target-ligand interface. Instead, it relies heavily on memorized 3D ligand features. Therefore, as noted in their final verdict, the authors advise extreme skepticism when using this model for future drug discovery, especially without true prospective validation.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_STAR, 'Section 6 · Slide 16', 'CONCLUSIONS', 'blue-400', 'emerald-400')}
            <div class="flex gap-12 h-full items-center mt-6">
                <div class="w-full flex flex-col justify-center gap-8 z-10 shrink-0 px-12">
                    ${BULLETS([
            ['green-400', '<strong>The Success:</strong> Boltz-2 excels at binary classification for challenging ULVSH targets out-of-the-box, vastly outperforming rigorous physics-based scoring functions (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
            ['teal-400', '<strong>The Contradiction:</strong> Affinity predictions are remarkably insensitive to poor pose quality, missing interactions, and severe target mutations (Bret <em>et al.</em>, 2026).'],
            ['emerald-400', '<strong>The Mechanism:</strong> The evidence strongly suggests Boltz-2 bypasses intermolecular physics, relying instead on the memorization of 3D ligand shapes and pharmacophoric patterns (Bret <em>et al.</em>, 2026).'],
            ['cyan-400', '<strong>Final Verdict:</strong> Bret <em>et al.</em> advise extreme skepticism regarding Boltz-2 affinity predictions in the absence of "true prospective validations" (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 17 ─────────────────────────────────────────────────────
    {
        id: 17, title: "AUTHOR INFORMATION & ACKNOWLEDGMENTS",
        notes: "Acknowledgment of the original researchers and funding.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_BOOK, 'Section 7 · Slide 17', 'AUTHOR INFORMATION & ACKNOWLEDGMENTS', 'blue-400', 'emerald-400')}
            <div class="flex gap-12 h-full items-center mt-6">
                <div class="w-full flex flex-col justify-center gap-8 z-10 shrink-0 px-12">
                    ${BULLETS([
            ['blue-400', '<strong>Authors:</strong> Guillaume Bret, François Sindt, and Didier Rognan (Bret <em>et al.</em>, 2026).'],
            ['indigo-400', '<strong>Affiliation:</strong> Laboratoire d’Innovation Thérapeutique, UMR7200 CNRS-Université de Strasbourg, Illkirch, France.'],
            ['purple-400', '<strong>Corresponding Author:</strong> Didier Rognan (rognan@unistra.fr).'],
            ['fuchsia-400', '<strong>Funding:</strong> Supported by a grant from the French National Center for Scientific Research (CNRS) under the OPEN program awarded to D.R. (Bret <em>et al.</em>, 2026).'],
            ['pink-400', '<strong>Disclosure Note:</strong> The corresponding author declares a specific financial competing interest in the commercial drug discovery space (Bret <em>et al.</em>, 2026).'],
        ])}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 18 ─────────────────────────────────────────────────────
    {
        id: 18, title: "REFERENCES",
        notes: "Key citations supporting the adversarial protocol.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_BOOK, 'Section 7 · Slide 18', 'REFERENCES', 'gray-400', 'gray-500')}
            <div class="flex flex-col flex-grow overflow-y-auto px-12 py-6 gap-3 text-sm ppt-text-muted ppt-inner-box rounded-[2rem] border border-gray-200 shadow-sm custom-scrollbar" style="max-height: 70vh;">
                <p><strong>Bret et al., 2026</strong> Bret, G., Sindt, F., and Rognan, D. Assessing Boltz-2 Performance for the Binding Classification of Docking Hits. <em>Journal of Chemical Information and Modeling</em> 2026, 66, 1511−1521.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Coleman et al., 2019</strong> Coleman, J. A., et al. Serotonin Transporter−Ibogaine Complexes Illuminate Mechanisms of Inhibition and Transport. <em>Nature</em> 2019, 569, 141−145.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>DeepMirror, 2025</strong> DeepMirror. Boltz-2 on Real Drug Targets: Does It Work? https://www.deepmirror.ai/post/boltz-2-real-drugtargets.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Desai et al., 2024</strong> Desai, D., et al. Review of Alphafold 3... <em>Cureus</em> 2024, 16, No. e63646.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Eguida et al., 2022</strong> Eguida, M., et al. Target-Focused Library Design by Pocket-Applied Computer Vision... <em>Journal of Medicinal Chemistry</em> 2022, 65, 13771−13783.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Mariani et al., 2013</strong> Mariani, V., et al. LDDT: A Local Superposition-Free Score for Comparing Protein Structures... <em>Bioinformatics</em> 2013, 29, 2722−2728.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Masters et al., 2025</strong> Masters, M. R., Mahmoud, A. H., and Lill, M. A. Investigating Whether Deep Learning Models for Co-Folding Learn the Physics... <em>Nature Communications</em> 2025, 16, 8854.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Nittinger et al., 2025</strong> Nittinger, E., et al. Co-Folding, the Future of Docking... <em>Artificial Intelligence in the Life Sciences</em> 2025, 8, 100136.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Olanders et al., 2024</strong> Olanders, G., et al. Challenge for Deep Learning... <em>Journal of Chemical Information and Modeling</em> 2024, 64, 8481−8494.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Park et al., 2021</strong> Park, J., et al. Symmetric Activation and Modulation of the Human Calcium-Sensing Receptor. <em>PNAS</em> 2021.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Passaro et al., 2025</strong> Passaro, S., et al. Boltz-2: Towards Accurate and Efficient Binding Affinity Prediction. <em>bioRxiv</em> 2025, 1.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Sadybekov et al., 2022</strong> Sadybekov, A. A., et al. Synthon-Based Ligand Discovery in Virtual Libraries of over 11 Billion Compounds. <em>Nature</em> 2022, 601, 452−459.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Sindt et al., 2025</strong> Sindt, F., Bret, G., and Rognan, D. On the Difficulty to Rescore Hits from Ultralarge Docking Screens. <em>JCIM</em> 2025, 65, 5553−5566.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Skrinjar et al., 2025</strong> Skrinjar, P., et al. Have Protein-Ligand Co-Folding Methods Moved Beyond Memorisation? <em>bioRxiv</em> 2025, 1.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Venkatakrishnan et al., 2013</strong> Venkatakrishnan, A. J., et al. Molecular Signatures of G-Protein-Coupled Receptors. <em>Nature</em> 2013, 494, 185−194.</p>
                <div class="w-full h-px bg-gray-200 shrink-0"></div>
                <p><strong>Zdrazil et al., 2024</strong> Zdrazil, B., et al. The ChEMBL Database in 2023: A Drug Discovery Platform... <em>Nucleic Acids Research</em> 2024, 52, D1180−D1192.</p>
            </div>
        `)}`
    },

    // ─── SLIDE 19 ─────────────────────────────────────────────────────
    {
        id: 19, title: "Thank You",
        notes: "Open the floor to questions.",
        content: [], figure: null,
        htmlContent: `
        <div class="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
            <main class="w-full max-w-[1750px] h-full max-h-[980px] flex flex-col justify-center items-center px-16 py-12 relative overflow-hidden pointer-events-auto ppt-bg-glass rounded-[3rem] border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
                <div class="absolute pointer-events-none" style="top:-100px;right:180px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(196,210,255,0.3) 0%,transparent 70%);"></div>
                <div class="absolute pointer-events-none" style="bottom:-80px;left:-80px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(221,214,254,0.25) 0%,transparent 70%);"></div>    
                
                <h1 class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-motto mb-8 drop-shadow-lg text-center leading-tight tracking-tight">Thank You!</h1>
                <p class="text-3xl font-medium tracking-wide ppt-text-muted mt-6 animate-slide-up bg-white/50 backdrop-blur px-8 py-3 rounded-full border border-gray-200 shadow-sm">I am now open to questions.</p>
            </main>
        </div>`
    }
];

// Ensure engine has updated config length if engine exists
if (typeof window !== 'undefined' && window.engine) {
    // This is essentially just data export.
}

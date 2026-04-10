// ============================================================
// BioAlign-Pro — Slide Content Manifest
// Edit htmlContent for each slide to customise the design.
// ============================================================

// Reusable background layer (space grid + cosmic glow)
const BG = (accentFrom = 'purple-900/40', accentTo = 'blue-900/30') => `
    <div class="absolute inset-0 z-0 bg-[#060410] overflow-hidden">
        <div class="absolute inset-0 opacity-20" style="background-image:linear-gradient(to right,rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.1) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%);"></div>
        <div class="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-${accentFrom} to-transparent"></div>
        <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-${accentTo}/30 to-transparent"></div>
    </div>`;

// Reusable glass panel wrapper
const PANEL = (content) => `
    <div class="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
        <main class="w-full max-w-[1750px] h-full max-h-[980px] flex flex-col p-14 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden pointer-events-auto">
            <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
            ${content}
        </main>
    </div>`;

// Reusable header row with icon + gradient title
const HDR = (icon, line1, line2, color1 = 'blue-400', color2 = 'cyan-400') => `
    <header class="flex items-center gap-6 pb-6 border-b border-white/10 mb-8 shrink-0">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-${color1} to-${color2} flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(59,130,246,.4)]">
            ${icon}
        </div>
        <div>
            <p class="text-sm font-bold tracking-[.2em] uppercase text-${color1} mb-1">${line1}</p>
            <h2 style="font-family:'Inter',sans-serif" class="text-4xl font-bold text-white leading-tight">${line2}</h2>
        </div>
    </header>`;

// Reusable bullet list
const BULLETS = (items) => `
    <ul class="flex flex-col gap-6 flex-grow justify-center">
        ${items.map(([dot, text]) => `
        <li class="flex items-start gap-5 group">
            <div class="mt-2 w-6 h-6 rounded-full bg-${dot}/20 border border-${dot}/50 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(59,130,246,.4)]">
                <div class="w-2.5 h-2.5 rounded-full bg-${dot}"></div>
            </div>
            <p class="text-2xl leading-relaxed text-gray-200 group-hover:text-white transition-colors">${text}</p>
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

// Icon SVGs (reusable shorthand)
const ICON_BOLT = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
const ICON_DB = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7c0-1.1 3.58-2 8-2s8 .9 8 2v10c0 1.1-3.58 2-8 2s-8-.9-8-2V7z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12c0 1.1 3.58 2 8 2s8-.9 8-2"/></svg>`;
const ICON_CHART = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`;
const ICON_DNA = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4c2 0 4 1 6 3s4 3 6 3M4 20c2 0 4-1 6-3s4-3 6-3M4 12h16"/></svg>`;
const ICON_WARN = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
const ICON_STAR = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`;
const ICON_BOOK = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`;

// ======================== SLIDE DEFINITIONS ========================

export const SLIDES = [

    // ─── SLIDE 1 ─────────────────────────────────────────────────────
    {
        id: 1, title: "Assessing Boltz-2 Performance for the Binding Classification of Docking Hits",
        notes: "Start: Welcome everyone. Today we analyse Boltz-2's capacity to translate raw sequence data into actionable drug-binding phenotypes.",
        content: [], figure: null,
        htmlContent: `
        ${BG('purple-900/40', 'blue-900/30')}
        <div class="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
            <main class="w-full max-w-[1750px] h-full max-h-[980px] flex flex-col justify-between p-12 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden pointer-events-auto">
                <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full"></div>
                <!-- Top row -->
                <div class="flex justify-between items-start pt-2 z-10">
                    <div class="flex items-center gap-5">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,.3)]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                        </div>
                        <div>
                            <p class="text-base font-bold tracking-wider text-[#38bdf8] uppercase">Journal of Chemical Information and Modeling (JCIM)</p>
                            <p class="text-sm text-gray-400 mt-1">Published: January 27, 2026</p>
                        </div>
                    </div>
                    <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.5c02630" target="_blank" class="flex items-center h-11 px-5 rounded-full bg-white/5 border border-white/20 text-sm text-gray-300 font-medium hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer shrink-0">
                        DOI: 10.1021/acs.jcim.5c02630
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                </div>
                <!-- Middle -->
                <div class="flex-grow flex flex-col justify-center z-10 mt-6">
                    <h1 style="font-family:'Inter',sans-serif" class="text-[5rem] font-bold leading-[1.1] mb-8 tracking-tight">
                        <span class="text-white">Assessing Boltz-2 Performance</span><br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] via-[#38bdf8] to-[#818cf8]">for the Binding Classification</span><br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#c084fc]">of Docking Hits</span>
                    </h1>
                    <h2 class="text-3xl font-medium text-gray-200 mb-3">Guillaume Bret, François Sindt, and Didier Rognan</h2>
                    <a href="https://maps.google.com/?q=Laboratoire+d+innovation+therapeutique+CNRS+Strasbourg" target="_blank" class="text-xl text-gray-400 flex items-center gap-3 w-max hover:text-[#38bdf8] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#38bdf8]" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                        <i>Laboratoire d'innovation thérapeutique, CNRS-Université de Strasbourg, France</i>
                    </a>
                </div>
                <!-- Bottom bar -->
                <div class="z-10 w-full bg-white/[0.04] border border-white/10 rounded-[1.5rem] p-8 flex justify-between items-center relative">
                    <div>
                        <p class="text-xs uppercase tracking-[.2em] text-gray-400 mb-1 font-bold">Presented By</p>
                        <h3 class="text-3xl font-bold text-white">Siddharth Tripathi</h3>
                        <p class="text-[#38bdf8] font-medium text-lg mt-1">M.Sc. - 1</p>
                    </div>
                    <div class="text-right pr-8 relative">
                        <a href="https://maps.google.com/?q=Centre+for+Systems+Biology+Panjab+University" target="_blank" class="block hover:opacity-80 transition-opacity">
                            <p class="text-xl font-semibold text-white">Centre for Systems Biology and Bioinformatics</p>
                            <p class="text-gray-400 text-base mt-1">Panjab University, Chandigarh</p>
                        </a>
                        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-[80%] bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,.6)]"></div>
                    </div>
                </div>
            </main>
        </div>`
    },

    // ─── SLIDE 2 ─────────────────────────────────────────────────────
    {
        id: 2, title: "Background: The Need for Generative Cofolding",
        notes: "Discuss why existing physics-based scoring models fall short against dynamic binding scenarios.",
        content: [], figure: null,
        htmlContent: `
        ${BG('blue-900/30', 'purple-900/30')}
        ${PANEL(`
            ${HDR(ICON_BOLT, 'Section 1 · Slide 2', 'Deep Generative Models in Structural Bioinformatics', 'indigo-400', 'purple-400')}
            ${BULLETS([
            ['blue-400', '<strong class="text-blue-300">Limitations of classical scoring:</strong> Empirical & physics-based functions cannot capture dynamic binding environments accurately.'],
            ['purple-400', '<strong class="text-purple-300">Previous model constraints:</strong> AlphaFold3 weight restrictions prevent open research on ligand binding; Boltz-1 lacks native affinity prediction.'],
            ['cyan-400', '<strong class="text-cyan-300">Genomics importance:</strong> Translating raw sequence variations (SNPs) into actionable drug-binding phenotypes requires cofolding intelligence beyond classical docking.'],
        ])}
        `)}`
    },

    // ─── SLIDE 3 ─────────────────────────────────────────────────────
    {
        id: 3, title: "Architectural Mechanics of the Boltz-2 Model",
        notes: "Explain the three parallel output heads. Emphasise the bifurcation between structure and classification branches.",
        content: [], figure: null,
        htmlContent: `
        ${BG('cyan-900/30', 'indigo-900/30')}
        ${PANEL(`
            ${HDR(ICON_BOLT, 'Section 1 · Slide 3', 'Architectural Mechanics of the Boltz-2 Model', 'cyan-400', 'blue-400')}
            ${BULLETS([
            ['blue-400', '<strong class="text-blue-300">Input:</strong> Raw amino-acid sequence + SMILES string of the small molecule ligand.'],
            ['indigo-400', '<strong class="text-indigo-300">Trunk — 64-layer Pairformer:</strong> Encodes bidirectional 2D pairwise representations of protein–ligand contacts.'],
            ['cyan-400', '<strong class="text-cyan-300">Bifurcation — Denoising Branch (B2-S):</strong> Generates 3D co-folded structural coordinates via a diffusion denoising module.'],
            ['purple-400', '<strong class="text-purple-300">Bifurcation — Stopped-Gradient Branch:</strong> A <em>separate</em> stopped-gradient trajectory feeds the Classifier (B2-C) and Regressor (B2-A) heads for affinity prediction without structural gradient interference.'],
        ])}
        `)}`
    },

    // ─── SLIDE 4 ─────────────────────────────────────────────────────
    {
        id: 4, title: "Dataset Curation: Training vs. ULVSH Validation Set",
        notes: "Emphasise the scale of training data and contrast with the rigorous curation of the ULVSH validation set.",
        content: [], figure: null,
        htmlContent: `
        ${BG('blue-900/30', 'emerald-900/20')}
        ${PANEL(`
            ${HDR(ICON_DB, 'Section 1 · Slide 4', 'Dataset Curation: Training vs. ULVSH Validation', 'blue-400', 'emerald-400')}
            <div class="flex flex-col gap-6 flex-grow justify-center">
                <div class="p-6 bg-blue-900/20 border border-blue-400/30 rounded-2xl">
                    <p class="text-sm font-bold tracking-[.2em] uppercase text-blue-400 mb-3">Training Data</p>
                    ${BULLETS([
            ['blue-400', '<strong class="text-blue-300">205,000</strong> PDB structures'],
            ['blue-300', '<strong class="text-blue-200">1.2 million</strong> ChEMBL continuous affinity measurements'],
            ['cyan-400', '<strong class="text-cyan-300">200,000</strong> PubChem binary binding labels'],
        ])}
                </div>
                <div class="p-6 bg-purple-900/20 border border-purple-400/30 rounded-2xl">
                    <p class="text-sm font-bold tracking-[.2em] uppercase text-purple-400 mb-3">Validation — ULVSH (Ultralarge-Virtual-Screening Hits)</p>
                    ${BULLETS([
            ['purple-400', '<strong class="text-purple-300">943</strong> highly curated binding hits from 10 distinct protein targets'],
            ['pink-400', 'Covers diverse chemical & structural space for robust, unbiased generalisation testing'],
        ])}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 5 ─────────────────────────────────────────────────────
    {
        id: 5, title: "Baseline Classification Efficacy against Classical Functions",
        notes: "Point out the ROC AUC axis clearly. B2-C and B2-A beat all empirical scorers.",
        content: [], figure: null,
        htmlContent: `
        ${BG('indigo-900/30', 'blue-900/20')}
        ${PANEL(`
            ${HDR(ICON_CHART, 'Section 2 · Slide 5', 'Baseline Classification Efficacy against Classical Functions', 'indigo-400', 'blue-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    ${BULLETS([
            ['blue-400', '<strong>X-axis:</strong> Scoring method (Empirical, SQM, B2-C, B2-A)'],
            ['indigo-400', '<strong>Y-axis:</strong> ROC AUC (0 → 1, higher = better discrimination)'],
            ['cyan-400', 'B2-C and B2-A statistically outperform all empirical and semi-empirical quantum mechanics models across all 10 targets'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 1 — Baseline ROC AUC comparison')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 6 ─────────────────────────────────────────────────────
    {
        id: 6, title: "Pharmacophoric Bias and 3D Structural Memorization",
        notes: "The paradox: low 2D similarity but extremely high 3D pharmacophoric overlap with training set.",
        content: [], figure: null,
        htmlContent: `
        ${BG('orange-900/20', 'purple-900/30')}
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 2 · Slide 6', 'Pharmacophoric Bias and 3D Structural Memorization', 'orange-400', 'purple-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    ${BULLETS([
            ['orange-400', '<strong>X-axis:</strong> 2D vs 3D similarity metrics (Morgan-2 / TanimotoCombo)'],
            ['purple-400', '<strong>Y-axis:</strong> Frequency count across ULVSH dataset'],
            ['yellow-400', 'Low <strong class="text-orange-300">2D chemical similarity</strong> (Morgan-2) with ChEMBL training data'],
            ['red-400', '<em>Extremely high</em> <strong class="text-red-300">3D pharmacophoric overlap</strong> (TanimotoCombo) — evidence of structural memorization'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 2 — 2D vs 3D Similarity Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 7 ─────────────────────────────────────────────────────
    {
        id: 7, title: "Evaluating Binding Site Conformational Accuracy",
        notes: "8 out of 10 target binding sites are folded accurately. Use this to set up the paradox in slides 8 and 9.",
        content: [], figure: null,
        htmlContent: `
        ${BG('emerald-900/30', 'blue-900/20')}
        ${PANEL(`
            ${HDR(ICON_DNA, 'Section 3 · Slide 7', 'Evaluating Binding Site Conformational Accuracy', 'emerald-400', 'cyan-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    ${BULLETS([
            ['emerald-400', '<strong>X-axis:</strong> 10 protein targets from ULVSH'],
            ['cyan-400', '<strong>Y-axis:</strong> Site RMSD (Ångströms) — lower = more accurate folding'],
            ['green-400', 'Boltz-2 refolds the protein binding site <strong>highly accurately for 8 / 10 targets</strong> (RMSD &lt; 2 Å threshold)'],
            ['teal-400', 'Sets up the structural paradox: accurate pocket folding does NOT guarantee accurate ligand poses'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 3 — Binding Site RMSD per Target')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 8 ─────────────────────────────────────────────────────
    {
        id: 8, title: "Assessing Ligand Coordinate Fidelity",
        notes: "The key paradox slide. Despite good ROC AUC and good pocket folding, ligand geometries are wrong.",
        content: [], figure: null,
        htmlContent: `
        ${BG('red-900/30', 'orange-900/20')}
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 3 · Slide 8', 'The Ligand Pose Paradox', 'red-400', 'orange-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    ${BULLETS([
            ['orange-400', '<strong>X-axis:</strong> True Positives vs False Positives (ROC curve)'],
            ['red-400', '<strong>Y-axis:</strong> Ligand RMSD (Ångströms) from ground-truth docking pose'],
            ['yellow-400', 'Despite accurate target folding AND high classification ROC AUC, <strong class="text-red-300">actual ligand geometries deviate massively</strong> from ground-truth docking poses'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 4 — Ligand Pose RMSD Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 9 ─────────────────────────────────────────────────────
    {
        id: 9, title: "Quantifying Intermolecular Interaction Conservation (LDDT-PLI)",
        notes: "Define LDDT-PLI before showing the data. Almost all complexes fail the 0.80 threshold.",
        content: [], figure: null,
        htmlContent: `
        ${BG('purple-900/30', 'red-900/20')}
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 3 · Slide 9', 'Collapse of Intermolecular Interactions', 'purple-400', 'red-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    <div class="p-5 bg-purple-900/30 border border-purple-400/30 rounded-xl mb-2">
                        <p class="text-xs font-bold tracking-[.15em] uppercase text-purple-400 mb-1">Definition</p>
                        <p class="text-lg text-white"><strong>LDDT-PLI</strong> — Local Distance Difference Test applied to Protein–Ligand Interaction contacts. Score ≥ 0.80 = conserved interactions.</p>
                    </div>
                    ${BULLETS([
            ['red-400', 'Almost <strong class="text-red-300">all generated complexes fail</strong> the 0.80 LDDT-PLI interaction conservation threshold'],
            ['pink-400', 'Protein folds correctly, ligand binds in the right pocket, yet <em>specific atomic contacts</em> are incorrect'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 5 — LDDT-PLI Score Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 10 ─────────────────────────────────────────────────────
    {
        id: 10, title: "Adversarial Challenge: In Silico Site-Directed Mutagenesis",
        notes: "This is the most damning result. ROC AUC is unchanged after mutating critical binding residues.",
        content: [], figure: null,
        htmlContent: `
        ${BG('yellow-900/20', 'red-900/30')}
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 10', 'Adversarial Challenge: In Silico Site-Directed Mutagenesis', 'yellow-400', 'red-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    <div class="p-5 bg-yellow-900/20 border border-yellow-400/30 rounded-xl mb-2">
                        <p class="text-xs font-bold tracking-[.15em] uppercase text-yellow-400 mb-1">Methodology</p>
                        <p class="text-lg text-white">Critical anchoring residues mutated in silico (e.g., <code class="text-red-300">Asp → Ala</code>) — residues known to be essential for ligand binding.</p>
                    </div>
                    ${BULLETS([
            ['red-400', 'Classification accuracy (ROC AUC) remains <strong class="text-red-300">statistically identical to Wild Type (WT)</strong>'],
            ['yellow-400', 'This violates basic thermodynamic physics — disrupting key contacts <em>must</em> reduce binding affinity'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 6 — WT vs Mutant ROC AUC')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 11 ─────────────────────────────────────────────────────
    {
        id: 11, title: "Spatial Distribution and Mutation Rate Sensitivity",
        notes: "The AI's affinity module ignores structural damage in the binding pocket.",
        content: [], figure: null,
        htmlContent: `
        ${BG('orange-900/20', 'red-900/20')}
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 11', 'Spatial Sensitivity to Mutations', 'orange-400', 'red-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    ${BULLETS([
            ['orange-400', '<strong>X-axis:</strong> Number of mutations introduced per target'],
            ['red-400', '<strong>Y-axis:</strong> ΔROC AUC — change in classification accuracy'],
            ['yellow-400', 'The affinity module largely <strong class="text-red-300">ignores massive structural damage</strong> directly inside the binding pocket'],
            ['pink-400', 'ΔROC AUC remains near zero even with 5+ simultaneous critical residue mutations'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 7 — Mutations vs ΔROC AUC')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 12 ─────────────────────────────────────────────────────
    {
        id: 12, title: "Target Shuffling: Proof of Ligand-Dependent Memorization",
        notes: "For 5/10 targets, the model predicts correctly even with completely wrong protein. This is the smoking gun.",
        content: [], figure: null,
        htmlContent: `
        ${BG('pink-900/30', 'purple-900/30')}
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 12', 'Target Shuffling Experiment', 'pink-400', 'purple-400')}
            <div class="flex gap-8 flex-grow">
                <div class="w-2/5 flex flex-col justify-center gap-5">
                    <div class="p-5 bg-pink-900/20 border border-pink-400/30 rounded-xl mb-2">
                        <p class="text-xs font-bold tracking-[.15em] uppercase text-pink-400 mb-1">Methodology</p>
                        <p class="text-lg text-white">ULVSH ligands are cofolded with <strong>completely unrelated protein sequences</strong> — proteins that have no known interaction with those compounds.</p>
                    </div>
                    ${BULLETS([
            ['red-400', 'For <strong class="text-red-300">5 out of 10 targets</strong>, binding predictions remain accurate despite a totally incorrect protein'],
            ['purple-400', 'Conclusive proof: the model relies heavily on <strong class="text-purple-300">3D ligand shape recognition</strong> rather than genuine protein–ligand thermodynamics'],
        ])}
                </div>
                <div class="w-3/5">
                    ${FIG('Figure 8 — Target Shuffling ROC AUC')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 13 ─────────────────────────────────────────────────────
    {
        id: 13, title: "Mechanistic Insights and Genomics Applicability",
        notes: "Synthesise everything. The model is a shape classifier, not a thermodynamic engine.",
        content: [], figure: null,
        htmlContent: `
        ${BG('blue-900/30', 'emerald-900/20')}
        ${PANEL(`
            ${HDR(ICON_STAR, 'Section 5 · Slide 13', 'Mechanistic Insights and Genomics Applicability', 'blue-400', 'emerald-400')}
            <div class="flex flex-col gap-8 flex-grow justify-center">
                <div class="p-6 bg-blue-900/20 border border-blue-400/30 rounded-2xl">
                    <p class="text-sm font-bold tracking-[.2em] uppercase text-blue-400 mb-2">Key Mechanistic Finding</p>
                    <p class="text-2xl text-white">Boltz-2 functions as an <strong class="text-cyan-300">advanced 3D ligand-shape classifier</strong>, not a physical intermolecular thermodynamics engine.</p>
                </div>
                ${BULLETS([
            ['emerald-400', '<strong class="text-emerald-300">Where it excels:</strong> Highly useful for hit identification in well-characterised, rigid binding pockets where 3D shape complementarity dominates.'],
            ['red-400', '<strong class="text-red-300">Where it fails:</strong> Currently unreliable for predicting the effects of novel genomic mutations (SNPs) on drug binding — the core goal of personalised medicine.'],
            ['yellow-400', 'The model memorises pharmacophoric 3D patterns from training data rather than computing de-novo physics.'],
        ])}
            </div>
        `)}`
    },

    // ─── SLIDE 14 ─────────────────────────────────────────────────────
    {
        id: 14, title: "References & Acknowledgments",
        notes: "Open the floor to questions. This is your moment to engage the audience with the implications.",
        content: [], figure: null,
        htmlContent: `
        ${BG('purple-900/40', 'blue-900/30')}
        ${PANEL(`
            ${HDR(ICON_BOOK, 'Section 5 · Slide 14', 'References & Acknowledgments', 'purple-400', 'blue-400')}
            <div class="flex flex-col gap-10 flex-grow justify-center">
                <div class="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                    <p class="text-xs font-bold tracking-[.2em] uppercase text-purple-400 mb-3">Primary Reference</p>
                    <p class="text-xl text-gray-200 leading-relaxed">Bret, G.; Sindt, F.; Rognan, D. <em>Assessing Boltz-2 Performance for the Binding Classification of Docking Hits.</em> <strong class="text-white">J. Chem. Inf. Model.</strong> 2026.</p>
                    <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.5c02630" target="_blank" class="mt-3 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-lg">
                        DOI: 10.1021/acs.jcim.5c02630
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                </div>
                <div class="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                    <p class="text-xs font-bold tracking-[.2em] uppercase text-blue-400 mb-3">Acknowledgments</p>
                    <p class="text-xl text-gray-200">Presented at the <strong class="text-white">Centre for Systems Biology and Bioinformatics</strong>, Panjab University, Chandigarh.</p>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Thank You.</p>
                    <p class="text-2xl text-gray-400 mt-3 tracking-wide">I am now open to questions.</p>
                </div>
            </div>
        `)}`
    }

];

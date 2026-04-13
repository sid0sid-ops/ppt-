import os
import re

file_path = r'c:\Users\Siddharth Tripathi\OneDrive\Desktop\BioAlign-Pro template\assets_global\js\features\content.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace IMG macro
img_regex = re.compile(r'// Actual image component for loaded figures.*?(?=\n\n    // ───)', re.DOTALL)
new_img_macro = '''// Actual image component for loaded figures
const IMG = (num, label) => `
    <div class="w-full h-full flex flex-col items-center justify-center relative flex-1 min-h-0 min-w-0">
        <img src="./ppt/assets/Figure%20${num}.jpg" 
             onclick="if(this.style.position==='fixed'){this.style='';this.classList.remove('z-[9999]','p-10','bg-white/95','backdrop-blur-2xl','cursor-zoom-out');}else{this.style.position='fixed';this.style.top='0';this.style.left='0';this.style.width='100vw';this.style.height='100vh';this.classList.add('z-[9999]','p-10','bg-white/95','backdrop-blur-2xl','cursor-zoom-out');}" 
             class="w-auto max-w-full h-auto max-h-[80vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[1.5rem] ppt-img-smart cursor-zoom-in transition-all duration-300" 
             alt="${label}" />
        <div class="mt-6 backdrop-blur-md px-6 py-2 rounded-full shadow-lg shrink-0 ppt-caption-glass relative z-10 w-max max-w-full">
            <p class="text-sm font-bold tracking-widest text-center truncate">${label}</p>
        </div>
    </div>`;'''
content = img_regex.sub(new_img_macro, content)

# 2. Slice file at SLIDE 2
parts = content.split('// ─── SLIDE 2 ─────────────────────────────────────────────────────')
header_and_slide1 = parts[0]

# 3. Generate new slides
slides_js = '''// ─── SLIDE 2 ─────────────────────────────────────────────────────
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
        id: 7, title: "Baseline Classification Efficacy against Classical Functions",
        notes: "Point out the ROC AUC axis clearly. B2-C and B2-A beat all empirical scorers.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_CHART, 'Section 3 · Slide 7', 'Baseline Classification Efficacy against Classical Functions', 'indigo-400', 'blue-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['blue-400', '<strong>X-axis:</strong> Scoring method (Empirical, SQM, B2-C, B2-A)'],
            ['indigo-400', '<strong>Y-axis:</strong> ROC AUC (0 → 1, higher = better discrimination)'],
            ['cyan-400', 'B2-C and B2-A statistically outperform all empirical and semi-empirical quantum mechanics models across all 10 targets'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('1', 'Figure 1 — Baseline ROC AUC comparison')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 8 ─────────────────────────────────────────────────────
    {
        id: 8, title: "Pharmacophoric Bias and 3D Structural Memorization",
        notes: "The paradox: low 2D similarity but extremely high 3D pharmacophoric overlap with training set.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 3 · Slide 8', 'Pharmacophoric Bias and 3D Structural Memorization', 'orange-400', 'purple-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['orange-400', '<strong>X-axis:</strong> 2D vs 3D similarity metrics (Morgan-2 / TanimotoCombo)'],
            ['purple-400', '<strong>Y-axis:</strong> Frequency count across ULVSH dataset'],
            ['yellow-400', 'Low <strong class="ppt-text-main">2D chemical similarity</strong> (Morgan-2) with ChEMBL data'],
            ['red-400', '<em>Extremely high</em> <strong class="ppt-text-main">3D pharmacophoric overlap</strong> (TanimotoCombo) — evidence of structural memorization'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('2', 'Figure 2 — 2D vs 3D Similarity Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 9 ─────────────────────────────────────────────────────
    {
        id: 9, title: "Evaluating Binding Site Conformational Accuracy",
        notes: "8 out of 10 target binding sites are folded accurately. Use this to set up the paradox in slides 10 and 11.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_DNA, 'Section 4 · Slide 9', 'Evaluating Binding Site Conformational Accuracy', 'emerald-400', 'cyan-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['emerald-400', '<strong>X-axis:</strong> 10 protein targets from ULVSH'],
            ['cyan-400', '<strong>Y-axis:</strong> Site RMSD (Ångströms) — lower = more accurate folding'],
            ['green-400', 'Boltz-2 refolds the protein binding site <strong>highly accurately for 8 / 10 targets</strong> (RMSD &lt; 2 Å threshold)'],
            ['teal-400', 'Sets up the structural paradox: accurate pocket folding does NOT guarantee accurate ligand poses'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('3', 'Figure 3 — Binding Site RMSD per Target')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 10 ─────────────────────────────────────────────────────
    {
        id: 10, title: "Assessing Ligand Coordinate Fidelity",
        notes: "The key paradox slide. Despite good ROC AUC and good pocket folding, ligand geometries are wrong.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 10', 'The Ligand Pose Paradox', 'red-400', 'orange-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['orange-400', '<strong>X-axis:</strong> True Positives vs False Positives'],
            ['red-400', '<strong>Y-axis:</strong> Ligand RMSD (Ångströms) from ground-truth docking pose'],
            ['yellow-400', 'Despite accurate target folding AND high ROC AUC, <strong class="ppt-text-main">actual ligand geometries deviate massively</strong> from ground-truth docking poses'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('4', 'Figure 4 — Ligand Pose RMSD Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 11 ─────────────────────────────────────────────────────
    {
        id: 11, title: "Quantifying Intermolecular Interaction Conservation (LDDT-PLI)",
        notes: "Define LDDT-PLI before showing the data. Almost all complexes fail the 0.80 threshold.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 4 · Slide 11', 'Collapse of Intermolecular Interactions', 'purple-400', 'red-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    <div class="p-5 rounded-xl mb-2 ppt-inner-box">
                        <p class="text-xs font-bold tracking-[.15em] uppercase text-purple-600 mb-1">Definition</p>
                        <p class="text-lg ppt-text-main"><strong>LDDT-PLI</strong> — Local Distance Difference Test applied to Protein–Ligand Interactions. Score ≥ 0.80 = conserved interactions.</p>
                    </div>
                    ${BULLETS([
            ['red-400', 'Almost <strong class="ppt-text-main">all generated complexes fail</strong> the 0.80 LDDT-PLI threshold'],
            ['pink-400', 'Protein folds correctly, ligand binds in the right pocket, yet <em>specific atomic contacts</em> are incorrect'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('5', 'Figure 5 — LDDT-PLI Score Distribution')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 12 ─────────────────────────────────────────────────────
    {
        id: 12, title: "Adversarial Challenge: In Silico Site-Directed Mutagenesis",
        notes: "This is the most damning result. ROC AUC is unchanged after mutating critical binding residues.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 5 · Slide 12', 'Adversarial Challenge: In Silico Site-Directed Mutagenesis', 'yellow-400', 'red-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    <div class="p-5 rounded-xl mb-2 ppt-inner-box">
                        <p class="text-xs font-bold tracking-[.15em] uppercase text-yellow-600 mb-1">Methodology</p>
                        <p class="text-lg ppt-text-main">Critical anchoring residues mutated in silico (e.g., <code class="text-red-500 font-bold tracking-wider">Asp → Ala</code>) — residues known to be essential for ligand binding.</p>
                    </div>
                    ${BULLETS([
            ['red-400', 'Classification accuracy remains <strong class="ppt-text-main">statistically identical to Wild Type (WT)</strong>'],
            ['yellow-400', 'This violates basic thermodynamic physics — disrupting key contacts <em>must</em> reduce binding affinity'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('6', 'Figure 6 — WT vs Mutant ROC AUC')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 13 ─────────────────────────────────────────────────────
    {
        id: 13, title: "Spatial Distribution and Mutation Rate Sensitivity",
        notes: "The AI's affinity module ignores structural damage in the binding pocket.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 5 · Slide 13', 'Spatial Sensitivity to Mutations', 'orange-400', 'red-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    ${BULLETS([
            ['orange-400', '<strong>X-axis:</strong> Number of mutations introduced per target'],
            ['red-400', '<strong>Y-axis:</strong> ΔROC AUC — change in classification accuracy'],
            ['yellow-400', 'The affinity module largely <strong class="ppt-text-main">ignores massive structural damage</strong> directly inside the binding pocket'],
            ['pink-400', 'ΔROC AUC remains near zero even with 5+ simultaneous critical residue mutations'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('7', 'Figure 7 — Mutations vs ΔROC AUC')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 14 ─────────────────────────────────────────────────────
    {
        id: 14, title: "Target Shuffling: Proof of Ligand-Dependent Memorization",
        notes: "For 5/10 targets, the model predicts correctly even with completely wrong protein. This is the smoking gun.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 5 · Slide 14', 'Target Shuffling Experiment', 'pink-400', 'purple-400')}
            <div class="flex gap-12 h-full items-center">
                <div class="w-[40%] flex flex-col justify-center gap-6 z-10 shrink-0">
                    <div class="p-5 rounded-xl mb-2 ppt-inner-box">
                        <p class="text-xs font-bold tracking-[.15em] uppercase text-pink-600 mb-1">Methodology</p>
                        <p class="text-lg ppt-text-main">ULVSH ligands are cofolded with <strong>completely unrelated protein sequences</strong> — proteins that have no known interaction with those compounds.</p>
                    </div>
                    ${BULLETS([
            ['red-400', 'For <strong class="ppt-text-main">5 out of 10 targets</strong>, predictions remain accurate despite a totally incorrect protein'],
            ['purple-400', 'Conclusive proof: the model relies heavily on <strong class="ppt-text-main">3D ligand shape recognition</strong> rather than genuine thermodynamics'],
        ])}
                </div>
                <div class="w-[60%] h-full flex flex-col items-center justify-center relative min-h-0 min-w-0 pb-6">
                    ${IMG('8', 'Figure 8 — Target Shuffling ROC AUC')}
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 15 ─────────────────────────────────────────────────────
    {
        id: 15, title: "Mechanistic Insights and Genomics Applicability",
        notes: "Synthesise everything. The model is a shape classifier, not a thermodynamic engine.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_STAR, 'Section 6 · Slide 15', 'Mechanistic Insights and Genomics Applicability', 'blue-400', 'emerald-400')}
            <div class="flex flex-col gap-8 flex-grow justify-center mt-2">
                <div class="p-6 rounded-2xl ppt-inner-box">
                    <p class="text-sm font-bold tracking-[.2em] uppercase text-blue-500 mb-2">Key Mechanistic Finding</p>
                    <p class="text-2xl ppt-text-main">Boltz-2 functions as an <strong class="ppt-text-main">advanced 3D ligand-shape classifier</strong>, not a physical intermolecular thermodynamics engine.</p>
                </div>
                ${BULLETS([
            ['emerald-400', '<strong class="ppt-text-main">Where it excels:</strong> Highly useful for hit identification in well-characterised, rigid binding pockets where 3D shape complementarity dominates.'],
            ['red-400', '<strong class="ppt-text-main">Where it fails:</strong> Currently unreliable for predicting the effects of novel genomic mutations (SNPs) on drug binding — the core goal of personalised medicine.'],
            ['yellow-400', 'The model memorises pharmacophoric 3D patterns from training data rather than computing de-novo physics.'],
        ])}
                <div class="flex items-center gap-12 mt-12 max-w-4xl mx-auto w-full p-8 rounded-[2rem] ppt-inner-box border border-gray-200 shadow-sm">
                    <div class="flex-grow flex items-center justify-center relative">
                        <img src="./ppt/assets/logo.png" class="object-contain hover:-translate-y-1 transition-transform duration-500" alt="LIT Logo" style="max-height: 100px;" />
                    </div>
                    <div class="w-px h-24 bg-gray-300"></div>
                    <div class="flex-grow flex items-center justify-center relative">
                        <img src="./ppt/assets/csbb_logo.png" class="object-contain hover:-translate-y-1 transition-transform duration-500" alt="CSBB Logo" style="max-height: 100px;" />
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <p class="text-[1.15rem] ppt-text-muted leading-relaxed">Bret, G.; Sindt, F.; Rognan, D. <em>Assessing Boltz-2 Performance for the Binding Classification of Docking Hits.</em> <strong class="ppt-text-main">J. Chem. Inf. Model.</strong> 2026.</p>
                </div>
            </div>
        `)}`
    },

    // ─── SLIDE 16 ─────────────────────────────────────────────────────
    {
        id: 16, title: "References & Acknowledgments",
        notes: "Open the floor to questions. This is your moment to engage the audience with the implications.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_BOOK, 'Section 6 · Slide 16', 'References & Acknowledgments', 'purple-400', 'blue-400')}
            <div class="flex flex-col flex-grow justify-center overflow-y-auto pr-2 mt-4 space-y-10">
                <div class="p-8 rounded-3xl ppt-inner-box shadow-sm border border-gray-200">
                    <p class="text-xs font-bold tracking-[.2em] uppercase text-purple-600 mb-3">Primary Reference</p>
                    <p class="text-2xl ppt-text-main leading-relaxed mb-4">Bret, G.; Sindt, F.; Rognan, D. <em>Assessing Boltz-2 Performance for the Binding Classification of Docking Hits.</em> <strong>J. Chem. Inf. Model.</strong> 2026.</p>
                    <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.5c02630" target="_blank" class="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-xl font-bold bg-white px-5 py-2 rounded-full shadow-sm border border-blue-100">
                        <i class="fa-solid fa-link"></i> DOI: 10.1021/acs.jcim.5c02630
                    </a>
                </div>
                <div class="p-8 rounded-3xl ppt-inner-box shadow-sm border border-gray-200">
                    <p class="text-xs font-bold tracking-[.2em] uppercase text-blue-500 mb-3">Acknowledgments</p>
                    <p class="text-2xl ppt-text-muted">Presented at the <strong class="ppt-text-main">Centre for Systems Biology and Bioinformatics</strong>, Panjab University, Chandigarh.</p>
                </div>
                <div class="text-center mt-12 mb-8">
                    <h2 class="text-6xl font-extrabold text-[#0f172a] mb-4">Thank You.</h2>
                    <p class="text-2xl ppt-text-muted font-medium">I am now open to questions.</p>
                </div>
            </div>
        `)}`
    }
];

// Ensure engine has updated config length if engine exists
if (typeof window !== 'undefined' && window.engine) {
    // This is essentially just data export.
}
'''
final_content = header_and_slide1 + slides_js
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

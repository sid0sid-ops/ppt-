import re

file_path = "c:/Users/Siddharth Tripathi/OneDrive/Desktop/BioAlign-Pro template/assets_global/js/features/content.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make sure we don't duplicate replacements, we will systematically find the slides by their ID declaration and replace the whole object down to the next slide.

def replace_slide(slide_id, new_content, text):
    pattern = re.compile(rf'(\s*// ─── SLIDE {slide_id} ─────────────────────────────────────────────────────\s*\{{[^{{}}]*?id:\s*{slide_id}.*?\n\s*\}},)', re.DOTALL)
    if not pattern.search(text):
        # Fallback if there's no comma after the last slide (e.g., slide 19)
        pattern = re.compile(rf'(\s*// ─── SLIDE {slide_id} ─────────────────────────────────────────────────────\s*\{{[^{{}}]*?id:\s*{slide_id}.*?\n\s*\}})', re.DOTALL)
        
    match = pattern.search(text)
    if match:
        text = text[:match.start()] + new_content + text[match.end():]
        print(f"Successfully replaced Slide {slide_id}")
    else:
        print(f"Failed to find Slide {slide_id}")
    return text

slide_12 = """
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
    },"""

slide_13 = """
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
    },"""

slide_14 = """
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
    },"""

slide_15 = """
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
    },"""

slide_16 = """
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
    },"""

content = replace_slide(12, slide_12, content)
content = replace_slide(13, slide_13, content)
content = replace_slide(14, slide_14, content)
content = replace_slide(15, slide_15, content)
content = replace_slide(16, slide_16, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated content.js via regex script!")

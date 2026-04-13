import os
import re

file_path = r'c:\Users\Siddharth Tripathi\OneDrive\Desktop\BioAlign-Pro template\assets_global\js\features\content.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

slide_7_replacement = '''    // ─── SLIDE 7 ─────────────────────────────────────────────────────
    {
        id: 7, title: "Classification Success vs. Affinity Failure",
        notes: "Moving to the results, let’s break down Figure 1. On the Y-axis, we have the ROC AUC, which measures classification accuracy, and on the X-axis, we have the different scoring functions. Bret et al. use a combined box-and-dot plot here. The boxes show the statistical spread—the interquartile range with the median as a solid line and the mean as an open square. But importantly, those individual black dots plotted alongside the boxes represent the exact score for each of the 10 specific targets. As you can see on the far right, Boltz-2’s probability (B2-C) and affinity (B2-A) models vastly outperform all older empirical methods. However, Bret and colleagues note a major paradox: while Boltz-2 excels at discriminating true from false positives, its actual affinity predictions don't correlate well with experimental values. Finally, as noted by the anomaly on the slide, it is highly suspicious that the AI succeeds here when rigorous PM6 quantum mechanics previously failed.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_CHART, 'Section 3 · Slide 7', 'Classification Success vs. Affinity Failure', 'indigo-400', 'blue-400')}
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
    },'''

slide_8_replacement = '''    // ─── SLIDE 8 ─────────────────────────────────────────────────────
    {
        id: 8, title: "Search for Potential Similarity Biases",
        notes: "Let us examine Figure 2, where Bret et al. investigate if the AI simply memorized the training data. In Figures 2A and 2B, the Y-axis shows the frequency distribution, and the X-axis shows the similarity scores of our dataset compared to 2.4 million ChEMBL compounds. Figure 2A demonstrates very low 2D similarity, peaking around 0.30. However, Figure 2B reveals a drastic shift: almost all compounds have high 3D similarity, exceeding 1.2 on the TanimotoCombo scale. Despite this high 3D overlap, Bret and colleagues observed no relationship between Boltz-2’s predictions and the actual experimental affinities of these close 3D neighbors. We can see this in Figure 2C, the Neighborhood Anomaly, where multiple compounds share the exact same nearest 3D neighbor.",
        content: [], figure: null,
        htmlContent: `
        ${PANEL(`
            ${HDR(ICON_WARN, 'Section 3 · Slide 8', 'Search for Potential Similarity Biases', 'orange-400', 'purple-400')}
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
    },'''

# Using regex to replace the blocks
pattern_7 = re.compile(r'    // ─── SLIDE 7 ─────────────────────────────────────────────────────\n.*?    },', re.DOTALL)
content = pattern_7.sub(slide_7_replacement, content)

pattern_8 = re.compile(r'    // ─── SLIDE 8 ─────────────────────────────────────────────────────\n.*?    },', re.DOTALL)
content = pattern_8.sub(slide_8_replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

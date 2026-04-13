import re

file_path = "c:/Users/Siddharth Tripathi/OneDrive/Desktop/BioAlign-Pro template/assets_global/js/features/content.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Slide 10
content = content.replace('title: "Evaluating Binding Site Conformational Accuracy"', 'title: "Figure 3: Binding Site Pose Quality"')
content = content.replace("Evaluating Binding Site Conformational Accuracy', 'emerald-400', 'cyan-400'", "Figure 3: Binding Site Pose Quality', 'emerald-400', 'cyan-400'")
content = content.replace("""            ['emerald-400', '<strong>X-axis:</strong> 10 protein targets from ULVSH'],
            ['cyan-400', '<strong>Y-axis:</strong> Site RMSD (Ångströms) — lower = more accurate folding'],
            ['green-400', 'Boltz-2 refolds the protein binding site <strong>highly accurately for 8 / 10 targets</strong> (RMSD &lt; 2 Å threshold)'],
            ['teal-400', 'Sets up the structural paradox: accurate pocket folding does NOT guarantee accurate ligand poses'],""",
"""            ['emerald-400', '<strong>Conformational Bias Anomaly:</strong> Boltz-2 predicts completely different activation states for CASR and SC6A4 than the original docking structures (Coleman <em>et al.</em>, 2019; Park <em>et al.</em>, 2021).'],
            ['cyan-400', '<strong>Graph Anatomy:</strong> Y-axis = Site RMSD in Ångströms, X-axis = The 10 specific targets.'],""")

# Slide 11
content = content.replace('title: "Assessing Ligand Coordinate Fidelity"', 'title: "Figure 4: Ligand Pose Deviations"')
content = content.replace("The Ligand Pose Paradox', 'red-400', 'orange-400'", "Figure 4: Ligand Pose Deviations', 'red-400', 'orange-400'")
content = content.replace("""            ['orange-400', '<strong>X-axis:</strong> True Positives vs False Positives'],
            ['red-400', '<strong>Y-axis:</strong> Ligand RMSD (Ångströms) from ground-truth docking pose'],
            ['yellow-400', 'Despite accurate target folding AND high ROC AUC, <strong class="ppt-text-main">actual ligand geometries deviate massively</strong> from ground-truth docking poses'],""",
"""            ['orange-400', '<strong>Affinity Anomaly:</strong> Poor pose accuracy does not prevent Boltz-2 from efficiently discriminating active from inactive compounds (Bret <em>et al.</em>, 2026).'],""")

# Slide 12
content = content.replace('title: "Quantifying Intermolecular Interaction Conservation (LDDT-PLI)"', 'title: "Figure 5: Conservation of Protein-Ligand Interactions"')
content = content.replace("Collapse of Intermolecular Interactions', 'purple-400', 'red-400'", "Figure 5: Conservation of Protein-Ligand Interactions', 'purple-400', 'red-400'")
content = content.replace("""            ['red-400', 'Almost <strong class="ppt-text-main">all generated complexes fail</strong> the 0.80 LDDT-PLI threshold'],
            ['pink-400', 'Protein folds correctly, ligand binds in the right pocket, yet <em>specific atomic contacts</em> are incorrect'],""",
"""            ['red-400', '<strong>Interaction Anomaly:</strong> The classifier efficiently discriminates active from inactive hits even when massive numbers of expected intermolecular interactions are completely missing (Bret <em>et al.</em>, 2026).'],""")

# Slide 13
content = content.replace('title: "Adversarial Challenge: In Silico Site-Directed Mutagenesis"', 'title: "Figure 6: Adversarial Challenge via Site-Directed Mutagenesis"')
content = content.replace("Adversarial Challenge: In Silico Site-Directed Mutagenesis', 'yellow-400', 'red-400'", "Figure 6: Adversarial Challenge via Site-Directed Mutagenesis', 'yellow-400', 'red-400'")
content = content.replace("""            ['red-400', 'Classification accuracy remains <strong class="ppt-text-main">statistically identical to Wild Type (WT)</strong>'],
            ['yellow-400', 'This violates basic thermodynamic physics — disrupting key contacts <em>must</em> reduce binding affinity'],""",
"""            ['red-400', '<strong>Target Mutation:</strong> Suppressing essential binding site interactions (e.g., Asp3.32) does not significantly alter classification accuracy (Venkatakrishnan <em>et al.</em>, 2013; Bret <em>et al.</em>, 2026).'],
            ['yellow-400', '<strong>Physics Anomaly:</strong> Maintaining high prediction accuracy on severely mutated targets contradicts the elementary physics of intermolecular interactions (Masters <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],""")

# Slide 14
content = content.replace('title: "Spatial Distribution and Mutation Rate Sensitivity"', 'title: "Figure 7: Adversarial Challenge via Progressive Random Mutations"')
content = content.replace("Spatial Sensitivity to Mutations', 'orange-400', 'red-400'", "Figure 7: Adversarial Challenge via Progressive Random Mutations', 'orange-400', 'red-400'")
content = content.replace("""            ['orange-400', '<strong>X-axis:</strong> Number of mutations introduced per target'],
            ['red-400', '<strong>Y-axis:</strong> ΔROC AUC — change in classification accuracy'],
            ['yellow-400', 'The affinity module largely <strong class="ppt-text-main">ignores massive structural damage</strong> directly inside the binding pocket'],
            ['pink-400', 'ΔROC AUC remains near zero even with 5+ simultaneous critical residue mutations'],""",
"""            ['orange-400', '<strong>Binding Site Insensitivity:</strong> Randomly mutating up to 6 residues directly inside the binding pocket yields remarkably limited accuracy variations (±0.10 units) for most targets (Bret <em>et al.</em>, 2026).'],
            ['red-400', '<strong>Physics Anomaly:</strong> Boltz-2 maintains higher accuracy on severely degraded binding pockets than rigorous empirical scoring functions achieve on perfect wild-type structures (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],""")

# Slide 15
content = content.replace('title: "Target Shuffling: Proof of Ligand-Dependent Memorization"', 'title: "Figure 8: Adversarial Challenge via Target Shuffling"')
content = content.replace("Target Shuffling Experiment', 'pink-400', 'purple-400'", "Figure 8: Adversarial Challenge via Target Shuffling', 'pink-400', 'purple-400'")
content = content.replace("""            ['pink-400', 'Dataset assigned to completely <strong class="ppt-text-main">wrong, unrelated targets</strong> (shuffling strategy)'],
            ['purple-400', 'For half the dataset, accuracy drops to random (ROC AUC &lt; 0.6)'],
            ['indigo-400', 'However, for <strong class="text-indigo-500">5 out of 10 targets (e.g., DRD3, ROCK1)</strong>, predictions are completely unaffected by target replacement'],
            ['fuchsia-400', 'Proves predictions for these subsets are purely <strong>ligand-dependent memorization features</strong>'],""",
"""            ['pink-400', '<strong>Target Shuffling:</strong> Assigning ULVSH compounds to totally unrelated targets drops accuracy to random (ROC AUC &lt; 0.6) for half the dataset (Bret <em>et al.</em>, 2026).'],
            ['purple-400', '<strong>Target Independence:</strong> For five specific targets (e.g., DRD3, ROCK1), predictions remain almost entirely target-independent (Bret <em>et al.</em>, 2026).'],
            ['indigo-400', '<strong>Target Ignorance Anomaly:</strong> The model frequently ignores the target entirely, rendering affinity predictions exclusively ligand-dependent (Bret <em>et al.</em>, 2026).'],""")

# Slide 16
content = content.replace("""            ['green-400', 'Boltz-2 excels out-of-the-box at binary classification for challenging ULVSH targets (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
            ['teal-400', 'However, successful classifications mask severe underlying failures in establishing biologically relevant ligand poses.'],
            ['emerald-400', 'Affinity predictions remarkably ignore target mutations or even outright target shuffling, implying AI physics shortcuts.'],
            ['cyan-400', 'Bret <em>et al.</em> suggest extreme caution using these models without prospective <em>in vitro</em> validation campaigns.'],""",
"""            ['green-400', '<strong>The Success:</strong> Boltz-2 excels at binary classification for challenging ULVSH targets out-of-the-box, vastly outperforming rigorous physics-based scoring functions (Sindt <em>et al.</em>, 2025; Bret <em>et al.</em>, 2026).'],
            ['teal-400', '<strong>The Contradiction:</strong> Affinity predictions are remarkably insensitive to poor pose quality, missing interactions, and severe target mutations (Bret <em>et al.</em>, 2026).'],
            ['emerald-400', '<strong>The Mechanism:</strong> The evidence strongly suggests Boltz-2 bypasses intermolecular physics, relying instead on the memorization of 3D ligand shapes and pharmacophoric patterns (Bret <em>et al.</em>, 2026).'],
            ['cyan-400', '<strong>Final Verdict:</strong> Bret <em>et al.</em> advise extreme skepticism regarding Boltz-2 affinity predictions in the absence of true prospective validations (Bret <em>et al.</em>, 2026).'],""")

# Slide 17
content = content.replace("""            ['blue-400', '<strong>Laboratoire d’Innovation Thérapeutique</strong> (LIT)'],
            ['indigo-400', '<strong>CNRS-Université de Strasbourg</strong> (UMR 7200), Illkirch, France'],
            ['purple-400', '<strong>Corresponding Author:</strong> Didier Rognan (rognan@unistra.fr)'],
            ['fuchsia-400', 'Research rigorously designed to audit emerging structural biology AI protocols.'],""",
"""            ['blue-400', '<strong>Authors:</strong> Guillaume Bret, François Sindt, and Didier Rognan (Bret <em>et al.</em>, 2026).'],
            ['indigo-400', '<strong>Affiliation:</strong> Laboratoire d’Innovation Thérapeutique, UMR7200 CNRS-Université de Strasbourg, Illkirch, France.'],
            ['purple-400', '<strong>Corresponding Author:</strong> Didier Rognan (rognan@unistra.fr).'],
            ['fuchsia-400', '<strong>Funding:</strong> Supported by a grant from the French National Center for Scientific Research (CNRS) under the OPEN program awarded to D.R. (Bret <em>et al.</em>, 2026).'],
            ['pink-400', '<strong>Disclosure Note:</strong> The corresponding author declares a specific financial competing interest in the commercial drug discovery space (Bret <em>et al.</em>, 2026).'],""")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated content.js with exact PDF bullet texts")

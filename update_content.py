import re

file_path = "c:/Users/Siddharth Tripathi/OneDrive/Desktop/BioAlign-Pro template/assets_global/js/features/content.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Step 1: Shift slide IDs from 7..16 to 8..17
for i in range(16, 6, -1):
    content = content.replace(f"id: {i},", f"id: {i+1},")
    content = content.replace(f"Slide {i}", f"Slide {i+1}")
    content = content.replace(f"SLIDE {i}", f"SLIDE {i+1}")
    content = content.replace(f"id: {i} ", f"id: {i+1} ")

# Step 2: Prepare new slide 7
new_slide_7 = """
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
"""

# Insert new slide 7 before the new slide 8 (old slide 7)
parts = content.split("// ─── SLIDE 8 ──────────")
if len(parts) == 2:
    new_content = parts[0] + new_slide_7 + "// ─── SLIDE 8 ──────────" + parts[1]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully injected Slide 7 and shifted subsequent IDs.")
else:
    print("Failed to find injection point.")

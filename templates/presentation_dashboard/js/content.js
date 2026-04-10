export const SLIDES = [
    {
        id: 1,
        title: "Assessing Boltz-2 Performance for the Binding Classification of Docking Hits",
        htmlContent: `
            <!-- Abstract Background Elements (Pure HTML + Tailwind Utilities) -->
            <div class="absolute inset-0 z-0" style="background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);"></div>
            
            <!-- Glowing Orbs (Using Tailwind arbitrary animations to avoid custom keyframes) -->
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] z-0 animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] z-0 animate-[pulse_12s_ease-in-out_infinite_reverse]"></div>

            <!-- Main Content Container (Leveraging Layer 2: UI Library) -->
            <main class="relative z-10 w-full max-w-5xl mx-4 p-10 md:p-14 glass-panel animate-slide-up bg-surface/50 backdrop-blur border border-border">
                
                <!-- Header / Journal Info -->
                <div class="flex flex-col sm:flex-row justify-between mb-8 pb-6 border-b border-border">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div>
                            <p class="text-xs font-semibold tracking-wider text-cyan-500 uppercase">Journal of Chemical Information and Modeling (JCIM)</p>
                            <p class="text-[10px] text-muted mt-1">Published: January 27, 2026</p>
                        </div>
                    </div>
                    <a href="https://doi.org/10.1021/acs.jcim.5c02630" target="_blank" class="mt-4 sm:mt-0 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all duration-300 hover:text-cyan-400 flex items-center gap-2">
                        <span>DOI: 10.1021/acs.jcim.5c02630</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>

                <!-- Title -->
                <h1 style="font-family: 'Space Grotesk', sans-serif;" class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-black dark:text-white">
                    Assessing Boltz-2 Performance <br class="hidden md:block"/>
                    <!-- Layer 3: Visuals - animate-motto -->
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 animate-motto">for the Binding Classification of Docking Hits</span>
                </h1>

                <!-- Authors & Affiliation -->
                <div class="mb-12">
                    <h2 class="text-lg md:text-xl font-medium text-black dark:text-white mb-2">
                        Guillaume Bret, François Sindt, and Didier Rognan
                    </h2>
                    <p class="text-sm md:text-base text-muted italic flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-500/70" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
                        Laboratoire d'innovation thérapeutique, CNRS-Université de Strasbourg
                    </p>
                </div>

                <!-- Presenter Section (Layer 4: Interactive - glow-card, data-glow, data-magnetic) -->
                <div class="mt-10 p-6 glass-card glow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group" data-magnetic="8" data-glow="rgba(59,130,246,0.15)">
                    
                    <div>
                        <p class="text-[10px] uppercase tracking-widest text-muted mb-1 font-semibold">Presented By</p>
                        <h3 style="font-family: 'Space Grotesk', sans-serif;" class="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1">Siddharth Tripathi</h3>
                        <p class="text-cyan-500 font-medium text-sm">M.Sc. - 1</p>
                    </div>
                    
                    <div class="text-left md:text-right border-l md:border-l-0 md:border-r-4 border-purple-500/50 pl-4 md:pl-0 md:pr-4">
                        <p class="text-sm md:text-base font-semibold text-black dark:text-white">Centre for Systems Biology & Bioinformatics</p>
                        <p class="text-muted text-xs mt-1">Panjab University</p>
                    </div>
                </div>

            </main>
        `,
        content: [], // Not used when HTML is provided
        figure: null,
        notes: "Start: Welcome everyone. Today we analyze Boltz-2's capacity to translate raw sequence data into actionable drug-binding phenotypes."
    },
    {
        id: 2,
        title: "Background: The Need for Generative Cofolding",
        htmlContent: null,
        content: [
            "Limitations of classical baseline empirical/physics-based scoring functions.",
            "AF3 weight restrictions limit robust ligand prediction natively.",
            "Key Objective: Translating raw sequence variation into meaningful binding phenotypes."
        ],
        figure: null,
        notes: "Discuss why existing physics-based scoring models fall short against dynamic binding scenarios."
    }
];

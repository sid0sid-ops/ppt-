/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./assets_global/js/**/*.js",
        "./templates/**/*.html"
    ],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--background) / <alpha-value>)',
                surface: 'rgb(var(--surface) / <alpha-value>)',
                border: 'rgb(var(--border) / <alpha-value>)',
                muted: 'rgb(var(--muted) / <alpha-value>)',
                'bio-bg': '#0f172a',
                'bio-card': '#1e293b',
                'bio-primary': '#3b82f6',
                'bio-accent': '#10b981'
            }
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enables manual toggling of dark mode via class
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: 'var(--brand-primary)',
                    secondary: 'var(--brand-secondary)',
                    bg: 'var(--brand-bg)',
                    surface: 'var(--brand-surface)',
                    border: 'var(--brand-border)',
                },
                "primary": "hsl(357 100% 44%)",
                "accent-teal": "#20C997",
                "background-light": "#ffffff",
                "background-dark": "#ffffff",
                "surface-dark": "#ffffff",
                "border-dark": "hsl(357 100% 44%)"
            },
            fontFamily: {
                "display": ["Poppins", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            keyframes: {
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            animation: {
                shimmer: 'shimmer 2s infinite',
            }
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                indigo: {
                    50: '#f0f4ff',
                    100: '#e0eaff',
                    200: '#c5d9ff',
                    300: '#99bfff',
                    400: '#699bf7',
                    500: '#4078f2',
                    600: '#2357e6',
                    700: '#1a41c9',
                    800: '#1a36a3',
                    900: '#1a3082',
                    950: '#121e50',
                },
                orange: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                }
            },
        },
    },
    plugins: [],
}

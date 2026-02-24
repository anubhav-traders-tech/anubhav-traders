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
                navy: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#002147', // Actual Navy
                    900: '#001a35',
                    950: '#000c1d',
                },
                gold: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#FACC15', // Vibrant Yellow
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                    950: '#451a03',
                },
                accent: {
                    black: '#0a0a0a',
                    navy: '#001f3f',
                    yellow: '#FFDC00',
                }
            },
        },
    },
    plugins: [],
}

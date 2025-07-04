/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'pixel-pulse': 'pixelPulse 0.5s ease-in-out infinite',
        'pixel-glow': 'pixelGlow 1s ease-in-out infinite',
        'retro-blink': 'retro-blink 1s infinite',
      },
      keyframes: {
        pixelPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pixelGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #007bff',
          },
          '50%': { 
            boxShadow: '0 0 20px #007bff, 0 0 30px #007bff',
          },
        },
        'retro-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
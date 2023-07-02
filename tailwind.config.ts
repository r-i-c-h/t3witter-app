import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        apparate: {
          '0%': { transform: 'translate(0, 8px)', opacity: '0.2' },
          '100%': { transform: 'translate(0, 0px)', opacity: '1' },
        },
        amber_fill: {
          '0%': { opacity: '0.7', fill: '#FCD34D' },
          '100%': { opacity: '1', fill: '#FCD34D' },
        },
        complete_line: {
          '100%': { strokeDashoffset: '0' },
        },
        'tracking-in-expand': {
          '0%': { 'letter-spacing': '-.5em', opacity: '0' },
          '40%': { opacity: '0.6' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'apparate': 'apparate 1s forwards',
        'tracking-in-expand': 'tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
        'draw-welcome': '6000ms cubic-bezier(0.83, 0, 0.17, 1) forwards complete_line, 2000ms ease-out infinite alternate amber_fill'
      },
    },
  },
  plugins: [],
} satisfies Config;

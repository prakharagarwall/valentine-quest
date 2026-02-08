import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        pinky: '#FF6FA3',
        blush: '#FFDDE6',
        goldie: '#FFD166'
      }
    }
  },
  plugins: []
}

export default config

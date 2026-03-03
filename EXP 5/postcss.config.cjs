// CommonJS PostCSS config — Vite will load this even when project is ESM
// Uses the official Tailwind PostCSS adapter for Tailwind v4
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

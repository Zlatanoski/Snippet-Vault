/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      borderWidth: {
        '0.5': '0.5px',
        '1.5': '1.5px',
      },
      // No custom fontSize — use Tailwind's built-in scale:
      // text-xs   = 0.75rem
      // text-sm   = 0.875rem
      // text-base = 1rem
      // text-lg   = 1.125rem
      colors: {
        surface: {
          page:   'var(--color-surface-page)',
          base:   'var(--color-surface-base)',
          raised: 'var(--color-surface-raised)',
          info:   'var(--color-surface-info)',
        },
        content: {
          primary:   'var(--color-content-primary)',
          secondary: 'var(--color-content-secondary)',
          tertiary:  'var(--color-content-tertiary)',
          info:      'var(--color-content-info)',
        },
        'border-accent': 'var(--color-border-info)',
        lang: {
          ts:   { bg: 'var(--color-lang-ts-bg)',   fg: 'var(--color-lang-ts-fg)'   },
          js:   { bg: 'var(--color-lang-js-bg)',   fg: 'var(--color-lang-js-fg)'   },
          py:   { bg: 'var(--color-lang-py-bg)',   fg: 'var(--color-lang-py-fg)'   },
          sh:   { bg: 'var(--color-lang-sh-bg)',   fg: 'var(--color-lang-sh-fg)'   },
          sql:  { bg: 'var(--color-lang-sql-bg)',  fg: 'var(--color-lang-sql-fg)'  },
          css:  { bg: 'var(--color-lang-css-bg)',  fg: 'var(--color-lang-css-fg)'  },
          json: { bg: 'var(--color-lang-json-bg)', fg: 'var(--color-lang-json-fg)' },
        },
      },
      height: {
        dvh: '100dvh',
      },
    },
  },
  plugins: [],
};
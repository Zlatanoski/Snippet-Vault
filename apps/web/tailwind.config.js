/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
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
          page:   'hsl(var(--color-surface-page))',
          base:   'hsl(var(--color-surface-base))',
          raised: 'hsl(var(--color-surface-raised))',
          info:   'hsl(var(--color-surface-info))',
        },
        content: {
          primary:   'hsl(var(--color-content-primary))',
          secondary: 'hsl(var(--color-content-secondary))',
          tertiary:  'hsl(var(--color-content-tertiary))',
          info:      'hsl(var(--color-content-info))',
        },
        'border-accent': 'hsl(var(--color-border-info))',
        lang: {
          ts:   { bg: 'hsl(var(--color-lang-ts-bg))',   fg: 'hsl(var(--color-lang-ts-fg))'   },
          js:   { bg: 'hsl(var(--color-lang-js-bg))',   fg: 'hsl(var(--color-lang-js-fg))'   },
          py:   { bg: 'hsl(var(--color-lang-py-bg))',   fg: 'hsl(var(--color-lang-py-fg))'   },
          sh:   { bg: 'hsl(var(--color-lang-sh-bg))',   fg: 'hsl(var(--color-lang-sh-fg))'   },
          sql:  { bg: 'hsl(var(--color-lang-sql-bg))',  fg: 'hsl(var(--color-lang-sql-fg))'  },
          css:  { bg: 'hsl(var(--color-lang-css-bg))',  fg: 'hsl(var(--color-lang-css-fg))'  },
          json: { bg: 'hsl(var(--color-lang-json-bg))', fg: 'hsl(var(--color-lang-json-fg))' },
        },
      },
      height: {
        dvh: '100dvh',
      },
    },
  },
  plugins: [],
};
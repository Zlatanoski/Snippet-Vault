import type { Language } from '../types';

interface Props {
  language: Language;
}

const LANG_META: Record<Language, { label: string; classes: string }> = {
  ts: { label: 'TS', classes: 'bg-lang-ts-bg   text-lang-ts-fg' },
  js: { label: 'JS', classes: 'bg-lang-js-bg   text-lang-js-fg' },
  py: { label: 'PY', classes: 'bg-lang-py-bg   text-lang-py-fg' },
  sh: { label: 'SH', classes: 'bg-lang-sh-bg   text-lang-sh-fg' },
  sql: { label: 'SQL', classes: 'bg-lang-sql-bg  text-lang-sql-fg' },
  css: { label: 'CSS', classes: 'bg-lang-css-bg  text-lang-css-fg' },
  json: { label: 'JSON', classes: 'bg-lang-json-bg text-lang-json-fg' },
};

export default function LangBadge({ language }: Props) {
  const { label, classes } = LANG_META[language];
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

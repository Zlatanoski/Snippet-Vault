import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import CodeEditor, { type Language } from './CodeEditor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'sql', label: 'SQL' },
  { value: 'rust', label: 'Rust' },
  { value: 'json', label: 'JSON' },
];

const COLLECTIONS = ['Personal', 'Work', 'Open Source', 'Snippets'];

const inputCls = [
  'w-full rounded-lg px-3 py-2.5 text-sm',
  'bg-gray-50 dark:bg-neutral-800',
  'border border-gray-200 dark:border-neutral-700',
  'text-gray-900 dark:text-white',
  'placeholder:text-gray-400 dark:placeholder:text-gray-500',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500/60',
  'transition-colors',
].join(' ');

const labelCls =
  'block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5';

export interface NewSnippetData {
  title: string;
  description: string;
  language: Language;
  visibility: 'public' | 'private';
  tags: string[];
  collection: string;
  code: string;
}

interface NewSnippetPanelProps {
  onSave: (data: NewSnippetData) => void;
  onCancel: () => void;
}

export default function NewSnippetPanel({
  onSave,
  onCancel,
}: NewSnippetPanelProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<Language>('typescript');
  const [visibility, setVisibility] = useState<'public' | 'private'>('private');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [collection, setCollection] = useState('');
  const [code, setCode] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  function addTag(raw: string) {
    const tag = raw.replace(/^#/, '').trim().toLowerCase();
    if (tag && !tags.includes(tag)) setTags((prev) => [...prev, tag]);
    setTagInput('');
  }

  function handleTagKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'Backspace' && !tagInput) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col h-full min-w-0">
      <header className="sticky top-0 z-10 flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-neutral-800 bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-md flex-shrink-0">
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
          Create new snippet
        </h1>
      </header>

      <div className="flex flex-1 min-h-0">
        <div className="flex flex-col w-[45%] min-w-[300px] max-w-[560px] border-r border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col gap-4 px-4 py-4 flex-1 overflow-y-auto">
            <div>
              <label className={labelCls}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. useDebounce hook"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description..."
                rows={3}
                className={[inputCls, 'resize-none leading-relaxed'].join(' ')}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Language</label>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v as Language)}
                >
                  <SelectTrigger className="w-full h-9 text-sm dark:bg-neutral-800 dark:border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelCls}>Visibility</label>
                <Select
                  value={visibility}
                  onValueChange={(v) =>
                    setVisibility(v as 'public' | 'private')
                  }
                >
                  <SelectTrigger className="w-full h-9 text-sm dark:bg-neutral-800 dark:border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Tags</label>
              <div
                onClick={() => tagInputRef.current?.focus()}
                className={[
                  'flex flex-wrap items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-lg cursor-text',
                  'bg-gray-50 dark:bg-neutral-800',
                  'border border-gray-200 dark:border-neutral-700',
                  'focus-within:ring-2 focus-within:ring-indigo-500/60',
                  'transition-colors',
                ].join(' ')}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-neutral-700 text-[11px] font-medium text-gray-600 dark:text-gray-300"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTags(tags.filter((t) => t !== tag));
                      }}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
                <input
                  ref={tagInputRef}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKey}
                  onBlur={() => {
                    if (tagInput.trim()) addTag(tagInput);
                  }}
                  placeholder={tags.length === 0 ? 'Add tag...' : ''}
                  className="flex-1 min-w-[80px] bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Collection</label>
              <Select value={collection} onValueChange={setCollection}>
                <SelectTrigger className="w-full h-9 text-sm dark:bg-neutral-800 dark:border-neutral-700">
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  {COLLECTIONS.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-4 border-t border-gray-200 dark:border-neutral-800 flex-shrink-0">
            <button
              onClick={() =>
                onSave({
                  title,
                  description,
                  language,
                  visibility,
                  tags,
                  collection,
                  code,
                })
              }
              className={[
                'inline-flex items-center h-9 px-4 rounded-lg',
                'text-sm font-medium text-white bg-indigo-500',
                'shadow-sm ring-1 ring-indigo-500/40',
                'transition-all duration-150',
                'hover:bg-indigo-400 hover:shadow-md hover:ring-indigo-500/50',
                'active:scale-95 active:bg-indigo-600 active:shadow-none active:ring-0',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2',
              ].join(' ')}
            >
              Save snippet
            </button>
            <button
              onClick={onCancel}
              className={[
                'inline-flex items-center h-9 px-4 rounded-lg',
                'text-sm font-medium text-gray-600 dark:text-gray-400',
                'border border-gray-200 dark:border-neutral-700',
                'bg-white dark:bg-neutral-800',
                'transition-all duration-150',
                'hover:bg-gray-50 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-white',
                'active:scale-95',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
              ].join(' ')}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-white dark:bg-neutral-950">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              Code
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(code)}
              className={[
                'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md',
                'text-xs text-gray-500 dark:text-gray-400',
                'border border-gray-200 dark:border-neutral-700',
                'bg-white dark:bg-neutral-800',
                'hover:bg-gray-50 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-white',
                'transition-colors',
              ].join(' ')}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <path d="M1 7V1h6" />
              </svg>
              Copy
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={code} onChange={setCode} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}

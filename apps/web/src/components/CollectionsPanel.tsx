import { useState } from 'react';
import { Folder, Plus } from 'lucide-react';
import { COLLECTIONS } from '../data';
import type { Collection } from '../types';

function CollectionCard({ col }: { col: Collection }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'flex flex-col gap-3 p-5 rounded-xl border cursor-pointer transition-all duration-150',
        'bg-white dark:bg-neutral-800/50',
        hovered
          ? 'border-gray-300 dark:border-neutral-600 shadow-md dark:shadow-black/30'
          : 'border-gray-200 dark:border-neutral-700 shadow-sm',
      ].join(' ')}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `${col.color}18`,
            border: `1px solid ${col.color}30`,
          }}
        >
          <Folder className="w-4 h-4" style={{ color: col.color }} />
        </div>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded px-2 py-0.5">
          {col.count} snippets
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {col.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {col.description}
        </p>
      </div>
      <p className="text-[11px] text-gray-400 dark:text-gray-500">
        Updated {col.updatedAt}
      </p>
    </div>
  );
}

export default function CollectionsPanel() {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-neutral-900 min-w-0">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800 bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-md flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
            Collections
          </h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-px">
            {COLLECTIONS.length} collections
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-white bg-indigo-500 shadow-sm ring-1 ring-indigo-500/40 transition-all hover:bg-indigo-400 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2">
          <Plus className="w-3 h-3" />
          New collection
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLECTIONS.map((col) => (
            <CollectionCard key={col.id} col={col} />
          ))}
        </div>
      </div>
    </div>
  );
}

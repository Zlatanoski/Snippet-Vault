import type { Snippet } from '../types';
import SnippetCard from './SnippetCard';

interface Props {
    title: string;
    snippets: Snippet[];
    selectedId: string | null;
    onSelectSnippet: (id: string) => void;
    onFilter: () => void;
    onNewSnippet: () => void;
    onMenuOpen: () => void;
}

export default function MainPanel({
                                      title,
                                      snippets,
                                      selectedId,
                                      onSelectSnippet,
                                      onFilter,
                                      onNewSnippet,
                                      onMenuOpen,
                                  }: Props) {
    return (
        <main className="flex flex-col overflow-hidden">

            <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                            {/*Hamburger which only visible on mobile */}
                            <button
                                onClick={onMenuOpen}
                                className="rounded-lg p-1.5 text-content-secondary hover:bg-surface-base md:hidden"
                            >
                                <svg viewBox="0 0 16 16" className="h-4 w-4 stroke-current [fill:none] [stroke-linecap:round] [stroke-width:1.5]">
                                    <line x1="2" y1="4" x2="14" y2="4" />
                                    <line x1="2" y1="8" x2="14" y2="8" />
                                    <line x1="2" y1="12" x2="14" y2="12" />
                                </svg>
                            </button>
                    <span className="text-base font-semibold text-content-primary">{title}</span>
                </div>

                <div className="flex gap-2">
                    <button onClick={onFilter} className="cursor-pointer rounded-lg border border-black/20 bg-transparent px-3 py-1.5 text-sm text-content-secondary transition-colors hover:bg-surface-base">
                        Filter
                    </button>
                    <button
                        onClick={onNewSnippet}
                        className="cursor-pointer rounded-lg border-0 bg-content-primary px-3 py-1.5 text-sm text-surface-raised transition-opacity hover:opacity-80"
                    >
                        <span className="hidden sm:inline">+ New snippet</span>
                        <span className="sm:hidden">+</span>
                    </button>
                </div>
            </div>

            {/* Snippet list */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3 md:p-4">
                {snippets.map((snippet) => (
                    <SnippetCard
                        key={snippet.id}
                        snippet={snippet}
                        isSelected={snippet.id === selectedId}
                        onClick={onSelectSnippet}
                    />
                ))}
            </div>

        </main>
    );
}
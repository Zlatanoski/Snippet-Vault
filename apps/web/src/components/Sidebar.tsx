
import { useState, useEffect } from 'react';
import { LayoutList, Star, Lock, ChevronDown, X, Search, Sun, Moon } from 'lucide-react';
import type { NavItem, Tag } from '../types';

const NAV_ICONS: Record<NavItem['icon'], React.ReactNode> = {
    all:        <LayoutList className="h-4 w-4 shrink-0" />,
    favourites: <Star className="h-4 w-4 shrink-0" />,
    private:    <Lock className="h-4 w-4 shrink-0" />,
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface NavRowProps {
    item: NavItem;
    isActive: boolean;
    onClick: (id: string) => void;
}

function NavRow({ item, isActive, onClick }: NavRowProps) {
    return (
        <div
            onClick={() => onClick(item.id)}
            className={[
                'flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950/50 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white',
            ].join(' ')}
        >
            {NAV_ICONS[item.icon]}
            <span className="truncate">{item.label}</span>
            <span className={[
                'ml-auto text-xs',
                isActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500',
            ].join(' ')}>{item.count}</span>
        </div>
    );
}

interface TagRowProps {
    tag: Tag;
    onClick: (id: string) => void;
}

function TagRow({ tag, onClick }: TagRowProps) {
    return (
        <div
            onClick={() => onClick(tag.id)}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white"
        >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: tag.color }} />
            <span className="truncate">{tag.label}</span>
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{tag.count}</span>
        </div>
    );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

interface Props {
    navItems: NavItem[];
    tags: Tag[];
    activeNavId: string;
    isOpen: boolean;
    onNavSelect: (id: string) => void;
    onTagSelect: (id: string) => void;
    onClose: () => void;
}

function useDarkMode() {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark') ||
        (!document.documentElement.classList.contains('light') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
    }, [isDark]);

    return [isDark, () => setIsDark((d) => !d)] as const;
}

export default function Sidebar({ navItems, tags, activeNavId, isOpen, onNavSelect, onTagSelect, onClose }: Props) {
    const [isDark, toggleDark] = useDarkMode();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar panel */}
            <aside className={[
                'flex flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900',
                'fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-200 md:static md:translate-x-0 md:z-auto',
                isOpen ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}>

                {/* Logo + search */}
                <div className="border-b border-gray-200 dark:border-neutral-800 px-3 pb-3 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950">
                                <ChevronDown className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
                            </div>
                            Snippet Vault
                        </div>
                        {/* Mobile close button */}
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 md:hidden"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-3 flex cursor-text items-center gap-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-sm text-gray-400">
                        <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                        Search snippets...
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-2 py-3">
                    <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Library
                    </p>
                    <div className="space-y-0.5">
                        {navItems.map((item) => (
                            <NavRow
                                key={item.id}
                                item={item}
                                isActive={item.id === activeNavId}
                                onClick={onNavSelect}
                            />
                        ))}
                    </div>

                    <p className="mb-1.5 mt-5 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Tags
                    </p>
                    <div className="space-y-0.5">
                        {tags.map((tag) => (
                            <TagRow key={tag.id} tag={tag} onClick={onTagSelect} />
                        ))}
                    </div>
                </nav>

                {/* Dark mode toggle */}
                <div className="border-t border-gray-200 dark:border-neutral-800 px-3 py-3">
                    <button
                        onClick={toggleDark}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white"
                    >
                        {isDark ? (
                            <>
                                <Sun className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                <span>Light mode</span>
                            </>
                        ) : (
                            <>
                                <Moon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                <span>Dark mode</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}

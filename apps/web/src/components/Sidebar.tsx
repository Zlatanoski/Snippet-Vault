import type { NavItem, Tag } from '../types';

// ── Icons ─────────────────────────────────────────────────────────────────────

const iconClass = 'h-4 w-4 shrink-0 stroke-current [fill:none] [stroke-linecap:round] [stroke-width:1.5]';

function IconAll() {
    return (
        <svg viewBox="0 0 14 14" className={iconClass}>
            <rect x="1" y="1" width="12" height="12" rx="2" />
            <line x1="4" y1="5" x2="10" y2="5" />
            <line x1="4" y1="8" x2="8" y2="8" />
        </svg>
    );
}

function IconFavourites() {
    return (
        <svg viewBox="0 0 14 14" className={iconClass}>
            <polygon points="7,1 8.8,5.2 13.5,5.7 10,9 11,13.5 7,11 3,13.5 4,9 0.5,5.7 5.2,5.2" />
        </svg>
    );
}

function IconPrivate() {
    return (
        <svg viewBox="0 0 14 14" className={iconClass}>
            <rect x="1" y="4" width="12" height="9" rx="2" />
            <path d="M4 4V3a3 3 0 016 0v1" />
        </svg>
    );
}

const NAV_ICONS: Record<NavItem['icon'], React.ReactNode> = {
    all:        <IconAll />,
    favourites: <IconFavourites />,
    private:    <IconPrivate />,
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
                    ? 'border border-black/10 bg-surface-raised font-medium text-content-primary'
                    : 'text-content-secondary hover:bg-surface-page',
            ].join(' ')}
        >
            {NAV_ICONS[item.icon]}
            <span className="truncate">{item.label}</span>
            <span className="ml-auto text-xs text-content-tertiary">{item.count}</span>
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
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-content-secondary transition-colors hover:bg-surface-page"
        >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: tag.color }} />
            <span className="truncate">{tag.label}</span>
            <span className="ml-auto text-xs text-content-tertiary">{tag.count}</span>
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

export default function Sidebar({ navItems, tags, activeNavId, isOpen, onNavSelect, onTagSelect, onClose }: Props) {
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
                'flex flex-col border-r border-black/10 bg-surface-base',
                'fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-200 md:static md:translate-x-0 md:z-auto',
                isOpen ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}>

                {/* Logo + search */}
                <div className="border-b border-black/10 px-3 pb-3 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-content-primary">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface-info">
                                <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 stroke-content-info [fill:none] [stroke-linecap:round] [stroke-width:2]">
                                    <polyline points="2,4 6,8 10,4" />
                                </svg>
                            </div>
                            Snippet Vault
                        </div>
                        {/* Mobile close button */}
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-content-tertiary hover:bg-surface-page md:hidden"
                        >
                            <svg viewBox="0 0 14 14" className="h-4 w-4 stroke-current [fill:none] [stroke-linecap:round] [stroke-width:1.5]">
                                <line x1="2" y1="2" x2="12" y2="12" />
                                <line x1="12" y1="2" x2="2" y2="12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-3 flex cursor-text items-center gap-2 rounded-lg border border-black/10 bg-surface-raised px-3 py-2 text-sm text-content-tertiary">
                        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <circle cx="5" cy="5" r="3.5" />
                            <line x1="8" y1="8" x2="11" y2="11" />
                        </svg>
                        Search snippets...
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-2 py-3">
                    <p className="mb-1.5 px-2 text-xs font-medium uppercase tracking-wider text-content-tertiary">
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

                    <p className="mb-1.5 mt-5 px-2 text-xs font-medium uppercase tracking-wider text-content-tertiary">
                        Tags
                    </p>
                    <div className="space-y-0.5">
                        {tags.map((tag) => (
                            <TagRow key={tag.id} tag={tag} onClick={onTagSelect} />
                        ))}
                    </div>
                </nav>
            </aside>
        </>
    );
}
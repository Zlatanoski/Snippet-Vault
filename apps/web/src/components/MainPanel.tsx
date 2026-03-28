import SnippetCard from "./SnippetCard";
import EditorPane from "./EditorPane";

interface Snippet {
    id: string;
    title: string;
    language: string;
    tags: string[];
    description?: string;
    updatedAt: string;
}

interface MainPanelProps {
    snippets: Snippet[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onNew: () => void;
    onFilter: () => void;
    onToggleSidebar: () => void;
    title: string;
    isSidebarOpen: boolean;
    onClose:() => void;
}

export default function MainPanel({
                                      snippets,
                                      selectedId,
                                      onSelect,
                                      onNew,
                                      onFilter,
                                      onToggleSidebar,
                                      title,
                                      isSidebarOpen,
                                      onClose,
                                  }: MainPanelProps) {
    return (
        <div className="flex h-full min-w-0">

            {/* LEFT: Snippet list ── */}
            <div className={[
                "flex flex-col h-full bg-gray-50 dark:bg-neutral-900 min-w-0",
                "transition-all duration-300 ease-in-out",
                selectedId ? "w-1/2 border-r border-gray-200 dark:border-neutral-800" : "w-full",
            ].join(" ")}>

                {/* Header */}
                <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3.5 border-b border-gray-200 dark:border-neutral-800 bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-md">
                    <button
                        onClick={onToggleSidebar}
                        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                        className={[
                            "md:hidden flex items-center justify-center w-8 h-8 rounded-lg",
                            "text-gray-500 dark:text-gray-400",
                            "transition-all duration-150",
                            "hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white",
                            "active:scale-95",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                        ].join(" ")}
                    >
                        {isSidebarOpen ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                                <path d="M3 3l10 10M13 3L3 13" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                                <path d="M2 4h12M2 8h12M2 12h12" />
                            </svg>
                        )}
                    </button>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight truncate">
                            {title}
                        </h1>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-px tabular-nums">
                            {snippets.length} snippet{snippets.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onFilter}
                            className={[
                                "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg",
                                "text-xs font-medium text-gray-600 dark:text-gray-400",
                                "border border-gray-300 dark:border-neutral-700",
                                "bg-white dark:bg-neutral-800",
                                "transition-all duration-150",
                                "hover:bg-gray-50 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400",
                                "active:scale-95",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                            ].join(" ")}
                        >
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1.5 3h10M3.5 6.5h6M5.5 10h2" />
                            </svg>
                            Filter
                        </button>

                        <button
                            onClick={onNew}
                            className={[
                                "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg",
                                "text-xs font-semibold text-white",
                                "bg-indigo-500",
                                "shadow-sm ring-1 ring-indigo-500/40",
                                "transition-all duration-150",
                                "hover:bg-indigo-400 hover:shadow-md hover:ring-indigo-500/50",
                                "active:scale-95 active:bg-indigo-600 active:shadow-none active:ring-0",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2",
                            ].join(" ")}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M6 1v10M1 6h10" />
                            </svg>
                            New snippet
                        </button>
                    </div>
                </header>

                {/* Snippet list */}
                <div className="relative flex-1 overflow-y-auto">
                    {snippets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 px-6 py-16 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <rect x="3" y="3" width="16" height="16" rx="2" />
                                    <path d="M7 8h8M7 12h5" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">No snippets yet</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create your first snippet to get started</p>
                            </div>
                            <button
                                onClick={onNew}
                                className={[
                                    "mt-1 inline-flex items-center gap-1.5 h-8 px-4 rounded-lg",
                                    "text-xs font-semibold text-white bg-indigo-500",
                                    "shadow-sm ring-1 ring-indigo-500/40",
                                    "transition-all duration-150 hover:bg-indigo-400 hover:shadow-md hover:ring-indigo-500/50",
                                    "active:scale-95 active:bg-indigo-600 active:shadow-none active:ring-0",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2",
                                ].join(" ")}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M6 1v10M1 6h10" />
                                </svg>
                                New snippet
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul className="flex flex-col gap-2 p-3" role="listbox" aria-label="Snippets">
                                {snippets.map((snippet) => (
                                    <li key={snippet.id} role="option" aria-selected={snippet.id === selectedId}>
                                        <SnippetCard
                                            {...snippet}
                                            isSelected={snippet.id === selectedId}
                                            onClick={onSelect}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="pointer-events-none sticky bottom-0 h-16 bg-gradient-to-t from-gray-50 dark:from-neutral-900 to-transparent" />
                        </>
                    )}
                </div>
            </div>


            {selectedId && (
                <EditorPane  onClose={onClose} key={selectedId} snippetId={selectedId} />
            )}
        </div>
    );
}
import { memo } from "react";

interface SnippetCardProps {
    id: string;
    title: string;
    language: string;
    tags: string[];
    description?: string;
    updatedAt: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

// Maps language → Tailwind color classes (full names + common abbreviations)
const LANG_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
    typescript:  { dot: "bg-blue-400",    text: "text-blue-700 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-950/50" },
    ts:          { dot: "bg-blue-400",    text: "text-blue-700 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-950/50" },
    javascript:  { dot: "bg-yellow-400",  text: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/50" },
    js:          { dot: "bg-yellow-400",  text: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/50" },
    python:      { dot: "bg-emerald-400", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/50" },
    py:          { dot: "bg-emerald-400", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/50" },
    rust:        { dot: "bg-orange-400",  text: "text-orange-700 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/50" },
    go:          { dot: "bg-cyan-400",    text: "text-cyan-700 dark:text-cyan-400",     bg: "bg-cyan-50 dark:bg-cyan-950/50" },
    shell:       { dot: "bg-violet-400",  text: "text-violet-700 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/50" },
    sh:          { dot: "bg-violet-400",  text: "text-violet-700 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/50" },
    sql:         { dot: "bg-rose-400",    text: "text-rose-700 dark:text-rose-400",     bg: "bg-rose-50 dark:bg-rose-950/50" },
    css:         { dot: "bg-pink-400",    text: "text-pink-700 dark:text-pink-400",     bg: "bg-pink-50 dark:bg-pink-950/50" },
    html:        { dot: "bg-red-400",     text: "text-red-700 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-950/50" },
    json:        { dot: "bg-slate-400",   text: "text-slate-600 dark:text-slate-400",   bg: "bg-slate-100 dark:bg-slate-800/50" },
    default:     { dot: "bg-slate-400",   text: "text-slate-600 dark:text-slate-400",   bg: "bg-slate-100 dark:bg-slate-800/50" },
};

function getLang(lang: string) {
    return LANG_STYLES[lang.toLowerCase()] ?? LANG_STYLES.default;
}

export default memo(function SnippetCard({
    id,
    title,
    language,
    tags,
    description,
    updatedAt,
    isSelected,
    onClick,
}: SnippetCardProps) {
    const lang = getLang(language);

    return (
        <button
            onClick={() => onClick(id)}
            className={[
                "w-full text-left relative rounded-xl border px-4 py-3 group",
                "transition-all duration-150 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-1",
                isSelected
                    ? "bg-indigo-50 border-indigo-200 shadow-sm dark:bg-indigo-950/40 dark:border-indigo-800"
                    : "bg-white border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md active:scale-[0.995] dark:bg-neutral-800 dark:border-neutral-700",
            ].join(" ")}
        >
            {/* Selected indicator — left accent bar */}
            {isSelected && (
                <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-indigo-500" />
            )}

            <div className="flex flex-col gap-2 pl-1">

                {/* Row 1 — title + language badge */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className={[
                        "text-sm font-semibold leading-snug tracking-tight line-clamp-1",
                        isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white",
                    ].join(" ")}>
                        {title}
                    </h3>

                    {/* Language badge */}
                    <span className={[
                        "shrink-0 mt-px inline-flex items-center gap-1.5",
                        "px-2 py-0.5 rounded-md border border-black/[0.06]",
                        "text-[10px] font-semibold uppercase tracking-widest",
                        lang.bg, lang.text,
                    ].join(" ")}>
                        <span className={["w-1.5 h-1.5 rounded-full", lang.dot].join(" ")} />
                        {language.toUpperCase()}
                    </span>
                </div>

                {/* Row 2 — description (optional) */}
                {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-1">
                        {description}
                    </p>
                )}

                {/* Row 3 — tags + timestamp */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 min-w-0">
                        {tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className={[
                                    "inline-block px-1.5 py-px rounded text-[10px] font-medium",
                                    isSelected
                                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                                        : "bg-gray-100 text-gray-500 dark:bg-neutral-700 dark:text-gray-400",
                                ].join(" ")}
                            >
                                #{tag}
                            </span>
                        ))}
                        {tags.length > 4 && (
                            <span className="text-[10px] text-gray-400 self-center">
                                +{tags.length - 4}
                            </span>
                        )}
                    </div>
                    <time className="shrink-0 text-[10px] text-gray-400 tabular-nums">
                        {updatedAt}
                    </time>
                </div>

            </div>
        </button>
    );
});
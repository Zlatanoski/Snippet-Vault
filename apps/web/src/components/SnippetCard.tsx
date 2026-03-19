import type { Snippet } from '../types';
import LangBadge from './LangBadge';

interface Props {
    snippet: Snippet;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export default function SnippetCard({ snippet, isSelected, onClick }: Props) {
    return (
        <div
            onClick={() => onClick(snippet.id)}
            className={[
                'cursor-pointer rounded-lg p-3 transition-colors bg-surface-raised',
                isSelected
                    ? 'border-[1.5px] border-border-accent'
                    : 'border border-black/10 hover:border-black/20',
            ].join(' ')}
        >
            {/* Title row */}
            <div className="mb-1.5 flex items-center gap-2">
                <LangBadge language={snippet.language} />
                <span className="text-sm font-medium text-content-primary truncate">
          {snippet.title}
        </span>
            </div>

            {/* Code preview */}
            <p className="truncate font-mono text-xs text-content-secondary">
                {snippet.preview}
            </p>

            {/* Tags */}
            <div className="mt-2 flex flex-wrap gap-1.5">
                {snippet.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded border border-black/10 bg-surface-base px-1.5 py-0.5 text-xs text-content-tertiary"
                    >
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
}
// EditorPane.tsx
interface EditorPaneProps {
    snippetId: string;
}

export default function EditorPane({ snippetId }: EditorPaneProps) {
    return (
        <div className="flex flex-col h-full w-1/2 bg-white dark:bg-neutral-950 min-w-0">
            <header className="flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Editor
                </span>
                <span className="ml-2 text-xs text-gray-400 font-mono">{snippetId}</span>
            </header>
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                CodeMirror mounts here
            </div>
        </div>
    );
}
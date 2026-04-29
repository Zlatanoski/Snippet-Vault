import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Share2, Pencil, X, Check } from 'lucide-react';
import CodeEditor, { type Language } from './CodeEditor';
import ShareModal from './ShareModal';

interface EditorPaneProps {
    snippetId: string;
    onClose: () => void;
}

export default function EditorPane({ snippetId, onClose }: EditorPaneProps) {
    const [code, setCode]         = useState('');
    const [language, setLanguage] = useState<Language>('javascript');
    const [shareOpen, setShareOpen] = useState(false);
    const [editMode, setEditMode]   = useState(false);
    const [title, setTitle]         = useState(`Snippet ${snippetId}`);
    const [editTitle, setEditTitle] = useState(title);

    const confirmEdit = () => {
        setTitle(editTitle);
        setEditMode(false);
    };

    return (
        <>
            <div className="flex flex-col h-full w-1/2 bg-white dark:bg-neutral-950 min-w-0">
                <header className="flex items-center gap-2 px-4 py-3.5 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">

                    {/* Title / inline edit */}
                    {editMode ? (
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <input
                                autoFocus
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') setEditMode(false); }}
                                className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-white border-b border-indigo-400 outline-none py-0.5"
                            />
                            <button onClick={confirmEdit} className="w-6 h-6 rounded flex items-center justify-center text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">
                                <Check className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setEditMode(false)} className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate flex-1 min-w-0">{title}</span>
                    )}

                    {/* Language selector */}
                    {!editMode && (
                        <Select value={language} onValueChange={val => setLanguage(val as Language)}>
                            <SelectTrigger className="w-36 h-7 text-xs">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="typescript">TypeScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="css">CSS</SelectItem>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="json">JSON</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {/* Action buttons */}
                    {!editMode && (
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setShareOpen(true)}
                                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <Share2 className="w-3 h-3" /> Share
                            </button>
                            <button
                                onClick={() => { setEditTitle(title); setEditMode(true); }}
                                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <Pencil className="w-3 h-3" /> Edit
                            </button>
                            <button
                                onClick={onClose}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </header>

                <div className="flex-1 overflow-hidden">
                    <CodeEditor
                        value={code}
                        onChange={value => setCode(value)}
                        language={language}
                    />
                </div>
            </div>

            {shareOpen && (
                <ShareModal
                    snippetId={snippetId}
                    snippetTitle={title}
                    onClose={() => setShareOpen(false)}
                />
            )}
        </>
    );
}
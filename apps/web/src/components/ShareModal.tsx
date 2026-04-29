import { useState } from 'react';
import { X, Copy, Check, Globe, Lock } from 'lucide-react';

interface Props {
    snippetId: string;
    snippetTitle: string;
    onClose: () => void;
}

export default function ShareModal({ snippetId, snippetTitle, onClose }: Props) {
    const [copied, setCopied] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const url = `https://snippet-vault.app/s/${snippetId}`;

    const handleCopy = () => {
        navigator.clipboard?.writeText(url).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl w-[440px] p-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Share snippet</h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate max-w-[300px]">{snippetTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex gap-2 mb-5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                    <button
                        onClick={() => setIsPublic(true)}
                        className={[
                            'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all',
                            isPublic
                                ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                        ].join(' ')}
                    >
                        <Globe className="w-3 h-3" /> Public link
                    </button>
                    <button
                        onClick={() => setIsPublic(false)}
                        className={[
                            'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all',
                            !isPublic
                                ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                        ].join(' ')}
                    >
                        <Lock className="w-3 h-3" /> Private
                    </button>
                </div>

                {isPublic ? (
                    <>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg mb-3">
                            <span className="flex-1 text-xs text-gray-600 dark:text-gray-400 font-mono truncate">{url}</span>
                            <button
                                onClick={handleCopy}
                                className={[
                                    'flex items-center gap-1.5 h-7 px-3 rounded-md text-xs font-medium transition-all flex-shrink-0',
                                    copied
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                        : 'bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-600',
                                ].join(' ')}
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">Anyone with this link can view the snippet.</p>
                    </>
                ) : (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 border border-dashed border-gray-200 dark:border-neutral-700 rounded-lg">
                        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">This snippet is private. Only you can view it.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
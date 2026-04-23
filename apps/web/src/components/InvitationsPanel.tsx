import { useState } from 'react';
import { Mail, Layers, Check, X } from 'lucide-react';
import { INVITATIONS } from '../data';

export default function InvitationsPanel() {
    const [dismissed, setDismissed] = useState<string[]>([]);
    const visible = INVITATIONS.filter(i => !dismissed.includes(i.id));

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-neutral-900 min-w-0">

            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800 bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-md flex-shrink-0">
                <div>
                    <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">Invitations</h1>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-px">
                        {visible.length > 0
                            ? `${visible.length} pending invitation${visible.length !== 1 ? 's' : ''}`
                            : 'No pending invitations'}
                    </p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
                {visible.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">All caught up</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">No pending project invitations</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 max-w-2xl">
                        {visible.map(inv => (
                            <div
                                key={inv.id}
                                className="bg-white dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-xl p-5 flex items-center gap-4"
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${inv.projectColor}18`, border: `1px solid ${inv.projectColor}30` }}
                                >
                                    <Layers className="w-5 h-5" style={{ color: inv.projectColor }} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{inv.project}</span>
                                        <span
                                            className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                                            style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
                                        >
                                            {inv.role}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 line-clamp-1">{inv.description}</p>
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                                            style={{ background: `${inv.inviterColor}30`, border: `1px solid ${inv.inviterColor}40`, color: inv.inviterColor }}
                                        >
                                            {inv.inviterInitials[0]}
                                        </div>
                                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                                            Invited by <span className="text-gray-600 dark:text-gray-300">{inv.inviter}</span> · {inv.sent}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => setDismissed(p => [...p, inv.id])}
                                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-400 transition-colors"
                                    >
                                        <Check className="w-3 h-3" /> Accept
                                    </button>
                                    <button
                                        onClick={() => setDismissed(p => [...p, inv.id])}
                                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-neutral-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 transition-colors"
                                    >
                                        <X className="w-3 h-3" /> Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
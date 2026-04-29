import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

type Tab = 'profile' | 'security' | 'preferences';

const STAT_CARDS = [
    { value: '24', label: 'Total snippets' },
    { value: '18', label: 'Public snippets' },
    { value: '5',  label: 'Collections'    },
    { value: '6',  label: 'Favourites'     },
];

export default function ProfilePanel() {
    const [tab, setTab]     = useState<Tab>('profile');
    const [name, setName]   = useState('Zlatanoski');
    const [email, setEmail] = useState('nikolasiljanovski969@gmail.com');
    const [bio, setBio]     = useState('CS student @ University of Primorska');

    const inputCls = 'w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all';
    const labelCls = 'block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5';

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-neutral-900 min-w-0">

            <header className="px-6 py-4 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
                <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">Profile & Settings</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-6">

                <div className="flex gap-0 border-b border-gray-200 dark:border-neutral-800 mb-7">
                    {(['profile', 'security', 'preferences'] as Tab[]).map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={[
                                'px-4 py-2 text-xs font-medium border-b-2 -mb-px capitalize transition-colors',
                                tab === t
                                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                            ].join(' ')}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="flex gap-6">


                    <div className="flex-none w-96 flex flex-col gap-5">
                        {tab === 'profile' && (
                            <>
                                {/* Avatar row */}
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                            Z
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex items-center justify-center shadow-sm">
                                            <Edit2 className="w-2.5 h-2.5 text-gray-500" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Zlatanoski</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-gray-400">@zlatanoski</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">● Active</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelCls}>Display name</label>
                                    <input className={inputCls} value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Email</label>
                                    <input className={inputCls} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Bio</label>
                                    <textarea className={`${inputCls} resize-none`} rows={3} value={bio} onChange={e => setBio(e.target.value)} />
                                </div>
                                <div className="flex gap-2.5">
                                    <button className="h-8 px-4 rounded-lg text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-400 transition-colors">Save changes</button>
                                    <button className="h-8 px-4 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">Discard</button>
                                </div>

                                <div className="mt-2 p-5 rounded-xl bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/40">
                                    <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Danger Zone</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
                                    <button className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors">
                                        <Trash2 className="w-3 h-3" /> Delete account
                                    </button>
                                </div>
                            </>
                        )}

                        {tab === 'security' && (
                            <>
                                <div>
                                    <label className={labelCls}>Current password</label>
                                    <input className={inputCls} type="password" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className={labelCls}>New password</label>
                                    <input className={inputCls} type="password" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className={labelCls}>Confirm new password</label>
                                    <input className={inputCls} type="password" placeholder="••••••••" />
                                </div>
                                <div className="flex gap-2.5">
                                    <button className="h-8 px-4 rounded-lg text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-400 transition-colors">Update password</button>
                                    <button className="h-8 px-4 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">Cancel</button>
                                </div>
                            </>
                        )}

                        {tab === 'preferences' && (
                            <>
                                {[
                                    { label: 'Default language', options: ['TypeScript', 'JavaScript', 'Python', 'Shell', 'SQL'] },
                                    { label: 'Default visibility', options: ['Private', 'Public'] },
                                    { label: 'Editor font', options: ['JetBrains Mono', 'Fira Code', 'Cascadia Code'] },
                                ].map(({ label, options }) => (
                                    <div key={label}>
                                        <label className={labelCls}>{label}</label>
                                        <select className={inputCls}>
                                            {options.map(o => <option key={o}>{o}</option>)}
                                        </select>
                                    </div>
                                ))}
                                <button className="h-8 px-4 w-fit rounded-lg text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-400 transition-colors">Save preferences</button>
                            </>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Your stats</p>
                        <div className="grid grid-cols-2 gap-3">
                            {STAT_CARDS.map(({ value, label }) => (
                                <div key={label} className="bg-white dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-xl p-5">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{label}</p>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
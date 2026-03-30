import { useState, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Code } from 'lucide-react';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        navigate('/dashboard');
    }

    const inputClass = [
        'flex h-9 w-full rounded-lg px-3 text-sm outline-none',
        'border border-neutral-700 bg-neutral-800',
        'text-white placeholder:text-gray-500',
        'transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
    ].join(' ');

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
            <div className="w-full max-w-[380px]">

                {/* Logo + heading */}
                <div className="mb-7 flex flex-col items-center gap-3 text-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-950">
                        <Code className="h-[18px] w-[18px] text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-base font-semibold text-white">Snippet Vault</h1>
                        <p className="mt-0.5 text-sm text-gray-400">Create your account</p>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-800/40 p-6 space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400" htmlFor="fullName">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                className={inputClass}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className={inputClass}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className={inputClass}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-indigo-500 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-500/40 transition-all hover:bg-indigo-400 hover:shadow-md active:scale-[0.99] active:bg-indigo-600 active:shadow-none active:ring-0"
                        >
                            Create account
                        </button>
                    </form>
                </div>

                <div className="mt-3 space-y-3">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-neutral-700 bg-transparent text-sm text-gray-400 transition-colors hover:bg-neutral-800 hover:text-gray-300 active:scale-[0.99]"
                    >
                        Continue as guest
                    </button>

                    <p className="text-center text-xs text-gray-500">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
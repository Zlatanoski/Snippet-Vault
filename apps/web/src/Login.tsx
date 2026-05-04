import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Code } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.SyntheticEvent) {
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
            <h1 className="text-base font-semibold text-white">
              Snippet Vault
            </h1>
            <p className="mt-0.5 text-sm text-gray-400">
              Sign in to your account
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-800/40 p-6 space-y-5">
          {/* OAuth */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                /* TODO: Google OAuth */
              }}
              className="flex h-9 w-full items-center justify-center gap-2.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 text-sm text-gray-300 transition-colors hover:bg-neutral-700 hover:text-white active:scale-[0.99]"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => {
                /* TODO: GitHub OAuth */
              }}
              className="flex h-9 w-full items-center justify-center gap-2.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 text-sm text-gray-300 transition-colors hover:bg-neutral-700 hover:text-white active:scale-[0.99]"
            >
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-neutral-700" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 border-t border-neutral-700" />
          </div>

          {/* Credentials form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium text-gray-400"
                htmlFor="email"
              >
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
              <label
                className="text-xs font-medium text-gray-400"
                htmlFor="password"
              >
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
              Sign in
            </button>
          </form>
        </div>

        {/* Below-card actions */}
        <div className="mt-3 space-y-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-neutral-700 bg-transparent text-sm text-gray-400 transition-colors hover:bg-neutral-800 hover:text-gray-300 active:scale-[0.99]"
          >
            Continue as guest
          </button>

          <p className="text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

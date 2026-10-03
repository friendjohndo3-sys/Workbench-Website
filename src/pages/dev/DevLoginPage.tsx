import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { WorkbenchLogo } from '../../components/WorkbenchLogo';
import { ArrowLeft, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

export const DevLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dev/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        const from = (location.state as any)?.from?.pathname || '/dev/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      setError('An unexpected error occurred during developer authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('dev@workbench.engine');
    setPassword('workbench2026');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#0e3052]/15 selection:text-[#0e3052]">
      {/* Top Bar with back link */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
        <span className="font-mono text-neutral-400 text-[11px]">SYS // DEV_GATE</span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white border border-neutral-300 rounded-md p-6 sm:p-8 shadow-sm space-y-6">
          {/* Brand & Heading */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <WorkbenchLogo size="md" className="w-12 h-12 rounded border-neutral-300" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#0e3052] font-semibold">
                Workbench
              </div>
              <h1 className="text-xl font-bold text-neutral-900 font-sans mt-0.5">
                Developer Access
              </h1>
              <p className="text-xs text-neutral-500 font-sans mt-1">
                Internal site administration and runtime asset controls
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="dev-email"
                className="block text-xs font-semibold text-neutral-800 font-sans mb-1"
              >
                Developer Email or Username
              </label>
              <input
                id="dev-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dev@workbench.engine"
                required
                autoComplete="username"
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-neutral-300 rounded text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0e3052] focus:border-[#0e3052] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="dev-password"
                  className="block text-xs font-semibold text-neutral-800 font-sans"
                >
                  Password
                </label>
                <span className="text-[10px] font-mono text-neutral-400">Min. 4 characters</span>
              </div>
              <input
                id="dev-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-neutral-300 rounded text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0e3052] focus:border-[#0e3052] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-blueprint w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Developer Panel'}</span>
            </button>
          </form>

          {/* Developer Testing Preset Helper */}
          <div className="pt-4 border-t border-neutral-200 text-center space-y-2">
            <div className="text-[11px] font-mono text-neutral-500">
              Development Session Mode
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs text-[#0e3052] hover:underline font-mono cursor-pointer"
            >
              Fill Credentials for Testing
            </button>
          </div>
        </div>

        {/* Security & Production Architecture Notice */}
        <div className="mt-4 p-3 rounded border border-neutral-200 bg-white/70 text-[11px] text-neutral-500 font-mono leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-neutral-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0e3052]" />
            <span>Pluggable Auth Layer Notice</span>
          </div>
          <p>
            Isolated client authentication architecture. Connect server-side session API in{' '}
            <code className="text-neutral-700 bg-neutral-100 px-1 py-0.5 rounded">src/context/AuthContext.tsx</code>{' '}
            when deploying to production.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] font-mono text-neutral-400">
        © 2026 Workbench Engine · Developer Admin Module
      </div>
    </div>
  );
};

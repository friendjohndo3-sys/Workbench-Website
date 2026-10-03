import React from 'react';
import { Link } from 'react-router-dom';
import { WorkbenchLogo } from './WorkbenchLogo';
import { AlertTriangle, Lock } from 'lucide-react';

export const MaintenanceScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between py-16 px-4 sm:px-6 font-sans text-neutral-900">
      <div className="max-w-md w-full mx-auto text-center space-y-6 my-auto">
        <div className="flex justify-center">
          <WorkbenchLogo size="lg" className="w-16 h-16 rounded border-neutral-300" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-300 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Scheduled Maintenance</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Workbench is Updating
          </h1>

          <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
            The Workbench website and services are undergoing scheduled maintenance. Please check back shortly.
          </p>
        </div>

        <div className="pt-6 border-t border-neutral-200">
          <Link
            to="/dev/login"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0e3052] hover:underline"
          >
            <Lock className="w-3 h-3" />
            <span>Developer Access</span>
          </Link>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto text-center text-xs font-mono text-neutral-400">
        © 2026 Workbench Engine · Build. Create. Play.
      </div>
    </div>
  );
};

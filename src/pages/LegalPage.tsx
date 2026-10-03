import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertCircle, ArrowLeft } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 font-sans space-y-10">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e3052] hover:underline mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Legal Notices &amp; Terms
          </h1>
          <p className="text-sm text-neutral-500 font-mono mt-1">
            Last Updated: October 2026 · Spec v1.0.0-prototype
          </p>
        </div>

        {/* Engine Stability Notice */}
        <section className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-2 text-neutral-900 font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-[#0e3052]" />
            <h2>A Note on Engine Stability</h2>
          </div>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Workbench is currently in an active prototype preview phase. We are a small, passionate team building this engine from the ground up. Because of this active development state, you may encounter bugs, crashes, or missing functionality in preview builds. We appreciate your patience, feedback, and collaboration as we work to stabilize the Workbench core.
          </p>
        </section>

        {/* Copyright */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-neutral-900">Copyright &amp; Ownership</h2>
          <p className="text-neutral-700 text-sm leading-relaxed">
            &copy; 2026 Workbench Engine. All rights reserved. The Workbench engine, including its source code, design systems, .wbscript syntax specifications, and branding assets, is the property of the Workbench team.
          </p>
        </section>

        {/* Terms & Conditions */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-neutral-900">Terms and Conditions</h2>
          <p className="text-neutral-700 text-sm leading-relaxed">
            By downloading or testing the Workbench engine prototype, you acknowledge and agree to these terms. This software is provided &quot;as is&quot; for technical testing, evaluation, and community feedback purposes. You remain the sole owner of all creative assets, game logic, and proprietary code you develop using Workbench.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-neutral-900">Privacy Policy</h2>
          <p className="text-neutral-700 text-sm leading-relaxed">
            We respect your privacy. The Workbench website and prototype runtime do not collect personal identifying information or telemetry without explicit opt-in. Any bug logs or feedback messages submitted during testing are used strictly to diagnose crashes and enhance engine stability.
          </p>
        </section>
      </div>
    </div>
  );
};

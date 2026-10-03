import React, { useState } from 'react';
import { Download, Monitor, Laptop, Terminal, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, Package } from 'lucide-react';
import { WorkbenchLogo } from './WorkbenchLogo';

export const DownloadSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      arch: 'x64 / ARM64 (DirectX 12 / Vulkan)',
      badge: 'Windows 10 / 11',
      version: 'v1.0.0-prototype',
    },
    {
      id: 'mac',
      name: 'macOS',
      arch: 'Apple Silicon (M1/M2/M3/M4) & Intel (Metal)',
      badge: 'macOS 13.0+',
      version: 'v1.0.0-prototype',
    },
    {
      id: 'linux',
      name: 'Linux',
      arch: 'x86_64 AppImage / Tarball (Vulkan)',
      badge: 'Ubuntu / Fedora / Arch',
      version: 'v1.0.0-prototype',
    },
  ];

  return (
    <section id="download" className="py-20 lg:py-28 bg-[#0a0a0e] border-b border-neutral-900 relative blueprint-paper-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#101015]/95 border border-cyan-800/50 rounded-xl p-8 sm:p-12 shadow-2xl backdrop-blur-md text-center">
          {/* Brand Mark in Download Section */}
          <div className="flex justify-center mb-6">
            <WorkbenchLogo size="lg" className="shadow-lg" />
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to build?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
            Download Workbench and start creating.
          </p>

          {/* Platform Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedPlatform === p.id
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-sm'
                    : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                <span>{p.name}</span>
                <span className="ml-2 text-[10px] text-neutral-500 font-sans">({p.badge})</span>
              </button>
            ))}
          </div>

          {/* Primary Download Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="btn-blueprint w-full py-4 px-8 text-base font-bold tracking-wide flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-blue-950/60 hover:shadow-cyan-900/50"
            >
              <Download className="w-5 h-5" />
              <span>Download Workbench</span>
            </button>
          </div>

          {/* Target details */}
          <div className="mt-4 text-xs font-mono text-neutral-400">
            Target: <span className="text-cyan-400 font-semibold">{platforms.find((p) => p.id === selectedPlatform)?.arch}</span>
          </div>

          {/* Prototype Notice Banner */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 max-w-lg mx-auto flex items-center justify-center gap-2 text-xs text-neutral-400 font-mono">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Prototype preview website · Production build will be compiled in Visual Studio.</span>
          </div>
        </div>
      </div>

      {/* Prototype Download Modal Confirmation */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#121217] border border-neutral-700 max-w-md w-full rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <WorkbenchLogo size="sm" />
                <span className="font-bold text-white text-base">Workbench Installer</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                Prototype Preview
              </span>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-sans">
              <p>
                You selected the <strong className="text-white">Workbench for {platforms.find((p) => p.id === selectedPlatform)?.name}</strong> package ({platforms.find((p) => p.id === selectedPlatform)?.arch}).
              </p>
              <div className="bg-neutral-900/90 p-3.5 rounded-lg border border-neutral-800 text-neutral-400 font-mono text-[11px] space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Website Prototype Verified</span>
                </div>
                <div>Package: <span className="text-neutral-200">workbench-engine-setup.exe</span></div>
                <div>Runtime: <span className="text-neutral-200">2D + 3D Core / Python / .wbscript</span></div>
                <div>Notice: <span className="text-amber-400">Visual Studio production binary in development</span></div>
              </div>
              <p className="text-neutral-400 text-[11px]">
                As specified in the development brief, this is an interactive prototype showcase of the official website. The standalone engine binaries will be compiled and distributed via Visual Studio.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="btn-blueprint px-5 py-2 text-xs font-mono font-semibold cursor-pointer"
              >
                Close Prototype Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

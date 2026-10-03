import React, { useState } from 'react';
import { WorkbenchLogo } from '../components/WorkbenchLogo';
import {
  Download,
  Monitor,
  Laptop,
  Terminal,
  CheckCircle2
} from 'lucide-react';

export const DownloadPage: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<'win' | 'mac' | 'linux'>('win');
  const [prototypeModal, setPrototypeModal] = useState(false);

  const platforms = [
    {
      id: 'win',
      name: 'Windows',
      icon: Monitor,
      target: 'Windows 10 / 11 (64-bit / ARM64)',
      filename: 'workbench-setup-v1.0.0.exe',
      graphics: 'DirectX 12 / Vulkan 1.2',
      size: '142 MB',
      recommended: true,
    },
    {
      id: 'mac',
      name: 'macOS',
      icon: Laptop,
      target: 'macOS 13.0+ (Apple Silicon & Intel)',
      filename: 'Workbench-v1.0.0-universal.dmg',
      graphics: 'Metal 2.0+ Backend',
      size: '158 MB',
      recommended: false,
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: Terminal,
      target: 'Ubuntu 22.04+, Fedora 38+, Arch (x86_64)',
      filename: 'Workbench-v1.0.0.AppImage',
      graphics: 'Vulkan 1.2+ / X11 & Wayland',
      size: '136 MB',
      recommended: false,
    },
  ];

  const currentPlatform = platforms.find((p) => p.id === selectedOS) || platforms[0];

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header Banner */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-16 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <div className="flex justify-center mb-6">
            <WorkbenchLogo size="lg" className="w-16 h-16 rounded shadow-sm" />
          </div>

          <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 font-semibold">
            Official Distribution Portal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4 font-sans">
            Download Workbench
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans">
            A standalone 2D and 3D game engine for desktop and mobile development. Fast, lightweight, and completely self-contained.
          </p>
        </div>
      </section>

      {/* Main Download Grid & Platform Selectors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Desktop Download Area */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedOS(p.id as any)}
                    className={`px-4 py-2.5 rounded text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 ${
                      selectedOS === p.id
                        ? 'bg-[#0e3052] text-white font-semibold shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200/70 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected OS Details Box */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 text-left space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                <div>
                  <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider font-semibold">
                    Target Operating System
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 font-sans mt-1">
                    Workbench for {currentPlatform.name}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">
                    {currentPlatform.target}
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-neutral-600">
                  <div>Package: <span className="text-neutral-900 font-semibold">{currentPlatform.size}</span></div>
                  <div>Graphics: <span className="text-[#0e3052] font-semibold">{currentPlatform.graphics}</span></div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setPrototypeModal(true)}
                  className="btn-blueprint w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-3 cursor-pointer shadow-sm font-sans"
                >
                  <Download className="w-5 h-5" />
                  <span>Download {currentPlatform.filename}</span>
                </button>

                <span className="text-xs font-mono text-neutral-500">
                  SHA-256 Verified · Standalone Installer
                </span>
              </div>
            </div>

            {/* Current Version Spec Notice */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-600 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Version: <strong className="text-neutral-900">v1.0.0-prototype</strong></span>
              </span>
              <span>License: <strong className="text-neutral-900">Standard Engine License</strong></span>
              <span>Release Stage: <strong className="text-neutral-900">Public Prototype Preview</strong></span>
            </div>
          </div>
        </section>

        {/* System Requirements (Minimum vs Recommended) */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-neutral-900 font-sans">
              System Hardware Requirements
            </h2>
            <p className="text-sm text-neutral-600 font-sans mt-1">
              Workbench is engineered to run smoothly on modern laptops and high-performance developer workstations alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Minimum Spec */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-sans">Minimum Specifications</h3>
                <span className="text-[10px] font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                  Entry 2D &amp; Low-Poly 3D
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Operating System:</span>
                  <span>Windows 10 / macOS 13 / Ubuntu 22.04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Processor:</span>
                  <span>Intel Core i3 / AMD Ryzen 3 / Apple M1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Memory (RAM):</span>
                  <span>4 GB RAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Graphics Card:</span>
                  <span>Vulkan 1.1 / Metal / DirectX 11 support</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Storage:</span>
                  <span>500 MB free disk space</span>
                </div>
              </div>
            </div>

            {/* Recommended Spec */}
            <div className="bg-neutral-50 border border-neutral-300 rounded-lg p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="text-base font-bold text-[#0e3052] font-sans">Recommended Specifications</h3>
                <span className="text-[10px] font-mono text-[#0e3052] bg-white px-2 py-0.5 rounded border border-neutral-300 font-semibold">
                  Full PBR 3D &amp; Complex Physics
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Operating System:</span>
                  <span>Windows 11 / macOS 14+ / Linux 6.x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Processor:</span>
                  <span>Intel Core i7 / AMD Ryzen 7 / Apple M2+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Memory (RAM):</span>
                  <span>16 GB RAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Graphics Card:</span>
                  <span>NVIDIA RTX / AMD Radeon RX / Apple M-series</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Storage:</span>
                  <span>2 GB SSD space</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation & Setup Guide */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-2xl font-bold text-neutral-900 font-sans">
            Installation &amp; First Run Instructions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-700 font-sans">
            <div className="space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0e3052] text-white flex items-center justify-center font-mono text-xs font-semibold">1</span>
                <span>Extract / Run Installer</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Launch the setup package. Workbench will install the runtime and associate <code className="font-mono text-neutral-900 font-semibold">.scene</code> and <code className="font-mono text-neutral-900 font-semibold">.wbscript</code> file extensions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0e3052] text-white flex items-center justify-center font-mono text-xs font-semibold">2</span>
                <span>Select Workspace Directory</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Choose a project location on your local drive. The Project Browser will initialize default template folders and scene manifests.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0e3052] text-white flex items-center justify-center font-mono text-xs font-semibold">3</span>
                <span>Launch &amp; Author</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Open the 2D or 3D viewport, add game nodes into the Game Root, and test your first script with in-editor hot-reloading.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Prototype Notice Modal */}
      {prototypeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-neutral-300 max-w-md w-full rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <WorkbenchLogo size="sm" className="w-7 h-7 rounded" />
                <span className="font-bold text-neutral-900 text-base font-sans">Workbench Installer</span>
              </div>
              <span className="text-[10px] font-mono text-[#0e3052] bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 font-semibold">
                Prototype Notice
              </span>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 leading-relaxed font-sans">
              <p>
                You triggered the download action for <strong className="text-neutral-900">{currentPlatform.filename}</strong>.
              </p>
              <div className="bg-neutral-50 p-3.5 rounded border border-neutral-200 text-neutral-700 font-mono text-[11px] space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Website Prototype Verified</span>
                </div>
                <div>Runtime: <span className="text-neutral-900 font-semibold">2D + 3D Engine Core</span></div>
                <div>Notice: <span className="text-amber-800">Standalone binaries are built in Visual Studio</span></div>
              </div>
              <p className="text-neutral-500 text-[11px]">
                As specified in the development brief, this is an official website prototype. The production binaries will be distributed and signed following the Visual Studio engine build cycle.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
              <button
                onClick={() => setPrototypeModal(false)}
                className="btn-blueprint px-5 py-2 text-xs font-mono font-semibold cursor-pointer"
              >
                Close Prototype Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

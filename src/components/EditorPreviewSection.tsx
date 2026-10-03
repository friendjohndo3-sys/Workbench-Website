import React, { useState } from 'react';
import { WORKBENCH_ASSETS } from '../assets/workbenchImages';
import {
  FolderTree,
  Package,
  Layers,
  ZoomIn,
  Sliders,
  Terminal,
  Info,
  Maximize2,
  CheckCircle2
} from 'lucide-react';

export const EditorPreviewSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="editor" className="py-20 lg:py-28 bg-[#0a0a0d] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Studio Environment
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            The Workbench Editor
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            A fast, native workspace designed with engineering rigor. Distinct project and game hierarchies, orthographic 2D &amp; 3D viewports, and full visual &amp; text script inspection.
          </p>
        </div>

        {/* Primary Editor Showcase: Official Screenshot Asset (1791002482366.jpg) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white font-semibold">Workbench Editor Interface</span>
              <span className="text-neutral-500 hidden sm:inline">· Real Engine Preview</span>
            </div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Click to expand view"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Expand Screenshot</span>
            </button>
          </div>

          {/* Screenshot Display Container */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative rounded-xl overflow-hidden border border-neutral-800 hover:border-cyan-500/60 transition-all duration-300 shadow-2xl bg-[#09090c] cursor-pointer group"
          >
            <img
              src={WORKBENCH_ASSETS.EDITOR_PREVIEW}
              alt="Workbench Editor official interface showing Game Root, Project Browser, 2D Orthographic Viewport, and Inspector"
              className="w-full h-auto object-contain block select-none"
              loading="lazy"
            />
            {/* Subtle hover overlay hint */}
            <div className="absolute inset-0 bg-cyan-950/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-lg border border-neutral-700 text-xs font-mono text-white flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-4 h-4 text-cyan-400" />
                <span>Click to view full-resolution interface</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Breakdown based on the Official Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Root vs Game Root Card */}
          <div className="bg-[#111116] border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-amber-400" />
                    <span>Two Separate Trees</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Strict architectural separation in the UI</p>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                  Core Rule
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {/* Project Root Column */}
                <div className="bg-[#0b0b0e] p-3.5 rounded border border-neutral-800">
                  <div className="font-bold text-amber-300 pb-2 border-b border-neutral-800 flex items-center justify-between text-[11px]">
                    <span>PROJECT BROWSER</span>
                    <span className="text-[9px] text-neutral-500 font-normal">Filesystem</span>
                  </div>
                  <div className="pt-2 text-neutral-300 space-y-1">
                    <div className="text-neutral-400">📁 Scenes</div>
                    <div className="text-neutral-400">📁 Assets</div>
                    <div className="text-neutral-400">📁 Scripts</div>
                    <div className="text-neutral-400">📁 Materials</div>
                    <div className="text-neutral-400">📁 Audio</div>
                    <div className="text-neutral-400">📁 Reusable Scenes</div>
                    <div className="text-neutral-400">📁 Settings</div>
                  </div>
                  <p className="mt-3 text-[10px] text-neutral-500 font-sans border-t border-neutral-800/60 pt-2">
                    Contains raw project files, materials, and source assets on disk.
                  </p>
                </div>

                {/* Game Root Column */}
                <div className="bg-[#0b0b0e] p-3.5 rounded border border-cyan-900/40">
                  <div className="font-bold text-cyan-300 pb-2 border-b border-neutral-800 flex items-center justify-between text-[11px]">
                    <span>GAME ROOT</span>
                    <span className="text-[9px] text-cyan-400/80 font-normal">Active Scene</span>
                  </div>
                  <div className="pt-2 text-neutral-300 space-y-0.5 leading-tight">
                    <div className="text-white font-bold">Game</div>
                    <div className="pl-3 text-cyan-300">├── Player</div>
                    <div className="pl-6 text-neutral-400">├── Body</div>
                    <div className="pl-6 text-neutral-400">├── Camera</div>
                    <div className="pl-6 text-neutral-400">└── Collider</div>
                    <div className="pl-3 text-rose-300">├── Enemy</div>
                    <div className="pl-3 text-emerald-300">├── Ground</div>
                    <div className="pl-3 text-neutral-400">└── Main Camera</div>
                  </div>
                  <p className="mt-3 text-[10px] text-neutral-500 font-sans border-t border-neutral-800/60 pt-2">
                    Shows ONLY the objects currently inside the open scene.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Project Root and Game Root are strictly independent navigation systems.</span>
            </div>
          </div>

          {/* Reusable Scenes Card */}
          <div className="bg-[#111116] border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-cyan-400" />
                    <span>Reusable Scenes</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Build once, instantiate anywhere</p>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                  Modular System
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Workbench natively supports reusable scene composition. You can construct and test a complete entity as its own scene, then instantiate it repeatedly across game levels:
                </p>

                {/* Visual Tree Box for Reusable Scene */}
                <div className="bg-[#0b0b0e] p-3.5 rounded border border-neutral-800 font-mono text-xs text-neutral-300">
                  <div className="text-cyan-300 font-bold mb-1 flex items-center justify-between">
                    <span>Player.scene</span>
                    <span className="text-[10px] text-neutral-500 font-sans font-normal">Component Definition</span>
                  </div>
                  <div className="space-y-0.5 text-neutral-400 pl-2 border-l border-neutral-800">
                    <div>├── Body</div>
                    <div>├── Camera</div>
                    <div>├── Collider</div>
                    <div>└── Player Controller (.wbscript / .wbvisual)</div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  That scene can then be placed inside another scene. Developers can build reusable game objects and modular scene components without writing boilerplate glue code.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Instantiated scenes receive real-time updates when the master scene definition changes.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Editor Screenshot */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-150 cursor-zoom-out"
        >
          <div className="max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 shadow-2xl relative">
            <div className="bg-[#121217] px-4 py-2 flex items-center justify-between border-b border-neutral-800 text-xs font-mono text-neutral-300">
              <span>Workbench Editor — Full Resolution UI Preview</span>
              <span className="text-neutral-500">Click anywhere to close</span>
            </div>
            <div className="p-2 overflow-auto max-h-[82vh]">
              <img
                src={WORKBENCH_ASSETS.EDITOR_PREVIEW}
                alt="Workbench Editor Interface full resolution"
                className="w-full h-auto block rounded"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

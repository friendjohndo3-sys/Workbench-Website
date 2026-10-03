import React from 'react';
import { WORKBENCH_ASSETS } from '../assets/workbenchImages';
import { Download, Compass, Layers, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onDownloadClick: () => void;
  onExploreFeaturesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDownloadClick,
  onExploreFeaturesClick,
}) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden blueprint-grid border-b border-neutral-900">
      {/* Background radial gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950 pointer-events-none" />
      
      {/* Subtle blueprint cyan glow in background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copy Block */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Unboxed Metadata Header */}
          <div className="flex items-center justify-center gap-3 text-xs text-neutral-400 font-mono tracking-wider uppercase">
            <span className="text-cyan-400 font-semibold">Standalone Game Engine</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>2D &amp; 3D Runtime</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>Desktop &amp; Mobile</span>
          </div>

          {/* Primary Display Tagline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
            Build. Create. Play.
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance font-normal">
            A game engine built for bringing your ideas to life.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onDownloadClick}
              className="btn-blueprint w-full sm:w-auto px-7 py-3.5 text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-blue-950/50 hover:shadow-cyan-900/40"
            >
              <Download className="w-4 h-4" />
              <span>Download Workbench</span>
            </button>

            <button
              onClick={onExploreFeaturesClick}
              className="btn-blueprint-secondary w-full sm:w-auto px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              <span>Explore Features</span>
            </button>
          </div>

          {/* Key Specifications */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Python &amp; .wbscript
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              .wbvisual Node Graph
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Reusable Scene Hierarchy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Desktop &amp; Mobile Export
            </span>
          </div>
        </div>

        {/* Hero Visual Display Image (Official Asset: 1791001622925.jpg) */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="mb-3 flex items-center justify-between px-2 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Official Brand Display</span>
            </div>
            <span className="text-neutral-500 font-mono text-[11px]">
              Blueprint Architecture · 2D + 3D
            </span>
          </div>

          <div className="relative group rounded-xl overflow-hidden border border-cyan-800/60 shadow-2xl shadow-cyan-950/40 bg-[#091b30]">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-800/20 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500 pointer-events-none" />
            <img
              src={WORKBENCH_ASSETS.HERO_DISPLAY}
              alt="Workbench — Build. Create. Play. official display banner"
              className="w-full h-auto aspect-video object-cover object-center block relative z-10 select-none"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import {
  Download,
  ArrowRight,
  Layers,
  Box,
  Terminal,
  FileCode,
  Zap,
  Compass,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { content } = useContent();
  const hp = content.homepage;

  return (
    <div className="pt-16 bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 border-b border-neutral-200 bg-white blueprint-grid">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Technical Metadata Header */}
            <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 font-mono tracking-wider uppercase">
              <span className="text-[#0e3052] font-semibold">{hp.heroTagline || 'Standalone Game Engine'}</span>
            </div>

            {/* Primary Tagline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] text-balance font-sans">
              {hp.heroHeadline || 'Build. Create. Play.'}
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed text-balance font-normal font-sans">
              {hp.heroSupportingText || 'A game engine built for bringing your ideas to life.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={hp.primaryButtonPath || '/download'}
                className="btn-blueprint w-full sm:w-auto px-7 py-3.5 text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 cursor-pointer shadow-sm font-sans"
              >
                <Download className="w-4 h-4" />
                <span>{hp.primaryButtonText || 'Download Workbench'}</span>
              </Link>

              <Link
                to={hp.secondaryButtonPath || '/features'}
                className="btn-blueprint-secondary w-full sm:w-auto px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <Compass className="w-4 h-4 text-neutral-500" />
                <span>{hp.secondaryButtonText || 'Explore Features'}</span>
              </Link>
            </div>

            {/* Core Subsystem Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-600 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                2D &amp; 3D Core
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                Python &amp; .wbscript
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                .wbvisual Node Graph
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                Reusable Scene Tree
              </span>
            </div>
          </div>

          {/* Main Hero Display Banner */}
          <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-lg overflow-hidden border border-neutral-300 shadow-sm bg-neutral-900">
              <img
                src={hp.heroDisplayImage || '/images/1791001622925.jpg'}
                alt="Workbench official display banner"
                className="w-full h-auto max-h-[600px] object-cover object-center block select-none"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Introduction: 2D · 3D · Python · .wbscript · .wbvisual */}
      <section className="py-16 lg:py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
              Core Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3 font-sans">
              {hp.featureSectionTitle || 'Engineered with precision. Versatile by design.'}
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed font-sans">
              {hp.featureSectionDescription || 'Workbench combines a high-performance native core with multi-language flexibility, giving creators complete freedom across dimensions and workflows.'}
            </p>
          </div>

          {/* 5 Technical Pillars in Clean Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-sm">
            {/* 2D */}
            <div className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052] mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-sans">2D Engine</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-sans">
                  Pixel-perfect integer coordinates, tilemap auto-tiling, and Box2D kinematic physics.
                </p>
              </div>
              <Link to="/features#2d" className="text-xs font-semibold text-[#0e3052] hover:underline pt-2 font-sans flex items-center gap-1">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 3D */}
            <div className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052] mb-3">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-sans">3D PBR</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-sans">
                  Metallic-roughness materials, cascaded shadow maps, and Vulkan / Metal backends.
                </p>
              </div>
              <Link to="/features#3d" className="text-xs font-semibold text-[#0e3052] hover:underline pt-2 font-sans flex items-center gap-1">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Python */}
            <div className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052] mb-3">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-sans">Python 3.12</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-sans">
                  High-speed C interop for AI behaviors, procedural world generation, and tools.
                </p>
              </div>
              <Link to="/features#python" className="text-xs font-semibold text-[#0e3052] hover:underline pt-2 font-sans flex items-center gap-1">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* .wbscript */}
            <div className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052] mb-3">
                  <FileCode className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-sans">.wbscript</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-sans">
                  Native DSL with clean grammar, zero boilerplate, and native bytecode compilation.
                </p>
              </div>
              <Link to="/docs/wbscript" className="text-xs font-semibold text-[#0e3052] hover:underline pt-2 font-sans flex items-center gap-1">
                <span>Language</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* .wbvisual */}
            <div className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052] mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-sans">.wbvisual</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-sans">
                  Full visual programming with execution flow graphs, typed pins, and state machines.
                </p>
              </div>
              <Link to="/docs/wbvisual" className="text-xs font-semibold text-[#0e3052] hover:underline pt-2 font-sans flex items-center gap-1">
                <span>Nodes</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Workbench Editor Showcase */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                Workspace Environment
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3 font-sans">
                {hp.editorPreviewTitle || 'The Workbench Editor'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
                {hp.editorPreviewDescription || 'A native desktop workspace designed with strict architectural separation between physical filesystem files on disk (Project Browser) and active scene nodes (Game Root).'}
              </p>
            </div>

            <Link
              to="/features#project-root"
              className="btn-blueprint-secondary px-4 py-2 text-xs font-semibold text-neutral-800 flex items-center gap-1.5 self-start font-sans"
            >
              <span>Explore Hierarchy Specs</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </Link>
          </div>

          {/* Editor Preview Image */}
          <div className="rounded-lg overflow-hidden border border-neutral-300 shadow-md bg-neutral-900">
            <img
              src={hp.editorPreviewImage || '/images/1791002482366.jpg'}
              alt="Workbench Editor Interface Preview showing Game Root, Project Browser, and Inspector"
              className="w-full h-auto max-h-[600px] object-cover object-top block select-none"
              loading="lazy"
            />
          </div>

          {/* Quick Technical Callouts */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-bold">
                Project Browser (Disk)
              </h4>
              <p className="text-xs text-neutral-600 font-sans">
                Physical folders for /Scenes, /Assets, /Scripts, /Materials, and /Audio mapping 1:1 to your operating system.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-bold">
                Game Root (Active Scene)
              </h4>
              <p className="text-xs text-neutral-600 font-sans">
                Live hierarchy visualizing only instantiated nodes and entities active in the open viewport.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-bold">
                Reusable Scene Instancing
              </h4>
              <p className="text-xs text-neutral-600 font-sans">
                Save any entity as a standalone <code className="font-mono text-neutral-800 font-semibold">.scene</code> file and nest it across levels with per-instance overrides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Structured Subsystem Overview */}
      <section className="py-20 lg:py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
              Modular Subsystems
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3 font-sans">
              Built for performance, stability, and scale.
            </h2>
            <p className="text-neutral-600 text-sm font-sans leading-relaxed">
              Every engine module operates with clean interfaces, low latency, and zero unnecessary runtime dependencies.
            </p>
          </div>

          {/* Section Group A: Core Simulation & Graphics */}
          <div className="border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-sm mb-8">
            <div className="bg-neutral-100/70 px-6 py-3 border-b border-neutral-200 text-xs font-mono text-neutral-700 font-semibold uppercase tracking-wider">
              Graphics, Simulation &amp; Audio
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">2D Graphics</h4>
                <p className="text-xs text-neutral-600 font-sans">Auto-tiling, pixel snapping, and normal-mapped 2D dynamic lighting.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">3D Rendering</h4>
                <p className="text-xs text-neutral-600 font-sans">PBR metallic-roughness, cascaded shadow maps, and volumetrics.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">Physics</h4>
                <p className="text-xs text-neutral-600 font-sans">Rigid bodies, continuous collision detection (CCD), and raycasts.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">Animation</h4>
                <p className="text-xs text-neutral-600 font-sans">Skeletal skinning, state machine blend trees, and IK solvers.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">Audio</h4>
                <p className="text-xs text-neutral-600 font-sans">Positional 3D audio, reverb zones, and dedicated audio mixing bus.</p>
              </div>
            </div>
          </div>

          {/* Section Group B: Logic & Architecture */}
          <div className="border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <div className="bg-neutral-100/70 px-6 py-3 border-b border-neutral-200 text-xs font-mono text-neutral-700 font-semibold uppercase tracking-wider">
              Programming, Hierarchy &amp; Modular Scenes
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">Python 3.12</h4>
                <p className="text-xs text-neutral-600 font-sans">Native C API interop for gameplay AI, simulation, and tools.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">.wbscript</h4>
                <p className="text-xs text-neutral-600 font-sans">Zero-boilerplate event grammar and JIT bytecode execution.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">.wbvisual</h4>
                <p className="text-xs text-neutral-600 font-sans">Node-based visual graphs for advanced systems and state flows.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">Scenes</h4>
                <p className="text-xs text-neutral-600 font-sans">Asynchronous streaming, additive sub-scenes, and lifecycle events.</p>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 font-sans">Reusable Scenes</h4>
                <p className="text-xs text-neutral-600 font-sans">Master entity definitions with per-instance parameter overrides.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0e3052] hover:underline font-sans"
            >
              <span>Explore all 15 engine features and architectural specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Call-to-Action */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 sm:p-12 shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3 font-sans">
              Ready to build with Workbench?
            </h2>
            <p className="text-base text-neutral-600 max-w-xl mx-auto leading-relaxed mb-8 font-sans">
              Download the engine prototype, explore the documentation, and start creating 2D and 3D games.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to={hp.primaryButtonPath || '/download'}
                className="btn-blueprint py-3.5 px-8 text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 cursor-pointer shadow-sm font-sans"
              >
                <Download className="w-4 h-4" />
                <span>{hp.primaryButtonText || 'Go to Download Page'}</span>
              </Link>

              <Link
                to={hp.secondaryButtonPath || '/docs'}
                className="btn-blueprint-secondary py-3.5 px-8 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <span>Read the Docs</span>
                <ArrowRight className="w-4 h-4 text-neutral-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

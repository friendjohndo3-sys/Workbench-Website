import React, { useState } from 'react';
import {
  Layers,
  Box,
  FileCode,
  Terminal,
  Zap,
  CheckCircle2,
  ArrowRight,
  Code2,
  Activity,
  Cpu,
  Smartphone,
  Monitor
} from 'lucide-react';

interface CapabilityCardProps {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
  codeSnippet?: string;
  visualPreview?: React.ReactNode;
}

export const EngineCapabilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | '2d' | '3d' | 'python' | 'wbscript' | 'wbvisual'>('all');

  const capabilities = [
    {
      id: '2d',
      type: '2D Development',
      title: '2D',
      description: 'Build complete 2D games with Workbench.',
      details: 'Tilemaps, pixel-perfect sprite rendering, Box2D physics simulation, 2D particle systems, and dynamic 2D lighting out of the box.',
      features: ['Tilemap Editor & Auto-Tiling', 'Kinematic & Dynamic 2D Physics', 'Sprite Sheet Animations', 'Parallax Scrolling Layers'],
      tag: '2D Engine',
    },
    {
      id: '3d',
      type: '3D Development',
      title: '3D',
      description: 'Create fully 3D worlds, objects, physics, and gameplay.',
      details: 'High-performance 3D pipeline with Vulkan & Metal render backends, PBR shaders, rigid body dynamics, skeletal animation, and 3D spatial audio.',
      features: ['Physically Based Rendering (PBR)', 'Rigid & Soft Body 3D Physics', 'Transform & Bones Hierarchy', 'Shadow Mapping & Volumetrics'],
      tag: '3D Engine',
    },
    {
      id: 'python',
      type: 'Scripting Language',
      title: 'Python',
      description: 'Use Python for scripting and advanced systems.',
      details: 'First-class Python runtime integration. Write complex AI behaviors, procedural world generation, backend networking, and tool extensions effortlessly.',
      features: ['Full Python 3.12 Bindings', 'High-Speed C API Interop', 'Math & NumPy Ecosystem Support', 'Hot-Reloading in Editor'],
      tag: 'Scripting',
    },
    {
      id: 'wbscript',
      type: 'Native Language',
      title: '.wbscript',
      description: "Workbench's native programming language.",
      details: 'Engineered specifically for game mechanics. Clean natural syntax, zero boilerplate, instant compilation, and seamless engine component access.',
      features: ['Event-Driven Keywords', 'Instant JIT Compilation', 'Zero Memory Leaks', 'Intuitive Game Syntax'],
      tag: 'Native DSL',
    },
    {
      id: 'wbvisual',
      type: 'Node Programming',
      title: '.wbvisual',
      description: 'Build gameplay and systems visually using node-based programming.',
      details: 'A complete visual programming system, not merely a beginner tool. Wire event triggers, state machines, mathematics, and audio graphs without typing code.',
      features: ['Visual Node Flow Execution', 'Real-Time Signal Debugging', 'Reusable Custom Node Macros', '100% Native Performance'],
      tag: 'Visual Graph',
    },
  ];

  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Engine Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            One engine. Multiple ways to build.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Whether you build in 2D or 3D, write code in Python or native .wbscript, or connect logic with .wbvisual nodes — Workbench gives you complete creative freedom.
          </p>
        </div>

        {/* Capabilities Grid (5 Structured Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={cap.id}
              className={`bg-[#101014] border border-neutral-800/90 rounded-lg p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-200 group ${
                idx === 0 || idx === 1 ? 'lg:col-span-1' : ''
              } ${idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div>
                {/* Header Lockup */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                      {cap.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                    {cap.tag}
                  </span>
                </div>

                {/* Primary Description */}
                <p className="text-base font-semibold text-neutral-200 mb-2">
                  {cap.description}
                </p>

                {/* Supporting Details */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                  {cap.details}
                </p>

                {/* Feature bullets */}
                <ul className="space-y-2 mb-6 border-t border-neutral-800/80 pt-4">
                  {cap.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Technical Meta */}
              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Integrated Runtime</span>
                <span className="text-neutral-400 group-hover:text-cyan-400 transition-colors">v1.0 Spec</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

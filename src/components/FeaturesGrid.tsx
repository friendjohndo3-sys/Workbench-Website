import React, { useState } from 'react';
import {
  Layers,
  Box,
  Cpu,
  Activity,
  Film,
  Volume2,
  Layout,
  Package,
  FolderTree,
  Terminal,
  FileCode,
  Zap,
  Smartphone,
  Monitor,
  Search,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      id: '2d',
      category: 'graphics',
      title: '2D Development',
      description: 'Dedicated 2D pipeline with pixel-perfect tilemap editing, 2D particle simulation, sprite layers, and dynamic 2D lighting.',
      icon: Layers,
      highlight: 'Tilemap & Pixel Pipeline',
    },
    {
      id: '3d',
      category: 'graphics',
      title: '3D Development',
      description: 'Physically based rendering (PBR) pipeline with forward and deferred shading, volumetrics, cascaded shadow maps, and custom shaders.',
      icon: Box,
      highlight: 'Vulkan & Metal Shading',
    },
    {
      id: 'physics',
      category: 'simulation',
      title: 'Physics Engine',
      description: 'Unified 2D and 3D rigid body dynamics, raycasting, joint constraints, triggers, continuous collision detection, and spatial partitioning.',
      icon: Activity,
      highlight: '120Hz Sub-Stepping',
    },
    {
      id: 'animation',
      category: 'simulation',
      title: 'Animation System',
      description: 'Timeline-based keyframing, skeletal mesh skinning, root motion support, inverse kinematics (IK), and state machine blending graphs.',
      icon: Film,
      highlight: 'State Machine Blending',
    },
    {
      id: 'audio',
      category: 'simulation',
      title: 'Audio Engine',
      description: 'Positional 3D spatial audio with Doppler effect, real-time reverb zones, multi-track mixing busses, and low-latency streaming.',
      icon: Volume2,
      highlight: '3D Spatial Positioning',
    },
    {
      id: 'ui',
      category: 'graphics',
      title: 'UI System',
      description: 'Resolution-independent anchoring, responsive vector canvas, flex layouts, localized typography, and rich gamepad/touch inputs.',
      icon: Layout,
      highlight: 'Vector Canvas & Anchoring',
    },
    {
      id: 'scene-system',
      category: 'architecture',
      title: 'Scene System',
      description: 'Hierarchical node tree with clean separation between filesystem assets (Project Root) and active runtime scene objects (Game Root).',
      icon: FolderTree,
      highlight: 'Project vs Game Root Separation',
    },
    {
      id: 'reusable-scenes',
      category: 'architecture',
      title: 'Reusable Scenes',
      description: 'Encapsulate complex entities like players, vehicles, and bosses into standalone .scene files that can be nested in any world.',
      icon: Package,
      highlight: 'Modular Scene Prefabs',
    },
    {
      id: 'python',
      category: 'scripting',
      title: 'Python Scripting',
      description: 'First-class Python 3.12 bindings with high-speed C interop. Ideal for AI behaviors, algorithmic generation, and editor tooling.',
      icon: Terminal,
      highlight: 'Python 3.12 Interop',
    },
    {
      id: 'wbscript',
      category: 'scripting',
      title: '.wbscript',
      description: "Workbench's native game language. Designed for crystal-clear gameplay mechanics, event keywords, and instantaneous compilation.",
      icon: FileCode,
      highlight: 'Native Game DSL',
    },
    {
      id: 'wbvisual',
      category: 'scripting',
      title: '.wbvisual',
      description: 'Full visual programming system with event nodes, data routing, math operations, and state flow compiling to native machine code.',
      icon: Zap,
      highlight: 'Node Graph Compiler',
    },
    {
      id: 'desktop',
      category: 'export',
      title: 'Desktop Development',
      description: 'One-click native builds for Windows (x64/ARM64), macOS (Apple Silicon & Intel), and Linux with zero external runtime bloat.',
      icon: Monitor,
      highlight: 'Windows · macOS · Linux',
    },
    {
      id: 'mobile',
      category: 'export',
      title: 'Mobile Development',
      description: 'Optimized export pipelines for iOS and Android with touch gesture support, battery-conscious frame capping, and mobile GPU tuning.',
      icon: Smartphone,
      highlight: 'iOS & Android Export',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'graphics', label: 'Graphics & 2D/3D' },
    { id: 'simulation', label: 'Physics & Audio' },
    { id: 'architecture', label: 'Scenes & Hierarchy' },
    { id: 'scripting', label: 'Languages & Logic' },
    { id: 'export', label: 'Cross-Platform' },
  ];

  const filteredFeatures = features.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="features" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Engine Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Engine Features
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
              Every subsystem in Workbench has been built from the ground up for modularity, rendering fidelity, and developer productivity.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features (e.g. 3D, physics)..."
              className="w-full bg-[#111116] border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Segmented control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFeatures.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-[#101014] border border-neutral-800/90 rounded-lg p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/20 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 px-2 py-0.5 rounded bg-neutral-900/80">
                      {feat.highlight}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Subsystem Core</span>
                  <span className="text-emerald-400">Included</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

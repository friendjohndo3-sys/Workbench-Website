import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Info
} from 'lucide-react';

export const UpdatesPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const updates = [
    {
      id: 'update-01',
      version: 'v1.0.0-prototype',
      date: 'October 2026',
      type: 'Prototype Milestone',
      category: 'milestones',
      badge: 'Release Spec',
      title: 'Workbench Prototype Architecture Specification Published',
      summary: 'Public preview of the Workbench game engine website prototype, showcasing .wbscript syntax, .wbvisual node flow, and Project Root vs Game Root separation.',
      details: [
        'Interactive showcase of .wbscript native game DSL grammar.',
        'Specification of the dual hierarchy tree (Project Browser on disk vs Game Root in active scene).',
        'Multiplatform export roadmap targeting Windows (x64/ARM64), macOS (Apple Silicon/Intel), Linux, iOS, and Android.',
      ],
    },
    {
      id: 'update-02',
      version: 'Devlog #03',
      date: 'September 2026',
      type: 'Engine Devlog',
      category: 'engine',
      badge: 'Architecture',
      title: 'Designing Zero-Boilerplate Event Grammar for .wbscript',
      summary: 'Deep-dive into the design decisions behind the "when <event>:" keyword structure and native JIT execution dispatch.',
      details: [
        'Removal of complex boilerplate classes and excessive syntax brackets.',
        'Deterministic memory management with zero garbage collection pauses during critical gameplay loops.',
        'Direct static type inference for player coordinates and physics vectors.',
      ],
    },
    {
      id: 'update-03',
      version: 'RFC #08',
      date: 'August 2026',
      type: 'Language RFC',
      category: 'rfc',
      badge: 'Visual Scripting',
      title: 'RFC: Parity Between .wbvisual Node Graphs and Text Code',
      summary: 'Drafting the node compilation architecture to guarantee that visual scripting compiles to identical bytecode without reflection bottlenecks.',
      details: [
        'Execution pin signal routing with visual pulse debugging in editor.',
        'Custom node macros for encapsulating math formulas and sub-state graphs.',
        'Strict typed data pins for 2D/3D vectors and entity references.',
      ],
    },
    {
      id: 'update-04',
      version: 'Devlog #02',
      date: 'July 2026',
      type: 'Engine Devlog',
      category: 'engine',
      badge: 'Graphics',
      title: 'Integrating Vulkan & Metal Render Pipelines for 2D/3D',
      summary: 'Engineering the unified render graph capable of switching seamlessly between integer-aligned 2D tilemaps and full metallic PBR 3D shading.',
      details: [
        'Dedicated orthographic 2D sub-pixel snapping buffer.',
        'Cascaded shadow mapping (CSM) and normal-mapped 2D dynamic lighting.',
        'glTF and FBX model drag-and-drop importer architecture.',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'milestones', label: 'Milestones & Releases' },
    { id: 'engine', label: 'Engine Devlogs' },
    { id: 'rfc', label: 'Architecture RFCs' },
  ];

  const filteredUpdates = updates.filter((u) => {
    if (filterCategory === 'all') return true;
    return u.category === filterCategory;
  });

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header Banner */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-16 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
              <Newspaper className="w-4 h-4" />
              <span>Development Journal &amp; Releases</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4 font-sans">
              Workbench Updates
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed font-sans">
              Development progress, architecture devlogs, milestone releases, and technical RFCs for the Workbench engine.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-[#0e3052] text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Feed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* Prototype Transparency Notice */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 flex items-center gap-3 text-xs text-neutral-600 font-mono">
          <Info className="w-4 h-4 text-[#0e3052] shrink-0" />
          <span>Updates listed below represent official architectural devlogs and milestones during the prototype development phase.</span>
        </div>

        {/* Timeline Posts */}
        <div className="space-y-8">
          {filteredUpdates.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 hover:border-neutral-300 transition-colors space-y-4 shadow-xs"
            >
              {/* Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#0e3052] bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded">
                    {post.version}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase">
                  {post.badge}
                </span>
              </div>

              {/* Title & Summary */}
              <h2 className="text-2xl font-bold text-neutral-900 font-sans">
                {post.title}
              </h2>

              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                {post.summary}
              </p>

              {/* Key Bullet Highlights */}
              <div className="bg-neutral-50 p-4 rounded border border-neutral-200 space-y-2 font-sans text-xs text-neutral-700">
                <div className="text-[10px] font-mono text-[#0e3052] uppercase tracking-wider font-semibold">
                  Key Technical Notes
                </div>
                <ul className="space-y-1.5">
                  {post.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

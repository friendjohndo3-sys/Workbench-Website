import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Box,
  FolderTree,
  Package,
  Activity,
  Film,
  Volume2,
  Layout,
  Terminal,
  FileCode,
  Zap,
  Monitor,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Workflow,
  FolderRoot
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const featureSections = [
    {
      id: '2d',
      category: 'rendering',
      title: '2D Graphics & Pipeline',
      icon: Layers,
      tag: 'Graphics',
      summary: 'Dedicated 2D workflow with pixel-perfect orthographic rendering, auto-tiling, and 2D particle simulation.',
      content: `Workbench provides an authentic 2D pipeline tailored for sprite games, top-down RPGs, and platformers. Rather than flattening a 3D camera, Workbench's 2D engine utilizes dedicated integer-aligned coordinate buffers, sub-pixel smoothing, and hardware-accelerated batch rendering.

Key Capabilities:
• Integrated Tilemap Editor: Multi-layered paint tools, autotiling bitmasks (8-bit and 16-bit), and animated tiles.
• Sprite Layering & Sorting: Automatic depth sorting by Y-coordinate, custom sorting layers, and z-index overrides.
• 2D Dynamic Lighting: Normal-mapped 2D sprites, point/spot light emitters, and real-time shadow casting polygons.
• Particle Systems: High-throughput GPU particle simulation with velocity curves, color ramps, and burst emitters.`,
    },
    {
      id: '3d',
      category: 'rendering',
      title: '3D PBR Renderer',
      icon: Box,
      tag: 'Graphics',
      summary: 'Physically based rendering (PBR) pipeline with forward & deferred shading, cascaded shadow maps, and custom shaders.',
      content: `Built for desktop and high-end mobile devices, the 3D pipeline supports Vulkan, Metal, and DirectX 12 render backends. Materials adhere to metallic-roughness PBR workflows with high dynamic range (HDR) color pipelines.

Key Capabilities:
• Render Backends: Native Vulkan on Linux/Windows/Android, Metal on macOS/iOS, and DirectX 12 on Windows.
• Shadow Mapping: Cascaded shadow maps (CSM) with percentage-closer filtering (PCF) and directional soft shadows.
• Volumetrics & Post-Processing: Screen-space ambient occlusion (SSAO), bloom, depth of field, and volumetric fog.
• Model Pipeline: Drag-and-drop glTF, FBX, and OBJ import with automated LOD (Level of Detail) generation.`,
    },
    {
      id: 'scene-system',
      category: 'architecture',
      title: 'Scene System',
      icon: Workflow,
      tag: 'Architecture',
      summary: 'Hierarchical node graph architecture for building complete world scenes and dynamic level loading.',
      content: `Scenes in Workbench serve as the fundamental unit of world organization. A scene is stored as a human-readable text definition (.scene) that serializes entity components, transform trees, and script bindings.

Key Capabilities:
• Fast Scene Streaming: Asynchronous background loading of scene chunks without frame drops.
• Additive Scene Loading: Load multiple sub-scenes simultaneously (e.g. UI overlay scene + audio management scene + gameplay world scene).
• Hierarchical Parenting: Full local-to-world transform propagation with matrix caching.
• Lifecycle Hooks: Native event hooks (on_scene_enter, on_scene_exit, on_scene_pause).`,
    },
    {
      id: 'reusable-scenes',
      category: 'architecture',
      title: 'Reusable Scenes',
      icon: Package,
      tag: 'Architecture',
      summary: 'Encapsulate complex entities like players, vehicles, and bosses into standalone .scene files that can be nested in any world.',
      content: `Workbench treats every scene as an instantiable component. Instead of inventing separate "prefab" concepts with distinct limitations, any .scene file can be nested directly inside another scene.

Key Capabilities:
• Live Master Propagation: Changes saved in Player.scene immediately propagate across all 50 levels using that scene instance.
• Per-Instance Property Overrides: Modify transform positions, materials, and exposed script variables on a specific instance without breaking link to the master.
• Revert & Push Overrides: Revert an overridden property back to master, or push custom changes on an instance to become the new master definition.
• Deep Hierarchy Nesting: Nest scenes inside scenes (e.g., Weapon.scene inside Player.scene inside Level_01.scene).`,
    },
    {
      id: 'project-root',
      category: 'architecture',
      title: 'Project Root (Filesystem)',
      icon: FolderRoot,
      tag: 'Architecture',
      summary: 'Strict separation of raw filesystem assets on disk from active scene runtime nodes.',
      content: `Workbench enforces a strict architectural division between the filesystem on disk (Project Browser) and the active scene tree (Game Root). The Project Root reflects the exact directory hierarchy on your operating system.

Standard Project Root Folders:
• /Scenes: Standalone .scene files and level definitions.
• /Assets: Textures, 3D meshes, audio clips, and sprite atlases.
• /Scripts: .wbscript, Python files, and .wbvisual node graphs.
• /Materials: PBR material definitions and custom shaders.
• /Audio: Music tracks, positional SFX, and mixing snapshots.
• /Settings: Project-wide input maps, physics constants, and export configurations.`,
    },
    {
      id: 'game-root',
      category: 'architecture',
      title: 'Game Root (Active Scene)',
      icon: FolderTree,
      tag: 'Architecture',
      summary: 'Visualizes exclusively the nodes and entity instances loaded into the currently active open scene.',
      content: `The Game Root panel displays only the active nodes executing in the open viewport. Unlike generic tools that merge disk files and active game objects, Workbench keeps this view clean and laser-focused.

Example Game Root Hierarchy:
Game
├── Player (Instance of Player.scene)
│   ├── Body (MeshRenderer)
│   ├── Camera (CameraComponent)
│   ├── Collider (CapsuleCollider2D)
│   └── Player Controller (PlayerController.wb)
├── Enemy (Instance of Enemy.scene)
├── Ground (Tilemap & StaticBody)
└── Main Camera (CameraComponent)

Every node in the Game Root has direct access to the Inspector panel for editing exposed properties in real time.`,
    },
    {
      id: 'physics',
      category: 'simulation',
      title: 'Physics Engine (2D & 3D)',
      icon: Activity,
      tag: 'Simulation',
      summary: 'Unified rigid body dynamics, continuous collision detection (CCD), triggers, and joint constraints.',
      content: `Workbench includes integrated, deterministic physics solvers for both 2D and 3D worlds.

Key Capabilities:
• Rigid Body Types: Dynamic (player/objects), Static (terrain/walls), and Kinematic (moving platforms/elevators).
• Continuous Collision Detection (CCD): Prevents fast-moving projectiles and players from tunneling through thin geometry.
• Spatial Partitioning: BVH (Bounding Volume Hierarchy) and quadtree spatial hashing for thousands of simultaneous colliding entities.
• Raycasts & Shape Queries: Line casts, sphere sweeps, box overlap tests, and layer-masked queries available in Python, .wbscript, and .wbvisual.`,
    },
    {
      id: 'animation',
      category: 'simulation',
      title: 'Animation System',
      icon: Film,
      tag: 'Simulation',
      summary: 'Timeline keyframing, skeletal mesh skinning, blend trees, state machines, and inverse kinematics (IK).',
      content: `Animate any property in Workbench. The animation engine handles 2D sprite frames, skeletal bones, camera cuts, and material color transitions.

Key Capabilities:
• Animation State Machines: Define entry states, exit transitions, blend weights, and condition triggers (e.g. isGrounded, speed > 0.1).
• Root Motion Support: Extract locomotion movement vectors directly from skeletal root bone curves.
• 2D Sprite Animation: Frame-by-frame sprite sheet slicer with per-frame duration control and event dispatch markers.
• Property Curve Editor: Bezier curve editing for transforms, light intensities, audio volume envelopes, and camera FOV.`,
    },
    {
      id: 'audio',
      category: 'simulation',
      title: 'Audio Engine',
      icon: Volume2,
      tag: 'Simulation',
      summary: '3D spatial audio with Doppler simulation, reverb zones, audio busses, and low-latency streaming.',
      content: `Positional audio designed for immersive worlds. The Workbench audio subsystem operates on a dedicated low-latency thread to prevent audio crackling or stuttering during heavy scene loads.

Key Capabilities:
• 3D Positional Audio: Distance attenuation curves (Logarithmic / Linear), panning, and Doppler frequency shifts.
• Multi-Track Audio Busses: Master, Music, SFX, UI, and Ambient busses with ducking and volume side-chaining.
• Reverb Zones & Filters: Dynamic low-pass/high-pass filtering when underwater or behind geometric occluders.
• Low-Latency Streaming: Stream large background music tracks directly from disk without loading full uncompressed WAV files into RAM.`,
    },
    {
      id: 'ui',
      category: 'rendering',
      title: 'UI System',
      icon: Layout,
      tag: 'UI & Input',
      summary: 'Resolution-independent anchoring, responsive vector canvas, flex layouts, and gamepad navigation.',
      content: `Build in-game HUDs, inventory grids, pause menus, and dialogues with a flexible UI canvas system.

Key Capabilities:
• Anchor & Pivot Presets: Snap UI elements to screen corners, stretch horizontally/vertically, or center automatically.
• Responsive Scaling: Maintain exact layout proportions across 16:9, 16:10, 21:9 ultrawide, and vertical mobile screens.
• Gamepad & Keyboard Focus: Built-in focus navigation for console controllers and keyboard navigation without custom navigation code.
• Rich Text & Localization: UTF-8 international text rendering with font fallback chains and translation table keys.`,
    },
    {
      id: 'python',
      category: 'scripting',
      title: 'Python 3.12 Scripting',
      icon: Terminal,
      tag: 'Scripting',
      summary: 'First-class Python runtime integration with high-speed C bindings for gameplay, AI, and tool extensions.',
      content: `Workbench includes embedded Python 3.12 bindings with direct memory access to engine transforms and physics buffers.

Key Capabilities:
• Full Python Standard Library: Utilize standard libraries (math, json, random) for gameplay systems.
• Component Lifecycle: Subclass wb.Component to implement on_start, on_update, and on_collision events.
• Hot-Reloading: Edit Python script files and observe changes immediately in the running editor without restarting the scene.
• Editor Tooling: Write custom editor panels, level generators, and asset importers in Python.`,
    },
    {
      id: 'wbscript',
      category: 'scripting',
      title: '.wbscript Language',
      icon: FileCode,
      tag: 'Scripting',
      summary: "Workbench's native programming language. Clean natural syntax, zero boilerplate, and native bytecode compilation.",
      content: `Designed specifically for game mechanics, .wbscript gives developers extreme readability without sacrificing performance.

Example Syntax:
player.speed = 5
player.health = 100

when game starts:
    player.spawn()

when jump:
    player.jump()

function heal amount:
    player.health += amount

Key Capabilities:
• Zero-Boilerplate Event Grammar: The 'when <event>:' keyword directly binds to engine signal dispatchers.
• Deterministic Memory: Zero garbage collection pauses or frame drops during gameplay.
• High Performance: Compiles down to optimized native bytecode.`,
    },
    {
      id: 'wbvisual',
      category: 'scripting',
      title: '.wbvisual Visual Scripting',
      icon: Zap,
      tag: 'Scripting',
      summary: 'Full visual programming system with event nodes, data routing, and state flow compiling to native machine code.',
      content: `.wbvisual is a full visual programming system, not merely a beginner tool. Wire event triggers, state machines, mathematics, and audio graphs with real-time visual signal flow debugging.

Visual Flow Concept:
[Player Touches Coin]
        ↓
[Add 1 To Score]
        ↓
[Destroy Coin]
        ↓
[Play Sound]

Key Capabilities:
• Typed Data & Execution Pins: Clear visual distinction between control execution flows and data values (vectors, floats, booleans).
• State Machines: Visual transition graphs for complex AI behaviors and animation blending.
• Custom Node Macros: Package repetitive node networks into reusable custom nodes with exposed input and output pins.
• 100% Native Output: Compiles to identical bytecode as text scripts.`,
    },
    {
      id: 'desktop',
      category: 'export',
      title: 'Desktop Development',
      icon: Monitor,
      tag: 'Platform',
      summary: 'One-click native builds for Windows (x64/ARM64), macOS (Apple Silicon/Intel), and Linux with zero bloat.',
      content: `Workbench builds self-contained native executables for all major desktop operating systems.

Key Capabilities:
• Supported Platforms: Windows 10/11 (x64 & ARM64), macOS 13+ (Universal binary for Apple Silicon M1-M4 & Intel), and Linux (AppImage & tarball).
• Graphics API Selection: Automatic fallback selection (Vulkan -> DirectX 12 -> Metal -> OpenGL).
• Executable Compression: Stripped release builds with compressed asset archives for fast download and installation.`,
    },
    {
      id: 'mobile',
      category: 'export',
      title: 'Mobile Development',
      icon: Smartphone,
      tag: 'Platform',
      summary: 'Optimized export pipelines for iOS and Android with touch gestures and battery-conscious frame capping.',
      content: `Target mobile gamers with dedicated touch input abstractions, accelerometer hooks, and aggressive memory optimization.

Key Capabilities:
• Mobile Targets: Android (APK & AAB with Vulkan/GLES3) and iOS (Xcode project archive with Metal backend).
• Virtual Touch Controls: Built-in virtual joystick, touch swipe gestures, and multi-touch pinch-to-zoom nodes.
• Power Management: Battery-conscious background pause hooks and adaptive framerate capping (30/60/120Hz).`,
    },
  ];

  const categories = [
    { id: 'all', label: 'All 15 Subsystems' },
    { id: 'rendering', label: 'Graphics & UI' },
    { id: 'architecture', label: 'Scene Architecture' },
    { id: 'scripting', label: 'Programming (.wbscript/Python/.wbvisual)' },
    { id: 'simulation', label: 'Physics & Audio' },
    { id: 'export', label: 'Desktop & Mobile' },
  ];

  const filtered = featureSections.filter((f) => {
    if (activeFilter === 'all') return true;
    return f.category === activeFilter;
  });

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Header Banner */}
      <section className="py-16 lg:py-20 bg-neutral-50 border-b border-neutral-200 blueprint-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
              Engine Architecture &amp; Subsystems
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4 font-sans">
              Workbench Features
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed font-sans">
              Comprehensive architectural breakdown of all 15 core engine subsystems. Built with engineering rigor for maximum developer productivity and runtime performance.
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
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === cat.id
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

      {/* Feature Deep-Dive Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filtered.map((feature) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={feature.id}
                  id={feature.id}
                  className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 lg:p-10 scroll-mt-36 hover:border-neutral-300 transition-colors shadow-xs"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Meta Column */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052]">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded border border-neutral-200">
                          {feature.tag}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
                        {feature.title}
                      </h2>

                      <p className="text-sm font-semibold text-neutral-700 leading-relaxed font-sans">
                        {feature.summary}
                      </p>

                      {feature.id === 'wbscript' && (
                        <Link
                          to="/docs/wbscript"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e3052] hover:underline font-sans pt-2"
                        >
                          <span>Open Dedicated .wbscript Docs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {feature.id === 'wbvisual' && (
                        <Link
                          to="/docs/wbvisual"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e3052] hover:underline font-sans pt-2"
                        >
                          <span>Open Dedicated .wbvisual Docs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>

                    {/* Right Content Column */}
                    <div className="lg:col-span-8 bg-neutral-50 border border-neutral-200 rounded-lg p-6 font-sans">
                      <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                        {feature.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 font-sans">
            Ready to test Workbench?
          </h3>
          <p className="text-neutral-600 text-sm mb-6 font-sans">
            Check the official documentation or download the preview build.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/download" className="btn-blueprint px-6 py-3 text-sm font-semibold font-sans">
              Download Workbench
            </Link>
            <Link to="/docs" className="btn-blueprint-secondary px-6 py-3 text-sm font-semibold font-sans">
              Explore Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

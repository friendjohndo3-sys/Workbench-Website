import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  FileCode,
  Zap,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

export const DocsPage: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState<string>('intro');
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);

  const docSections = [
    {
      group: 'Getting Started',
      items: [
        {
          id: 'intro',
          title: 'Introduction to Workbench',
          summary: 'Overview of engine design philosophy and architecture.',
          content: {
            text: `Workbench is a standalone 2D and 3D game engine engineered for desktop and mobile development. Designed with a clean engineering aesthetic and strict separation of concerns, Workbench emphasizes developer ergonomics, deterministic performance, and multi-language versatility.`,
            keyPoints: [
              'Independent Desktop Runtime: Native Windows (x64/ARM64), macOS (Apple Silicon & Intel), and Linux executables.',
              'Multi-Language Logic: Write gameplay in native .wbscript, Python 3.12, or the .wbvisual node compiler.',
              'Strict Scene Modularity: Every .scene file can be instantiated and nested as a reusable component.',
            ],
          },
        },
        {
          id: 'install',
          title: 'Installation & Setup',
          summary: 'System requirements and environment setup for developers.',
          content: {
            text: `Workbench is distributed as a lightweight, self-contained standalone executable with zero external SDK dependencies required for basic 2D and 3D authoring.`,
            code: `# Windows
workbench-setup.exe /SILENT

# macOS
brew install --cask workbench-engine # (Planned distribution)

# Linux AppImage
chmod +x Workbench-v1.0.0.AppImage && ./Workbench-v1.0.0.AppImage`,
            keyPoints: [
              'Requires a graphics adapter supporting Vulkan 1.2+, Metal 2.0+, or DirectX 12.',
              'No mandatory cloud sign-ins or telemetry services required.',
            ],
          },
        },
        {
          id: 'create-project',
          title: 'Creating a Project',
          summary: 'How to initialize and configure a new Workbench workspace.',
          content: {
            text: `When you create a project in Workbench, the engine initializes a dedicated filesystem root containing standard directory conventions (/Scenes, /Assets, /Scripts, /Materials, /Audio, /Settings) along with a workbench.config manifest file.`,
            keyPoints: [
              'Deterministic file paths: Raw disk directories map 1:1 into the Project Browser.',
              'Automatic asset indexing: Assets added directly via Windows Explorer or macOS Finder are indexed immediately.',
            ],
          },
        },
        {
          id: 'create-scene',
          title: 'Creating a Scene',
          summary: 'Structuring worlds, entities, and camera setups.',
          content: {
            text: `A Scene is a hierarchical tree of nodes that defines a level, world area, or isolated game entity. You can create a 2D scene, 3D scene, or UI scene using the File -> New Scene menu.`,
            keyPoints: [
              'Scenes are serialized as human-readable .scene text files.',
              'Scenes contain a root Game node with child entities, cameras, lighting, and colliders.',
            ],
          },
        },
        {
          id: 'running-game',
          title: 'Running & Playtesting',
          summary: 'In-editor play mode, sub-stepping, and hot-reload behavior.',
          content: {
            text: `Clicking the Play button in the top menu bar launches the game loop inside the active viewport at native frame rates. You can pause, frame-advance, inspect runtime node state, and hot-reload scripts while the game is running.`,
            keyPoints: [
              'Pause & Step: Step forward 1 physics tick (16.6ms at 60Hz) to debug collisions.',
              'Hot-Reload: Save changes to .wbscript or Python files to update running logic live.',
            ],
          },
        },
      ],
    },
    {
      group: 'Editor',
      items: [
        {
          id: 'editor-overview',
          title: 'Editor Overview',
          summary: 'Navigating the Workbench workspace layout and panels.',
          content: {
            text: `The Workbench Editor interface consists of 5 core zones:
1. Top Menu & Control Bar: Project commands, Run/Build toggles, and coordinate display.
2. Game Root (Top Left): The live node tree of the currently loaded active scene.
3. Project Browser (Bottom Left): Physical filesystem browser for disk assets.
4. Scene Viewport (Center): Interactive 2D/3D viewport with transform gizmos and grid.
5. Inspector (Right): Properties, transforms, components, and script bindings for selected nodes.`,
          },
        },
        {
          id: 'project-root-docs',
          title: 'Project Root (Filesystem)',
          summary: 'Disk directory structure and asset management rules.',
          content: {
            text: `The Project Root represents the physical folders on your computer:
• Scenes/ (.scene files)
• Assets/ (Textures, sprites, models, audio)
• Scripts/ (.wbscript, .py, .wbvisual)
• Materials/ (.material, shader graphs)
• Audio/ (.wav, .ogg, .mp3)
• Settings/ (Input maps, display settings)

Rule: The Project Browser strictly browses storage files on disk. It never contains instantiated game nodes.`,
          },
        },
        {
          id: 'game-root-docs',
          title: 'Game Root (Active Scene)',
          summary: 'Understanding the active scene node hierarchy.',
          content: {
            text: `The Game Root represents ONLY what is currently instantiated in the active open scene:
Game
├── Player
│   ├── Body
│   ├── Camera
│   └── Collider
├── Enemy
├── Ground
└── Main Camera

Rule: The Game Root strictly displays open scene entities. It does not list uninstantiated disk assets.`,
          },
        },
        {
          id: 'scene-editor',
          title: 'Scene Editor & Viewport',
          summary: 'Transform gizmos, orthographic grids, and 3D navigation.',
          content: {
            text: `The viewport supports toggleable Orthographic 2D mode with pixel snapping, as well as Perspective 3D mode with free-fly camera controls (WASD + Right Mouse Button).`,
          },
        },
        {
          id: 'inspector',
          title: 'Inspector Panel',
          summary: 'Modifying transforms, component properties, and script parameters.',
          content: {
            text: `Selecting any node in the Game Root opens its component stack in the Inspector. You can adjust positions, toggle render layers, tweak physics friction, and bind script files.`,
          },
        },
        {
          id: 'asset-browser',
          title: 'Asset Browser',
          summary: 'Importing, tagging, and dragging assets into scenes.',
          content: {
            text: `Drag textures, audio files, or .scene files directly from the Project Browser onto the Scene Viewport or Game Root to instantiate them instantly.`,
          },
        },
      ],
    },
    {
      group: 'Scenes',
      items: [
        {
          id: 'creating-scenes',
          title: 'Creating Scenes',
          summary: 'Standard scene creation and hierarchical node arrangement.',
          content: {
            text: `Every scene begins with a root node (typically named 'Game' or the entity name). You can attach child transforms, cameras, audio listeners, and physics bodies.`,
          },
        },
        {
          id: 'reusable-scenes-docs',
          title: 'Reusable Scenes',
          summary: 'Modular entity authoring (e.g. Player.scene, Enemy.scene).',
          content: {
            text: `In Workbench, any .scene can act as a reusable component (prefab). Build a Player.scene with Body, Camera, Collider, and Player Controller, then drag Player.scene into 50 different level scenes.`,
            code: `// Master Definition: Player.scene
Player (Root)
├── Body (MeshRenderer)
├── Camera (CameraComponent)
├── Collider (CapsuleCollider)
└── Player Controller (PlayerController.wb)

// Instantiated in World_01.scene:
Game
├── Player (Instance of Player.scene)
├── Boss (Instance of Boss.scene)
└── Ground`,
          },
        },
        {
          id: 'scene-instances',
          title: 'Scene Instances',
          summary: 'Instantiating scenes at design time or runtime via script.',
          content: {
            text: `Instantiate scenes programmatically in .wbscript:
let enemy = Scene.instantiate("Enemy.scene")
enemy.position = Vec3(10, 0, 5)`,
          },
        },
        {
          id: 'property-overrides',
          title: 'Property Overrides',
          summary: 'Overriding properties on specific instances without breaking links.',
          content: {
            text: `When a scene instance is modified inside a level, only the edited properties are marked as overrides. If you update the master Player.scene, all non-overridden fields in all instances update automatically.`,
          },
        },
      ],
    },
    {
      group: 'Programming',
      items: [
        {
          id: 'prog-wbscript',
          title: '.wbscript Language',
          summary: 'Native scripting language for Workbench.',
          content: {
            text: `.wbscript is Workbench's native game language designed for crystal-clear gameplay mechanics, zero boilerplate, and native machine execution.`,
            code: `player.speed = 5
player.health = 100

when game starts:
    player.spawn()

when jump:
    player.jump()

function heal amount:
    player.health += amount`,
            keyPoints: [
              'Click below to read the dedicated .wbscript Documentation page with full grammar, type rules, and event references.',
            ],
            link: '/docs/wbscript',
            linkText: 'Read Full .wbscript Language Spec →',
          },
        },
        {
          id: 'prog-wbvisual',
          title: '.wbvisual Node Graph',
          summary: 'Full visual programming system for logic and state machines.',
          content: {
            text: `.wbvisual is a full visual programming system, not merely a beginner tool. It compiles to native bytecode with execution and typed data pins.`,
            code: `[Player Touches Coin]
        ↓
[Add 1 To Score]
        ↓
[Destroy Coin]
        ↓
[Play Sound]`,
            keyPoints: [
              'Click below to read the dedicated .wbvisual Documentation page with node types, data channels, and macro systems.',
            ],
            link: '/docs/wbvisual',
            linkText: 'Read Full .wbvisual Visual Scripting Spec →',
          },
        },
        {
          id: 'prog-python',
          title: 'Python 3.12 API',
          summary: 'Python bindings for AI, procedural generation, and tools.',
          content: {
            text: `Workbench embeds Python 3.12 with direct memory access to engine transform and physics structures.`,
            code: `import workbench as wb

class AIController(wb.Component):
    def on_start(self):
        self.speed = 4.5

    def on_update(self, dt: float):
        if self.target:
            self.entity.move_toward(self.target.position, self.speed * dt)`,
          },
        },
      ],
    },
    {
      group: 'Systems',
      items: [
        {
          id: 'sys-2d',
          title: '2D Pipeline & Tilemaps',
          summary: 'Tilemap palettes, autotiling, and sprite sorting.',
          content: {
            text: `The 2D subsystem includes hardware-accelerated tilemap layers, sprite sheet slicing, and 2D dynamic lighting shaders with normal-mapping.`,
          },
        },
        {
          id: 'sys-3d',
          title: '3D PBR & Shaders',
          summary: 'Metallic/roughness PBR materials, lights, and shadows.',
          content: {
            text: `The 3D renderer supports directional lights with cascaded shadow maps, point/spot lights with radius falloff, and post-processing stacks.`,
          },
        },
        {
          id: 'sys-physics',
          title: 'Physics & Collisions',
          summary: 'Rigid body dynamics, layers, raycasting, and triggers.',
          content: {
            text: `Rigid body dynamics for 2D and 3D worlds. Includes continuous collision detection (CCD), physics materials with friction and restitution, and collision matrix filtering.`,
          },
        },
        {
          id: 'sys-animation',
          title: 'Animation & State Machines',
          summary: 'Keyframe curves, skeletal mesh skinning, and blend trees.',
          content: {
            text: `Timeline-based keyframing and state machine blending graphs. Supports root motion extraction and IK (Inverse Kinematics).`,
          },
        },
        {
          id: 'sys-audio',
          title: 'Audio Subsystem',
          summary: 'Positional 3D audio, reverb zones, and mixing busses.',
          content: {
            text: `Dedicated low-latency audio thread with distance attenuation, Doppler frequency shifting, and multi-bus mixing snapshots.`,
          },
        },
        {
          id: 'sys-ui',
          title: 'UI & Vector Canvas',
          summary: 'Responsive anchoring, flex boxes, and font rendering.',
          content: {
            text: `Vector-based UI canvas with anchor/pivot controls, font fallbacks, and automatic gamepad focus navigation.`,
          },
        },
        {
          id: 'sys-input',
          title: 'Input Management',
          summary: 'Action mapping for keyboard, mouse, gamepad, and touch.',
          content: {
            text: `Action-based input system (e.g. "Jump", "Fire", "Move_X") mapped across keyboard keys, mouse axes, gamepad thumbsticks, and mobile touch gestures.`,
          },
        },
      ],
    },
    {
      group: 'Advanced (Architecture Roadmap)',
      items: [
        {
          id: 'adv-networking',
          title: 'Networking & Multiplayer (Planned)',
          summary: 'Architecture for client-server and peer-to-peer replication.',
          content: {
            text: `[Planned Engine Architecture Notice]: Workbench's networking layer is designed around an authoritative server model with client-side prediction and snapshot interpolation. This section documents planned architecture and API specifications for future releases.`,
            keyPoints: [
              'Delta-compressed entity state synchronization over UDP.',
              'Remote Procedure Calls (RPCs) in .wbscript and Python.',
            ],
          },
        },
        {
          id: 'adv-save-systems',
          title: 'Save Systems & Serialization (Planned)',
          summary: 'Binary and JSON state serialization for game progression.',
          content: {
            text: `[Planned Engine Architecture Notice]: Workbench provides built-in entity state serialization, allowing developers to save scene snapshots and player inventories to encrypted binary or JSON files.`,
          },
        },
        {
          id: 'adv-optimization',
          title: 'Optimization & Profiling (Planned)',
          summary: 'Frame profiler, draw call batching, and memory telemetry.',
          content: {
            text: `[Planned Engine Architecture Notice]: Integrated CPU/GPU timeline profiler measuring draw call counts, physics sub-step duration, and script execution times.`,
          },
        },
        {
          id: 'adv-build-export',
          title: 'Build & Export Pipeline (Planned)',
          summary: 'Standalone executable packaging and asset cooking.',
          content: {
            text: `[Planned Engine Architecture Notice]: One-click asset cooking, shader bytecode compilation, and executable bundling for Windows, macOS, Linux, iOS, and Android.`,
          },
        },
      ],
    },
  ];

  // Find currently active doc item
  let currentDoc: any = null;
  for (const section of docSections) {
    for (const item of section.items) {
      if (item.id === activeDocId) {
        currentDoc = item;
        break;
      }
    }
  }
  if (!currentDoc) {
    currentDoc = docSections[0].items[0];
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Documentation Header Banner */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-8 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-1 flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Official Developer Documentation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
              Workbench Engine Documentation
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/docs/wbscript"
              className="px-3 py-1.5 rounded bg-white border border-neutral-300 text-xs font-mono text-neutral-800 hover:border-[#0e3052] hover:text-[#0e3052] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <FileCode className="w-3.5 h-3.5 text-[#0e3052]" />
              <span>.wbscript Guide</span>
            </Link>
            <Link
              to="/docs/wbvisual"
              className="px-3 py-1.5 rounded bg-white border border-neutral-300 text-xs font-mono text-neutral-800 hover:border-[#0e3052] hover:text-[#0e3052] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#0e3052]" />
              <span>.wbvisual Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Doc Nav Toggle Button */}
      <div className="lg:hidden bg-white border-b border-neutral-200 p-4 sticky top-16 z-20 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setMobileDocsOpen(!mobileDocsOpen)}
          className="flex items-center gap-2 text-xs font-mono text-[#0e3052] bg-neutral-100 px-3 py-2 rounded border border-neutral-300 cursor-pointer"
        >
          {mobileDocsOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileDocsOpen ? 'Close Navigation' : 'Browse Topics'}</span>
        </button>
        <span className="text-xs font-mono text-neutral-700 truncate max-w-[200px] font-semibold">
          {currentDoc.title}
        </span>
      </div>

      {/* Main Documentation Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <aside
            className={`lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-6 ${
              mobileDocsOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="text-xs font-mono text-neutral-600 uppercase tracking-wider pb-2 border-b border-neutral-200 flex items-center justify-between font-semibold">
              <span>Documentation Index</span>
              <span className="text-[10px] text-[#0e3052] font-mono">v1.0.0-prototype</span>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              {docSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                    {section.group}
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveDocId(item.id);
                          setMobileDocsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-xs font-sans transition-colors cursor-pointer flex items-center justify-between ${
                          activeDocId === item.id
                            ? 'bg-[#0e3052] text-white font-semibold shadow-xs'
                            : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60'
                        }`}
                      >
                        <span>{item.title}</span>
                        {activeDocId === item.id && (
                          <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-500 space-y-1">
              <div>Standalone Architecture Spec</div>
              <div>Visual Studio Production Target</div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-8 bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
            {/* Topic Header & Breadcrumb */}
            <div className="pb-6 border-b border-neutral-200 space-y-2">
              <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider font-semibold">
                Documentation Topic
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 font-sans">
                {currentDoc.title}
              </h2>
              <p className="text-base text-neutral-600 font-sans">
                {currentDoc.summary}
              </p>
            </div>

            {/* Topic Text Body */}
            <div className="text-sm text-neutral-700 leading-relaxed font-sans whitespace-pre-line space-y-4 font-normal">
              {currentDoc.content.text}
            </div>

            {/* Code Block if available */}
            {currentDoc.content.code && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-neutral-600 uppercase tracking-wider font-semibold">
                  Specification / Syntax Example
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4 font-mono text-xs text-neutral-100 overflow-x-auto leading-relaxed shadow-xs">
                  <pre>
                    <code>{currentDoc.content.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Key Points if available */}
            {currentDoc.content.keyPoints && (
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <div className="text-xs font-mono text-neutral-600 uppercase tracking-wider font-semibold">
                  Key Takeaways
                </div>
                <ul className="space-y-2 font-sans text-xs text-neutral-700">
                  {currentDoc.content.keyPoints.map((pt: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Link if available */}
            {currentDoc.content.link && (
              <div className="pt-4 border-t border-neutral-200">
                <Link
                  to={currentDoc.content.link}
                  className="btn-blueprint inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold font-sans"
                >
                  <span>{currentDoc.content.linkText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

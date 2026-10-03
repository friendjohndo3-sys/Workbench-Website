import React, { useState } from 'react';
import {
  BookOpen,
  FolderTree,
  FileCode,
  Zap,
  Terminal,
  Layers,
  Search,
  Check,
  ChevronRight,
  ExternalLink,
  Code2,
  X
} from 'lucide-react';

interface DocsSectionProps {
  isOpenModal?: boolean;
  onClose?: () => void;
}

export const DocsSection: React.FC<DocsSectionProps> = ({
  isOpenModal = false,
  onClose,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('wbscript-guide');

  const topics = [
    {
      id: 'wbscript-guide',
      title: '.wbscript Syntax Reference',
      category: 'Languages',
      badge: 'Native DSL',
      content: {
        intro: '.wbscript is the native programming language for Workbench. It is designed to be readable, concise, and compiled down to high-performance native machine code.',
        codeSnippet: `// Workbench Script (.wbscript)
player.speed = 5
player.health = 100

when game starts:
    player.spawn()

when jump:
    player.jump()

function heal amount:
    player.health += amount`,
        notes: [
          'Variable declarations are inferred automatically with strict static type safety.',
          'The "when <event>:" block subscribes directly to the engine message dispatcher.',
          'Functions use the "function <name> <arguments>:" keyword syntax with zero unnecessary brackets.',
          'Memory management is 100% deterministic with zero garbage collection pauses.',
        ],
      },
    },
    {
      id: 'hierarchy-guide',
      title: 'Project Root vs Game Root',
      category: 'Architecture',
      badge: 'Core Rule',
      content: {
        intro: 'Workbench enforces a strict architectural division between filesystem assets (Project Root) and active scene objects (Game Root).',
        codeSnippet: `PROJECT ROOT (Filesystem):
- Scenes/
- Assets/
- Scripts/
- Materials/
- Audio/
- Prefabs/
- Settings/

GAME ROOT (Active Open Scene):
Game
├── Player
│   ├── Body
│   ├── Camera
│   └── Collider
├── Enemy
├── Ground
└── Main Camera`,
        notes: [
          'Project Root holds raw source files on disk: meshes, audio clips, scripts, and scene definitions.',
          'Game Root displays strictly the instantiated nodes currently loaded in the active scene viewport.',
          'Never mix Project Root and Game Root into a single tree.',
        ],
      },
    },
    {
      id: 'reusable-scenes',
      title: 'Reusable Scene Instantiation',
      category: 'Scene System',
      badge: 'Modularity',
      content: {
        intro: 'Every scene in Workbench can be saved and instantiated as a component inside any parent scene.',
        codeSnippet: `// Example: Player.scene
Player.scene
├── Body
├── Camera
├── Collider
└── Player Controller (.wbscript)

// Instantiated in Level_01.scene:
Level_01 (Game Root)
├── Player (Instance of Player.scene)
├── BossArena (Instance of BossArena.scene)
└── Environment`,
        notes: [
          'Edits made to Player.scene automatically propagate to all levels using that scene.',
          'Override individual transform coordinates, materials, and exposed script properties per instance.',
        ],
      },
    },
    {
      id: 'wbvisual-guide',
      title: '.wbvisual Node Graph Spec',
      category: 'Visual Scripting',
      badge: 'Node Engine',
      content: {
        intro: '.wbvisual is a full visual programming system with event nodes, data routing, math vectors, and state machines.',
        codeSnippet: `[Player Touches Coin (OnTriggerEnter2D)]
                ↓
      [Add 1 To Score]
                ↓
       [Destroy Coin]
                ↓
    [Play Sound (Coin.wav)]`,
        notes: [
          'Execution signals travel along execution pins with real-time visual pulse debugging.',
          'Data pins pass strongly-typed vectors, floats, booleans, and entity references.',
          'Compiles directly to identical bytecode as native .wbscript.',
        ],
      },
    },
    {
      id: 'python-bindings',
      title: 'Python 3.12 Engine Integration',
      category: 'Scripting',
      badge: 'Python API',
      content: {
        intro: 'Workbench provides high-speed C-API bindings for Python 3.12, allowing developers to script AI logic, simulation tools, and external libraries.',
        codeSnippet: `import workbench as wb

class EnemyAI(wb.Component):
    def update(self, delta_time: float):
        distance = (self.target.position - self.entity.position).length()
        if distance < 10.0:
            self.entity.look_at(self.target.position)
            self.entity.move_forward(speed=4.0)`,
        notes: [
          'Direct memory access to transform buffers and physics world raycasts.',
          'Hot-reload script changes on the fly while the scene is running.',
        ],
      },
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const contentUI = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar Topics */}
      <div className="lg:col-span-4 bg-[#111116] border border-neutral-800 rounded-lg p-3 space-y-1">
        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-3 py-2 border-b border-neutral-800">
          Documentation Topics
        </div>
        <div className="space-y-1 pt-1">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                selectedTopic === t.id
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span>{t.title}</span>
              <span className="text-[10px] text-neutral-500 font-sans">{t.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Doc View */}
      <div className="lg:col-span-8 bg-[#111116] border border-neutral-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              {currentTopic.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{currentTopic.title}</h3>
          </div>
          <span className="text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
            {currentTopic.badge}
          </span>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          {currentTopic.content.intro}
        </p>

        {/* Code Snippet */}
        <div className="bg-[#0b0b0e] border border-neutral-800 rounded-lg p-4 font-mono text-xs text-neutral-200 overflow-x-auto">
          <pre className="leading-relaxed">
            <code>{currentTopic.content.codeSnippet}</code>
          </pre>
        </div>

        {/* Bullet Notes */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Key Architecture Notes
          </h4>
          <ul className="space-y-2">
            {currentTopic.content.notes.map((note, nIdx) => (
              <li key={nIdx} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
        <div className="bg-[#0e0e13] border border-neutral-700 max-w-5xl w-full rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="font-bold text-white text-xl">Workbench Documentation</h3>
                <p className="text-xs text-neutral-400 font-mono">Official Reference &amp; Specification</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {contentUI}
        </div>
      </div>
    );
  }

  return (
    <section id="docs" className="py-20 lg:py-28 bg-[#0a0a0d] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Developer Reference
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Engine Documentation
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Quickstart guides and architectural specifications for .wbscript, reusable scene components, Python bindings, and the .wbvisual node compiler.
          </p>
        </div>

        {contentUI}
      </div>
    </section>
  );
};

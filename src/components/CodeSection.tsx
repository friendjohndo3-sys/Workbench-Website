import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Play,
  Check,
  Copy,
  Zap,
  FileCode,
  ShieldAlert,
  Heart,
  Activity
} from 'lucide-react';

export const CodeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'wbscript' | 'python'>('wbscript');

  // Interactive Live Script Tester State
  const [simHealth, setSimHealth] = useState(100);
  const [simSpeed, setSimSpeed] = useState(5);
  const [lastEvent, setLastEvent] = useState<string>('Game initialized');
  const [isJumping, setIsJumping] = useState(false);

  const rawWbScript = `player.speed = 5
player.health = 100

when game starts:
    player.spawn()

when jump:
    player.jump()

function heal amount:
    player.health += amount`;

  const rawPythonScript = `# Python 3.12 integration in Workbench
import workbench as wb

class PlayerController(wb.Component):
    def __init__(self):
        super().__init__()
        self.speed = 5
        self.health = 100

    def on_game_start(self):
        self.entity.spawn()

    def on_jump(self):
        self.entity.apply_impulse(wb.Vec3(0, 12.0, 0))

    def heal(self, amount: int):
        self.health += amount`;

  const handleCopy = () => {
    const textToCopy = activeTab === 'wbscript' ? rawWbScript : rawPythonScript;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimJump = () => {
    setIsJumping(true);
    setLastEvent('Event: "when jump" triggered -> player.jump()');
    setTimeout(() => setIsJumping(false), 800);
  };

  const handleSimHeal = (amt: number) => {
    setSimHealth((prev) => Math.min(prev + amt, 150));
    setLastEvent(`Function: "heal ${amt}" called -> player.health += ${amt}`);
  };

  const handleSimDamage = (amt: number) => {
    setSimHealth((prev) => Math.max(prev - amt, 0));
    setLastEvent(`Damage dealt: -${amt} HP`);
  };

  return (
    <section id="scripting" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Native Programming Language
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Code in .wbscript
          </h2>
          <p className="text-xl text-neutral-300 font-medium mb-2">
            Simple to read. Powerful enough for anything.
          </p>
          <p className="text-base text-neutral-400 leading-relaxed">
            Workbench&apos;s native programming language is engineered from scratch for high performance, direct game memory access, and crystal-clear event architecture.
          </p>
        </div>

        {/* Code Showcase & Interactive Execution Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Code Editor Box */}
          <div className="lg:col-span-7 bg-[#0f0f13] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
            {/* Header Tabs */}
            <div className="bg-[#141418] border-b border-neutral-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('wbscript')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'wbscript'
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PlayerController.wb</span>
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'python'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>PlayerController.py</span>
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
                title="Copy script to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body with Custom Syntax Highlighting */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-[#0b0b0e]">
              {activeTab === 'wbscript' ? (
                <pre className="text-neutral-200">
                  <code>
                    <span className="text-cyan-400">player</span>.<span className="text-blue-300">speed</span> = <span className="text-amber-400">5</span>{'\n'}
                    <span className="text-cyan-400">player</span>.<span className="text-blue-300">health</span> = <span className="text-amber-400">100</span>{'\n\n'}
                    <span className="text-purple-400 font-semibold">when</span> <span className="text-emerald-400">game starts</span>:{'\n'}
                    {'    '}<span className="text-cyan-400">player</span>.<span className="text-yellow-300">spawn</span>(){'\n\n'}
                    <span className="text-purple-400 font-semibold">when</span> <span className="text-emerald-400">jump</span>:{'\n'}
                    {'    '}<span className="text-cyan-400">player</span>.<span className="text-yellow-300">jump</span>(){'\n\n'}
                    <span className="text-purple-400 font-semibold">function</span> <span className="text-yellow-300">heal</span> <span className="text-orange-300">amount</span>:{'\n'}
                    {'    '}<span className="text-cyan-400">player</span>.<span className="text-blue-300">health</span> += <span className="text-orange-300">amount</span>
                  </code>
                </pre>
              ) : (
                <pre className="text-neutral-200">
                  <code>
                    <span className="text-neutral-500"># Python 3.12 Integration in Workbench</span>{'\n'}
                    <span className="text-purple-400 font-semibold">import</span> workbench <span className="text-purple-400 font-semibold">as</span> wb{'\n\n'}
                    <span className="text-purple-400 font-semibold">class</span> <span className="text-yellow-300 font-bold">PlayerController</span>(wb.<span className="text-cyan-300">Component</span>):{'\n'}
                    {'    '}<span className="text-purple-400 font-semibold">def</span> <span className="text-blue-300">__init__</span>(self):{'\n'}
                    {'        '}<span className="text-cyan-400">super</span>().<span className="text-blue-300">__init__</span>(){'\n'}
                    {'        '}self.<span className="text-blue-300">speed</span> = <span className="text-amber-400">5</span>{'\n'}
                    {'        '}self.<span className="text-blue-300">health</span> = <span className="text-amber-400">100</span>{'\n\n'}
                    {'    '}<span className="text-purple-400 font-semibold">def</span> <span className="text-yellow-300">on_game_start</span>(self):{'\n'}
                    {'        '}self.<span className="text-cyan-300">entity</span>.<span className="text-yellow-300">spawn</span>(){'\n\n'}
                    {'    '}<span className="text-purple-400 font-semibold">def</span> <span className="text-yellow-300">on_jump</span>(self):{'\n'}
                    {'        '}self.<span className="text-cyan-300">entity</span>.<span className="text-yellow-300">apply_impulse</span>(wb.<span className="text-emerald-300">Vec3</span>(<span className="text-amber-400">0</span>, <span className="text-amber-400">12.0</span>, <span className="text-amber-400">0</span>)){'\n\n'}
                    {'    '}<span className="text-purple-400 font-semibold">def</span> <span className="text-yellow-300">heal</span>(self, amount: <span className="text-cyan-300">int</span>):{'\n'}
                    {'        '}self.<span className="text-blue-300">health</span> += amount
                  </code>
                </pre>
              )}
            </div>

            {/* Language Architecture Footer */}
            <div className="bg-[#121216] border-t border-neutral-800/80 px-4 py-3 flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Zero-Boilerplate Event Grammar
              </span>
              <span>JIT Native Assembly</span>
            </div>
          </div>

          {/* Right Column: Live Interactive Execution Tester */}
          <div className="lg:col-span-5 bg-[#101014] border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Runtime Test</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded">
                  Live State
                </span>
              </div>

              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                Test the exact <span className="font-mono text-cyan-300">.wbscript</span> events and observe real-time variable mutations in the engine runtime.
              </p>

              {/* Live Player State Monitor */}
              <div className="bg-[#0b0b0e] p-4 rounded border border-neutral-800 space-y-3 font-mono text-xs mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">player.speed:</span>
                  <span className="text-amber-400 font-bold">{simSpeed} units/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">player.health:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${Math.min((simHealth / 150) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-white font-bold">{simHealth} HP</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <span className="text-neutral-400">player state:</span>
                  <span className={`font-bold transition-all ${isJumping ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {isJumping ? 'Jumping (Impulse applied)' : 'Grounded (Idle)'}
                  </span>
                </div>
              </div>

              {/* Interactive Event Triggers */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Trigger .wbscript Events
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSimJump}
                    disabled={isJumping}
                    className="btn-blueprint py-2 px-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>trigger &quot;when jump&quot;</span>
                  </button>

                  <button
                    onClick={() => handleSimHeal(25)}
                    className="btn-blueprint-secondary py-2 px-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer text-emerald-300 hover:text-emerald-200"
                  >
                    <Heart className="w-3.5 h-3.5 text-emerald-400" />
                    <span>call heal(25)</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleSimDamage(20)}
                    className="btn-blueprint-secondary py-1.5 px-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer text-rose-300 hover:text-rose-200"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>damage (-20)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSimHealth(100);
                      setSimSpeed(5);
                      setLastEvent('Reset player state to default');
                    }}
                    className="btn-blueprint-secondary py-1.5 px-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer text-neutral-400 hover:text-white"
                  >
                    <span>reset variables</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Event Console Log */}
            <div className="mt-5 pt-3 border-t border-neutral-800/80 font-mono text-[11px] text-neutral-400 truncate">
              <span className="text-cyan-400">Log:</span> {lastEvent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

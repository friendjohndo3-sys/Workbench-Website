import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCode,
  Play,
  Copy,
  Check,
  Zap,
  ArrowRight,
  Cpu,
  Layers,
  Heart,
  Activity
} from 'lucide-react';

export const WbScriptDocsPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [simHealth, setSimHealth] = useState(100);
  const [simSpeed] = useState(5);
  const [isJumping, setIsJumping] = useState(false);
  const [lastLog, setLastLog] = useState('Runtime initialized');

  const fullCode = `// PlayerController.wb - Official .wbscript Example
player.speed = 5
player.health = 100

when game starts:
    player.spawn()

when jump:
    player.jump()

function heal amount:
    player.health += amount`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerJump = () => {
    setIsJumping(true);
    setLastLog('Event: "when jump" dispatched -> player.jump() called');
    setTimeout(() => setIsJumping(false), 800);
  };

  const handleTriggerHeal = (amt: number) => {
    setSimHealth((h) => Math.min(h + amt, 150));
    setLastLog(`Function: "heal ${amt}" executed -> player.health is now ${Math.min(simHealth + amt, 150)}`);
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header Banner */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 font-semibold">
            <Link to="/docs" className="hover:underline">Documentation</Link>
            <span>/</span>
            <span>Programming</span>
            <span>/</span>
            <span className="text-neutral-900 font-bold">.wbscript</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 font-sans mb-3">
                .wbscript Language Specification
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-sans">
                Simple to read. Powerful enough for anything. Workbench&apos;s native programming language engineered for real-time game simulation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/docs/wbvisual"
                className="btn-blueprint-secondary px-4 py-2 text-xs font-mono flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#0e3052]" />
                <span>Compare with .wbvisual</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Core Code Example & Live Runtime Simulation */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 font-sans">
                Official .wbscript Syntax Example
              </h2>
              <p className="text-xs text-neutral-600 font-sans mt-1">
                Zero boilerplate, typed inferences, and native message subscriptions.
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="btn-blueprint-secondary px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Syntax Highlighted Box */}
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-neutral-950 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-2 text-white font-semibold">
                  <FileCode className="w-4 h-4 text-sky-400" />
                  <span>PlayerController.wb</span>
                </span>
                <span>Language Spec: 1.0</span>
              </div>

              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-neutral-200">
                <pre>
                  <code>
                    <span className="text-sky-300 font-semibold">player</span>.<span className="text-sky-200">speed</span> = <span className="text-amber-300">5</span>{'\n'}
                    <span className="text-sky-300 font-semibold">player</span>.<span className="text-sky-200">health</span> = <span className="text-amber-300">100</span>{'\n\n'}
                    <span className="text-blue-300 font-bold">when</span> <span className="text-emerald-300 font-semibold">game starts</span>:{'\n'}
                    {'    '}<span className="text-sky-300">player</span>.<span className="text-yellow-200">spawn</span>(){'\n\n'}
                    <span className="text-blue-300 font-bold">when</span> <span className="text-emerald-300 font-semibold">jump</span>:{'\n'}
                    {'    '}<span className="text-sky-300">player</span>.<span className="text-yellow-200">jump</span>(){'\n\n'}
                    <span className="text-blue-300 font-bold">function</span> <span className="text-yellow-200 font-semibold">heal</span> <span className="text-orange-200">amount</span>:{'\n'}
                    {'    '}<span className="text-sky-300">player</span>.<span className="text-sky-200">health</span> += <span className="text-orange-200">amount</span>
                  </code>
                </pre>
              </div>

              <div className="bg-neutral-950 border-t border-neutral-800/80 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>JIT Native Binary Compilation</span>
                <span className="text-emerald-400">0ms GC Overhead</span>
              </div>
            </div>

            {/* Live Interactive Evaluation Box */}
            <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0e3052]" />
                  <span className="font-bold text-neutral-900 font-sans text-sm">Interactive State Inspector</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-semibold">
                  Live Runtime
                </span>
              </div>

              <div className="bg-white p-4 rounded border border-neutral-200 font-mono text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500">player.speed:</span>
                  <span className="text-neutral-900 font-bold">{simSpeed} units/sec</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">player.health:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 transition-all duration-300"
                        style={{ width: `${Math.min((simHealth / 150) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-neutral-900 font-bold">{simHealth} HP</span>
                  </div>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-100">
                  <span className="text-neutral-500">player state:</span>
                  <span className={isJumping ? 'text-amber-700 font-bold' : 'text-[#0e3052] font-bold'}>
                    {isJumping ? 'Jumping (Impulse 12.0)' : 'Grounded'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono text-neutral-600 uppercase tracking-wider font-semibold">
                  Test .wbscript Invocations
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleTriggerJump}
                    disabled={isJumping}
                    className="btn-blueprint py-2 px-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>trigger &quot;when jump&quot;</span>
                  </button>

                  <button
                    onClick={() => handleTriggerHeal(25)}
                    className="btn-blueprint-secondary py-2 px-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer text-neutral-800"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-600" />
                    <span>call heal(25)</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 font-mono text-[11px] text-neutral-600 truncate">
                <span className="text-[#0e3052] font-semibold">Log:</span> {lastLog}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Language Guide Sections */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 font-sans flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#0e3052]" />
              <span>1. Variables &amp; Types</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Variables in .wbscript are inferred statically at compile time with zero runtime allocation penalties.
            </p>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 font-mono text-xs text-neutral-800 space-y-1">
              <div>player.speed = 5 <span className="text-neutral-500">// Int</span></div>
              <div>player.name = &quot;Hero&quot; <span className="text-neutral-500">// String</span></div>
              <div>player.is_alive = true <span className="text-neutral-500">// Bool</span></div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 font-sans flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0e3052]" />
              <span>2. Event Grammar (`when`)</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              The <code className="font-mono text-[#0e3052] font-semibold">when &lt;event&gt;:</code> syntax subscribes directly to the engine&apos;s native message bus.
            </p>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 font-mono text-xs text-neutral-800 space-y-1">
              <div><span className="text-[#0e3052] font-bold">when</span> <span className="text-emerald-700 font-semibold">game starts</span>:</div>
              <div className="pl-3">player.spawn()</div>
              <div><span className="text-[#0e3052] font-bold">when</span> <span className="text-emerald-700 font-semibold">collision entity</span>:</div>
              <div className="pl-3">take_damage(10)</div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 font-sans flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0e3052]" />
              <span>3. Functions &amp; Calling</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Functions use clean indentation-based syntax without cumbersome brackets, matching human readable pseudocode.
            </p>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 font-mono text-xs text-neutral-800 space-y-1">
              <div><span className="text-[#0e3052] font-bold">function</span> <span className="text-amber-800 font-semibold">heal</span> <span className="text-neutral-700">amount</span>:</div>
              <div className="pl-3">player.health += amount</div>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/docs"
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 font-sans"
          >
            <span>← Back to Documentation Overview</span>
          </Link>

          <Link
            to="/docs/wbvisual"
            className="btn-blueprint px-5 py-2.5 text-xs font-semibold flex items-center gap-2 font-sans"
          >
            <span>Explore .wbvisual Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

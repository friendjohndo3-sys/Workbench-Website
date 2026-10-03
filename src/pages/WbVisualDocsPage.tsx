import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Play,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  GitBranch,
  Cpu,
  Workflow
} from 'lucide-react';

export const WbVisualDocsPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [coinExists, setCoinExists] = useState(true);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const runPulse = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCoinExists(true);
    setSoundPlaying(false);

    // Step 1
    setActiveStep(1);
    setTimeout(() => {
      // Step 2
      setActiveStep(2);
      setScore((s) => s + 1);

      setTimeout(() => {
        // Step 3
        setActiveStep(3);
        setCoinExists(false);

        setTimeout(() => {
          // Step 4
          setActiveStep(4);
          setSoundPlaying(true);

          setTimeout(() => {
            setIsSimulating(false);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleReset = () => {
    setActiveStep(null);
    setScore(0);
    setCoinExists(true);
    setSoundPlaying(false);
    setIsSimulating(false);
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
            <span className="text-neutral-900 font-bold">.wbvisual</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 font-sans mb-3">
                .wbvisual Visual Scripting System
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-sans">
                A full visual programming system, not merely a beginner tool. Engineered for complex game architectures, animation blends, and state machines.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/docs/wbscript"
                className="btn-blueprint-secondary px-4 py-2 text-xs font-mono flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#0e3052]" />
                <span>View .wbscript Spec</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Core Visual Concept & Interactive Flow Runner */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 font-sans">
                Visual Flow Graph Execution
              </h2>
              <p className="text-xs text-neutral-600 font-sans mt-1">
                Trigger signals travel along execution pins with real-time value routing.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runPulse}
                disabled={isSimulating}
                className="btn-blueprint px-4 py-2 text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Executing Flow...' : 'Test Signal Pulse'}</span>
              </button>

              <button
                onClick={handleReset}
                className="btn-blueprint-secondary px-3 py-2 text-xs font-mono flex items-center gap-1.5 cursor-pointer text-neutral-600 hover:text-neutral-900"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Node Flow Canvas: [Player Touches Coin] ↓ [Add 1 To Score] ↓ [Destroy Coin] ↓ [Play Sound] */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 lg:p-8 space-y-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Node 1 */}
              <div
                className={`bg-white border-2 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between shadow-xs ${
                  activeStep === 1
                    ? 'border-[#0e3052] ring-2 ring-[#0e3052]/20'
                    : 'border-neutral-200'
                }`}
              >
                <div>
                  <div className="bg-neutral-100 border border-neutral-200 text-[#0e3052] px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center justify-between mb-3">
                    <span>OnTriggerEnter2D</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                  </div>
                  <div className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    [Player Touches Coin]
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500">Tag: &quot;Player&quot;</p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-100 flex justify-between text-[10px] font-mono text-[#0e3052] font-semibold">
                  <span>Output</span>
                  <span>Exec ▶</span>
                </div>
              </div>

              {/* Node 2 */}
              <div
                className={`bg-white border-2 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between shadow-xs ${
                  activeStep === 2
                    ? 'border-[#0e3052] ring-2 ring-[#0e3052]/20'
                    : 'border-neutral-200'
                }`}
              >
                <div>
                  <div className="bg-neutral-100 border border-neutral-200 text-[#0e3052] px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center justify-between mb-3">
                    <span>ScoreManager.Add</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                  </div>
                  <div className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    [Add 1 To Score]
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500">Delta: +1</p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-100 flex justify-between text-[10px] font-mono text-[#0e3052] font-semibold">
                  <span>Output</span>
                  <span>Exec ▶</span>
                </div>
              </div>

              {/* Node 3 */}
              <div
                className={`bg-white border-2 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between shadow-xs ${
                  activeStep === 3
                    ? 'border-[#0e3052] ring-2 ring-[#0e3052]/20'
                    : 'border-neutral-200'
                }`}
              >
                <div>
                  <div className="bg-neutral-100 border border-neutral-200 text-[#0e3052] px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center justify-between mb-3">
                    <span>DestroyEntity</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                  </div>
                  <div className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    [Destroy Coin]
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500">Target: self</p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-100 flex justify-between text-[10px] font-mono text-[#0e3052] font-semibold">
                  <span>Output</span>
                  <span>Exec ▶</span>
                </div>
              </div>

              {/* Node 4 */}
              <div
                className={`bg-white border-2 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between shadow-xs ${
                  activeStep === 4
                    ? 'border-[#0e3052] ring-2 ring-[#0e3052]/20'
                    : 'border-neutral-200'
                }`}
              >
                <div>
                  <div className="bg-neutral-100 border border-neutral-200 text-[#0e3052] px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center justify-between mb-3">
                    <span>Audio.Play</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052]" />
                  </div>
                  <div className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    [Play Sound]
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500">Clip: Coin.wav</p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-100 flex justify-between text-[10px] font-mono text-emerald-700 font-semibold">
                  <span>Terminus</span>
                  <span className="flex items-center gap-1">Done <CheckCircle2 className="w-3 h-3" /></span>
                </div>
              </div>
            </div>

            {/* Live State Banner */}
            <div className="bg-white p-4 rounded border border-neutral-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xs">
              <div className="flex items-center gap-4 text-neutral-700">
                <span>Score: <strong className="text-neutral-900">{score}</strong></span>
                <span>Coin Entity: <strong className={coinExists ? 'text-emerald-700' : 'text-neutral-400'}>{coinExists ? 'Active' : 'Destroyed'}</strong></span>
                <span>Audio: <strong className={soundPlaying ? 'text-[#0e3052] font-bold' : 'text-neutral-400'}>{soundPlaying ? 'Coin.wav playing' : 'Idle'}</strong></span>
              </div>
              <span className="text-neutral-500 text-[11px]">Compiles directly to machine bytecode</span>
            </div>
          </div>
        </section>

        {/* Why .wbvisual is an Advanced Engine System */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-neutral-900 font-sans">
              Engineered for Serious Systems, Not Just Beginners
            </h2>
            <p className="text-sm text-neutral-600 font-sans mt-1">
              Visual scripting is often misunderstood as an entry-level learning tool. .wbvisual is designed as a first-class visual programming language with complete feature parity to .wbscript.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052]">
                <Workflow className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-sans">1. Custom Node Macros</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Encapsulate complex node networks (like vector calculations, damage mitigation formulas, or AI sight cones) into standalone custom nodes with clean inputs and outputs.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052]">
                <GitBranch className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-sans">2. Finite State Machines</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Author hierarchical state machines with entry conditions, exit transitions, and sub-states for complex boss patterns and animation state blending.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#0e3052]">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-sans">3. Native Performance</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                .wbvisual node graphs compile into the exact same low-level bytecode as .wbscript, with zero reflection overhead or interpreter bottlenecks.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/docs/wbscript"
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 font-sans"
          >
            <span>← Read .wbscript Language Spec</span>
          </Link>

          <Link
            to="/docs"
            className="btn-blueprint px-5 py-2.5 text-xs font-semibold flex items-center gap-2 font-sans"
          >
            <span>Back to Documentation Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

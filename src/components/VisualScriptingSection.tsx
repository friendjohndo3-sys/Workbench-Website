import React, { useState } from 'react';
import {
  Zap,
  Play,
  Volume2,
  Trash2,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  ArrowDown,
  Layers,
  Activity,
  Cpu,
  RefreshCw,
  GitBranch
} from 'lucide-react';

export const VisualScriptingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [coinExists, setCoinExists] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const [isRunningChain, setIsRunningChain] = useState(false);

  const runNodeChain = () => {
    if (isRunningChain) return;
    setIsRunningChain(true);
    setSoundPlayed(false);
    setCoinExists(true);

    // Step 1: Trigger Player Touches Coin
    setActiveStep(1);
    setTimeout(() => {
      // Step 2: Add 1 to Score
      setActiveStep(2);
      setScore((s) => s + 1);

      setTimeout(() => {
        // Step 3: Destroy Coin
        setActiveStep(3);
        setCoinExists(false);

        setTimeout(() => {
          // Step 4: Play Sound
          setActiveStep(4);
          setSoundPlayed(true);

          setTimeout(() => {
            setIsRunningChain(false);
            // keep state intact
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const resetChain = () => {
    setActiveStep(null);
    setScore(0);
    setCoinExists(true);
    setSoundPlayed(false);
    setIsRunningChain(false);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0b0b0e] border-b border-neutral-900 relative blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Node-Based System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Visual Scripting with .wbvisual
          </h2>
          <p className="text-xl text-neutral-300 font-medium mb-2">
            A full visual programming system, not merely a beginner tool.
          </p>
          <p className="text-base text-neutral-400 leading-relaxed font-normal">
            .wbvisual compiles directly to optimized native bytecode. Build complex state machines, mathematical vectors, animation blends, and gameplay systems without writing text code.
          </p>
        </div>

        {/* Interactive Visual Programming Flow Canvas */}
        <div className="bg-[#111116] border border-neutral-800 rounded-lg p-6 lg:p-8 relative overflow-hidden shadow-2xl">
          {/* Header Controls for Visual Graph */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">CoinPickup_Logic.wbvisual</span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Active Graph
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Visual Flow Example: Event Trigger → Data Computation → Entity Lifecycle → Audio Dispatch
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runNodeChain}
                disabled={isRunningChain}
                className="btn-blueprint px-4 py-2 text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunningChain ? 'Executing Pulse...' : 'Test Node Chain (Pulse)'}</span>
              </button>

              <button
                onClick={resetChain}
                className="btn-blueprint-secondary px-3 py-2 text-xs font-mono flex items-center gap-1.5 cursor-pointer text-neutral-400 hover:text-white"
                title="Reset simulation"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Node Graph Flow: [Player Touches Coin] ↓ [Add 1 To Score] ↓ [Destroy Coin] ↓ [Play Sound] */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Node 1: [Player Touches Coin] */}
            <div
              className={`bg-[#15151b] border-2 rounded-lg p-4 transition-all duration-300 relative flex flex-col justify-between ${
                activeStep === 1
                  ? 'border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.02] bg-[#1a1a24]'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Node Header */}
                <div className="bg-cyan-950/70 border border-cyan-800/50 text-cyan-300 px-2 py-1 rounded text-[11px] font-mono font-bold flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>OnTriggerEnter2D</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                <div className="text-sm font-bold text-white mb-2">
                  Player Touches Coin
                </div>

                <div className="space-y-1 text-[11px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
                  <div className="flex justify-between">
                    <span>collider_tag:</span>
                    <span className="text-cyan-300 font-semibold">&quot;Player&quot;</span>
                  </div>
                  <div className="flex justify-between">
                    <span>layer:</span>
                    <span className="text-neutral-300">Interactables</span>
                  </div>
                </div>
              </div>

              {/* Execution Pin Out */}
              <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-500">Output Signal</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <span>Exec</span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-xs" />
                </span>
              </div>
            </div>

            {/* Node 2: [Add 1 To Score] */}
            <div
              className={`bg-[#15151b] border-2 rounded-lg p-4 transition-all duration-300 relative flex flex-col justify-between ${
                activeStep === 2
                  ? 'border-emerald-400 shadow-lg shadow-emerald-500/25 scale-[1.02] bg-[#1a1a24]'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Node Header */}
                <div className="bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 px-2 py-1 rounded text-[11px] font-mono font-bold flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ScoreManager.Add</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <div className="text-sm font-bold text-white mb-2">
                  Add 1 To Score
                </div>

                <div className="space-y-1 text-[11px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
                  <div className="flex justify-between">
                    <span>increment:</span>
                    <span className="text-emerald-300 font-bold">+1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>current_total:</span>
                    <span className="text-white font-bold">{score}</span>
                  </div>
                </div>
              </div>

              {/* Execution Pin Out */}
              <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-500">Output Signal</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span>Exec</span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-xs" />
                </span>
              </div>
            </div>

            {/* Node 3: [Destroy Coin] */}
            <div
              className={`bg-[#15151b] border-2 rounded-lg p-4 transition-all duration-300 relative flex flex-col justify-between ${
                activeStep === 3
                  ? 'border-rose-400 shadow-lg shadow-rose-500/25 scale-[1.02] bg-[#1a1a24]'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Node Header */}
                <div className="bg-rose-950/70 border border-rose-800/50 text-rose-300 px-2 py-1 rounded text-[11px] font-mono font-bold flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>DestroyEntity</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                </div>

                <div className="text-sm font-bold text-white mb-2">
                  Destroy Coin
                </div>

                <div className="space-y-1 text-[11px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
                  <div className="flex justify-between">
                    <span>target:</span>
                    <span className="text-amber-300 font-semibold">&quot;self&quot;</span>
                  </div>
                  <div className="flex justify-between">
                    <span>delay:</span>
                    <span className="text-neutral-300">0.0s (Instant)</span>
                  </div>
                </div>
              </div>

              {/* Execution Pin Out */}
              <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-500">Output Signal</span>
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <span>Exec</span>
                  <span className="w-2 h-2 bg-rose-400 rounded-xs" />
                </span>
              </div>
            </div>

            {/* Node 4: [Play Sound] */}
            <div
              className={`bg-[#15151b] border-2 rounded-lg p-4 transition-all duration-300 relative flex flex-col justify-between ${
                activeStep === 4
                  ? 'border-amber-400 shadow-lg shadow-amber-500/25 scale-[1.02] bg-[#1a1a24]'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Node Header */}
                <div className="bg-amber-950/70 border border-amber-800/50 text-amber-300 px-2 py-1 rounded text-[11px] font-mono font-bold flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Audio.PlayOneShot</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </div>

                <div className="text-sm font-bold text-white mb-2">
                  Play Sound
                </div>

                <div className="space-y-1 text-[11px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
                  <div className="flex justify-between">
                    <span>clip:</span>
                    <span className="text-amber-200 font-semibold">&quot;Coin_Collect.wav&quot;</span>
                  </div>
                  <div className="flex justify-between">
                    <span>volume:</span>
                    <span className="text-neutral-300">0.85 (2D Master)</span>
                  </div>
                </div>
              </div>

              {/* Execution Pin Out */}
              <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-500">End Of Chain</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span>Success</span>
                  <CheckCircle2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Live Outcome Visualizer Bar */}
          <div className="mt-8 bg-[#0d0d11] p-4 rounded-lg border border-neutral-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span className="text-neutral-400">Simulation State:</span>
              <span className="flex items-center gap-1.5 text-white font-bold">
                <span>Score:</span>
                <span className="bg-neutral-800 px-2 py-0.5 rounded text-amber-400">{score}</span>
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold">
                <span>Coin Entity:</span>
                <span className={`px-2 py-0.5 rounded ${coinExists ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                  {coinExists ? 'Active in Scene' : 'Destroyed'}
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold">
                <span>Audio Channel:</span>
                <span className={`px-2 py-0.5 rounded ${soundPlayed ? 'bg-amber-950 text-amber-400 animate-pulse' : 'bg-neutral-900 text-neutral-500'}`}>
                  {soundPlayed ? 'Playing (Coin_Collect.wav)' : 'Idle'}
                </span>
              </span>
            </div>

            <div className="text-[11px] text-neutral-500">
              Direct Assembly Compilation · 0ms GC Overhead
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

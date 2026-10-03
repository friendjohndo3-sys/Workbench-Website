import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Folder,
  FolderOpen,
  FileCode,
  Box,
  Eye,
  Settings,
  Layers,
  Camera,
  Sun,
  Shield,
  Zap,
  Terminal,
  ChevronRight,
  ChevronDown,
  Grid,
  Move,
  RotateCw,
  Scaling,
  Maximize,
  Sliders,
  Volume2,
  Image,
  Cuboid,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Package,
  Cpu
} from 'lucide-react';

interface EditorMockupProps {
  initialMode?: '3D' | '2D';
  compact?: boolean;
}

export const EditorMockup: React.FC<EditorMockupProps> = ({
  initialMode = '3D',
  compact = false,
}) => {
  const [viewportMode, setViewportMode] = useState<'3D' | '2D'>(initialMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string>('Player');
  const [selectedTreeTab, setSelectedTreeTab] = useState<'both' | 'project' | 'game'>('both');
  const [bottomTab, setBottomTab] = useState<'console' | 'assets' | 'logs'>('console');
  const [activeTool, setActiveTool] = useState<'select' | 'move' | 'rotate' | 'scale'>('move');
  
  // Interactive object position simulation state
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 1.2, z: 0 });
  const [simTick, setSimTick] = useState(0);

  // Simulation physics loop when Playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSimTick((t) => t + 1);
        setPlayerPos((prev) => ({
          x: Math.sin(Date.now() / 800) * 1.5,
          y: 1.2 + Math.abs(Math.sin(Date.now() / 400)) * 0.8,
          z: Math.cos(Date.now() / 800) * 1.2,
        }));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Collapsed states for trees
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    scenes: true,
    scripts: true,
    assets: false,
    player: true,
  });

  const toggleFolder = (key: string) => {
    setExpandedFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full bg-[#0e0e12] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl font-sans text-xs text-neutral-300 select-none">
      {/* Top Title Bar of Editor */}
      <div className="bg-[#141418] border-b border-neutral-800 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          </div>
          <span className="text-neutral-500">|</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-200">Workbench Editor</span>
            <span className="text-neutral-500 font-mono text-[11px]">· Space_Odyssey_Demo (MainLevel.scene)</span>
          </div>
        </div>

        {/* Play / Pause / Step Transport Controls */}
        <div className="flex items-center gap-1 bg-[#1a1a20] p-0.5 rounded border border-neutral-700/60">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1 rounded flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
            }`}
            title={isPlaying ? 'Pause Simulation' : 'Run Scene (Play)'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="font-mono">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setPlayerPos({ x: 0, y: 1.2, z: 0 });
            }}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport switch: 2D vs 3D */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1a1a20] p-0.5 rounded border border-neutral-800">
            <button
              onClick={() => setViewportMode('2D')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                viewportMode === '2D' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' : 'text-neutral-400 hover:text-white'
              }`}
            >
              2D View
            </button>
            <button
              onClick={() => setViewportMode('3D')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                viewportMode === '3D' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' : 'text-neutral-400 hover:text-white'
              }`}
            >
              3D View
            </button>
          </div>
          <span className="text-neutral-600 font-mono text-[10px] hidden sm:inline">60.0 FPS · Vulkan</span>
        </div>
      </div>

      {/* Editor Main Work Area (3 Columns: Left Trees, Center Viewport + Bottom, Right Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[560px]">
        {/* ========================================================= */}
        {/* LEFT COLUMN: TWO SEPARATE TREES (PROJECT ROOT & GAME ROOT) */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 border-r border-neutral-800/80 bg-[#111115] flex flex-col justify-between">
          <div className="flex flex-col h-full overflow-hidden">
            {/* Tree Section 1: PROJECT ROOT */}
            <div className="border-b border-neutral-800/80">
              <div className="bg-[#16161c] px-3 py-1.5 flex items-center justify-between border-b border-neutral-800/50">
                <div className="flex items-center gap-1.5 font-semibold text-neutral-200 uppercase tracking-wider text-[10px]">
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                  <span>Project Root</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">Files & Folders</span>
              </div>

              <div className="p-2 space-y-0.5 max-h-48 overflow-y-auto font-mono text-[11px]">
                {/* Scenes Folder */}
                <div>
                  <button
                    onClick={() => toggleFolder('scenes')}
                    className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-neutral-800/60 text-left text-neutral-300"
                  >
                    {expandedFolders.scenes ? <ChevronDown className="w-3 h-3 text-neutral-500" /> : <ChevronRight className="w-3 h-3 text-neutral-500" />}
                    <FolderOpen className="w-3.5 h-3.5 text-amber-400/90" />
                    <span>Scenes</span>
                  </button>
                  {expandedFolders.scenes && (
                    <div className="pl-5 space-y-0.5 text-neutral-400">
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-800/30">
                        <Box className="w-3 h-3 text-cyan-400" />
                        <span>MainLevel.scene</span>
                        <span className="ml-auto text-[9px] text-cyan-400/80 font-sans">Open</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-800/40 text-neutral-400">
                        <Box className="w-3 h-3 text-neutral-500" />
                        <span>Player.scene</span>
                        <span className="ml-auto text-[9px] text-neutral-500 font-sans">Reusable</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-800/40 text-neutral-400">
                        <Box className="w-3 h-3 text-neutral-500" />
                        <span>BossArena.scene</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scripts Folder */}
                <div>
                  <button
                    onClick={() => toggleFolder('scripts')}
                    className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-neutral-800/60 text-left text-neutral-300"
                  >
                    {expandedFolders.scripts ? <ChevronDown className="w-3 h-3 text-neutral-500" /> : <ChevronRight className="w-3 h-3 text-neutral-500" />}
                    <FolderOpen className="w-3.5 h-3.5 text-blue-400/90" />
                    <span>Scripts</span>
                  </button>
                  {expandedFolders.scripts && (
                    <div className="pl-5 space-y-0.5 text-neutral-400">
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-800/40">
                        <FileCode className="w-3 h-3 text-cyan-400" />
                        <span>PlayerController.wb</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-800/40">
                        <FileCode className="w-3 h-3 text-amber-400" />
                        <span>CombatSystem.py</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-800/40">
                        <Zap className="w-3 h-3 text-purple-400" />
                        <span>CoinPickup.wbvisual</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Folders */}
                <div className="flex items-center gap-1.5 px-1.5 py-1 text-neutral-400 hover:bg-neutral-800/40 rounded cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                  <Folder className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Assets</span>
                </div>
                <div className="flex items-center gap-1.5 px-1.5 py-1 text-neutral-400 hover:bg-neutral-800/40 rounded cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                  <Folder className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Materials</span>
                </div>
                <div className="flex items-center gap-1.5 px-1.5 py-1 text-neutral-400 hover:bg-neutral-800/40 rounded cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                  <Folder className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Audio</span>
                </div>
                <div className="flex items-center gap-1.5 px-1.5 py-1 text-neutral-400 hover:bg-neutral-800/40 rounded cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                  <Folder className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Prefabs</span>
                </div>
                <div className="flex items-center gap-1.5 px-1.5 py-1 text-neutral-400 hover:bg-neutral-800/40 rounded cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                  <Folder className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Settings</span>
                </div>
              </div>
            </div>

            {/* Tree Section 2: GAME ROOT (Objects inside currently open scene) */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f13]">
              <div className="bg-[#16161c] px-3 py-1.5 flex items-center justify-between border-y border-neutral-800/80">
                <div className="flex items-center gap-1.5 font-semibold text-neutral-200 uppercase tracking-wider text-[10px]">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Game Root</span>
                </div>
                <span className="text-[10px] text-cyan-400/90 font-mono">Active Scene Only</span>
              </div>

              <div className="p-2 space-y-0.5 overflow-y-auto font-mono text-[11px] flex-1">
                {/* Game Root node */}
                <div className="text-neutral-300 font-semibold flex items-center gap-1.5 px-1.5 py-1">
                  <Box className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Game</span>
                </div>

                {/* Children under Game */}
                <div className="pl-3 space-y-0.5">
                  {/* Player (Reusable Subscene instance) */}
                  <div>
                    <button
                      onClick={() => {
                        setSelectedNode('Player');
                        toggleFolder('player');
                      }}
                      className={`w-full flex items-center gap-1.5 px-1.5 py-1 rounded text-left transition-colors cursor-pointer ${
                        selectedNode === 'Player'
                          ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50'
                          : 'hover:bg-neutral-800/60 text-neutral-200'
                      }`}
                    >
                      {expandedFolders.player ? <ChevronDown className="w-3 h-3 text-neutral-400" /> : <ChevronRight className="w-3 h-3 text-neutral-400" />}
                      <Package className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold">Player</span>
                      <span className="ml-auto text-[9px] px-1 py-0.2 bg-neutral-800 text-neutral-400 rounded font-sans">
                        .scene
                      </span>
                    </button>

                    {expandedFolders.player && (
                      <div className="pl-4 space-y-0.5 border-l border-neutral-800 ml-2 mt-0.5">
                        <button
                          onClick={() => setSelectedNode('Player.Body')}
                          className={`w-full flex items-center gap-1.5 px-1.5 py-0.5 rounded text-left ${
                            selectedNode === 'Player.Body' ? 'bg-neutral-800 text-cyan-300' : 'text-neutral-400 hover:bg-neutral-800/40'
                          }`}
                        >
                          <Cuboid className="w-3 h-3 text-blue-400" />
                          <span>Body</span>
                        </button>
                        <button
                          onClick={() => setSelectedNode('Player.Camera')}
                          className={`w-full flex items-center gap-1.5 px-1.5 py-0.5 rounded text-left ${
                            selectedNode === 'Player.Camera' ? 'bg-neutral-800 text-cyan-300' : 'text-neutral-400 hover:bg-neutral-800/40'
                          }`}
                        >
                          <Camera className="w-3 h-3 text-emerald-400" />
                          <span>Camera</span>
                        </button>
                        <button
                          onClick={() => setSelectedNode('Player.Collider')}
                          className={`w-full flex items-center gap-1.5 px-1.5 py-0.5 rounded text-left ${
                            selectedNode === 'Player.Collider' ? 'bg-neutral-800 text-cyan-300' : 'text-neutral-400 hover:bg-neutral-800/40'
                          }`}
                        >
                          <Shield className="w-3 h-3 text-amber-400" />
                          <span>Collider</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Enemy */}
                  <button
                    onClick={() => setSelectedNode('Enemy')}
                    className={`w-full flex items-center gap-1.5 px-1.5 py-1 rounded text-left transition-colors ${
                      selectedNode === 'Enemy' ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50' : 'hover:bg-neutral-800/60 text-neutral-300'
                    }`}
                  >
                    <Cuboid className="w-3.5 h-3.5 text-rose-400" />
                    <span>Enemy</span>
                  </button>

                  {/* Ground */}
                  <button
                    onClick={() => setSelectedNode('Ground')}
                    className={`w-full flex items-center gap-1.5 px-1.5 py-1 rounded text-left transition-colors ${
                      selectedNode === 'Ground' ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50' : 'hover:bg-neutral-800/60 text-neutral-300'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ground</span>
                  </button>

                  {/* Main Camera */}
                  <button
                    onClick={() => setSelectedNode('Main Camera')}
                    className={`w-full flex items-center gap-1.5 px-1.5 py-1 rounded text-left transition-colors ${
                      selectedNode === 'Main Camera' ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50' : 'hover:bg-neutral-800/60 text-neutral-300'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Main Camera</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER COLUMN: SCENE VIEWPORT & BOTTOM CONSOLE */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#08080a] relative overflow-hidden">
          {/* Viewport Top Toolbar */}
          <div className="bg-[#131318] border-b border-neutral-800/80 px-3 py-1 flex items-center justify-between z-10">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTool('select')}
                className={`p-1 rounded ${activeTool === 'select' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="Select"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTool('move')}
                className={`p-1 rounded ${activeTool === 'move' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="Translate Gizmo (W)"
              >
                <Move className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTool('rotate')}
                className={`p-1 rounded ${activeTool === 'rotate' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="Rotate Gizmo (E)"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTool('scale')}
                className={`p-1 rounded ${activeTool === 'scale' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="Scale Gizmo (R)"
              >
                <Scaling className="w-3.5 h-3.5" />
              </button>
              <div className="h-4 w-[1px] bg-neutral-800 mx-1" />
              <span className="text-[10px] text-neutral-400 font-mono">Snap: 0.5m · World</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Viewport
              </span>
            </div>
          </div>

          {/* Interactive Viewport Canvas Area */}
          <div className="flex-1 relative min-h-[300px] flex items-center justify-center p-4 overflow-hidden">
            {/* Grid Backdrop */}
            <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

            {/* 3D Engine Viewport Rendering */}
            {viewportMode === '3D' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Horizon and 3D Ground Plane */}
                <div
                  className="absolute w-80 h-80 border border-cyan-800/40 rounded-sm"
                  style={{
                    transform: 'perspective(600px) rotateX(60deg) rotateZ(-20deg)',
                    backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    boxShadow: '0 0 40px rgba(8,145,178,0.1)',
                  }}
                />

                {/* Ground Platform */}
                <div
                  className="absolute w-64 h-32 bg-gradient-to-r from-neutral-800 to-neutral-700 border border-neutral-600 rounded-sm flex items-center justify-center"
                  style={{
                    transform: 'perspective(600px) rotateX(60deg) rotateZ(-20deg) translateY(60px)',
                  }}
                >
                  <span className="text-[10px] font-mono text-neutral-400 select-none">Terrain Ground Plane (Static Body)</span>
                </div>

                {/* 3D Player Entity with Gizmo */}
                <div
                  className="relative z-10 flex flex-col items-center cursor-pointer transition-transform duration-75"
                  style={{
                    transform: `translate(${playerPos.x * 25}px, ${-playerPos.y * 20}px)`,
                  }}
                  onClick={() => setSelectedNode('Player')}
                >
                  {/* Selected Box Outline */}
                  <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded border-2 border-cyan-300 shadow-lg shadow-cyan-500/30 flex flex-col items-center justify-center relative group">
                    <span className="font-bold text-white text-xs">Player</span>
                    <span className="text-[9px] text-cyan-100 font-mono">RigidBody</span>

                    {/* Transform Gizmo overlay (Red X, Green Y, Blue Z arrows) */}
                    <div className="absolute -top-10 -right-10 pointer-events-none">
                      {/* Y-axis (Green) */}
                      <div className="w-0.5 h-10 bg-emerald-400 absolute bottom-0 left-0 flex flex-col items-center justify-start">
                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-transparent border-b-emerald-400" />
                        <span className="text-[8px] font-mono text-emerald-400 ml-3">Y</span>
                      </div>
                      {/* X-axis (Red) */}
                      <div className="h-0.5 w-10 bg-rose-500 absolute bottom-0 left-0 flex items-center justify-end">
                        <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[6px] border-transparent border-l-rose-500" />
                        <span className="text-[8px] font-mono text-rose-400 mt-3">X</span>
                      </div>
                      {/* Z-axis (Blue) */}
                      <div
                        className="w-0.5 h-8 bg-blue-400 absolute bottom-0 left-0 origin-bottom"
                        style={{ transform: 'rotate(-45deg)' }}
                      >
                        <span className="text-[8px] font-mono text-blue-400 ml-2">Z</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Shadow */}
                  <div className="w-14 h-4 bg-black/60 rounded-full blur-xs mt-2" />
                </div>

                {/* 3D Enemy Entity */}
                <div
                  className="absolute z-10 flex flex-col items-center cursor-pointer ml-48 -mt-6"
                  onClick={() => setSelectedNode('Enemy')}
                >
                  <div className="w-12 h-14 bg-gradient-to-br from-rose-600 to-rose-800 rounded border border-rose-400 shadow-md flex flex-col items-center justify-center">
                    <span className="font-bold text-white text-[10px]">Enemy</span>
                    <span className="text-[8px] text-rose-200 font-mono">AI</span>
                  </div>
                </div>

                {/* Camera Frustum Cone Gizmo */}
                <div className="absolute -bottom-2 -left-2 text-neutral-500 flex items-center gap-1 font-mono text-[9px] bg-neutral-900/80 px-2 py-1 rounded border border-neutral-800">
                  <Camera className="w-3 h-3 text-cyan-400" />
                  <span>Main Camera (FOV 60° · Aspect 16:9)</span>
                </div>
              </div>
            ) : (
              /* 2D Platformer Viewport Rendering */
              <div className="relative w-full h-full flex flex-col justify-between p-4 border border-dashed border-neutral-800 rounded bg-[#0a0a0f]">
                {/* 2D Coordinate Ruler Overlay */}
                <div className="flex items-center justify-between text-[9px] font-mono text-neutral-600 border-b border-neutral-800 pb-1">
                  <span>X: -1920px</span>
                  <span>Grid: 32px · Snap Enabled</span>
                  <span>X: +1920px</span>
                </div>

                {/* 2D Level Objects */}
                <div className="relative h-48 flex items-end justify-around pb-2">
                  {/* 2D Player Sprite with BoxCollider2D Box */}
                  <div
                    className="flex flex-col items-center cursor-pointer transition-transform duration-75"
                    style={{
                      transform: `translate(${playerPos.x * 20}px, ${-playerPos.y * 15}px)`,
                    }}
                    onClick={() => setSelectedNode('Player')}
                  >
                    <div className="w-12 h-16 bg-blue-600 border-2 border-emerald-400 rounded-xs flex flex-col items-center justify-center shadow-lg relative">
                      <span className="text-[10px] font-bold text-white">Player</span>
                      <span className="text-[8px] text-emerald-300 font-mono">Box2D</span>
                      {/* Velocity Vector Arrow */}
                      <div className="absolute -top-4 w-0.5 h-6 bg-yellow-400">
                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-transparent border-b-yellow-400 -mt-1 -ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Coin Pickup */}
                  <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-200 animate-bounce flex items-center justify-center shadow-amber-500/50 shadow-md">
                    <span className="text-[8px] font-bold text-amber-950">$</span>
                  </div>

                  {/* 2D Enemy */}
                  <div
                    className="w-10 h-12 bg-rose-600 border-2 border-emerald-400 rounded-xs flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => setSelectedNode('Enemy')}
                  >
                    <span className="text-[9px] font-bold text-white">Enemy</span>
                  </div>
                </div>

                {/* 2D Ground Tile Collider */}
                <div className="w-full h-8 bg-neutral-800 border-t-2 border-emerald-400 flex items-center justify-between px-3 text-[9px] font-mono text-neutral-400">
                  <span>StaticPlatformCollider2D</span>
                  <span>TilemapLayer: Foreground</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Area: Output, Console, Asset Browser */}
          <div className="border-t border-neutral-800/90 bg-[#0d0d10]">
            <div className="bg-[#141418] px-3 py-1 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBottomTab('console')}
                  className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                    bottomTab === 'console' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Output Console</span>
                </button>
                <button
                  onClick={() => setBottomTab('assets')}
                  className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                    bottomTab === 'assets' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Folder className="w-3 h-3" />
                  <span>Asset Browser</span>
                </button>
                <button
                  onClick={() => setBottomTab('logs')}
                  className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                    bottomTab === 'logs' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Engine Profiler</span>
                </button>
              </div>

              <span className="text-[10px] text-neutral-500 font-mono">0 Errors · 0 Warnings</span>
            </div>

            {/* Bottom Tab Content */}
            <div className="p-2.5 h-24 overflow-y-auto font-mono text-[11px] leading-relaxed text-neutral-300">
              {bottomTab === 'console' && (
                <div className="space-y-1">
                  <div className="text-neutral-400">
                    <span className="text-emerald-400">[Workbench Engine]</span> Ready · Vulkan renderer initialized (1440p / 60 FPS)
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-cyan-400">[SceneLoader]</span> Instantiated reusable subscene <span className="text-white">Player.scene</span> into <span className="text-white">MainLevel.scene</span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-blue-400">[WBScript Runtime]</span> Attached <span className="text-amber-300">PlayerController.wb</span> to entity #0241
                  </div>
                  {isPlaying && (
                    <div className="text-cyan-300">
                      <span className="text-cyan-400">[Physics Sub-step]</span> Tick #{simTick} · Pos: ({playerPos.x.toFixed(2)}, {playerPos.y.toFixed(2)}, {playerPos.z.toFixed(2)})
                    </div>
                  )}
                </div>
              )}

              {bottomTab === 'assets' && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-center text-[10px]">
                  <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded flex flex-col items-center gap-1 hover:border-neutral-700 cursor-pointer">
                    <Box className="w-5 h-5 text-cyan-400" />
                    <span className="truncate w-full">Player.scene</span>
                  </div>
                  <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded flex flex-col items-center gap-1 hover:border-neutral-700 cursor-pointer">
                    <FileCode className="w-5 h-5 text-blue-400" />
                    <span className="truncate w-full">Player.wb</span>
                  </div>
                  <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded flex flex-col items-center gap-1 hover:border-neutral-700 cursor-pointer">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="truncate w-full">Coin.wbvisual</span>
                  </div>
                  <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded flex flex-col items-center gap-1 hover:border-neutral-700 cursor-pointer">
                    <Volume2 className="w-5 h-5 text-amber-400" />
                    <span className="truncate w-full">Jump.wav</span>
                  </div>
                </div>
              )}

              {bottomTab === 'logs' && (
                <div className="flex items-center justify-between text-neutral-400 pt-1">
                  <div>Frame Time: <span className="text-emerald-400 font-bold">16.6 ms</span> (60 FPS)</div>
                  <div>Draw Calls: <span className="text-cyan-400 font-bold">42</span></div>
                  <div>Physics Tick: <span className="text-amber-400 font-bold">120 Hz</span></div>
                  <div>VRAM: <span className="text-neutral-200 font-bold">412 MB</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: INSPECTOR PANEL */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 border-l border-neutral-800/80 bg-[#111115] flex flex-col">
          <div className="bg-[#16161c] px-3 py-1.5 flex items-center justify-between border-b border-neutral-800/80">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-200 uppercase tracking-wider text-[10px]">
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Inspector</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">{selectedNode}</span>
          </div>

          <div className="p-3 space-y-3 overflow-y-auto flex-1 font-mono text-[11px]">
            {/* Entity Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
              <div className="w-7 h-7 rounded bg-blue-900/40 border border-blue-700/50 flex items-center justify-center">
                <Box className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{selectedNode}</div>
                <div className="text-[10px] text-neutral-500 font-sans">Scene Component (Enabled)</div>
              </div>
            </div>

            {/* Transform Component */}
            <div className="bg-[#16161b] p-2.5 rounded border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-200">
                <span>Transform</span>
                <span className="text-[9px] text-neutral-500">3D Vectors</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Position</span>
                  <div className="flex items-center gap-1 text-neutral-200 font-mono">
                    <span className="text-rose-400">X:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">{playerPos.x.toFixed(2)}</span>
                    <span className="text-emerald-400">Y:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">{playerPos.y.toFixed(2)}</span>
                    <span className="text-blue-400">Z:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">{playerPos.z.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Rotation</span>
                  <div className="flex items-center gap-1 text-neutral-200 font-mono">
                    <span className="text-rose-400">X:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">0.0°</span>
                    <span className="text-emerald-400">Y:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">45.0°</span>
                    <span className="text-blue-400">Z:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">0.0°</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Scale</span>
                  <div className="flex items-center gap-1 text-neutral-200 font-mono">
                    <span className="text-rose-400">X:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">1.0</span>
                    <span className="text-emerald-400">Y:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">1.0</span>
                    <span className="text-blue-400">Z:</span> <span className="bg-neutral-900 px-1 py-0.5 rounded">1.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RigidBody Component */}
            <div className="bg-[#16161b] p-2.5 rounded border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-200">
                <span>RigidBody (Physics)</span>
                <span className="text-[9px] text-emerald-400">Active</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-neutral-400">
                <div className="flex items-center justify-between">
                  <span>Mass (kg)</span>
                  <span className="text-neutral-200 font-mono">75.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Gravity Scale</span>
                  <span className="text-neutral-200 font-mono">1.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Collision Mode</span>
                  <span className="text-cyan-300 font-mono">Continuous</span>
                </div>
              </div>
            </div>

            {/* Script Component: PlayerController.wb */}
            <div className="bg-[#16161b] p-2.5 rounded border border-cyan-800/40 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-cyan-300">
                <div className="flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PlayerController.wb</span>
                </div>
                <span className="text-[9px] text-cyan-400/80">.wbscript</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-neutral-400">
                <div className="flex items-center justify-between">
                  <span>speed</span>
                  <span className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded">5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>health</span>
                  <span className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded">100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>jumpForce</span>
                  <span className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded">12.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

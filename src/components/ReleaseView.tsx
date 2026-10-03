import React, { useState } from 'react';
import { WorkbenchRelease, PlatformDownloadConfig } from '../types/content';
import {
  Download,
  Monitor,
  Terminal,
  Laptop,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Cpu,
  Layers,
  Info,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface ReleaseViewProps {
  release: WorkbenchRelease;
  isPreview?: boolean;
}

export const ReleaseView: React.FC<ReleaseViewProps> = ({ release, isPreview = false }) => {
  // Active accordion tabs for each platform: 'none' | 'notes' | 'requirements' | 'install'
  const [windowsTab, setWindowsTab] = useState<'none' | 'notes' | 'requirements' | 'install'>('none');
  const [linuxTab, setLinuxTab] = useState<'none' | 'notes' | 'requirements' | 'install'>('none');
  const [macosTab, setMacosTab] = useState<'none' | 'notes' | 'requirements' | 'install'>('none');

  const toggleTab = (
    platform: 'windows' | 'linux' | 'macos',
    tab: 'notes' | 'requirements' | 'install'
  ) => {
    if (platform === 'windows') {
      setWindowsTab(windowsTab === tab ? 'none' : tab);
    } else if (platform === 'linux') {
      setLinuxTab(linuxTab === tab ? 'none' : tab);
    } else if (platform === 'macos') {
      setMacosTab(macosTab === tab ? 'none' : tab);
    }
  };

  // Helper renderer for Platform Details Drawer
  const renderPlatformDetails = (
    platformName: string,
    config: PlatformDownloadConfig,
    activeTab: 'none' | 'notes' | 'requirements' | 'install'
  ) => {
    if (activeTab === 'none') return null;

    return (
      <div className="border-t border-neutral-200 bg-neutral-50/70 p-5 sm:p-6 text-xs font-sans space-y-4 animate-in fade-in duration-150">
        {/* Tab 1: Release Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0e3052] font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Release Notes — Workbench {release.version} ({platformName})</span>
            </div>

            {config.notes && (
              <p className="text-neutral-700 leading-relaxed font-sans">{config.notes}</p>
            )}

            {/* Structured release notes categories */}
            <div className="space-y-3">
              {release.releaseNotes?.whatsNew && release.releaseNotes.whatsNew.length > 0 && (
                <div>
                  <h4 className="font-bold text-neutral-900 font-sans mb-1.5">What&apos;s New</h4>
                  <ul className="space-y-1 text-neutral-600 pl-4 list-disc">
                    {release.releaseNotes.whatsNew.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {release.releaseNotes?.improvements && release.releaseNotes.improvements.length > 0 && (
                <div>
                  <h4 className="font-bold text-neutral-900 font-sans mb-1.5">Improvements</h4>
                  <ul className="space-y-1 text-neutral-600 pl-4 list-disc">
                    {release.releaseNotes.improvements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {release.releaseNotes?.bugFixes && release.releaseNotes.bugFixes.length > 0 && (
                <div>
                  <h4 className="font-bold text-neutral-900 font-sans mb-1.5">Bug Fixes</h4>
                  <ul className="space-y-1 text-neutral-600 pl-4 list-disc">
                    {release.releaseNotes.bugFixes.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {release.releaseNotes?.knownIssues && release.releaseNotes.knownIssues.length > 0 && (
                <div>
                  <h4 className="font-bold text-neutral-900 font-sans mb-1.5">Known Issues</h4>
                  <ul className="space-y-1 text-neutral-600 pl-4 list-disc">
                    {release.releaseNotes.knownIssues.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {release.releaseNotes?.developerNotes && (
                <div className="pt-2 border-t border-neutral-200">
                  <span className="font-semibold text-neutral-800">Developer Notes: </span>
                  <span className="text-neutral-600">{release.releaseNotes.developerNotes}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: System Requirements */}
        {activeTab === 'requirements' && (
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0e3052] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>System Requirements — {platformName}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Minimum Requirements */}
              <div className="bg-white border border-neutral-200 rounded p-4 space-y-2">
                <div className="text-xs font-bold text-neutral-900 font-sans pb-1.5 border-b border-neutral-100 flex items-center justify-between">
                  <span>Minimum Specifications</span>
                  <span className="text-[10px] font-mono text-neutral-500 font-normal">Entry Level</span>
                </div>
                <dl className="space-y-1.5 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">OS:</dt>
                    <dd className="text-neutral-900">{config.minRequirements?.os || 'Standard 64-bit OS'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">CPU:</dt>
                    <dd className="text-neutral-900">{config.minRequirements?.cpu || 'Quad-core processor'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">RAM:</dt>
                    <dd className="text-neutral-900">{config.minRequirements?.ram || '4 GB RAM'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">GPU:</dt>
                    <dd className="text-neutral-900">{config.minRequirements?.gpu || 'DirectX 11 / Vulkan 1.1'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">Storage:</dt>
                    <dd className="text-neutral-900">{config.minRequirements?.storage || '5 GB free disk space'}</dd>
                  </div>
                </dl>
              </div>

              {/* Recommended Requirements */}
              <div className="bg-white border border-neutral-200 rounded p-4 space-y-2">
                <div className="text-xs font-bold text-[#0e3052] font-sans pb-1.5 border-b border-neutral-100 flex items-center justify-between">
                  <span>Recommended Specifications</span>
                  <span className="text-[10px] font-mono text-[#0e3052] font-semibold">Full 3D / PBR</span>
                </div>
                <dl className="space-y-1.5 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">OS:</dt>
                    <dd className="text-neutral-900">{config.recRequirements?.os || 'Latest 64-bit OS'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">CPU:</dt>
                    <dd className="text-neutral-900">{config.recRequirements?.cpu || '8-core processor'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">RAM:</dt>
                    <dd className="text-neutral-900">{config.recRequirements?.ram || '16 GB RAM'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">GPU:</dt>
                    <dd className="text-neutral-900">{config.recRequirements?.gpu || 'Dedicated GPU (6 GB+ VRAM)'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-neutral-500">Storage:</dt>
                    <dd className="text-neutral-900">{config.recRequirements?.storage || '20 GB NVMe SSD space'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Installation Instructions */}
        {activeTab === 'install' && (
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0e3052] font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Installation Instructions — {platformName}</span>
            </div>

            {config.installationSteps && config.installationSteps.length > 0 ? (
              <ol className="space-y-2 text-xs font-sans text-neutral-700">
                {config.installationSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded bg-[#0e3052] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-neutral-500 font-mono text-xs">
                1. Download the package using the button above.<br />
                2. Run or extract the installer.<br />
                3. Launch Workbench.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. WINDOWS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white border border-neutral-300 rounded-md overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-sky-700" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans uppercase">
                  Windows
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
                <span className="font-semibold text-[#0e3052]">Workbench {release.version}</span>
                <span className="text-neutral-300">·</span>
                <span>{release.windows.architecture || 'Windows 10 / 11 · 64-bit'}</span>
                {release.windows.filesize && (
                  <>
                    <span className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{release.windows.filesize}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Area */}
            <div>
              {release.windows.available && release.windows.downloadUrl ? (
                <a
                  href={release.windows.downloadUrl}
                  download={release.windows.filename || true}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blueprint px-6 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs font-sans whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Workbench</span>
                </a>
              ) : (
                <div className="px-4 py-2 rounded bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-500 font-medium">
                  Coming Soon
                </div>
              )}
            </div>
          </div>

          {/* Details Toggle Bar */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 font-sans">
              <button
                type="button"
                onClick={() => toggleTab('windows', 'notes')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  windowsTab === 'notes'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Release Notes</span>
                {windowsTab === 'notes' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => toggleTab('windows', 'requirements')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  windowsTab === 'requirements'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>System Requirements</span>
                {windowsTab === 'requirements' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => toggleTab('windows', 'install')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  windowsTab === 'install'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Installation</span>
                {windowsTab === 'install' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {release.windows.filename && (
              <span className="font-mono text-[11px] text-neutral-400">
                File: {release.windows.filename}
              </span>
            )}
          </div>
        </div>

        {/* Expandable Platform Details */}
        {renderPlatformDetails('Windows', release.windows, windowsTab)}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. LINUX SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white border border-neutral-300 rounded-md overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-700" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans uppercase">
                  Linux
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
                <span className="font-semibold text-[#0e3052]">Workbench {release.version}</span>
                <span className="text-neutral-300">·</span>
                <span>{release.linux.architecture || 'Linux · 64-bit'}</span>
                {release.linux.filesize && (
                  <>
                    <span className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{release.linux.filesize}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Area */}
            <div>
              {release.linux.available && release.linux.downloadUrl ? (
                <a
                  href={release.linux.downloadUrl}
                  download={release.linux.filename || true}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blueprint px-6 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs font-sans whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Workbench</span>
                </a>
              ) : (
                <div className="px-4 py-2 rounded bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-500 font-medium">
                  Coming Soon
                </div>
              )}
            </div>
          </div>

          {/* Details Toggle Bar */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 font-sans">
              <button
                type="button"
                onClick={() => toggleTab('linux', 'notes')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  linuxTab === 'notes'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Release Notes</span>
                {linuxTab === 'notes' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => toggleTab('linux', 'requirements')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  linuxTab === 'requirements'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>System Requirements</span>
                {linuxTab === 'requirements' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => toggleTab('linux', 'install')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  linuxTab === 'install'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Installation</span>
                {linuxTab === 'install' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {release.linux.filename && (
              <span className="font-mono text-[11px] text-neutral-400">
                File: {release.linux.filename}
              </span>
            )}
          </div>
        </div>

        {/* Expandable Platform Details */}
        {renderPlatformDetails('Linux', release.linux, linuxTab)}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. macOS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white border border-neutral-300 rounded-md overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-neutral-800" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans uppercase">
                  macOS
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
                <span className="font-semibold text-[#0e3052]">Workbench {release.version}</span>
                <span className="text-neutral-300">·</span>
                <span>
                  {release.macos.hasSecondaryArch
                    ? `${release.macos.architecture} · ${release.macos.secondaryArchitecture}`
                    : release.macos.architecture || 'Universal'}
                </span>
                {release.macos.filesize && (
                  <>
                    <span className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{release.macos.filesize}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Area: Either dual architecture buttons or single button */}
            <div>
              {release.macos.available ? (
                release.macos.hasSecondaryArch && release.macos.secondaryDownloadUrl ? (
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <a
                      href={release.macos.downloadUrl}
                      download={release.macos.filename || true}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-blueprint px-4 py-2.5 text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs font-sans w-full sm:w-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{release.macos.architecture || 'Apple Silicon'}</span>
                    </a>

                    <a
                      href={release.macos.secondaryDownloadUrl}
                      download={release.macos.secondaryFilename || true}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-blueprint-secondary px-4 py-2.5 text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer font-sans w-full sm:w-auto text-neutral-800"
                    >
                      <Download className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{release.macos.secondaryArchitecture || 'Intel'}</span>
                    </a>
                  </div>
                ) : release.macos.downloadUrl ? (
                  <a
                    href={release.macos.downloadUrl}
                    download={release.macos.filename || true}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-blueprint px-6 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs font-sans whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Workbench</span>
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-500 font-medium">
                    Coming Soon
                  </div>
                )
              ) : (
                <div className="px-4 py-2 rounded bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-500 font-medium">
                  Coming Soon
                </div>
              )}
            </div>
          </div>

          {/* Details Toggle Bar */}
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 font-sans">
              <button
                type="button"
                onClick={() => toggleTab('macos', 'notes')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  macosTab === 'notes'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Release Notes</span>
                {macosTab === 'notes' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => toggleTab('macos', 'requirements')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  macosTab === 'requirements'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>System Requirements</span>
                {macosTab === 'requirements' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => toggleTab('macos', 'install')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  macosTab === 'install'
                    ? 'bg-[#0e3052] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Installation</span>
                {macosTab === 'install' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {release.macos.filename && (
              <span className="font-mono text-[11px] text-neutral-400">
                File: {release.macos.filename}
              </span>
            )}
          </div>
        </div>

        {/* Expandable Platform Details */}
        {renderPlatformDetails('macOS', release.macos, macosTab)}
      </section>
    </div>
  );
};

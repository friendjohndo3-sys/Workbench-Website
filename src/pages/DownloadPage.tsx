import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ReleaseView } from '../components/ReleaseView';
import { WorkbenchRelease } from '../types/content';
import {
  Download,
  Archive,
  ChevronDown,
  ChevronUp,
  Monitor,
  Terminal,
  Laptop,
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  Cpu,
} from 'lucide-react';

export const DownloadPage: React.FC = () => {
  const { content } = useContent();

  const allReleases: WorkbenchRelease[] = content.releases || [];

  // Determine current active published release:
  // 1. First look for release with isCurrent === true and status === 'published'
  // 2. If not found, look for first release with status === 'published'
  // 3. Fallback to first release
  const publishedReleases = allReleases.filter((r) => r.status === 'published');
  const currentRelease =
    publishedReleases.find((r) => r.isCurrent) ||
    publishedReleases[0] ||
    allReleases.find((r) => r.isCurrent) ||
    allReleases[0];

  // Archive releases: All published or archived releases except the current release
  const archivedReleases = allReleases.filter(
    (r) => r.id !== currentRelease?.id && (r.status === 'archived' || r.status === 'published')
  );

  // Expanded state for archived releases (by release ID)
  const [expandedArchiveIds, setExpandedArchiveIds] = useState<Record<string, boolean>>({});

  const toggleArchiveExpand = (id: string) => {
    setExpandedArchiveIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-16 lg:py-20 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider font-semibold">
            Official Distribution Portal
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 font-sans">
            Download Workbench
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-sans max-w-xl mx-auto">
            Build. Create. Play. Download the latest version of Workbench for your platform.
          </p>

          {/* Current Available Release Badge */}
          {currentRelease ? (
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <span className="font-semibold text-neutral-900">
                Workbench {currentRelease.version}
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-600">
                Latest {currentRelease.releaseType.toLowerCase()} release
              </span>
              {currentRelease.releaseDate && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span className="text-neutral-500">{currentRelease.releaseDate}</span>
                </>
              )}
            </div>
          ) : (
            <div className="pt-3 text-xs font-mono text-neutral-500">
              Workbench downloads are not available yet. Check back soon.
            </div>
          )}
        </div>
      </section>

      {/* 2. MAIN PLATFORM DOWNLOAD SECTIONS (WINDOWS, LINUX, macOS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {currentRelease ? (
          <div>
            <div className="mb-8">
              <div className="text-xs font-mono uppercase tracking-wider text-[#0e3052] font-semibold mb-1">
                CURRENT RELEASE
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 font-sans">
                Workbench {currentRelease.version}
              </h2>
              <p className="text-xs text-neutral-600 font-sans mt-0.5">
                Released {currentRelease.releaseDate} · Standalone desktop engine runtime
              </p>
            </div>

            {/* Render Windows, Linux, macOS cards */}
            <ReleaseView release={currentRelease} />
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed border-neutral-300 rounded-md bg-neutral-50 max-w-xl mx-auto space-y-2">
            <h3 className="text-base font-bold text-neutral-800 font-sans">No Public Releases Active</h3>
            <p className="text-xs text-neutral-500 font-sans">
              Workbench downloads are not available yet. Please check back soon or log in to the developer panel to publish a release.
            </p>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. ARCHIVE SECTION */}
        {/* ------------------------------------------------------------- */}
        <section className="pt-10 border-t border-neutral-200 space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0e3052] font-semibold mb-1 flex items-center gap-1.5">
              <Archive className="w-4 h-4" />
              <span>PREVIOUS RELEASES</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              Archive
            </h2>
            <p className="text-sm text-neutral-600 font-sans mt-1">
              Download previous versions of Workbench in chronological order. All historical platform binaries, release notes, and requirements are preserved.
            </p>
          </div>

          {archivedReleases.length > 0 ? (
            <div className="space-y-4">
              {archivedReleases.map((archiveRel) => {
                const isExpanded = !!expandedArchiveIds[archiveRel.id];

                return (
                  <div
                    key={archiveRel.id}
                    className="border border-neutral-200 rounded-md bg-white overflow-hidden shadow-xs hover:border-neutral-300 transition-colors"
                  >
                    {/* Collapsed Bar */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base font-bold text-neutral-900 font-sans">
                            Workbench {archiveRel.version}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200 uppercase">
                            {archiveRel.releaseType}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-neutral-500">
                          Released {archiveRel.releaseDate}
                        </div>
                      </div>

                      {/* Quick Download Link Strip */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {/* Windows quick link */}
                        {archiveRel.windows.available && archiveRel.windows.downloadUrl ? (
                          <a
                            href={archiveRel.windows.downloadUrl}
                            download={archiveRel.windows.filename || true}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded text-xs font-mono font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-300 transition-colors flex items-center gap-1.5"
                            title={`Download Windows (${archiveRel.windows.filesize || ''})`}
                          >
                            <Monitor className="w-3.5 h-3.5 text-sky-700" />
                            <span>Windows</span>
                          </a>
                        ) : null}

                        {/* Linux quick link */}
                        {archiveRel.linux.available && archiveRel.linux.downloadUrl ? (
                          <a
                            href={archiveRel.linux.downloadUrl}
                            download={archiveRel.linux.filename || true}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded text-xs font-mono font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-300 transition-colors flex items-center gap-1.5"
                            title={`Download Linux (${archiveRel.linux.filesize || ''})`}
                          >
                            <Terminal className="w-3.5 h-3.5 text-amber-700" />
                            <span>Linux</span>
                          </a>
                        ) : null}

                        {/* macOS quick link */}
                        {archiveRel.macos.available && archiveRel.macos.downloadUrl ? (
                          <a
                            href={archiveRel.macos.downloadUrl}
                            download={archiveRel.macos.filename || true}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded text-xs font-mono font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-300 transition-colors flex items-center gap-1.5"
                            title={`Download macOS (${archiveRel.macos.filesize || ''})`}
                          >
                            <Laptop className="w-3.5 h-3.5 text-neutral-800" />
                            <span>macOS</span>
                          </a>
                        ) : null}

                        {/* Expand / Collapse Details Button */}
                        <button
                          type="button"
                          onClick={() => toggleArchiveExpand(archiveRel.id)}
                          className="px-3 py-1.5 text-xs font-sans font-medium text-[#0e3052] hover:bg-neutral-100 rounded cursor-pointer transition-colors flex items-center gap-1 ml-auto sm:ml-2"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'Details'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Full Release View for Archived Version */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 border-t border-neutral-200 bg-neutral-50/50">
                        <ReleaseView release={archiveRel} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center border border-dashed border-neutral-300 rounded-md bg-neutral-50 text-xs font-mono text-neutral-500">
              No historical releases archived yet. Prior builds will automatically accumulate here as new versions are published.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

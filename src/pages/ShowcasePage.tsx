import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import {
  Grid,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const ShowcasePage: React.FC = () => {
  const { content } = useContent();
  const publishedProjects = content.showcase.filter((p) => p.published);
  const projectsToDisplay = publishedProjects.length > 0 ? publishedProjects : content.showcase;

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header Banner */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-16 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
              <Grid className="w-4 h-4" />
              <span>Community &amp; Developer Projects</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4 font-sans">
              Workbench Showcase
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed font-sans">
              Explore games, technical demos, and interactive experiences crafted with Workbench 2D and 3D pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Curated Registry In-Progress Banner */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded bg-white border border-neutral-300 text-[#0e3052] flex items-center justify-center mx-auto shadow-xs">
            <Clock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
              Showcase Registry is Being Curated
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed font-sans">
              As Workbench rolls out its early developer preview builds, this showcase gallery features verified games, open-source technical prototypes, and studio titles.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#submit"
              className="btn-blueprint px-6 py-3 text-xs font-semibold tracking-wide uppercase flex items-center gap-2 font-sans cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Submit Your Project For Review</span>
            </a>

            <Link
              to="/docs"
              className="btn-blueprint-secondary px-6 py-3 text-xs font-semibold flex items-center gap-2 font-sans"
            >
              <span>Build With Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dynamic Project Spotlight Grid */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider font-semibold">
              Project Registry
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 font-sans mt-1">
              Featured Titles &amp; Blueprints
            </h3>
            <p className="text-xs text-neutral-600 font-sans">
              Verified community and internal demonstration titles built with the Workbench runtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsToDisplay.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border border-neutral-200 rounded-lg p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-neutral-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="aspect-video rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-mono text-neutral-500">
                    <span>{proj.previewSlotText || '[Gameplay Preview Slot]'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#0e3052] font-semibold">
                    <span>{proj.previewType}</span>
                    <span className="text-neutral-500">{proj.scriptingLanguage}</span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 font-sans">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Dev: {proj.developer}</span>
                  {proj.externalUrl && (
                    <a
                      href={proj.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0e3052] hover:underline flex items-center gap-1"
                    >
                      <span>Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Submission Criteria */}
        <section id="submit" className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-2xl font-bold text-neutral-900 font-sans">
            Showcase Submission Criteria
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-700 font-sans">
            <div className="space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0e3052]" />
                <span>Engine Authenticity</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Project must be built using Workbench 2D/3D runtime with scripts authored in .wbscript, Python, or .wbvisual.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0e3052]" />
                <span>Visual Media</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Include 1080p gameplay capture, high-res screenshots, and an optional playable standalone desktop build.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0e3052]" />
                <span>Creator Credits</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Clear studio or solo developer attribution with links to your official social channels or distribution page.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

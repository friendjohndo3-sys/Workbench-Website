import React from 'react';
import { Link } from 'react-router-dom';
import { WorkbenchLogo } from './WorkbenchLogo';
import { ArrowUp, BookOpen, Download, Terminal, Layers, Code2, Newspaper, Grid, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand Lockup & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <WorkbenchLogo size="sm" className="w-8 h-8 rounded" />
              <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#0e3052] transition-colors font-sans">
                Workbench
              </span>
            </Link>
            <p className="text-sm font-semibold text-neutral-800 font-sans">
              Build. Create. Play.
            </p>
            <p className="text-neutral-600 font-sans text-xs max-w-sm leading-relaxed">
              A standalone 2D + 3D game engine for desktop and mobile development, powered by Python, .wbscript, and .wbvisual.
            </p>
            <div className="pt-1 text-neutral-500 font-sans text-xs">
              Made with care by PrismInk.
            </div>
          </div>

          {/* Col 3: Engine */}
          <div className="space-y-3">
            <div className="text-neutral-900 font-semibold uppercase tracking-wider text-[11px] font-sans">
              Engine Subsystems
            </div>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/features" className="hover:text-[#0e3052] transition-colors">
                  All 15 Subsystems
                </Link>
              </li>
              <li>
                <Link to="/features#2d" className="hover:text-[#0e3052] transition-colors">
                  2D &amp; 3D Graphics
                </Link>
              </li>
              <li>
                <Link to="/features#project-root" className="hover:text-[#0e3052] transition-colors">
                  Project vs Game Root
                </Link>
              </li>
              <li>
                <Link to="/features#reusable-scenes" className="hover:text-[#0e3052] transition-colors">
                  Reusable Scenes
                </Link>
              </li>
              <li>
                <Link to="/features#desktop" className="hover:text-[#0e3052] transition-colors">
                  Desktop &amp; Mobile Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Documentation */}
          <div className="space-y-3">
            <div className="text-neutral-900 font-semibold uppercase tracking-wider text-[11px] font-sans">
              Documentation
            </div>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/docs" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Docs Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/docs/wbscript" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                  <span>.wbscript Language</span>
                </Link>
              </li>
              <li>
                <Link to="/docs/wbvisual" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>.wbvisual Nodes</span>
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-[#0e3052] transition-colors">
                  Getting Started Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Releases & Showcase */}
          <div className="space-y-3">
            <div className="text-neutral-900 font-semibold uppercase tracking-wider text-[11px] font-sans">
              Releases &amp; Media
            </div>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/download" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5 font-semibold text-[#0e3052]">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Workbench</span>
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Showcase Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Updates &amp; Devlogs</span>
                </Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-[#0e3052] transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Legal &amp; Stability</span>
                </Link>
              </li>
              <li className="text-neutral-400 pt-2 font-mono text-[11px]">
                Build: v1.0.0-prototype
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-neutral-500 font-sans flex items-center gap-4">
            <span>&copy; 2026 PrismInk. All rights reserved.</span>
            <span className="text-neutral-300">|</span>
            <Link to="/legal" className="hover:text-neutral-800 transition-colors">
              Privacy &amp; Terms
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer font-sans"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { WorkbenchLogo } from './WorkbenchLogo';
import { Menu, X, Download, BookOpen, Layers, Sparkles, Newspaper, Grid } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'Docs', path: '/docs' },
    { name: 'Download', path: '/download' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Updates', path: '/updates' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 blueprint-header transition-shadow duration-200 ${
        scrolled ? 'shadow-xl shadow-black/40' : ''
      }`}
    >
      {/* Background Engineering Blueprint Drafting Detail Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Corner drafting crosshairs */}
        <div className="absolute top-2 left-4 text-[#38bdf8]/25 font-mono text-[10px]">
          +
        </div>
        <div className="absolute top-2 right-4 text-[#38bdf8]/25 font-mono text-[10px]">
          +
        </div>

        {/* Faint technical coordinate annotations */}
        <div className="hidden lg:flex items-center justify-between px-10 pt-1 text-[8px] font-mono text-sky-200/20 uppercase tracking-widest">
          <span>[DWG 01 // WORKBENCH_ENGINE]</span>
          <span>SCALE 1:1 · GRID 16MM</span>
          <span>REV 1.0.0</span>
        </div>

        {/* Blueprint millimeter ruler tick marks along the bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] flex justify-between opacity-30">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className={`w-[1px] bg-sky-300 ${i % 5 === 0 ? 'h-[3px]' : 'h-[1.5px]'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Workbench Brand Lockup */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
          aria-label="Workbench Homepage"
        >
          {/* Provided 3000x3000 Workbench logo asset */}
          <WorkbenchLogo size="sm" className="w-9 h-9 border-sky-400/30 transition-transform group-hover:scale-105 duration-200" />
          
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors font-sans">
              Workbench
            </span>
          </div>
        </Link>

        {/* Zone 2 & 3: Navigation Links + Primary Action Button */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-6 text-sm font-medium text-white font-sans">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? 'text-sky-300 font-semibold'
                      : 'text-neutral-100 hover:text-sky-200'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Thin Blueprint Vertical Construction Line Divider */}
          <div className="h-6 w-[1px] bg-[#1a4470]" />

          {/* Primary Action Button: Structured rounded blueprint button */}
          <Link
            to="/download"
            className="btn-blueprint px-4 py-2 text-xs font-semibold tracking-wide uppercase flex items-center gap-2 cursor-pointer shadow-md font-sans"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/download"
            className="btn-blueprint px-3 py-1.5 text-xs font-semibold uppercase flex items-center gap-1.5 font-sans"
          >
            <Download className="w-3 h-3" />
            <span>Get</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-sky-200 bg-[#0e3052] border border-[#2563eb]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer"
            aria-label="Toggle Blueprint Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Blueprint Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#081d33] border-b border-[#1e4b7a] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-mono text-sky-300/60 uppercase tracking-widest border-b border-[#1a4470] pb-1.5">
            Blueprint Navigation
          </div>

          <div className="flex flex-col space-y-1.5 text-sm font-medium font-sans">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-left py-2 px-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#0e3052] text-sky-300 font-semibold'
                      : 'text-white hover:bg-[#0e3052]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

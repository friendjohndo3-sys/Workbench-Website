import React from 'react';
import { NavLink } from 'react-router-dom';
import { WorkbenchLogo } from '../WorkbenchLogo';
import {
  LayoutDashboard,
  Globe,
  Newspaper,
  BookOpen,
  Grid,
  Download,
  FolderArchive,
  Settings,
  X,
} from 'lucide-react';

interface DevSidebarProps {
  onCloseMobile?: () => void;
}

export const DevSidebar: React.FC<DevSidebarProps> = ({ onCloseMobile }) => {
  const navSections = [
    {
      items: [
        { name: 'Dashboard', path: '/dev/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { name: 'Website', path: '/dev/website', icon: Globe },
        { name: 'Updates', path: '/dev/updates', icon: Newspaper },
        { name: 'Documentation', path: '/dev/docs', icon: BookOpen },
        { name: 'Showcase', path: '/dev/showcase', icon: Grid },
      ],
    },
    {
      title: 'RELEASES',
      items: [
        { name: 'Downloads', path: '/dev/downloads', icon: Download },
      ],
    },
    {
      title: 'ASSETS',
      items: [
        { name: 'Assets', path: '/dev/assets', icon: FolderArchive },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/dev/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col h-full shrink-0 select-none">
      {/* Brand Lockup Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WorkbenchLogo size="sm" className="w-8 h-8 rounded border-neutral-300" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#0e3052] font-bold">
              WORKBENCH
            </div>
            <div className="text-xs text-neutral-500 font-sans font-medium">
              Developer Panel
            </div>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-neutral-400 hover:text-neutral-700 rounded cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && (
              <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded transition-colors ${
                        isActive
                          ? 'bg-[#0e3052] text-white font-semibold shadow-xs'
                          : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Engine Specs Footer */}
      <div className="p-3.5 border-t border-neutral-200 bg-neutral-50/70 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
        <div>
          <span className="text-neutral-400">ENGINE:</span> <span className="text-neutral-800 font-semibold">v0.1.0</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span className="text-emerald-700 font-medium">LIVE</span>
        </div>
      </div>
    </aside>
  );
};

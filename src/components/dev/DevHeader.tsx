import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { DevStatusBadge } from './DevStatusBadge';
import { ExternalLink, LogOut, Menu, User } from 'lucide-react';

interface DevHeaderProps {
  onToggleMobileNav: () => void;
}

export const DevHeader: React.FC<DevHeaderProps> = ({ onToggleMobileNav }) => {
  const { user, logout } = useAuth();
  const { content } = useContent();

  const siteStatus = content.settings.maintenanceMode ? 'MAINTENANCE' : content.settings.publicSiteStatus;

  return (
    <header className="h-14 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden p-1.5 text-neutral-600 hover:text-neutral-900 rounded border border-neutral-300 cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-neutral-900 font-sans tracking-tight">
            Developer Panel
          </span>
          <span className="text-neutral-300 hidden sm:inline" aria-hidden="true">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-500">Site Status:</span>
            <DevStatusBadge status={siteStatus} size="sm" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-[#0e3052] hover:bg-neutral-100 rounded border border-neutral-300 transition-colors cursor-pointer"
          title="Open Public Website in new tab"
        >
          <span className="font-sans">View Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* User Account & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-semibold text-neutral-900 font-sans leading-none">
              {user?.name || 'Developer'}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 leading-none mt-0.5">
              {user?.email || 'admin'}
            </span>
          </div>

          <button
            onClick={logout}
            className="p-1.5 text-neutral-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
            title="Sign out of Developer Panel"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

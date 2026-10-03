import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevStatusBadge } from '../../components/dev/DevStatusBadge';
import {
  Globe,
  Tag,
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  FileEdit,
  PlusCircle,
  BookOpen,
  Download,
  Grid,
  FolderArchive,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const DevDashboardPage: React.FC = () => {
  const { content } = useContent();

  const publishedUpdates = content.updates.filter((u) => u.published);
  const latestUpdate = publishedUpdates[0] || content.updates[0];

  const allReleases = content.releases || [];
  const publishedReleases = allReleases.filter((r) => r.status === 'published');
  const currentRel = publishedReleases.find((r) => r.isCurrent) || publishedReleases[0] || allReleases[0];

  const upcomingReleases = allReleases.filter((r) => r.status === 'draft');
  const nextTargetRelease = upcomingReleases[0]
    ? {
        version: upcomingReleases[0].version,
        platform: 'Windows, Linux & macOS',
        releaseDate: upcomingReleases[0].releaseDate,
      }
    : {
        version: content.settings.upcomingEngineVersion || '1.1.0',
        platform: 'All Platforms',
        releaseDate: 'Configured Roadmap',
      };

  const quickActions = [
    { label: 'Edit Homepage', path: '/dev/website', icon: FileEdit, description: 'Hero copy, buttons & banners' },
    { label: 'Create Update', path: '/dev/updates', icon: PlusCircle, description: 'Post new devlog or milestone' },
    { label: 'Edit Documentation', path: '/dev/docs', icon: BookOpen, description: 'Add or modify engine docs' },
    { label: 'Manage Downloads', path: '/dev/downloads', icon: Download, description: 'Release builds & platform SDKs' },
    { label: 'Add Showcase Project', path: '/dev/showcase', icon: Grid, description: 'Feature verified game projects' },
    { label: 'Manage Assets', path: '/dev/assets', icon: FolderArchive, description: 'Logos, screenshots & textures' },
  ];

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="OVERVIEW"
        title="Workbench Dashboard"
        description="Central system administration, runtime releases, and live website synchronization."
        actions={
          <Link
            to="/dev/website"
            className="btn-blueprint px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5"
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Manage Content</span>
          </Link>
        }
      />

      {/* Top 4 Configuration Metrics (Real configuration status, NO fake traffic numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Website Status */}
        <div className="bg-white border border-neutral-200 rounded-md p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>WEBSITE STATUS</span>
            <Globe className="w-4 h-4 text-[#0e3052]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-neutral-900">
              {content.settings.maintenanceMode ? 'MAINTENANCE' : content.settings.publicSiteStatus}
            </span>
          </div>
          <div className="text-[11px] text-neutral-500 font-sans flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                content.settings.maintenanceMode ? 'bg-amber-600' : 'bg-emerald-600'
              }`}
            />
            <span>{content.settings.maintenanceMode ? 'Maintenance Mode Enabled' : 'Public HTTP serving active'}</span>
          </div>
        </div>

        {/* Metric 2: Current Engine Version */}
        <div className="bg-white border border-neutral-200 rounded-md p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>CURRENT VERSION</span>
            <Tag className="w-4 h-4 text-[#0e3052]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-neutral-900">
              v{content.settings.currentEngineVersion}
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              ({content.settings.releaseStage})
            </span>
          </div>
          <div className="text-[11px] text-neutral-500 font-sans">
            Native 2D + 3D Visual Studio build target
          </div>
        </div>

        {/* Metric 3: Latest Published Update */}
        <div className="bg-white border border-neutral-200 rounded-md p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>LATEST UPDATE</span>
            <Newspaper className="w-4 h-4 text-[#0e3052]" />
          </div>
          <div className="truncate font-semibold text-neutral-900 font-sans text-sm">
            {latestUpdate ? latestUpdate.title : 'No updates published'}
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            {latestUpdate ? `${latestUpdate.version} · ${latestUpdate.date}` : 'Draft mode'}
          </div>
        </div>

        {/* Metric 4: Upcoming Release */}
        <div className="bg-white border border-neutral-200 rounded-md p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>UPCOMING RELEASE</span>
            <Calendar className="w-4 h-4 text-[#0e3052]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-neutral-900">
              v{content.settings.upcomingEngineVersion}
            </span>
          </div>
          <div className="text-[11px] text-neutral-500 font-sans truncate">
            Target: {nextTargetRelease.platform} ({nextTargetRelease.releaseDate})
          </div>
        </div>
      </div>

      {/* Main Grid: Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Quick Actions */}
        <div className="lg:col-span-7 space-y-6">
          <DevCard
            title="Quick Management Actions"
            description="Direct shortcuts to common content modification workflows"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={i}
                    to={action.path}
                    className="p-3.5 border border-neutral-200 rounded bg-neutral-50/50 hover:bg-white hover:border-[#0e3052] transition-colors group flex items-start gap-3 text-left"
                  >
                    <div className="p-2 rounded bg-white border border-neutral-200 text-[#0e3052] group-hover:bg-[#0e3052] group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-neutral-900 font-sans group-hover:text-[#0e3052] transition-colors flex items-center justify-between">
                        <span>{action.label}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-neutral-500 font-sans mt-0.5 truncate">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </DevCard>

          {/* Engine Systems Manifest Overview */}
          <DevCard
            title="Content Manifest Status"
            description="Synchronized database records powering public website views"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-lg font-bold font-mono text-neutral-900">
                  {allReleases.length}
                </div>
                <div className="text-[10px] font-mono uppercase text-neutral-500 mt-0.5">
                  Releases
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-lg font-bold font-mono text-neutral-900">
                  {content.updates.length}
                </div>
                <div className="text-[10px] font-mono uppercase text-neutral-500 mt-0.5">
                  Devlogs
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-lg font-bold font-mono text-neutral-900">
                  {content.docs.length}
                </div>
                <div className="text-[10px] font-mono uppercase text-neutral-500 mt-0.5">
                  Docs Topics
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-lg font-bold font-mono text-neutral-900">
                  {content.showcase.length}
                </div>
                <div className="text-[10px] font-mono uppercase text-neutral-500 mt-0.5">
                  Showcase Items
                </div>
              </div>
            </div>
          </DevCard>
        </div>

        {/* Right Column: Recent Activity Log */}
        <div className="lg:col-span-5 space-y-6">
          <DevCard
            title="Recent Developer Activity"
            description="Audit trail of recent configuration & content saves"
          >
            {content.activityLog && content.activityLog.length > 0 ? (
              <div className="space-y-3">
                {content.activityLog.slice(0, 7).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded border border-neutral-200 bg-neutral-50/70 text-xs font-sans space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span className="font-semibold text-neutral-800">{log.action}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <p className="text-neutral-600 text-[11px] leading-relaxed">
                      {log.details}
                    </p>
                    <div className="text-[10px] font-mono text-neutral-400">
                      User: {log.user}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-neutral-400 font-mono">
                No activity recorded yet.
              </div>
            )}
          </DevCard>

          {/* System Telemetry Note */}
          <div className="p-4 border border-neutral-200 rounded-md bg-white text-xs text-neutral-600 font-sans space-y-2 shadow-xs">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#0e3052]" />
              <span>Production Telemetry Status</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-500 font-mono">
              Live web visitor analytics and download telemetry endpoints are unconfigured in this prototype build. All metrics reflect internal database state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

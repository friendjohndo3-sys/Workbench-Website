import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevInput, DevTextarea, DevToggle, DevSelect } from '../../components/dev/DevInput';
import {
  Save,
  Check,
  AlertTriangle,
  RotateCcw,
  Shield,
  Download,
  Upload,
  LogOut,
  User,
  Radio,
} from 'lucide-react';

export const DevSettingsPage: React.FC = () => {
  const { content, updateSettings, resetToDefaults, exportContentJson, importContentJson } = useContent();
  const { user, logout, authProviderName } = useAuth();

  const [settingsDraft, setSettingsDraft] = useState({ ...content.settings });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  const handleSave = () => {
    updateSettings(settingsDraft);
    setFeedback('System and engine settings saved successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website content back to factory initial state? All custom draft changes will be cleared.')) {
      resetToDefaults();
      setSettingsDraft({ ...content.settings });
      setFeedback('All website content restored to defaults.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleExport = () => {
    const data = exportContentJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workbench-content-backup-${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importContentJson(importJsonText);
    if (ok) {
      setFeedback('Content manifest imported successfully.');
      setShowImportArea(false);
      setImportJsonText('');
      setTimeout(() => setFeedback(null), 3000);
    } else {
      alert('Invalid JSON format. Please ensure valid Workbench content schema.');
    }
  };

  const statusOptions = [
    { value: 'ONLINE', label: 'ONLINE (Serving Traffic Normally)' },
    { value: 'MAINTENANCE', label: 'MAINTENANCE (Show Maintenance Notice)' },
    { value: 'DEGRADED', label: 'DEGRADED (Performance Advisory)' },
  ];

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="SYSTEM"
        title="Settings &amp; Environment"
        description="Global engine versions, public maintenance mode control, developer accounts, and database backup."
        actions={
          <button
            onClick={handleSave}
            className="btn-blueprint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        }
      />

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Site Metadata */}
        <DevCard
          title="Site Metadata"
          description="Global site name, slogan, and meta description"
        >
          <div className="space-y-4">
            <DevInput
              label="Site Name"
              value={settingsDraft.siteName}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, siteName: e.target.value })}
            />

            <DevInput
              label="Tagline"
              value={settingsDraft.tagline}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, tagline: e.target.value })}
            />

            <DevTextarea
              label="Site Description (SEO & OpenGraph)"
              rows={2}
              value={settingsDraft.siteDescription}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, siteDescription: e.target.value })}
            />
          </div>
        </DevCard>

        {/* Section 2: Workbench Engine Versions */}
        <DevCard
          title="Workbench Engine Versioning"
          description="Engine release milestones referenced across download badges"
        >
          <div className="space-y-4">
            <DevInput
              label="Current Production Version"
              value={settingsDraft.currentEngineVersion}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, currentEngineVersion: e.target.value })}
              hint="e.g. 0.1.0"
            />

            <DevInput
              label="Upcoming Version Milestone"
              value={settingsDraft.upcomingEngineVersion}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, upcomingEngineVersion: e.target.value })}
              hint="e.g. 0.2.0"
            />

            <DevInput
              label="Release Stage Description"
              value={settingsDraft.releaseStage}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, releaseStage: e.target.value })}
              hint="e.g. Prototype Developer Preview"
            />
          </div>
        </DevCard>

        {/* Section 3: Website Maintenance & Public Availability */}
        <DevCard
          title="Website Traffic &amp; Maintenance"
          description="Control public access and temporary maintenance banners"
        >
          <div className="space-y-4">
            <DevSelect
              label="Public Site Serving Status"
              value={settingsDraft.publicSiteStatus}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, publicSiteStatus: e.target.value as any })}
              options={statusOptions}
            />

            <div className="pt-2 border-t border-neutral-200">
              <DevToggle
                label="Maintenance Mode"
                description="When enabled, all public web routes display the Workbench Maintenance Screen while developer panel remains accessible."
                checked={settingsDraft.maintenanceMode}
                onChange={(checked) => setSettingsDraft({ ...settingsDraft, maintenanceMode: checked })}
              />
            </div>

            {settingsDraft.maintenanceMode && (
              <div className="p-3 rounded bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Active Notice:</strong> Public website visitors will see the maintenance screen until this setting is disabled.
                </span>
              </div>
            )}
          </div>
        </DevCard>

        {/* Section 4: Developer Session & Security */}
        <DevCard
          title="Developer Account &amp; Auth Configuration"
          description="Current developer session and production hook information"
        >
          <div className="space-y-4 text-xs font-sans">
            <div className="p-3 rounded bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-mono">Authenticated User:</span>
                <span className="font-bold text-neutral-900 font-mono">{user?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-mono">Role:</span>
                <span className="text-neutral-800 font-mono uppercase">{user?.role || 'Developer'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-mono">Provider:</span>
                <span className="text-neutral-700 font-mono">{authProviderName}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-neutral-500 text-xs">Terminate current developer session</span>
              <button
                onClick={logout}
                className="btn-blueprint-secondary px-3 py-1.5 text-xs text-rose-700 hover:text-rose-900 border-rose-300 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </DevCard>
      </div>

      {/* Section 5: Manifest Backup, Export & Reset */}
      <DevCard
        title="Content Persistence &amp; Database Backup"
        description="Export full website content as JSON or restore factory settings"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="btn-blueprint-secondary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Content Manifest (JSON)</span>
            </button>

            <button
              onClick={() => setShowImportArea(!showImportArea)}
              className="btn-blueprint-secondary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Manifest</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 border border-rose-300 rounded transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Content to Default</span>
            </button>
          </div>

          {showImportArea && (
            <div className="p-4 border border-neutral-300 rounded bg-neutral-50 space-y-3">
              <DevTextarea
                label="Paste JSON Content Payload"
                rows={5}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{ "homepage": { ... }, "downloads": [ ... ] }'
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowImportArea(false)}
                  className="btn-blueprint-secondary px-3 py-1.5 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="btn-blueprint px-4 py-1.5 text-xs font-semibold"
                >
                  Apply Imported Content
                </button>
              </div>
            </div>
          )}
        </div>
      </DevCard>
    </div>
  );
};

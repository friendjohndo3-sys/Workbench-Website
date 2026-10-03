import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { WorkbenchRelease, PlatformDownloadConfig, ReleaseStatus, ReleaseType } from '../../types/content';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevStatusBadge } from '../../components/dev/DevStatusBadge';
import { DevModal } from '../../components/dev/DevModal';
import { DevInput, DevTextarea, DevSelect, DevToggle } from '../../components/dev/DevInput';
import { ReleaseView } from '../../components/ReleaseView';
import {
  Download,
  Plus,
  Edit,
  Trash2,
  Check,
  Eye,
  Archive,
  Star,
  Monitor,
  Terminal,
  Laptop,
  AlertCircle,
  FileText,
  Activity,
  PlusCircle,
  X,
  Layers,
  Cpu,
} from 'lucide-react';

export const DevDownloadsPage: React.FC = () => {
  const {
    content,
    saveWorkbenchRelease,
    deleteWorkbenchRelease,
    setAsCurrentRelease,
    toggleReleasePublish,
    toggleReleaseArchive,
  } = useContent();

  const allReleases: WorkbenchRelease[] = content.releases || [];
  const currentRelease = allReleases.find((r) => r.isCurrent) || allReleases[0];

  const [activeTab, setActiveTab] = useState<'releases' | 'analytics'>('releases');
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editingRelease, setEditingRelease] = useState<WorkbenchRelease | null>(null);
  const [previewTargetRelease, setPreviewTargetRelease] = useState<WorkbenchRelease | null>(null);
  const [formActivePlatformTab, setFormActivePlatformTab] = useState<'meta' | 'windows' | 'linux' | 'macos' | 'notes'>('meta');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Initial template for creating/editing releases
  const createDefaultRelease = (): WorkbenchRelease => ({
    id: 'rel-' + Date.now(),
    version: '1.1.0',
    releaseDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    status: 'draft',
    releaseType: 'Stable',
    isCurrent: false,
    releaseNotes: {
      whatsNew: ['New features and capabilities.'],
      improvements: ['Engine performance enhancements.'],
      bugFixes: [],
      knownIssues: [],
      breakingChanges: [],
      developerNotes: '',
    },
    windows: {
      available: true,
      downloadUrl: '',
      filename: 'workbench-setup.exe',
      filesize: '145 MB',
      architecture: 'Windows 10 / 11 · 64-bit',
      minRequirements: {
        os: 'Windows 10 (64-bit)',
        cpu: 'Intel Core i3 / AMD Ryzen 3',
        ram: '8 GB RAM',
        gpu: 'DirectX 12 / Vulkan 1.1 GPU',
        storage: '10 GB space',
      },
      recRequirements: {
        os: 'Windows 11 (64-bit)',
        cpu: 'Intel Core i7 / AMD Ryzen 7',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3060 / AMD RX 6600',
        storage: '25 GB NVMe SSD',
      },
      installationSteps: [
        'Download the Windows installer executable.',
        'Run the installer setup wizard and follow prompts.',
        'Launch Workbench from the desktop shortcut.',
      ],
      notes: 'Signed standalone Windows installer.',
    },
    linux: {
      available: true,
      downloadUrl: '',
      filename: 'Workbench.AppImage',
      filesize: '138 MB',
      architecture: 'Linux · 64-bit',
      minRequirements: {
        os: 'Ubuntu 22.04 LTS or equivalent glibc 2.35+ distro',
        cpu: '64-bit processor',
        ram: '8 GB RAM',
        gpu: 'Vulkan 1.2 capable GPU',
        storage: '10 GB space',
      },
      recRequirements: {
        os: 'Ubuntu 24.04 LTS / Fedora 40+',
        cpu: 'Intel Core i7 / AMD Ryzen 7',
        ram: '16 GB RAM',
        gpu: 'Vulkan 1.3 dedicated GPU',
        storage: '25 GB NVMe SSD',
      },
      installationSteps: [
        'Download the Workbench AppImage.',
        'Make executable: chmod +x Workbench.AppImage',
        'Run ./Workbench.AppImage directly.',
      ],
      notes: 'Dependency-free AppImage bundled with Python 3.12.',
    },
    macos: {
      available: true,
      downloadUrl: '',
      filename: 'Workbench-arm64.dmg',
      filesize: '155 MB',
      architecture: 'Apple Silicon',
      hasSecondaryArch: true,
      secondaryDownloadUrl: '',
      secondaryFilename: 'Workbench-x64.dmg',
      secondaryFilesize: '160 MB',
      secondaryArchitecture: 'Intel',
      minRequirements: {
        os: 'macOS 13.0 Ventura or later',
        cpu: 'Apple Silicon (M1+) or Intel Core i5',
        ram: '8 GB unified memory / RAM',
        gpu: 'Metal 2.0 support',
        storage: '10 GB space',
      },
      recRequirements: {
        os: 'macOS 14+ Sonoma',
        cpu: 'Apple Silicon M2/M3 Pro or Intel Core i7',
        ram: '16 GB unified memory',
        gpu: 'Metal 3 with hardware raytracing',
        storage: '25 GB SSD',
      },
      installationSteps: [
        'Download the DMG matching your Mac chip (Apple Silicon or Intel).',
        'Open the DMG and drag Workbench to Applications.',
        'Launch Workbench from Applications.',
      ],
      notes: 'Notarized macOS universal bundle.',
    },
  });

  const [formData, setFormData] = useState<WorkbenchRelease>(createDefaultRelease());

  // Dynamic bullet list state helpers for release notes
  const [whatsNewList, setWhatsNewList] = useState<string[]>(['']);
  const [improvementsList, setImprovementsList] = useState<string[]>(['']);
  const [bugFixesList, setBugFixesList] = useState<string[]>(['']);
  const [knownIssuesList, setKnownIssuesList] = useState<string[]>(['']);

  // Installation steps states for each platform
  const [winSteps, setWinSteps] = useState<string[]>(['']);
  const [linuxSteps, setLinuxSteps] = useState<string[]>(['']);
  const [macSteps, setMacSteps] = useState<string[]>(['']);

  const handleOpenCreate = () => {
    const fresh = createDefaultRelease();
    setEditingRelease(null);
    setFormData(fresh);
    setFormActivePlatformTab('meta');
    setWhatsNewList(fresh.releaseNotes.whatsNew || ['']);
    setImprovementsList(fresh.releaseNotes.improvements || ['']);
    setBugFixesList(fresh.releaseNotes.bugFixes || ['']);
    setKnownIssuesList(fresh.releaseNotes.knownIssues || ['']);
    setWinSteps(fresh.windows.installationSteps || ['']);
    setLinuxSteps(fresh.linux.installationSteps || ['']);
    setMacSteps(fresh.macos.installationSteps || ['']);
    setModalOpen(true);
  };

  const handleOpenEdit = (release: WorkbenchRelease) => {
    setEditingRelease(release);
    setFormData(JSON.parse(JSON.stringify(release)));
    setFormActivePlatformTab('meta');
    setWhatsNewList(release.releaseNotes?.whatsNew?.length ? [...release.releaseNotes.whatsNew] : ['']);
    setImprovementsList(release.releaseNotes?.improvements?.length ? [...release.releaseNotes.improvements] : ['']);
    setBugFixesList(release.releaseNotes?.bugFixes?.length ? [...release.releaseNotes.bugFixes] : ['']);
    setKnownIssuesList(release.releaseNotes?.knownIssues?.length ? [...release.releaseNotes.knownIssues] : ['']);
    setWinSteps(release.windows.installationSteps?.length ? [...release.windows.installationSteps] : ['']);
    setLinuxSteps(release.linux.installationSteps?.length ? [...release.linux.installationSteps] : ['']);
    setMacSteps(release.macos.installationSteps?.length ? [...release.macos.installationSteps] : ['']);
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.version.trim()) {
      alert('Please enter a version string (e.g. 1.0.0).');
      return;
    }

    const cleanedRelease: WorkbenchRelease = {
      ...formData,
      version: formData.version.trim(),
      releaseNotes: {
        ...formData.releaseNotes,
        whatsNew: whatsNewList.filter((s) => s.trim().length > 0),
        improvements: improvementsList.filter((s) => s.trim().length > 0),
        bugFixes: bugFixesList.filter((s) => s.trim().length > 0),
        knownIssues: knownIssuesList.filter((s) => s.trim().length > 0),
      },
      windows: {
        ...formData.windows,
        installationSteps: winSteps.filter((s) => s.trim().length > 0),
      },
      linux: {
        ...formData.linux,
        installationSteps: linuxSteps.filter((s) => s.trim().length > 0),
      },
      macos: {
        ...formData.macos,
        installationSteps: macSteps.filter((s) => s.trim().length > 0),
      },
    };

    saveWorkbenchRelease(cleanedRelease);
    setModalOpen(false);
    setFeedback(`Release Workbench ${cleanedRelease.version} saved successfully.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: string, version: string, isPublished: boolean) => {
    const warning = isPublished
      ? `WARNING: Workbench ${version} is a PUBLISHED release. Are you sure you want to delete this historical release?`
      : `Are you sure you want to delete draft release Workbench ${version}?`;

    if (window.confirm(warning)) {
      deleteWorkbenchRelease(id);
      setFeedback(`Release Workbench ${version} deleted.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handlePreviewRelease = (release: WorkbenchRelease) => {
    setPreviewTargetRelease(release);
    setPreviewModalOpen(true);
  };

  const handlePreviewCurrentForm = () => {
    const previewData: WorkbenchRelease = {
      ...formData,
      releaseNotes: {
        ...formData.releaseNotes,
        whatsNew: whatsNewList.filter((s) => s.trim().length > 0),
        improvements: improvementsList.filter((s) => s.trim().length > 0),
        bugFixes: bugFixesList.filter((s) => s.trim().length > 0),
        knownIssues: knownIssuesList.filter((s) => s.trim().length > 0),
      },
      windows: {
        ...formData.windows,
        installationSteps: winSteps.filter((s) => s.trim().length > 0),
      },
      linux: {
        ...formData.linux,
        installationSteps: linuxSteps.filter((s) => s.trim().length > 0),
      },
      macos: {
        ...formData.macos,
        installationSteps: macSteps.filter((s) => s.trim().length > 0),
      },
    };
    setPreviewTargetRelease(previewData);
    setPreviewModalOpen(true);
  };

  const releaseTypeOptions = [
    { value: 'Stable', label: 'Stable Release' },
    { value: 'Beta', label: 'Beta Preview' },
    { value: 'Alpha', label: 'Alpha Test Build' },
    { value: 'Preview', label: 'Developer Preview' },
    { value: 'Nightly', label: 'Nightly Snapshot' },
  ];

  const releaseStatusOptions = [
    { value: 'draft', label: 'Draft (Private to Developer Panel)' },
    { value: 'published', label: 'Published (Publicly Visible)' },
    { value: 'archived', label: 'Archived (Moved to Historical Archive)' },
  ];

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="RELEASES"
        title="Workbench Download Management"
        description="Configure desktop engine releases for Windows, Linux, and macOS. Manage current production targets and historical archive versions."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('releases')}
              className={`px-3 py-2 text-xs font-semibold rounded cursor-pointer transition-colors ${
                activeTab === 'releases' ? 'bg-[#0e3052] text-white' : 'bg-white border border-neutral-300 text-neutral-700'
              }`}
            >
              Releases &amp; Archive
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 text-xs font-semibold rounded cursor-pointer transition-colors ${
                activeTab === 'analytics' ? 'bg-[#0e3052] text-white' : 'bg-white border border-neutral-300 text-neutral-700'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={handleOpenCreate}
              className="btn-blueprint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs ml-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Release</span>
            </button>
          </div>
        }
      />

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* TAB 1: RELEASES & ARCHIVE */}
      {activeTab === 'releases' && (
        <div className="space-y-8">
          {/* Current Active Release Spotlight Card */}
          {currentRelease && (
            <DevCard
              title={`Current Primary Release: Workbench ${currentRelease.version}`}
              description="This release is prominently featured on the public /download page"
              action={
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePreviewRelease(currentRelease)}
                    className="btn-blueprint-secondary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Public View</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(currentRelease)}
                    className="btn-blueprint px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Current Release</span>
                  </button>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-neutral-500 uppercase text-[10px]">VERSION &amp; TYPE</div>
                  <div className="text-sm font-bold text-neutral-900">
                    Workbench {currentRelease.version}
                  </div>
                  <div className="text-neutral-500">{currentRelease.releaseType} · Released {currentRelease.releaseDate}</div>
                </div>

                <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-neutral-500 uppercase text-[10px]">WINDOWS TARGET</div>
                  <div className="font-semibold text-neutral-900 truncate">
                    {currentRelease.windows.available ? currentRelease.windows.filename : 'Unavailable'}
                  </div>
                  <div className="text-neutral-500">{currentRelease.windows.architecture}</div>
                </div>

                <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-neutral-500 uppercase text-[10px]">LINUX TARGET</div>
                  <div className="font-semibold text-neutral-900 truncate">
                    {currentRelease.linux.available ? currentRelease.linux.filename : 'Unavailable'}
                  </div>
                  <div className="text-neutral-500">{currentRelease.linux.architecture}</div>
                </div>

                <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-neutral-500 uppercase text-[10px]">macOS TARGET</div>
                  <div className="font-semibold text-neutral-900 truncate">
                    {currentRelease.macos.available ? currentRelease.macos.filename : 'Unavailable'}
                  </div>
                  <div className="text-neutral-500">
                    {currentRelease.macos.hasSecondaryArch ? 'Dual Architecture' : currentRelease.macos.architecture}
                  </div>
                </div>
              </div>
            </DevCard>
          )}

          {/* Release Archive Table */}
          <DevCard
            title={`Release Archive & Version History (${allReleases.length})`}
            description="Manage all past and present versions. Previous releases automatically move into the public Archive section."
            noPadding
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-mono uppercase text-neutral-500">
                    <th className="py-3 px-4">Version</th>
                    <th className="py-3 px-4">Release Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Platforms Configured</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {allReleases.map((rel) => (
                    <tr
                      key={rel.id}
                      className={`hover:bg-neutral-50/60 transition-colors ${
                        rel.isCurrent ? 'bg-sky-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                        <div className="flex items-center gap-1.5">
                          {rel.isCurrent && (
                            <span title="Current Primary Release">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            </span>
                          )}
                          <span>Workbench {rel.version}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-neutral-600 whitespace-nowrap">
                        {rel.releaseDate}
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700">
                          {rel.releaseType}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`p-1 rounded ${
                              rel.windows.available
                                ? 'text-sky-700 bg-sky-50'
                                : 'text-neutral-300 bg-neutral-100'
                            }`}
                            title={rel.windows.available ? 'Windows Available' : 'Windows Unavailable'}
                          >
                            <Monitor className="w-3.5 h-3.5" />
                          </span>

                          <span
                            className={`p-1 rounded ${
                              rel.linux.available
                                ? 'text-amber-700 bg-amber-50'
                                : 'text-neutral-300 bg-neutral-100'
                            }`}
                            title={rel.linux.available ? 'Linux Available' : 'Linux Unavailable'}
                          >
                            <Terminal className="w-3.5 h-3.5" />
                          </span>

                          <span
                            className={`p-1 rounded ${
                              rel.macos.available
                                ? 'text-neutral-800 bg-neutral-100'
                                : 'text-neutral-300 bg-neutral-100'
                            }`}
                            title={rel.macos.available ? 'macOS Available' : 'macOS Unavailable'}
                          >
                            <Laptop className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px]">
                        {rel.isCurrent ? (
                          <span className="text-[#0e3052] font-bold">CURRENT</span>
                        ) : (
                          <span className="text-neutral-400">Archive</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <DevStatusBadge status={rel.status} size="sm" />
                      </td>

                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap font-mono text-[11px]">
                        <button
                          onClick={() => handlePreviewRelease(rel)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100 cursor-pointer"
                          title="Preview public release view"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {!rel.isCurrent && rel.status === 'published' && (
                          <button
                            onClick={() => setAsCurrentRelease(rel.id)}
                            className="p-1.5 text-neutral-500 hover:text-[#0e3052] rounded hover:bg-neutral-100 cursor-pointer"
                            title="Set as Current Release"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenEdit(rel)}
                          className="p-1.5 text-neutral-500 hover:text-[#0e3052] rounded hover:bg-neutral-100 cursor-pointer"
                          title="Edit full release"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(rel.id, rel.version, rel.status === 'published')}
                          className="p-1.5 text-neutral-500 hover:text-rose-600 rounded hover:bg-neutral-100 cursor-pointer"
                          title="Delete release"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DevCard>
        </div>
      )}

      {/* TAB 2: ANALYTICS (Future-ready, clearly marked unavailable) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <DevCard
            title="Download Telemetry &amp; Statistics"
            description="Production tracking infrastructure status"
          >
            <div className="p-8 text-center border border-dashed border-neutral-300 rounded-md bg-neutral-50/70 space-y-3">
              <div className="w-10 h-10 rounded bg-neutral-200 text-neutral-600 flex items-center justify-center mx-auto">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-neutral-800 font-sans">
                Analytics Service Unconfigured
              </h4>
              <p className="text-xs text-neutral-500 font-sans max-w-md mx-auto leading-relaxed">
                In compliance with Workbench privacy principles, zero fake telemetry or estimated counters are displayed. Real download analytics will be connected via your server-side storage proxy or S3/Cloudflare R2 event hooks when production distribution is live.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-neutral-400 bg-white px-2.5 py-1 rounded border border-neutral-200">
                  STATUS: OFFLINE / PRIVACY FIRST
                </span>
              </div>
            </div>
          </DevCard>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* RELEASE EDITOR MODAL */}
      {/* ------------------------------------------------------------- */}
      <DevModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingRelease ? `Edit Release: Workbench ${editingRelease.version}` : 'Create Workbench Release'}
        subtitle="Configure platform binaries, requirements, and changelogs"
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveModal} className="space-y-6">
          {/* Sub-tabs for Form: Metadata, Windows, Linux, macOS, Notes */}
          <div className="flex items-center gap-1 border-b border-neutral-200 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFormActivePlatformTab('meta')}
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-colors whitespace-nowrap ${
                formActivePlatformTab === 'meta'
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              1. General &amp; Status
            </button>

            <button
              type="button"
              onClick={() => setFormActivePlatformTab('windows')}
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                formActivePlatformTab === 'windows'
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Monitor className="w-3 h-3 text-sky-700" />
              <span>2. Windows</span>
            </button>

            <button
              type="button"
              onClick={() => setFormActivePlatformTab('linux')}
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                formActivePlatformTab === 'linux'
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Terminal className="w-3 h-3 text-amber-700" />
              <span>3. Linux</span>
            </button>

            <button
              type="button"
              onClick={() => setFormActivePlatformTab('macos')}
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                formActivePlatformTab === 'macos'
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Laptop className="w-3 h-3 text-neutral-800" />
              <span>4. macOS</span>
            </button>

            <button
              type="button"
              onClick={() => setFormActivePlatformTab('notes')}
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                formActivePlatformTab === 'notes'
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>5. Release Notes</span>
            </button>
          </div>

          {/* TAB 1: General Metadata & Status */}
          {formActivePlatformTab === 'meta' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DevInput
                  label="Version String"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="e.g. 1.0.0"
                  required
                />

                <DevInput
                  label="Release Date Display"
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                  placeholder="e.g. October 2026"
                  required
                />

                <DevSelect
                  label="Release Type"
                  value={formData.releaseType}
                  onChange={(e) => setFormData({ ...formData, releaseType: e.target.value as ReleaseType })}
                  options={releaseTypeOptions}
                />

                <DevSelect
                  label="Publication Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ReleaseStatus })}
                  options={releaseStatusOptions}
                />
              </div>

              <div className="pt-3 border-t border-neutral-200">
                <DevToggle
                  label="Set as Current Primary Release"
                  description="When enabled, this release becomes the main download target on /download, and the previous current release moves to the Archive."
                  checked={formData.isCurrent}
                  onChange={(val) => setFormData({ ...formData, isCurrent: val })}
                />
              </div>
            </div>
          )}

          {/* TAB 2: Windows Platform Settings */}
          {formActivePlatformTab === 'windows' && (
            <div className="space-y-4">
              <DevToggle
                label="Enable Windows Download Target"
                description="Make Windows binary available for this release"
                checked={formData.windows.available}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    windows: { ...formData.windows, available: val },
                  })
                }
              />

              {formData.windows.available && (
                <div className="space-y-4 pt-2 border-t border-neutral-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <DevInput
                        label="Windows Download URL"
                        value={formData.windows.downloadUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            windows: { ...formData.windows, downloadUrl: e.target.value },
                          })
                        }
                        placeholder="https://..."
                        required
                      />
                    </div>

                    <DevInput
                      label="Filename"
                      value={formData.windows.filename}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          windows: { ...formData.windows, filename: e.target.value },
                        })
                      }
                      placeholder="workbench-setup-v1.0.0.exe"
                    />

                    <DevInput
                      label="Filesize"
                      value={formData.windows.filesize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          windows: { ...formData.windows, filesize: e.target.value },
                        })
                      }
                      placeholder="142 MB"
                    />

                    <div className="sm:col-span-2">
                      <DevInput
                        label="Architecture Display"
                        value={formData.windows.architecture}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            windows: { ...formData.windows, architecture: e.target.value },
                          })
                        }
                        placeholder="Windows 10 / 11 · 64-bit"
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <h4 className="text-xs font-bold text-neutral-800 font-sans">Minimum Requirements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <DevInput
                        label="OS"
                        value={formData.windows.minRequirements.os}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            windows: {
                              ...formData.windows,
                              minRequirements: { ...formData.windows.minRequirements, os: e.target.value },
                            },
                          })
                        }
                      />
                      <DevInput
                        label="CPU"
                        value={formData.windows.minRequirements.cpu}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            windows: {
                              ...formData.windows,
                              minRequirements: { ...formData.windows.minRequirements, cpu: e.target.value },
                            },
                          })
                        }
                      />
                      <DevInput
                        label="RAM"
                        value={formData.windows.minRequirements.ram}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            windows: {
                              ...formData.windows,
                              minRequirements: { ...formData.windows.minRequirements, ram: e.target.value },
                            },
                          })
                        }
                      />
                      <DevInput
                        label="GPU"
                        value={formData.windows.minRequirements.gpu}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            windows: {
                              ...formData.windows,
                              minRequirements: { ...formData.windows.minRequirements, gpu: e.target.value },
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Installation steps */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-800 font-sans">Installation Steps</label>
                      <button
                        type="button"
                        onClick={() => setWinSteps([...winSteps, ''])}
                        className="text-xs text-[#0e3052] font-semibold hover:underline"
                      >
                        + Add Step
                      </button>
                    </div>
                    {winSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-mono text-xs text-neutral-400 w-5">{idx + 1}.</span>
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => {
                            const updated = [...winSteps];
                            updated[idx] = e.target.value;
                            setWinSteps(updated);
                          }}
                          className="flex-1 px-3 py-1.5 text-xs font-sans bg-white border border-neutral-300 rounded text-neutral-900"
                        />
                        {winSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setWinSteps(winSteps.filter((_, i) => i !== idx))}
                            className="p-1 text-neutral-400 hover:text-rose-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Linux Platform Settings */}
          {formActivePlatformTab === 'linux' && (
            <div className="space-y-4">
              <DevToggle
                label="Enable Linux Download Target"
                description="Make Linux AppImage or tarball available"
                checked={formData.linux.available}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    linux: { ...formData.linux, available: val },
                  })
                }
              />

              {formData.linux.available && (
                <div className="space-y-4 pt-2 border-t border-neutral-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <DevInput
                        label="Linux Download URL"
                        value={formData.linux.downloadUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            linux: { ...formData.linux, downloadUrl: e.target.value },
                          })
                        }
                        placeholder="https://..."
                        required
                      />
                    </div>

                    <DevInput
                      label="Filename"
                      value={formData.linux.filename}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          linux: { ...formData.linux, filename: e.target.value },
                        })
                      }
                      placeholder="Workbench.AppImage"
                    />

                    <DevInput
                      label="Filesize"
                      value={formData.linux.filesize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          linux: { ...formData.linux, filesize: e.target.value },
                        })
                      }
                      placeholder="136 MB"
                    />

                    <div className="sm:col-span-2">
                      <DevInput
                        label="Architecture Display"
                        value={formData.linux.architecture}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            linux: { ...formData.linux, architecture: e.target.value },
                          })
                        }
                        placeholder="Linux · 64-bit"
                      />
                    </div>
                  </div>

                  {/* Installation steps */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-800 font-sans">Installation Steps</label>
                      <button
                        type="button"
                        onClick={() => setLinuxSteps([...linuxSteps, ''])}
                        className="text-xs text-[#0e3052] font-semibold hover:underline"
                      >
                        + Add Step
                      </button>
                    </div>
                    {linuxSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-mono text-xs text-neutral-400 w-5">{idx + 1}.</span>
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => {
                            const updated = [...linuxSteps];
                            updated[idx] = e.target.value;
                            setLinuxSteps(updated);
                          }}
                          className="flex-1 px-3 py-1.5 text-xs font-sans bg-white border border-neutral-300 rounded text-neutral-900"
                        />
                        {linuxSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setLinuxSteps(linuxSteps.filter((_, i) => i !== idx))}
                            className="p-1 text-neutral-400 hover:text-rose-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: macOS Platform Settings (Dual Architecture Support) */}
          {formActivePlatformTab === 'macos' && (
            <div className="space-y-4">
              <DevToggle
                label="Enable macOS Download Target"
                description="Make macOS DMG packages available"
                checked={formData.macos.available}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    macos: { ...formData.macos, available: val },
                  })
                }
              />

              {formData.macos.available && (
                <div className="space-y-4 pt-2 border-t border-neutral-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <DevToggle
                        label="Dual Architecture Support"
                        description="Allow separate downloads for Apple Silicon and Intel"
                        checked={!!formData.macos.hasSecondaryArch}
                        onChange={(val) =>
                          setFormData({
                            ...formData,
                            macos: { ...formData.macos, hasSecondaryArch: val },
                          })
                        }
                      />
                    </div>

                    {/* Primary Architecture (Apple Silicon or Universal) */}
                    <div className="sm:col-span-2 bg-neutral-50 p-3 rounded border border-neutral-200 space-y-3">
                      <div className="font-bold text-neutral-900 font-sans text-xs">
                        Primary Target (Apple Silicon / Universal)
                      </div>
                      <DevInput
                        label="Download URL"
                        value={formData.macos.downloadUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            macos: { ...formData.macos, downloadUrl: e.target.value },
                          })
                        }
                        placeholder="https://..."
                        required
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <DevInput
                          label="Filename"
                          value={formData.macos.filename}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              macos: { ...formData.macos, filename: e.target.value },
                            })
                          }
                          placeholder="Workbench-arm64.dmg"
                        />
                        <DevInput
                          label="Filesize"
                          value={formData.macos.filesize}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              macos: { ...formData.macos, filesize: e.target.value },
                            })
                          }
                          placeholder="154 MB"
                        />
                        <DevInput
                          label="Button Label"
                          value={formData.macos.architecture}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              macos: { ...formData.macos, architecture: e.target.value },
                            })
                          }
                          placeholder="Apple Silicon"
                        />
                      </div>
                    </div>

                    {/* Secondary Architecture (Intel x64) */}
                    {formData.macos.hasSecondaryArch && (
                      <div className="sm:col-span-2 bg-neutral-50 p-3 rounded border border-neutral-200 space-y-3">
                        <div className="font-bold text-neutral-900 font-sans text-xs">
                          Secondary Target (Intel x64)
                        </div>
                        <DevInput
                          label="Download URL"
                          value={formData.macos.secondaryDownloadUrl || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              macos: { ...formData.macos, secondaryDownloadUrl: e.target.value },
                            })
                          }
                          placeholder="https://..."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <DevInput
                            label="Filename"
                            value={formData.macos.secondaryFilename || ''}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                macos: { ...formData.macos, secondaryFilename: e.target.value },
                              })
                            }
                            placeholder="Workbench-x64.dmg"
                          />
                          <DevInput
                            label="Filesize"
                            value={formData.macos.secondaryFilesize || ''}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                macos: { ...formData.macos, secondaryFilesize: e.target.value },
                              })
                            }
                            placeholder="158 MB"
                          />
                          <DevInput
                            label="Button Label"
                            value={formData.macos.secondaryArchitecture || ''}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                macos: { ...formData.macos, secondaryArchitecture: e.target.value },
                              })
                            }
                            placeholder="Intel"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Release Notes Editor */}
          {formActivePlatformTab === 'notes' && (
            <div className="space-y-4">
              {/* What's New */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-800 font-sans">What&apos;s New (Optional)</label>
                  <button
                    type="button"
                    onClick={() => setWhatsNewList([...whatsNewList, ''])}
                    className="text-xs text-[#0e3052] font-semibold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
                {whatsNewList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...whatsNewList];
                        updated[idx] = e.target.value;
                        setWhatsNewList(updated);
                      }}
                      placeholder="New engine feature..."
                      className="flex-1 px-3 py-1.5 text-xs font-sans bg-white border border-neutral-300 rounded text-neutral-900"
                    />
                    {whatsNewList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setWhatsNewList(whatsNewList.filter((_, i) => i !== idx))}
                        className="p-1 text-neutral-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Improvements */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-800 font-sans">Improvements (Optional)</label>
                  <button
                    type="button"
                    onClick={() => setImprovementsList([...improvementsList, ''])}
                    className="text-xs text-[#0e3052] font-semibold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
                {improvementsList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...improvementsList];
                        updated[idx] = e.target.value;
                        setImprovementsList(updated);
                      }}
                      placeholder="Performance or workflow improvement..."
                      className="flex-1 px-3 py-1.5 text-xs font-sans bg-white border border-neutral-300 rounded text-neutral-900"
                    />
                    {improvementsList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setImprovementsList(improvementsList.filter((_, i) => i !== idx))}
                        className="p-1 text-neutral-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Bug Fixes */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-800 font-sans">Bug Fixes (Optional)</label>
                  <button
                    type="button"
                    onClick={() => setBugFixesList([...bugFixesList, ''])}
                    className="text-xs text-[#0e3052] font-semibold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
                {bugFixesList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...bugFixesList];
                        updated[idx] = e.target.value;
                        setBugFixesList(updated);
                      }}
                      placeholder="Resolved bug or crash..."
                      className="flex-1 px-3 py-1.5 text-xs font-sans bg-white border border-neutral-300 rounded text-neutral-900"
                    />
                    {bugFixesList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setBugFixesList(bugFixesList.filter((_, i) => i !== idx))}
                        className="p-1 text-neutral-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Developer Notes */}
              <div className="pt-2 border-t border-neutral-100">
                <DevTextarea
                  label="Developer Notes / Technical Context"
                  rows={2}
                  value={formData.releaseNotes.developerNotes || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      releaseNotes: { ...formData.releaseNotes, developerNotes: e.target.value },
                    })
                  }
                  placeholder="Additional developer context or instructions..."
                />
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePreviewCurrentForm}
              className="btn-blueprint-secondary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Before Saving</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn-blueprint-secondary px-4 py-2 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-blueprint px-5 py-2 text-xs font-semibold cursor-pointer shadow-xs"
              >
                Save Release
              </button>
            </div>
          </div>
        </form>
      </DevModal>

      {/* ------------------------------------------------------------- */}
      {/* PUBLIC PREVIEW MODAL (Uses identical component ReleaseView) */}
      {/* ------------------------------------------------------------- */}
      {previewTargetRelease && (
        <DevModal
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          title={`Public Preview: Workbench ${previewTargetRelease.version}`}
          subtitle="Exact rendering using the public ReleaseView component"
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="p-3 bg-neutral-100 rounded text-xs font-mono text-neutral-600 flex items-center justify-between">
              <span>Preview Mode</span>
              <DevStatusBadge status={previewTargetRelease.status} size="sm" />
            </div>

            <ReleaseView release={previewTargetRelease} isPreview={true} />

            <div className="pt-4 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="btn-blueprint px-4 py-2 text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </DevModal>
      )}
    </div>
  );
};

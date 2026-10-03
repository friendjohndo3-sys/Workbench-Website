export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  visible: boolean;
}

export interface HomepageContent {
  heroHeadline: string;
  heroTagline: string;
  heroSupportingText: string;
  primaryButtonText: string;
  primaryButtonPath: string;
  secondaryButtonText: string;
  secondaryButtonPath: string;
  heroDisplayImage: string;
  featureSectionTitle: string;
  featureSectionDescription: string;
  editorPreviewTitle: string;
  editorPreviewDescription: string;
  editorPreviewImage: string;
}

export interface BrandingContent {
  siteTitle: string;
  tagline: string;
  logoPath: string;
  faviconPath: string;
  companyCredit: string;
  copyrightText: string;
}

export interface FooterContent {
  description: string;
  companyCredit: string;
  copyrightText: string;
}

export type PlatformType = 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS';

// Legacy DownloadRelease (kept for backward-compatibility)
export interface DownloadRelease {
  id: string;
  version: string;
  releaseDate: string;
  platform: PlatformType;
  targetDetails: string;
  downloadUrl: string;
  filename: string;
  filesize: string;
  graphicsBackend: string;
  minimumRequirements: string;
  recommendedRequirements: string;
  releaseNotes: string;
  published: boolean;
}

// -------------------------------------------------------------
// WORKBENCH FULL RELEASES ARCHITECTURE
// -------------------------------------------------------------
export type ReleaseStatus = 'draft' | 'published' | 'archived';
export type ReleaseType = 'Stable' | 'Beta' | 'Alpha' | 'Preview' | 'Nightly';

export interface PlatformSystemRequirements {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  storage: string;
}

export interface PlatformDownloadConfig {
  available: boolean;
  downloadUrl: string;
  filename: string;
  filesize: string;
  architecture: string; // e.g. "Windows 10 / 11 · 64-bit" or "Apple Silicon"
  
  // Secondary architecture (specifically for macOS dual arch Apple Silicon vs Intel)
  hasSecondaryArch?: boolean;
  secondaryDownloadUrl?: string;
  secondaryFilename?: string;
  secondaryFilesize?: string;
  secondaryArchitecture?: string; // e.g. "Intel (x64)"

  // System requirements
  minRequirements: PlatformSystemRequirements;
  recRequirements: PlatformSystemRequirements;

  // Step-by-step installation instructions
  installationSteps: string[];
  
  // Platform-specific notes
  notes?: string;
}

export interface ReleaseNotesSection {
  whatsNew?: string[];
  improvements?: string[];
  bugFixes?: string[];
  knownIssues?: string[];
  breakingChanges?: string[];
  developerNotes?: string;
}

export interface WorkbenchRelease {
  id: string;
  version: string; // e.g. "1.0.0"
  releaseDate: string; // e.g. "October 2026"
  status: ReleaseStatus; // "draft" | "published" | "archived"
  releaseType: ReleaseType; // "Stable" | "Beta" | "Alpha" | "Preview" | "Nightly"
  isCurrent: boolean; // Flag identifying the current primary release
  
  // Global release notes
  releaseNotes: ReleaseNotesSection;

  // Dedicated Platform Configurations
  windows: PlatformDownloadConfig;
  linux: PlatformDownloadConfig;
  macos: PlatformDownloadConfig;
}

export interface UpdatePost {
  id: string;
  version: string;
  title: string;
  date: string;
  category: 'milestones' | 'engine' | 'rfc';
  badge: string;
  summary: string;
  details: string[];
  published: boolean;
  author?: string;
  featuredImage?: string;
}

export interface DocItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  text: string;
  code?: string;
  keyPoints?: string[];
  link?: string;
  linkText?: string;
  published: boolean;
  lastModified: string;
}

export interface ShowcaseProject {
  id: string;
  name: string;
  developer: string;
  description: string;
  previewType: '2D Pixel / Tilemap' | '3D PBR / Vulkan' | 'Simulation / Tool' | string;
  scriptingLanguage: string;
  previewSlotText: string;
  externalUrl?: string;
  tags: string[];
  published: boolean;
}

export interface AssetItem {
  id: string;
  name: string;
  category: 'Logos' | 'Screenshots' | 'Hero Images' | 'Textures' | 'Showcase' | 'Other';
  path: string;
  dimensions: string;
  filesize: string;
  filetype: string;
  isMasterAsset?: boolean;
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  siteDescription: string;
  currentEngineVersion: string;
  upcomingEngineVersion: string;
  releaseStage: string;
  maintenanceMode: boolean;
  publicSiteStatus: 'ONLINE' | 'MAINTENANCE' | 'DEGRADED';
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

export interface AllContent {
  homepage: HomepageContent;
  branding: BrandingContent;
  navigation: NavigationItem[];
  footer: FooterContent;
  downloads: DownloadRelease[];
  releases: WorkbenchRelease[];
  updates: UpdatePost[];
  docs: DocItem[];
  showcase: ShowcaseProject[];
  assets: AssetItem[];
  settings: SiteSettings;
  activityLog: ActivityLogItem[];
}

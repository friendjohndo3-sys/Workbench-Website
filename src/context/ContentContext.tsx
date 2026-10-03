import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AllContent,
  HomepageContent,
  BrandingContent,
  NavigationItem,
  FooterContent,
  DownloadRelease,
  WorkbenchRelease,
  UpdatePost,
  DocItem,
  ShowcaseProject,
  SiteSettings,
  ActivityLogItem,
} from '../types/content';
import { INITIAL_CONTENT } from '../data/initialContent';

const CONTENT_STORAGE_KEY = 'workbench_website_content_v1';

interface ContentContextType {
  content: AllContent;
  updateHomepage: (homepage: Partial<HomepageContent>) => void;
  updateBranding: (branding: Partial<BrandingContent>) => void;
  updateNavigation: (items: NavigationItem[]) => void;
  updateFooter: (footer: Partial<FooterContent>) => void;
  // Full Workbench Releases system
  saveWorkbenchRelease: (release: WorkbenchRelease) => void;
  deleteWorkbenchRelease: (id: string) => void;
  setAsCurrentRelease: (id: string) => void;
  toggleReleasePublish: (id: string) => void;
  toggleReleaseArchive: (id: string) => void;
  // Legacy download release methods
  saveRelease: (release: DownloadRelease) => void;
  deleteRelease: (id: string) => void;
  // Other modules
  saveUpdate: (update: UpdatePost) => void;
  deleteUpdate: (id: string) => void;
  saveDoc: (doc: DocItem) => void;
  deleteDoc: (id: string) => void;
  saveShowcase: (project: ShowcaseProject) => void;
  deleteShowcase: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
  exportContentJson: () => string;
  importContentJson: (json: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AllContent>(() => {
    try {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required top-level keys exist by merging with defaults
        return {
          ...INITIAL_CONTENT,
          ...parsed,
          homepage: { ...INITIAL_CONTENT.homepage, ...(parsed.homepage || {}) },
          branding: { ...INITIAL_CONTENT.branding, ...(parsed.branding || {}) },
          footer: { ...INITIAL_CONTENT.footer, ...(parsed.footer || {}) },
          settings: { ...INITIAL_CONTENT.settings, ...(parsed.settings || {}) },
          navigation: parsed.navigation || INITIAL_CONTENT.navigation,
          downloads: parsed.downloads || INITIAL_CONTENT.downloads,
          releases: parsed.releases && parsed.releases.length > 0 ? parsed.releases : INITIAL_CONTENT.releases,
          updates: parsed.updates || INITIAL_CONTENT.updates,
          docs: parsed.docs || INITIAL_CONTENT.docs,
          showcase: parsed.showcase || INITIAL_CONTENT.showcase,
          assets: INITIAL_CONTENT.assets, // Always preserve master assets
          activityLog: parsed.activityLog || INITIAL_CONTENT.activityLog,
        };
      }
    } catch (e) {
      console.error('Failed to parse cached website content, using defaults:', e);
    }
    return INITIAL_CONTENT;
  });

  // Save to persistence whenever content changes
  const saveState = (newContent: AllContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to persist content updates:', e);
    }
  };

  const addActivity = (action: string, details: string, current: AllContent): ActivityLogItem[] => {
    const newItem: ActivityLogItem = {
      id: 'act-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      action,
      user: 'Developer',
      details,
    };
    return [newItem, ...(current.activityLog || [])].slice(0, 25);
  };

  const updateHomepage = (homepageUpdate: Partial<HomepageContent>) => {
    const updated = {
      ...content,
      homepage: { ...content.homepage, ...homepageUpdate },
      activityLog: addActivity('Homepage Updated', 'Modified hero or feature section content.', content),
    };
    saveState(updated);
  };

  const updateBranding = (brandingUpdate: Partial<BrandingContent>) => {
    const updated = {
      ...content,
      branding: { ...content.branding, ...brandingUpdate },
      activityLog: addActivity('Branding Updated', 'Modified site brand parameters.', content),
    };
    saveState(updated);
  };

  const updateNavigation = (items: NavigationItem[]) => {
    const updated = {
      ...content,
      navigation: items,
      activityLog: addActivity('Navigation Updated', `Saved ${items.length} navigation route entries.`, content),
    };
    saveState(updated);
  };

  const updateFooter = (footerUpdate: Partial<FooterContent>) => {
    const updated = {
      ...content,
      footer: { ...content.footer, ...footerUpdate },
      activityLog: addActivity('Footer Updated', 'Saved footer descriptions or credits.', content),
    };
    saveState(updated);
  };

  // -----------------------------------------------------------------
  // WORKBENCH FULL RELEASES SYSTEM
  // -----------------------------------------------------------------
  const saveWorkbenchRelease = (release: WorkbenchRelease) => {
    const currentReleases = content.releases || INITIAL_CONTENT.releases;
    let newReleases = [...currentReleases];
    const existingIndex = newReleases.findIndex((r) => r.id === release.id);

    // Determine current release status
    let shouldBeCurrent = release.isCurrent;
    if (release.status === 'published') {
      // If marked isCurrent or if there are no existing current published releases
      const hasOtherCurrentPublished = newReleases.some(
        (r) => r.id !== release.id && r.isCurrent && r.status === 'published'
      );
      if (!hasOtherCurrentPublished) {
        shouldBeCurrent = true;
      }
    } else {
      // Drafts cannot be the public current release
      shouldBeCurrent = false;
    }

    if (shouldBeCurrent) {
      newReleases = newReleases.map((r) => {
        if (r.id !== release.id) {
          return {
            ...r,
            isCurrent: false,
            status: r.status === 'published' ? ('archived' as const) : r.status,
          };
        }
        return r;
      });
    }

    const updatedRelease: WorkbenchRelease = {
      ...release,
      isCurrent: shouldBeCurrent,
    };

    if (existingIndex >= 0) {
      newReleases[existingIndex] = updatedRelease;
    } else {
      newReleases = [updatedRelease, ...newReleases];
    }

    // Sort: Current first, then published/archived in reverse chronological order
    newReleases.sort((a, b) => {
      if (a.isCurrent) return -1;
      if (b.isCurrent) return 1;
      return b.version.localeCompare(a.version, undefined, { numeric: true });
    });

    const newSettings = { ...content.settings };
    if (shouldBeCurrent && updatedRelease.status === 'published') {
      newSettings.currentEngineVersion = updatedRelease.version;
    }

    const updated: AllContent = {
      ...content,
      releases: newReleases,
      settings: newSettings,
      activityLog: addActivity(
        'Workbench Release Saved',
        `Workbench ${updatedRelease.version} (${updatedRelease.status.toUpperCase()}, ${updatedRelease.releaseType})`,
        content
      ),
    };
    saveState(updated);
  };

  const deleteWorkbenchRelease = (id: string) => {
    const currentReleases = content.releases || INITIAL_CONTENT.releases;
    const target = currentReleases.find((r) => r.id === id);
    if (!target) return;

    const filtered = currentReleases.filter((r) => r.id !== id);
    const newSettings = { ...content.settings };

    // If deleted release was current, promote the next published release
    if (target.isCurrent && filtered.length > 0) {
      const nextCurrent = filtered.find((r) => r.status === 'published' || r.status === 'archived');
      if (nextCurrent) {
        nextCurrent.isCurrent = true;
        nextCurrent.status = 'published';
        newSettings.currentEngineVersion = nextCurrent.version;
      }
    }

    const updated: AllContent = {
      ...content,
      releases: filtered,
      settings: newSettings,
      activityLog: addActivity('Release Deleted', `Workbench ${target.version}`, content),
    };
    saveState(updated);
  };

  const setAsCurrentRelease = (id: string) => {
    const currentReleases = content.releases || INITIAL_CONTENT.releases;
    const target = currentReleases.find((r) => r.id === id);
    if (!target) return;

    const newReleases = currentReleases.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          isCurrent: true,
          status: 'published' as const,
        };
      }
      return {
        ...r,
        isCurrent: false,
        status: r.status === 'published' ? ('archived' as const) : r.status,
      };
    });

    const updated: AllContent = {
      ...content,
      releases: newReleases,
      settings: {
        ...content.settings,
        currentEngineVersion: target.version,
      },
      activityLog: addActivity(
        'Current Release Changed',
        `Promoted Workbench ${target.version} to current release. Previous release moved to archive.`,
        content
      ),
    };
    saveState(updated);
  };

  const toggleReleasePublish = (id: string) => {
    const currentReleases = content.releases || INITIAL_CONTENT.releases;
    const target = currentReleases.find((r) => r.id === id);
    if (!target) return;

    const isNowPublished = target.status !== 'published';
    const newStatus = isNowPublished ? 'published' : 'draft';
    
    saveWorkbenchRelease({
      ...target,
      status: newStatus as any,
      isCurrent: isNowPublished && target.isCurrent,
    });
  };

  const toggleReleaseArchive = (id: string) => {
    const currentReleases = content.releases || INITIAL_CONTENT.releases;
    const target = currentReleases.find((r) => r.id === id);
    if (!target) return;

    const isNowArchived = target.status !== 'archived';
    const newStatus = isNowArchived ? 'archived' : 'published';

    saveWorkbenchRelease({
      ...target,
      status: newStatus as any,
      isCurrent: !isNowArchived && target.isCurrent,
    });
  };

  // Legacy download methods
  const saveRelease = (release: DownloadRelease) => {
    const existingIndex = content.downloads.findIndex((d) => d.id === release.id);
    let newDownloads = [...content.downloads];
    if (existingIndex >= 0) {
      newDownloads[existingIndex] = release;
    } else {
      newDownloads = [release, ...newDownloads];
    }
    const updated = {
      ...content,
      downloads: newDownloads,
      activityLog: addActivity('Legacy Release Saved', `${release.platform} ${release.version}`, content),
    };
    saveState(updated);
  };

  const deleteRelease = (id: string) => {
    const target = content.downloads.find((d) => d.id === id);
    const updated = {
      ...content,
      downloads: content.downloads.filter((d) => d.id !== id),
      activityLog: addActivity('Legacy Release Deleted', target ? `${target.platform} ${target.version}` : id, content),
    };
    saveState(updated);
  };

  const saveUpdate = (updateItem: UpdatePost) => {
    const existingIndex = content.updates.findIndex((u) => u.id === updateItem.id);
    let newUpdates = [...content.updates];
    if (existingIndex >= 0) {
      newUpdates[existingIndex] = updateItem;
    } else {
      newUpdates = [updateItem, ...newUpdates];
    }
    const updated = {
      ...content,
      updates: newUpdates,
      activityLog: addActivity('Update Post Saved', `"${updateItem.title}" (${updateItem.published ? 'Published' : 'Draft'})`, content),
    };
    saveState(updated);
  };

  const deleteUpdate = (id: string) => {
    const target = content.updates.find((u) => u.id === id);
    const updated = {
      ...content,
      updates: content.updates.filter((u) => u.id !== id),
      activityLog: addActivity('Update Post Deleted', target ? target.title : id, content),
    };
    saveState(updated);
  };

  const saveDoc = (docItem: DocItem) => {
    const existingIndex = content.docs.findIndex((d) => d.id === docItem.id);
    let newDocs = [...content.docs];
    if (existingIndex >= 0) {
      newDocs[existingIndex] = { ...docItem, lastModified: new Date().toISOString().substring(0, 10) };
    } else {
      newDocs.push({ ...docItem, lastModified: new Date().toISOString().substring(0, 10) });
    }
    const updated = {
      ...content,
      docs: newDocs,
      activityLog: addActivity('Documentation Saved', `[${docItem.category}] ${docItem.title}`, content),
    };
    saveState(updated);
  };

  const deleteDoc = (id: string) => {
    const target = content.docs.find((d) => d.id === id);
    const updated = {
      ...content,
      docs: content.docs.filter((d) => d.id !== id),
      activityLog: addActivity('Documentation Deleted', target ? target.title : id, content),
    };
    saveState(updated);
  };

  const saveShowcase = (project: ShowcaseProject) => {
    const existingIndex = content.showcase.findIndex((s) => s.id === project.id);
    let newShowcase = [...content.showcase];
    if (existingIndex >= 0) {
      newShowcase[existingIndex] = project;
    } else {
      newShowcase = [project, ...newShowcase];
    }
    const updated = {
      ...content,
      showcase: newShowcase,
      activityLog: addActivity('Showcase Project Saved', `"${project.name}" by ${project.developer}`, content),
    };
    saveState(updated);
  };

  const deleteShowcase = (id: string) => {
    const target = content.showcase.find((s) => s.id === id);
    const updated = {
      ...content,
      showcase: content.showcase.filter((s) => s.id !== id),
      activityLog: addActivity('Showcase Project Deleted', target ? target.name : id, content),
    };
    saveState(updated);
  };

  const updateSettings = (settingsUpdate: Partial<SiteSettings>) => {
    const updated = {
      ...content,
      settings: { ...content.settings, ...settingsUpdate },
      activityLog: addActivity('Site Settings Updated', 'Modified global engine and maintenance status.', content),
    };
    saveState(updated);
  };

  const resetToDefaults = () => {
    saveState(INITIAL_CONTENT);
  };

  const exportContentJson = (): string => {
    return JSON.stringify(content, null, 2);
  };

  const importContentJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && parsed.homepage && parsed.settings) {
        saveState({
          ...INITIAL_CONTENT,
          ...parsed,
          assets: INITIAL_CONTENT.assets,
        });
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON data:', e);
    }
    return false;
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateHomepage,
        updateBranding,
        updateNavigation,
        updateFooter,
        saveWorkbenchRelease,
        deleteWorkbenchRelease,
        setAsCurrentRelease,
        toggleReleasePublish,
        toggleReleaseArchive,
        saveRelease,
        deleteRelease,
        saveUpdate,
        deleteUpdate,
        saveDoc,
        deleteDoc,
        saveShowcase,
        deleteShowcase,
        updateSettings,
        resetToDefaults,
        exportContentJson,
        importContentJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

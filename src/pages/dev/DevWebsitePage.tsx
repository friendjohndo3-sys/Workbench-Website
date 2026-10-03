import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevInput, DevTextarea, DevToggle } from '../../components/dev/DevInput';
import {
  Save,
  RotateCcw,
  Check,
  ExternalLink,
  Eye,
  Plus,
  Trash2,
  Globe,
  Layout,
  Menu,
  FileText,
} from 'lucide-react';
import { NavigationItem } from '../../types/content';

export const DevWebsitePage: React.FC = () => {
  const { content, updateHomepage, updateBranding, updateNavigation, updateFooter } = useContent();

  const [activeTab, setActiveTab] = useState<'homepage' | 'branding' | 'navigation' | 'footer'>('homepage');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Local editable draft state (explicit Save Changes required)
  const [homepageDraft, setHomepageDraft] = useState({ ...content.homepage });
  const [brandingDraft, setBrandingDraft] = useState({ ...content.branding });
  const [navigationDraft, setNavigationDraft] = useState<NavigationItem[]>(
    content.navigation.map((item) => ({ ...item }))
  );
  const [footerDraft, setFooterDraft] = useState({ ...content.footer });

  const handleSave = () => {
    if (activeTab === 'homepage') {
      updateHomepage(homepageDraft);
    } else if (activeTab === 'branding') {
      updateBranding(brandingDraft);
    } else if (activeTab === 'navigation') {
      updateNavigation(navigationDraft);
    } else if (activeTab === 'footer') {
      updateFooter(footerDraft);
    }

    setSaveFeedback('Changes saved and synchronized to public website.');
    setTimeout(() => setSaveFeedback(null), 3500);
  };

  const handleResetDraft = () => {
    setHomepageDraft({ ...content.homepage });
    setBrandingDraft({ ...content.branding });
    setNavigationDraft(content.navigation.map((item) => ({ ...item })));
    setFooterDraft({ ...content.footer });
    setSaveFeedback('Draft reset to currently published values.');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  // Navigation handlers
  const handleNavChange = (idx: number, field: keyof NavigationItem, val: any) => {
    const updated = [...navigationDraft];
    updated[idx] = { ...updated[idx], [field]: val };
    setNavigationDraft(updated);
  };

  const handleAddNavItem = () => {
    const newItem: NavigationItem = {
      id: 'nav-' + Date.now(),
      name: 'New Link',
      path: '/#',
      visible: true,
    };
    setNavigationDraft([...navigationDraft, newItem]);
  };

  const handleDeleteNavItem = (idx: number) => {
    setNavigationDraft(navigationDraft.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="CONTENT MANAGEMENT"
        title="Website Management"
        description="Configure public-facing copy, branding identities, navigation entries, and footer declarations."
        actions={
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blueprint-secondary px-3 py-2 text-xs font-semibold flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live</span>
            </a>

            <button
              onClick={handleResetDraft}
              className="btn-blueprint-secondary px-3 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>

            <button
              onClick={handleSave}
              className="btn-blueprint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        }
      />

      {/* Save Feedback Banner */}
      {saveFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveFeedback}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-neutral-200 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('homepage')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'homepage'
              ? 'border-[#0e3052] text-[#0e3052] font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Homepage</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'branding'
              ? 'border-[#0e3052] text-[#0e3052] font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Branding</span>
        </button>

        <button
          onClick={() => setActiveTab('navigation')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'navigation'
              ? 'border-[#0e3052] text-[#0e3052] font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Header Navigation</span>
        </button>

        <button
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'footer'
              ? 'border-[#0e3052] text-[#0e3052] font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Footer Details</span>
        </button>
      </div>

      {/* Tab 1: Homepage Content Editor */}
      {activeTab === 'homepage' && (
        <div className="space-y-6">
          <DevCard
            title="Hero Section Configuration"
            description="Manage headline, sub-headline, action buttons, and hero display banner"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <DevInput
                  label="Hero Headline"
                  value={homepageDraft.heroHeadline}
                  onChange={(e) => setHomepageDraft({ ...homepageDraft, heroHeadline: e.target.value })}
                  hint="Main tagline displayed on public homepage"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <DevInput
                  label="Hero Kicker / Metadata Tagline"
                  value={homepageDraft.heroTagline}
                  onChange={(e) => setHomepageDraft({ ...homepageDraft, heroTagline: e.target.value })}
                  hint="Top monospaced category tags"
                />
              </div>

              <div className="md:col-span-2">
                <DevTextarea
                  label="Hero Supporting Description"
                  rows={2}
                  value={homepageDraft.heroSupportingText}
                  onChange={(e) => setHomepageDraft({ ...homepageDraft, heroSupportingText: e.target.value })}
                  hint="Lead paragraph under main headline"
                />
              </div>

              <DevInput
                label="Primary Button Text"
                value={homepageDraft.primaryButtonText}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, primaryButtonText: e.target.value })}
              />

              <DevInput
                label="Primary Button Destination"
                value={homepageDraft.primaryButtonPath}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, primaryButtonPath: e.target.value })}
                hint="Relative route or external URL"
              />

              <DevInput
                label="Secondary Button Text"
                value={homepageDraft.secondaryButtonText}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, secondaryButtonText: e.target.value })}
              />

              <DevInput
                label="Secondary Button Destination"
                value={homepageDraft.secondaryButtonPath}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, secondaryButtonPath: e.target.value })}
                hint="Relative route or external URL"
              />

              <div className="md:col-span-2">
                <DevInput
                  label="Hero Display Image URL / Path"
                  value={homepageDraft.heroDisplayImage}
                  onChange={(e) => setHomepageDraft({ ...homepageDraft, heroDisplayImage: e.target.value })}
                  hint="Path to official banner image asset"
                />
              </div>
            </div>
          </DevCard>

          <DevCard
            title="Editor Showcase Section"
            description="Manage title, description, and workspace screenshot shown on the homepage"
          >
            <div className="space-y-4">
              <DevInput
                label="Editor Showcase Title"
                value={homepageDraft.editorPreviewTitle}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, editorPreviewTitle: e.target.value })}
              />

              <DevTextarea
                label="Editor Showcase Description"
                rows={2}
                value={homepageDraft.editorPreviewDescription}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, editorPreviewDescription: e.target.value })}
              />

              <DevInput
                label="Editor Screenshot Image Path"
                value={homepageDraft.editorPreviewImage}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, editorPreviewImage: e.target.value })}
              />
            </div>
          </DevCard>

          <DevCard
            title="Features Intro Section"
            description="Title and lead description for the 2D / 3D / Scripting pillar section"
          >
            <div className="space-y-4">
              <DevInput
                label="Feature Section Title"
                value={homepageDraft.featureSectionTitle}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, featureSectionTitle: e.target.value })}
              />

              <DevTextarea
                label="Feature Section Description"
                rows={2}
                value={homepageDraft.featureSectionDescription}
                onChange={(e) => setHomepageDraft({ ...homepageDraft, featureSectionDescription: e.target.value })}
              />
            </div>
          </DevCard>
        </div>
      )}

      {/* Tab 2: Branding */}
      {activeTab === 'branding' && (
        <DevCard
          title="Branding & Engine Identity"
          description="Manage site title, brand logo references, and company credits"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DevInput
              label="Site Name / Title"
              value={brandingDraft.siteTitle}
              onChange={(e) => setBrandingDraft({ ...brandingDraft, siteTitle: e.target.value })}
            />

            <DevInput
              label="Brand Tagline"
              value={brandingDraft.tagline}
              onChange={(e) => setBrandingDraft({ ...brandingDraft, tagline: e.target.value })}
            />

            <div className="md:col-span-2">
              <DevInput
                label="Official Master Logo Path"
                value={brandingDraft.logoPath}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, logoPath: e.target.value })}
                hint="Notice: Master 3000x3000 logo is preserved at /images/1791001458065.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <DevInput
                label="Favicon Path"
                value={brandingDraft.faviconPath}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, faviconPath: e.target.value })}
              />
            </div>

            <DevInput
              label="Developer / Studio Credit"
              value={brandingDraft.companyCredit}
              onChange={(e) => setBrandingDraft({ ...brandingDraft, companyCredit: e.target.value })}
            />

            <DevInput
              label="Copyright Statement"
              value={brandingDraft.copyrightText}
              onChange={(e) => setBrandingDraft({ ...brandingDraft, copyrightText: e.target.value })}
            />
          </div>
        </DevCard>
      )}

      {/* Tab 3: Navigation */}
      {activeTab === 'navigation' && (
        <DevCard
          title="Public Header Navigation Entries"
          description="Manage top-level navigation links, destinations, and visibility"
          action={
            <button
              onClick={handleAddNavItem}
              className="btn-blueprint-secondary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Link</span>
            </button>
          }
        >
          <div className="space-y-3">
            {navigationDraft.map((item, idx) => (
              <div
                key={item.id}
                className="p-3 border border-neutral-200 rounded bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DevInput
                    label="Label"
                    value={item.name}
                    onChange={(e) => handleNavChange(idx, 'name', e.target.value)}
                  />
                  <DevInput
                    label="Route Destination"
                    value={item.path}
                    onChange={(e) => handleNavChange(idx, 'path', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4 sm:pt-4">
                  <label className="flex items-center gap-2 text-xs font-sans text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.visible}
                      onChange={(e) => handleNavChange(idx, 'visible', e.target.checked)}
                      className="rounded border-neutral-300 text-[#0e3052] focus:ring-[#0e3052]"
                    />
                    <span>Visible</span>
                  </label>

                  <button
                    onClick={() => handleDeleteNavItem(idx)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded cursor-pointer"
                    title="Delete navigation item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DevCard>
      )}

      {/* Tab 4: Footer */}
      {activeTab === 'footer' && (
        <DevCard
          title="Footer Configuration"
          description="Manage bottom footer descriptions, credits, and copyright notices"
        >
          <div className="space-y-4">
            <DevTextarea
              label="Footer Description"
              rows={3}
              value={footerDraft.description}
              onChange={(e) => setFooterDraft({ ...footerDraft, description: e.target.value })}
              hint="Shown in primary left column of global footer"
            />

            <DevInput
              label="Company Credit Line"
              value={footerDraft.companyCredit}
              onChange={(e) => setFooterDraft({ ...footerDraft, companyCredit: e.target.value })}
            />

            <DevInput
              label="Copyright Line"
              value={footerDraft.copyrightText}
              onChange={(e) => setFooterDraft({ ...footerDraft, copyrightText: e.target.value })}
            />
          </div>
        </DevCard>
      )}

      {/* Bottom Action Bar */}
      <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
        <span className="text-xs font-mono text-neutral-500">
          Unsaved changes will not affect the public site until you click &quot;Save Changes&quot;.
        </span>

        <button
          onClick={handleSave}
          className="btn-blueprint px-5 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

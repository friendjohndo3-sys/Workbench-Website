import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { AssetItem } from '../../types/content';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import {
  FolderArchive,
  Image as ImageIcon,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const DevAssetsPage: React.FC = () => {
  const { content } = useContent();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Logos',
    'Hero Images',
    'Screenshots',
    'Textures',
    'Showcase',
    'Other',
  ];

  const filteredAssets = content.assets.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCopyPath = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="ASSET MANAGEMENT"
        title="Website &amp; Engine Assets"
        description="Inspect registered brand graphics, official screenshots, and texture maps. Master brand assets are strictly protected."
      />

      {/* Official Master Logo Preservation Notice */}
      <div className="p-4 rounded-md border border-neutral-300 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded bg-neutral-900 overflow-hidden shrink-0 border border-neutral-300">
            <img
              src="/images/1791001458065.jpg"
              alt="Workbench Master Logo Asset"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-neutral-900 font-sans">
                Official Master Logo (3000 × 3000 px)
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Protected Brand Asset</span>
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-sans mt-0.5 max-w-xl">
              Blueprint background with white geometric W and hammer strike stroke. Preserved as the permanent brand identity.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleCopyPath('/images/1791001458065.jpg', 'master-logo')}
          className="btn-blueprint-secondary px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
        >
          {copiedId === 'master-logo' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied Path</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
              <span>Copy Asset Path</span>
            </>
          )}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-neutral-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#0e3052] text-white font-bold'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
          }`}
        >
          All Assets ({content.assets.length})
        </button>

        {categories.map((cat) => {
          const count = content.assets.filter((a) => a.category.toLowerCase() === cat.toLowerCase()).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border border-neutral-200 rounded-md overflow-hidden shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
          >
            <div>
              {/* Asset Preview Thumbnail */}
              <div className="h-44 bg-neutral-900 border-b border-neutral-200 flex items-center justify-center overflow-hidden relative group">
                <img
                  src={asset.path}
                  alt={asset.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
                <a
                  href={asset.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Open full resolution"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Asset Metadata */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                    {asset.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {asset.filetype} · {asset.filesize}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-neutral-900 font-sans line-clamp-1">
                  {asset.name}
                </h4>

                {asset.notes && (
                  <p className="text-[11px] text-neutral-500 font-sans line-clamp-2 leading-relaxed">
                    {asset.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Path Box & Copy Button */}
            <div className="p-3 border-t border-neutral-100 bg-neutral-50/70 flex items-center justify-between gap-2 text-xs font-mono">
              <span className="text-neutral-500 text-[11px] truncate">{asset.path}</span>
              <button
                onClick={() => handleCopyPath(asset.path, asset.id)}
                className="p-1 text-neutral-500 hover:text-[#0e3052] rounded cursor-pointer shrink-0"
                title="Copy relative path"
              >
                {copiedId === asset.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

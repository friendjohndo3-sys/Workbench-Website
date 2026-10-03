import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { DocItem } from '../../types/content';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevStatusBadge } from '../../components/dev/DevStatusBadge';
import { DevModal } from '../../components/dev/DevModal';
import { DevInput, DevTextarea, DevSelect, DevToggle } from '../../components/dev/DevInput';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Check,
  Search,
  FileCode,
  Tag,
} from 'lucide-react';

export const DevDocsPage: React.FC = () => {
  const { content, saveDoc, deleteDoc } = useContent();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form draft state
  const [formData, setFormData] = useState<DocItem>({
    id: '',
    slug: '',
    title: '',
    category: 'Getting Started',
    summary: '',
    text: '',
    code: '',
    published: true,
    lastModified: '',
  });

  const categories = [
    'Getting Started',
    'Editor',
    'Scenes',
    'Programming',
    '.wbscript',
    '.wbvisual',
    'Systems',
    'Advanced',
  ];

  const categoryOptions = categories.map((c) => ({ value: c, label: c }));

  const filteredDocs = content.docs.filter((d) => {
    if (activeCategory === 'all') return true;
    return d.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleOpenAdd = () => {
    setEditingDoc(null);
    setFormData({
      id: 'doc-' + Date.now(),
      slug: 'new-doc-' + Date.now(),
      title: '',
      category: 'Getting Started',
      summary: '',
      text: '',
      code: '',
      published: true,
      lastModified: new Date().toISOString().substring(0, 10),
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (doc: DocItem) => {
    setEditingDoc(doc);
    setFormData({ ...doc });
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a documentation title.');
      return;
    }
    const slug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    saveDoc({ ...formData, slug });
    setModalOpen(false);
    setFeedback(`Document "${formData.title}" saved.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete documentation item: "${title}"?`)) {
      deleteDoc(id);
      setFeedback('Document deleted.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleTogglePublish = (doc: DocItem) => {
    const updated = { ...doc, published: !doc.published };
    saveDoc(updated);
    setFeedback(`"${doc.title}" is now ${updated.published ? 'Published' : 'Draft'}.`);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="CONTENT"
        title="Documentation Management"
        description="Organize manual pages, architecture references, and API specifications across official categories."
        actions={
          <button
            onClick={handleOpenAdd}
            className="btn-blueprint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Document</span>
          </button>
        }
      />

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-neutral-200">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#0e3052] text-white font-bold'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
          }`}
        >
          All Categories ({content.docs.length})
        </button>

        {categories.map((cat) => {
          const count = content.docs.filter((d) => d.category.toLowerCase() === cat.toLowerCase()).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#0e3052] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Docs Table */}
      <DevCard
        title={`Documents (${filteredDocs.length})`}
        description="Public documentation automatically updates when saved"
        noPadding
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-mono uppercase text-neutral-500">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-neutral-900">
                    <div>{doc.title}</div>
                    <div className="text-[11px] text-neutral-500 font-normal line-clamp-1">{doc.summary}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {doc.category}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">
                    /{doc.slug}
                  </td>

                  <td className="py-3 px-4 font-mono text-neutral-600">
                    {doc.lastModified || '2026-10-01'}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(doc)}
                      className="cursor-pointer"
                      title="Click to toggle publish status"
                    >
                      <DevStatusBadge status={doc.published ? 'published' : 'draft'} size="sm" />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(doc)}
                      className="p-1.5 text-neutral-500 hover:text-[#0e3052] rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Edit document"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id, doc.title)}
                      className="p-1.5 text-neutral-500 hover:text-rose-600 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Delete document"
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

      {/* Modal Dialog for Add/Edit Document */}
      <DevModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDoc ? `Edit: ${editingDoc.title}` : 'Create Documentation Topic'}
        subtitle="Manage explanatory text, code snippets, and publication"
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveModal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <DevInput
                label="Document Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Tilemaps & Collision Layers"
                required
              />
            </div>

            <DevSelect
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categoryOptions}
              required
            />

            <DevInput
              label="URL Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. tilemaps-and-collision"
            />

            <div className="sm:col-span-2">
              <DevTextarea
                label="Topic Summary / Abstract"
                rows={2}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary displayed at the top of the topic..."
                required
              />
            </div>

            <div className="sm:col-span-2">
              <DevTextarea
                label="Full Documentation Text"
                rows={6}
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Comprehensive technical prose and explanation..."
                required
              />
            </div>

            <div className="sm:col-span-2">
              <DevTextarea
                label="Code Example or Terminal Snippet (Optional)"
                rows={4}
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="// Language syntax or shell command"
              />
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-neutral-200">
              <DevToggle
                label="Publish Status"
                description="Make this document visible in the public documentation hub"
                checked={formData.published}
                onChange={(val) => setFormData({ ...formData, published: val })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex justify-end gap-2">
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
              Save Document
            </button>
          </div>
        </form>
      </DevModal>
    </div>
  );
};

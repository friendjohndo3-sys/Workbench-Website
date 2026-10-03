import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { UpdatePost } from '../../types/content';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevStatusBadge } from '../../components/dev/DevStatusBadge';
import { DevModal } from '../../components/dev/DevModal';
import { DevInput, DevTextarea, DevSelect, DevToggle } from '../../components/dev/DevInput';
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Check,
  Calendar,
  Layers,
  PlusCircle,
  X,
} from 'lucide-react';

export const DevUpdatesPage: React.FC = () => {
  const { content, saveUpdate, deleteUpdate } = useContent();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<UpdatePost | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form draft state
  const [formData, setFormData] = useState<UpdatePost>({
    id: '',
    version: 'v0.1.0',
    title: '',
    date: 'October 2026',
    category: 'engine',
    badge: 'Architecture',
    summary: '',
    details: [''],
    published: true,
    author: 'Engine Core Team',
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      id: 'update-' + Date.now(),
      version: 'v0.1.0',
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      category: 'engine',
      badge: 'Devlog',
      summary: '',
      details: ['Technical implementation details.'],
      published: true,
      author: 'Engine Core Team',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post: UpdatePost) => {
    setEditingPost(post);
    setFormData({ ...post, details: [...(post.details || [''])] });
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an update title.');
      return;
    }
    const cleanDetails = formData.details.filter((d) => d.trim().length > 0);
    saveUpdate({ ...formData, details: cleanDetails.length > 0 ? cleanDetails : ['Changelog notes.'] });
    setModalOpen(false);
    setFeedback(`Update "${formData.title}" saved.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete update: "${title}"?`)) {
      deleteUpdate(id);
      setFeedback('Update deleted.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleTogglePublish = (post: UpdatePost) => {
    const updated = { ...post, published: !post.published };
    saveUpdate(updated);
    setFeedback(`"${post.title}" is now ${updated.published ? 'Published' : 'Draft'}.`);
    setTimeout(() => setFeedback(null), 2500);
  };

  // Detail bullet handlers
  const handleDetailChange = (index: number, val: string) => {
    const updated = [...formData.details];
    updated[index] = val;
    setFormData({ ...formData, details: updated });
  };

  const handleAddDetail = () => {
    setFormData({ ...formData, details: [...formData.details, ''] });
  };

  const handleRemoveDetail = (index: number) => {
    setFormData({
      ...formData,
      details: formData.details.filter((_, i) => i !== index),
    });
  };

  const categoryOptions = [
    { value: 'engine', label: 'Engine Devlog' },
    { value: 'milestones', label: 'Milestone / Release' },
    { value: 'rfc', label: 'Language RFC' },
  ];

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="CONTENT"
        title="Update & Devlog Management"
        description="Publish development journals, architecture RFCs, and release announcements consumed by the public /updates page."
        actions={
          <button
            onClick={handleOpenAdd}
            className="btn-blueprint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Update</span>
          </button>
        }
      />

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Updates Table */}
      <DevCard
        title="Published Updates & Drafts"
        description="Manage publication status and technical notes"
        noPadding
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-mono uppercase text-neutral-500">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {content.updates.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-neutral-900 line-clamp-1">{post.title}</div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">{post.summary}</div>
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-[#0e3052]">
                    {post.version}
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {post.badge || post.category}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-neutral-600 whitespace-nowrap">
                    {post.date}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className="cursor-pointer"
                      title="Click to toggle status"
                    >
                      <DevStatusBadge status={post.published ? 'published' : 'draft'} size="sm" />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 text-neutral-500 hover:text-[#0e3052] rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Edit update"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-1.5 text-neutral-500 hover:text-rose-600 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Delete update"
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

      {/* Modal Dialog for Update Post Editor */}
      <DevModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPost ? `Edit Update: ${editingPost.title}` : 'Draft New Devlog or Release Announcement'}
        subtitle="Manage title, description, category, and technical keynotes"
        maxWidth="xl"
      >
        <form onSubmit={handleSaveModal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <DevInput
                label="Article / Update Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Vulkan Pipeline Architecture or v0.1.0 Released"
                required
              />
            </div>

            <DevInput
              label="Version Tag"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              placeholder="e.g. Devlog #04 or v0.1.0"
              required
            />

            <DevInput
              label="Date Display"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="e.g. October 2026"
            />

            <DevSelect
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              options={categoryOptions}
            />

            <DevInput
              label="Badge Label"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. Architecture, Graphics, Release Spec"
            />

            <div className="sm:col-span-2">
              <DevTextarea
                label="Summary / Lead Paragraph"
                rows={2}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary of this development log..."
                required
              />
            </div>

            {/* Key Technical Bullets */}
            <div className="sm:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-neutral-800 font-sans">
                  Key Technical Notes &amp; Highlights
                </label>
                <button
                  type="button"
                  onClick={handleAddDetail}
                  className="text-xs text-[#0e3052] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>Add Note</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleDetailChange(idx, e.target.value)}
                      placeholder={`Key technical takeaway #${idx + 1}`}
                      className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0e3052]"
                    />
                    {formData.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDetail(idx)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 rounded cursor-pointer"
                        title="Remove note"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-neutral-200">
              <DevToggle
                label="Publish Status"
                description="When enabled, this post appears immediately on the public /updates page"
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
              Save Update
            </button>
          </div>
        </form>
      </DevModal>
    </div>
  );
};

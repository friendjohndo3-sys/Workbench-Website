import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { ShowcaseProject } from '../../types/content';
import { DevPageHeader } from '../../components/dev/DevPageHeader';
import { DevCard } from '../../components/dev/DevCard';
import { DevStatusBadge } from '../../components/dev/DevStatusBadge';
import { DevModal } from '../../components/dev/DevModal';
import { DevInput, DevTextarea, DevToggle } from '../../components/dev/DevInput';
import {
  Grid,
  Plus,
  Edit,
  Trash2,
  Check,
  ExternalLink,
  Layers,
  Gamepad2,
} from 'lucide-react';

export const DevShowcasePage: React.FC = () => {
  const { content, saveShowcase, deleteShowcase } = useContent();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ShowcaseProject | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form draft state
  const [formData, setFormData] = useState<ShowcaseProject>({
    id: '',
    name: '',
    developer: '',
    description: '',
    previewType: '2D Pixel / Tilemap',
    scriptingLanguage: '.wbscript',
    previewSlotText: '[Gameplay Preview]',
    externalUrl: '',
    tags: ['2D', 'Action'],
    published: true,
  });

  const [rawTags, setRawTags] = useState('2D, Action, Tilemap');

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      id: 'proj-' + Date.now(),
      name: '',
      developer: '',
      description: '',
      previewType: '2D Pixel / Tilemap',
      scriptingLanguage: '.wbscript',
      previewSlotText: '[Gameplay Preview Slot]',
      externalUrl: '',
      tags: ['2D', 'Indie'],
      published: true,
    });
    setRawTags('2D, Indie');
    setModalOpen(true);
  };

  const handleOpenEdit = (project: ShowcaseProject) => {
    setEditingProject(project);
    setFormData({ ...project });
    setRawTags(project.tags ? project.tags.join(', ') : '');
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a project name.');
      return;
    }

    const cleanTags = rawTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    saveShowcase({ ...formData, tags: cleanTags });
    setModalOpen(false);
    setFeedback(`Showcase project "${formData.name}" saved.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from showcase?`)) {
      deleteShowcase(id);
      setFeedback('Project deleted.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleTogglePublish = (project: ShowcaseProject) => {
    const updated = { ...project, published: !project.published };
    saveShowcase(updated);
    setFeedback(`"${project.name}" is now ${updated.published ? 'Published' : 'Draft'}.`);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-6">
      <DevPageHeader
        category="CONTENT"
        title="Showcase Management"
        description="Feature verified indie titles, technical simulations, and open-source games on the public /showcase gallery."
        actions={
          <button
            onClick={handleOpenAdd}
            className="btn-blueprint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Showcase Project</span>
          </button>
        }
      />

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Showcase Grid */}
      <DevCard
        title={`Showcase Projects (${content.showcase.length})`}
        description="Public showcase registry updates in real time"
        noPadding
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-mono uppercase text-neutral-500">
                <th className="py-3 px-4">Project Name</th>
                <th className="py-3 px-4">Developer / Studio</th>
                <th className="py-3 px-4">Pipeline / Scripting</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {content.showcase.map((proj) => (
                <tr key={proj.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-[#0e3052] shrink-0" />
                      <div>
                        <div>{proj.name}</div>
                        <div className="text-[11px] text-neutral-500 font-normal line-clamp-1">{proj.description}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-sans text-neutral-700">
                    {proj.developer}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-600">
                    <div>{proj.previewType}</div>
                    <div className="text-[#0e3052] font-semibold">{proj.scriptingLanguage}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags?.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className="cursor-pointer"
                      title="Toggle showcase visibility"
                    >
                      <DevStatusBadge status={proj.published ? 'published' : 'draft'} size="sm" />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1.5 text-neutral-500 hover:text-[#0e3052] rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id, proj.name)}
                      className="p-1.5 text-neutral-500 hover:text-rose-600 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Delete project"
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

      {/* Modal Dialog for Add/Edit Showcase Project */}
      <DevModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? `Edit Project: ${editingProject.name}` : 'Feature Project in Showcase'}
        subtitle="Manage developer credits, pipeline specs, and external project links"
        maxWidth="xl"
      >
        <form onSubmit={handleSaveModal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <DevInput
                label="Game / Project Title"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Iron Bastion 2D"
                required
              />
            </div>

            <DevInput
              label="Developer or Studio Name"
              value={formData.developer}
              onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
              placeholder="e.g. Solar Forge Games"
              required
            />

            <DevInput
              label="Engine Pipeline"
              value={formData.previewType}
              onChange={(e) => setFormData({ ...formData, previewType: e.target.value })}
              placeholder="e.g. 2D Pixel / Tilemap or 3D PBR"
              required
            />

            <DevInput
              label="Scripting Stack"
              value={formData.scriptingLanguage}
              onChange={(e) => setFormData({ ...formData, scriptingLanguage: e.target.value })}
              placeholder="e.g. .wbscript or Python 3.12"
              required
            />

            <DevInput
              label="External Game / Demo URL (Optional)"
              value={formData.externalUrl || ''}
              onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
              placeholder="https://..."
            />

            <div className="sm:col-span-2">
              <DevTextarea
                label="Project Description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of gameplay mechanics and Workbench features utilized..."
                required
              />
            </div>

            <div className="sm:col-span-2">
              <DevInput
                label="Tags (Comma separated)"
                value={rawTags}
                onChange={(e) => setRawTags(e.target.value)}
                placeholder="2D, Platformer, Physics, Box2D"
              />
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-neutral-200">
              <DevToggle
                label="Public Spotlight Status"
                description="Make this project immediately visible on public /showcase page"
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
              Save Project
            </button>
          </div>
        </form>
      </DevModal>
    </div>
  );
};

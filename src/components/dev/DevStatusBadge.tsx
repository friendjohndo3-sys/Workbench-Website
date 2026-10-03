import React from 'react';

interface DevStatusBadgeProps {
  status: 'published' | 'draft' | 'online' | 'maintenance' | 'degraded' | string;
  label?: string;
  size?: 'sm' | 'md';
}

export const DevStatusBadge: React.FC<DevStatusBadgeProps> = ({
  status,
  label,
  size = 'md',
}) => {
  const normalized = status.toLowerCase();

  let style = 'bg-neutral-100 text-neutral-700 border-neutral-300';
  let dot = 'bg-neutral-500';
  let defaultLabel = status;

  if (normalized === 'published' || normalized === 'online') {
    style = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    dot = 'bg-emerald-600';
    defaultLabel = normalized === 'online' ? 'ONLINE' : 'Published';
  } else if (normalized === 'draft' || normalized === 'preview') {
    style = 'bg-amber-50 text-amber-800 border-amber-300';
    dot = 'bg-amber-600';
    defaultLabel = 'Draft';
  } else if (normalized === 'maintenance' || normalized === 'degraded') {
    style = 'bg-rose-50 text-rose-800 border-rose-300';
    dot = 'bg-rose-600';
    defaultLabel = normalized.toUpperCase();
  }

  const textClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium border rounded ${style} ${textClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      <span>{label || defaultLabel}</span>
    </span>
  );
};

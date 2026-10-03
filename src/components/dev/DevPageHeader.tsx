import React from 'react';

interface DevPageHeaderProps {
  category?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const DevPageHeader: React.FC<DevPageHeaderProps> = ({
  category,
  title,
  description,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
      <div>
        {category && (
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#0e3052] font-semibold mb-1">
            {category}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-sans">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-neutral-600 font-sans mt-1 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
    </div>
  );
};

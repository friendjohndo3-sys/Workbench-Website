import React from 'react';

interface DevCardProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const DevCard: React.FC<DevCardProps> = ({
  title,
  description,
  action,
  children,
  className = '',
  noPadding = false,
}) => {
  return (
    <div className={`bg-white border border-neutral-200 rounded-md shadow-xs ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-bold text-neutral-900 font-sans">{title}</h3>}
            {description && <p className="text-xs text-neutral-500 font-sans mt-0.5">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  );
};

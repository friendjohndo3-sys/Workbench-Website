import React from 'react';

interface DevEmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const DevEmptyState: React.FC<DevEmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-neutral-300 rounded-md bg-neutral-50/50">
      {icon && <div className="text-neutral-400 flex justify-center mb-3">{icon}</div>}
      <h4 className="text-sm font-bold text-neutral-800 font-sans">{title}</h4>
      <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto mt-1 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

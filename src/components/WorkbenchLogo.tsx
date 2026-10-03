import React from 'react';
import { WORKBENCH_ASSETS } from '../assets/workbenchImages';

interface WorkbenchLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'raw';
  alt?: string;
}

export const WorkbenchLogo: React.FC<WorkbenchLogoProps> = ({
  className = '',
  size = 'md',
  alt = 'Workbench Logo',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    raw: 'w-full h-full',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-md shrink-0 border border-cyan-800/40 shadow-sm ${sizeClasses[size]} ${className}`}
      title="Workbench Logo"
    >
      <img
        src={WORKBENCH_ASSETS.LOGO}
        alt={alt}
        className="w-full h-full object-cover object-center select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

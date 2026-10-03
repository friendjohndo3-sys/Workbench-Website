import React from 'react';

interface InputBaseProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export interface DevInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputBaseProps {}

export const DevInput: React.FC<DevInputProps> = ({
  label,
  hint,
  error,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-neutral-800 font-sans">
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
        {hint && <span className="text-[11px] text-neutral-400 font-mono">{hint}</span>}
      </div>
      <input
        {...props}
        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0e3052] focus:border-[#0e3052] transition-colors disabled:bg-neutral-100 disabled:text-neutral-500 ${
          error ? 'border-rose-400' : 'border-neutral-300'
        } ${className}`}
      />
      {error && <p className="text-[11px] text-rose-600 font-sans">{error}</p>}
    </div>
  );
};

export interface DevTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    InputBaseProps {}

export const DevTextarea: React.FC<DevTextareaProps> = ({
  label,
  hint,
  error,
  required,
  className = '',
  rows = 4,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-neutral-800 font-sans">
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
        {hint && <span className="text-[11px] text-neutral-400 font-mono">{hint}</span>}
      </div>
      <textarea
        rows={rows}
        {...props}
        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0e3052] focus:border-[#0e3052] transition-colors leading-relaxed ${
          error ? 'border-rose-400' : 'border-neutral-300'
        } ${className}`}
      />
      {error && <p className="text-[11px] text-rose-600 font-sans">{error}</p>}
    </div>
  );
};

export interface DevSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    InputBaseProps {
  options: { value: string; label: string }[];
}

export const DevSelect: React.FC<DevSelectProps> = ({
  label,
  hint,
  error,
  required,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-neutral-800 font-sans">
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
        {hint && <span className="text-[11px] text-neutral-400 font-mono">{hint}</span>}
      </div>
      <select
        {...props}
        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0e3052] focus:border-[#0e3052] transition-colors ${
          error ? 'border-rose-400' : 'border-neutral-300'
        } ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-rose-600 font-sans">{error}</p>}
    </div>
  );
};

export interface DevToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const DevToggle: React.FC<DevToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <span className="block text-xs font-semibold text-neutral-900 font-sans">{label}</span>
        {description && <p className="text-xs text-neutral-500 font-sans mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e3052] ${
          checked ? 'bg-[#0e3052]' : 'bg-neutral-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-150 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

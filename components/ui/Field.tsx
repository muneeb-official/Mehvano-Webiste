import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border border-line-strong bg-paper px-4 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 disabled:opacity-60";

type FieldWrapProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

export function Field({ label, htmlFor, children, error, hint, required, className }: FieldWrapProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
        {label}
        {required ? <span className="ml-0.5 text-danger">*</span> : null}
      </label>
      {children}
      {hint && !error ? <span className="text-xs text-fg-subtle">{hint}</span> : null}
      {error ? (
        <span className="text-xs font-medium text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlBase, "min-h-28 py-3", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlBase, "h-12 appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  );
}

/** Visually-hidden honeypot input for basic spam filtering. */
export function Honeypot({ name = "company" }: { name?: string }) {
  return (
    <div className="absolute -left-[9999px] top-0" aria-hidden="true">
      <label htmlFor={name}>Company</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

import type { ReactNode } from 'react';
import { ACCENT, type SectionColor } from '../theme';
import { TrashIcon, PlusIcon } from './icons';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-paper-light p-4 shadow-[0_1px_2px_rgba(61,44,33,0.06)] sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function LetterBadge({
  label,
  accent,
  size = 'md',
  active = true,
}: {
  label: string;
  accent: SectionColor;
  size?: 'sm' | 'md';
  active?: boolean;
}) {
  const c = ACCENT[accent];
  const dims = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-10 w-10 text-base';
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl font-serif font-semibold ${dims} ${
        active ? `${c.bgSoft} ${c.text}` : 'bg-ink/5 text-ink-faint'
      }`}
    >
      {label.trim().charAt(0).toUpperCase() || '?'}
    </span>
  );
}

export function SectionHeader({
  accent,
  title,
  count,
  countLabel,
}: {
  accent: SectionColor;
  title: string;
  count: number;
  countLabel: string;
}) {
  const c = ACCENT[accent];
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <LetterBadge label={title} accent={accent} />
        <h1 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          {title}
        </h1>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${c.bgSoft} ${c.text}`}
      >
        {count} {countLabel}
      </span>
    </div>
  );
}

export function AddButton({
  accent,
  children = 'Agregar',
  type = 'submit',
}: {
  accent: SectionColor;
  children?: ReactNode;
  type?: 'submit' | 'button';
}) {
  const c = ACCENT[accent];
  return (
    <button
      type={type}
      className={`flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold text-paper-light shadow-sm transition active:scale-[0.97] ${c.bg}`}
    >
      <PlusIcon className="h-4 w-4" />
      {children}
    </button>
  );
}

export function DeleteButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="shrink-0 rounded-lg p-2 text-ink-faint transition hover:bg-habits-soft hover:text-habits"
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/10 px-6 py-10 text-center">
      <p className="text-sm text-ink-soft">{text}</p>
    </div>
  );
}

export const inputClasses =
  'w-full min-w-0 rounded-xl border border-ink/15 bg-paper-light px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/30 focus:ring-2 focus:ring-ink/10';

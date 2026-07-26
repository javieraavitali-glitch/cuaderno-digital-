import { useState, type FormEvent } from 'react';
import { ACCENT, FIXED_SECTIONS } from '../theme';
import type { CustomSection } from '../types';
import { LetterBadge, inputClasses } from './ui';
import { PlusIcon, TrashIcon } from './icons';

export function Nav({
  active,
  onSelect,
  counts,
  customSections,
  onCreateSection,
  onDeleteSection,
}: {
  active: string;
  onSelect: (id: string) => void;
  counts: Record<string, number>;
  customSections: CustomSection[];
  onCreateSection: (name: string) => void;
  onDeleteSection: (id: string) => void;
}) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateSection(newName.trim());
    setNewName('');
    setCreating(false);
  }

  const allItems = [
    ...FIXED_SECTIONS.map((s) => ({ id: s.id as string, label: s.label, color: s.color, removable: false })),
    ...customSections.map((s) => ({ id: s.id, label: s.name, color: s.color, removable: true })),
  ];

  return (
    <>
      {/* Sidebar: desktop */}
      <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-ink/10 bg-paper-dark/60 px-4 py-6 md:flex">
        <div className="mb-8 px-2">
          <h2 className="font-serif text-lg font-semibold leading-tight text-ink">
            Cuaderno Digital
          </h2>
          <p className="text-xs text-ink-soft">tu espacio personal</p>
        </div>
        <nav className="flex flex-col gap-1.5">
          {allItems.map((item) => {
            const c = ACCENT[item.color];
            const isActive = item.id === active;
            return (
              <div key={item.id} className="group flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                    isActive
                      ? `bg-paper-light shadow-sm ${c.text}`
                      : 'text-ink-soft hover:bg-paper-light/70'
                  }`}
                >
                  <LetterBadge label={item.label} accent={item.color} size="sm" active={isActive} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {counts[item.id] > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${isActive ? c.bgSoft + ' ' + c.text : 'bg-ink/5 text-ink-faint'}`}
                    >
                      {counts[item.id]}
                    </span>
                  )}
                </button>
                {item.removable && (
                  <button
                    type="button"
                    onClick={() => onDeleteSection(item.id)}
                    aria-label={`Borrar sección ${item.label}`}
                    title="Borrar sección"
                    className="hidden shrink-0 rounded-lg p-2 text-ink-faint transition hover:bg-habits-soft hover:text-habits group-hover:block"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-ink/10 pt-4">
          {creating ? (
            <form onSubmit={handleCreate} className="flex flex-col gap-2">
              <input
                autoFocus
                className={`${inputClasses} text-sm`}
                placeholder="Nombre de la sección"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setCreating(false);
                    setNewName('');
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-ink px-3 py-2 text-xs font-bold text-paper-light"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false);
                    setNewName('');
                  }}
                  className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-bold text-ink-soft"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink-soft transition hover:bg-paper-light/70"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-dashed border-ink/25">
                <PlusIcon className="h-3.5 w-3.5" />
              </span>
              Nueva sección
            </button>
          )}
        </div>
      </aside>

      {/* Nav: mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-10 flex gap-1 overflow-x-auto border-t border-ink/10 bg-paper-light/95 px-1 backdrop-blur md:hidden">
        {allItems.map((item) => {
          const c = ACCENT[item.color];
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="flex min-w-[68px] flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold"
            >
              <LetterBadge label={item.label} accent={item.color} size="sm" active={isActive} />
              <span className={`max-w-[72px] truncate ${isActive ? c.text : 'text-ink-faint'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            const name = window.prompt('Nombre de la nueva sección');
            if (name && name.trim()) onCreateSection(name.trim());
          }}
          className="flex min-w-[68px] flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-ink-faint"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-dashed border-ink/25">
            <PlusIcon className="h-3.5 w-3.5" />
          </span>
          Nueva
        </button>
      </nav>
    </>
  );
}

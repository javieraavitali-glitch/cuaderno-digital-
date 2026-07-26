import { useState, type FormEvent } from 'react';
import { ACCENT } from '../../theme';
import type { CustomEntry, CustomEntryStatus, CustomSection } from '../../types';
import { formatDate, generateId } from '../../utils';
import { AddButton, Card, DeleteButton, EmptyState, SectionHeader, inputClasses } from '../ui';

const STATUS_META: Record<CustomEntryStatus, { label: string; dot: string }> = {
  nueva: { label: 'Nueva', dot: 'bg-ink-faint' },
  progreso: { label: 'En progreso', dot: 'bg-music' },
  hecha: { label: 'Hecha', dot: 'bg-ideas' },
};

const STATUS_ORDER: CustomEntryStatus[] = ['nueva', 'progreso', 'hecha'];

export function CustomSectionView({
  section,
  entries,
  onChangeEntries,
}: {
  section: CustomSection;
  entries: CustomEntry[];
  onChangeEntries: (updater: (prev: CustomEntry[]) => CustomEntry[]) => void;
}) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('');

  const activeCount = entries.filter((e) => e.status !== 'hecha').length;

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const entry: CustomEntry = {
      id: generateId(),
      title: title.trim(),
      notes: notes.trim(),
      tag: tag.trim(),
      status: 'nueva',
      createdAt: new Date().toISOString(),
    };
    onChangeEntries((prev) => [entry, ...prev]);
    setTitle('');
    setNotes('');
    setTag('');
  }

  function cycleStatus(id: string) {
    onChangeEntries((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = STATUS_ORDER[(STATUS_ORDER.indexOf(item.status) + 1) % STATUS_ORDER.length];
        return { ...item, status: next };
      }),
    );
  }

  function remove(id: string) {
    onChangeEntries((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <SectionHeader
        accent={section.color}
        title={section.name}
        count={activeCount}
        countLabel="activos"
      />

      <Card className="mb-6">
        <form onSubmit={handleAdd} className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              className={`${inputClasses} sm:flex-1`}
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className={`${inputClasses} sm:flex-1`}
              placeholder="Etiqueta (opcional)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <textarea
            className={`${inputClasses} min-h-16 resize-y`}
            placeholder="Notas (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div>
            <AddButton accent={section.color}>Agregar</AddButton>
          </div>
        </form>
      </Card>

      {entries.length === 0 ? (
        <EmptyState text={`Todavía no agregaste nada en "${section.name}".`} />
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry) => {
            const meta = STATUS_META[entry.status];
            return (
              <li key={entry.id}>
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-base font-semibold text-ink">
                        {entry.title}
                      </p>
                      {entry.notes && (
                        <p className="mt-1 whitespace-pre-wrap text-sm text-ink-soft">
                          {entry.notes}
                        </p>
                      )}
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        {entry.tag && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${ACCENT[section.color].bgSoft} ${ACCENT[section.color].text}`}
                          >
                            {entry.tag}
                          </span>
                        )}
                        <span className="text-xs text-ink-faint">
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => cycleStatus(entry.id)}
                      title="Presiona para cambiar de estado"
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-paper-dark"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </button>
                    <DeleteButton onClick={() => remove(entry.id)} label="Borrar" />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

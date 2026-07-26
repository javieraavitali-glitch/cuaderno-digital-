import { useMemo, useState, type FormEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { StudyNote } from '../../types';
import { formatDate, generateId } from '../../utils';
import { SearchIcon } from '../icons';
import { AddButton, Card, DeleteButton, EmptyState, SectionHeader, inputClasses } from '../ui';

export function Notes() {
  const [notes, setNotes] = useLocalStorage<StudyNote[]>('cuaderno.studyNotes', []);
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [query, setQuery] = useState('');

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const note: StudyNote = {
      id: generateId(),
      text: text.trim(),
      tag: tag.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setText('');
    setTag('');
  }

  function remove(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) => n.text.toLowerCase().includes(q) || n.tag.toLowerCase().includes(q),
    );
  }, [notes, query]);

  return (
    <div>
      <SectionHeader
        accent="notes"
        title="Notas y estudio"
        count={notes.length}
        countLabel="notas"
      />

      <Card className="mb-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-2.5">
          <textarea
            className={`${inputClasses} min-h-20 resize-y`}
            placeholder="Escribe tu nota..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              className={`${inputClasses} sm:flex-1`}
              placeholder='Etiqueta, ej: "IELTS", "CBS", "Bologna"'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <AddButton accent="notes">Agregar nota</AddButton>
          </div>
        </form>
      </Card>

      <div className="relative mb-6">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          className={`${inputClasses} pl-10`}
          placeholder="Buscar por texto o etiqueta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {notes.length === 0 ? (
        <EmptyState text="Todavía no has guardado ninguna nota de estudio." />
      ) : filtered.length === 0 ? (
        <EmptyState text="No hay notas que coincidan con la búsqueda." />
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((note) => (
            <li key={note.id}>
              <Card>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="whitespace-pre-wrap text-base text-ink">{note.text}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {note.tag && (
                        <span className="rounded-full bg-notes-soft px-2.5 py-0.5 text-xs font-bold text-notes">
                          {note.tag}
                        </span>
                      )}
                      <span className="text-xs text-ink-faint">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                  </div>
                  <DeleteButton onClick={() => remove(note.id)} label="Borrar nota" />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

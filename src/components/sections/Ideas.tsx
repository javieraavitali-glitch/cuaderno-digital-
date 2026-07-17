import { useState, type FormEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Idea, IdeaStatus } from '../../types';
import { formatDate, generateId } from '../../utils';
import { AddButton, Card, DeleteButton, EmptyState, SectionHeader, inputClasses } from '../ui';

const STATUS_META: Record<IdeaStatus, { label: string; dot: string }> = {
  nueva: { label: 'Nueva', dot: 'bg-ink-faint' },
  progreso: { label: 'En progreso', dot: 'bg-music' },
  implementada: { label: 'Implementada', dot: 'bg-ideas' },
};

const STATUS_ORDER: IdeaStatus[] = ['nueva', 'progreso', 'implementada'];

export function Ideas() {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('cuaderno.ideas', []);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const activeCount = ideas.filter((i) => i.status !== 'implementada').length;

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const idea: Idea = {
      id: generateId(),
      text: text.trim(),
      category: category.trim(),
      status: 'nueva',
      createdAt: new Date().toISOString(),
    };
    setIdeas((prev) => [idea, ...prev]);
    setText('');
    setCategory('');
  }

  function cycleStatus(id: string) {
    setIdeas((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next = STATUS_ORDER[(STATUS_ORDER.indexOf(i.status) + 1) % STATUS_ORDER.length];
        return { ...i, status: next };
      }),
    );
  }

  function remove(id: string) {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <SectionHeader
        accent="ideas"
        icon="💡"
        title="Ideas de productividad"
        count={activeCount}
        countLabel="activas"
      />

      <Card className="mb-6">
        <form onSubmit={handleAdd} className="flex flex-col gap-2.5 sm:flex-row">
          <input
            className={`${inputClasses} sm:flex-[2]`}
            placeholder="Escribí tu idea..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder="Categoría (opcional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <AddButton accent="ideas">Agregar</AddButton>
        </form>
      </Card>

      {ideas.length === 0 ? (
        <EmptyState icon="✨" text="Anotá tu primera idea de productividad." />
      ) : (
        <ul className="flex flex-col gap-3">
          {ideas.map((idea) => {
            const meta = STATUS_META[idea.status];
            return (
              <li key={idea.id}>
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-base text-ink">{idea.text}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        {idea.category && (
                          <span className="rounded-full bg-ideas-soft px-2.5 py-0.5 text-xs font-bold text-ideas">
                            {idea.category}
                          </span>
                        )}
                        <span className="text-xs text-ink-faint">
                          {formatDate(idea.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => cycleStatus(idea.id)}
                      title="Click para cambiar de estado"
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-paper-dark"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </button>
                    <DeleteButton onClick={() => remove(idea.id)} label="Borrar idea" />
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

import { useState, type FormEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Book, BookStatus } from '../../types';
import { generateId } from '../../utils';
import { AddButton, Card, DeleteButton, EmptyState, SectionHeader, inputClasses } from '../ui';

const STATUS_META: Record<BookStatus, { label: string; dot: string }> = {
  pendiente: { label: 'Pendiente', dot: 'bg-ink-faint' },
  leyendo: { label: 'Leyendo', dot: 'bg-music' },
  leido: { label: 'Leído', dot: 'bg-ideas' },
};

const STATUS_ORDER: BookStatus[] = ['pendiente', 'leyendo', 'leido'];

export function Books() {
  const [books, setBooks] = useLocalStorage<Book[]>('cuaderno.books', []);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const pendingCount = books.filter((b) => b.status === 'pendiente').length;

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const book: Book = {
      id: generateId(),
      title: title.trim(),
      author: author.trim(),
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };
    setBooks((prev) => [book, ...prev]);
    setTitle('');
    setAuthor('');
  }

  function cycleStatus(id: string) {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const next = STATUS_ORDER[(STATUS_ORDER.indexOf(b.status) + 1) % STATUS_ORDER.length];
        return { ...b, status: next };
      }),
    );
  }

  function remove(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div>
      <SectionHeader
        accent="books"
        icon="📚"
        title="Libros"
        count={pendingCount}
        countLabel="pendientes"
      />

      <Card className="mb-6">
        <form onSubmit={handleAdd} className="flex flex-col gap-2.5 sm:flex-row">
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder="Título del libro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder="Autor (opcional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <AddButton accent="books">Agregar</AddButton>
        </form>
      </Card>

      {books.length === 0 ? (
        <EmptyState icon="📖" text="Todavía no agregaste ningún libro." />
      ) : (
        <ul className="flex flex-col gap-3">
          {books.map((book) => {
            const meta = STATUS_META[book.status];
            return (
              <li key={book.id}>
                <Card className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold text-ink">
                      {book.title}
                    </p>
                    {book.author && (
                      <p className="truncate text-sm italic text-ink-soft">
                        {book.author}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => cycleStatus(book.id)}
                    title="Click para cambiar de estado"
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-paper-dark"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </button>
                  <DeleteButton onClick={() => remove(book.id)} label="Borrar libro" />
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

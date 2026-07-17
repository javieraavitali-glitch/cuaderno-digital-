import { useState, type FormEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Song } from '../../types';
import { generateId } from '../../utils';
import { AddButton, Card, DeleteButton, EmptyState, SectionHeader, inputClasses } from '../ui';

export function Music() {
  const [songs, setSongs] = useLocalStorage<Song[]>('cuaderno.songs', []);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [mood, setMood] = useState('');

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const song: Song = {
      id: generateId(),
      title: title.trim(),
      artist: artist.trim(),
      mood: mood.trim(),
      createdAt: new Date().toISOString(),
    };
    setSongs((prev) => [song, ...prev]);
    setTitle('');
    setArtist('');
    setMood('');
  }

  function remove(id: string) {
    setSongs((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <SectionHeader
        accent="music"
        icon="🎵"
        title="Música / Playlist"
        count={songs.length}
        countLabel="canciones"
      />

      <Card className="mb-6">
        <form onSubmit={handleAdd} className="flex flex-col gap-2.5 sm:flex-row">
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder="Título de la canción"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder="Artista (opcional)"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder='Mood, ej: "para entrenar"'
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <AddButton accent="music">Agregar</AddButton>
        </form>
      </Card>

      {songs.length === 0 ? (
        <EmptyState icon="🎧" text="Tu playlist está vacía por ahora." />
      ) : (
        <ul className="flex flex-col gap-3">
          {songs.map((song) => (
            <li key={song.id}>
              <Card className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-base font-semibold text-ink">
                    {song.title}
                  </p>
                  {song.artist && (
                    <p className="truncate text-sm italic text-ink-soft">
                      {song.artist}
                    </p>
                  )}
                </div>
                {song.mood && (
                  <span className="shrink-0 rounded-full bg-music-soft px-3 py-1 text-xs font-bold text-music">
                    {song.mood}
                  </span>
                )}
                <DeleteButton onClick={() => remove(song.id)} label="Borrar canción" />
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

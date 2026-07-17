import { useLocalStorage } from './hooks/useLocalStorage';
import { Nav } from './components/Nav';
import { Books } from './components/sections/Books';
import { Music } from './components/sections/Music';
import { Ideas } from './components/sections/Ideas';
import { Habits } from './components/sections/Habits';
import { Notes } from './components/sections/Notes';
import { todayISO } from './utils';
import type { SectionId } from './theme';
import type { Book, Habit, Idea, Song, StudyNote } from './types';

function App() {
  const [active, setActive] = useLocalStorage<SectionId>('cuaderno.activeTab', 'books');

  const [books] = useLocalStorage<Book[]>('cuaderno.books', []);
  const [songs] = useLocalStorage<Song[]>('cuaderno.songs', []);
  const [ideas] = useLocalStorage<Idea[]>('cuaderno.ideas', []);
  const [habits] = useLocalStorage<Habit[]>('cuaderno.habits', []);
  const [notes] = useLocalStorage<StudyNote[]>('cuaderno.studyNotes', []);
  const today = todayISO();

  const counts: Record<SectionId, number> = {
    books: books.filter((b) => b.status === 'pendiente').length,
    music: songs.length,
    ideas: ideas.filter((i) => i.status !== 'implementada').length,
    habits: habits.filter((h) => h.completedDates.includes(today)).length,
    notes: notes.length,
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Nav active={active} onSelect={setActive} counts={counts} />
      <main className="flex-1 px-4 pb-24 pt-6 sm:px-8 sm:pt-8 md:pb-8">
        <div className="mx-auto max-w-3xl">
          {active === 'books' && <Books />}
          {active === 'music' && <Music />}
          {active === 'ideas' && <Ideas />}
          {active === 'habits' && <Habits />}
          {active === 'notes' && <Notes />}
        </div>
      </main>
    </div>
  );
}

export default App;

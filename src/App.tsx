import { useLocalStorage } from './hooks/useLocalStorage';
import { Nav } from './components/Nav';
import { Habits } from './components/sections/Habits';
import { Notes } from './components/sections/Notes';
import { CustomSectionView } from './components/sections/CustomSectionView';
import { generateId, todayISO } from './utils';
import { colorForIndex } from './theme';
import type { CustomEntry, CustomSection, Habit, StudyNote } from './types';

function App() {
  const [active, setActive] = useLocalStorage<string>('cuaderno.activeTab', 'habits');

  const [habits] = useLocalStorage<Habit[]>('cuaderno.habits', []);
  const [notes] = useLocalStorage<StudyNote[]>('cuaderno.studyNotes', []);
  const [customSections, setCustomSections] = useLocalStorage<CustomSection[]>(
    'cuaderno.customSections',
    [],
  );
  const [customEntries, setCustomEntries] = useLocalStorage<Record<string, CustomEntry[]>>(
    'cuaderno.customEntries',
    {},
  );
  const today = todayISO();

  const counts: Record<string, number> = {
    habits: habits.filter((h) => h.completedDates.includes(today)).length,
    notes: notes.length,
  };
  for (const section of customSections) {
    const entries = customEntries[section.id] ?? [];
    counts[section.id] = entries.filter((e) => e.status !== 'hecha').length;
  }

  function createSection(name: string) {
    const section: CustomSection = {
      id: generateId(),
      name,
      color: colorForIndex(customSections.length),
      createdAt: new Date().toISOString(),
    };
    setCustomSections((prev) => [...prev, section]);
    setActive(section.id);
  }

  function deleteSection(id: string) {
    setCustomSections((prev) => prev.filter((s) => s.id !== id));
    setCustomEntries((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (active === id) setActive('habits');
  }

  const activeCustomSection = customSections.find((s) => s.id === active);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Nav
        active={active}
        onSelect={setActive}
        counts={counts}
        customSections={customSections}
        onCreateSection={createSection}
        onDeleteSection={deleteSection}
      />
      <main className="flex-1 px-4 pb-24 pt-6 sm:px-8 sm:pt-8 md:pb-8">
        <div className="mx-auto max-w-3xl">
          {active === 'habits' && <Habits />}
          {active === 'notes' && <Notes />}
          {activeCustomSection && (
            <CustomSectionView
              section={activeCustomSection}
              entries={customEntries[activeCustomSection.id] ?? []}
              onChangeEntries={(updater) =>
                setCustomEntries((prev) => ({
                  ...prev,
                  [activeCustomSection.id]: updater(prev[activeCustomSection.id] ?? []),
                }))
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

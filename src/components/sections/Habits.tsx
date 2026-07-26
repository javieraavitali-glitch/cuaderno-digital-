import { useState, type FormEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Habit } from '../../types';
import { calculateStreak, generateId, todayISO } from '../../utils';
import { FlameIcon } from '../icons';
import { AddButton, Card, DeleteButton, EmptyState, SectionHeader, inputClasses } from '../ui';

export function Habits() {
  const [habits, setHabits] = useLocalStorage<Habit[]>('cuaderno.habits', []);
  const [name, setName] = useState('');
  const today = todayISO();

  const doneTodayCount = habits.filter((h) => h.completedDates.includes(today)).length;

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const habit: Habit = {
      id: generateId(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [habit, ...prev]);
    setName('');
  }

  function toggleToday(id: string) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const done = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: done
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      }),
    );
  }

  function remove(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <div>
      <SectionHeader
        accent="habits"
        title="Hábitos de salud y gym"
        count={doneTodayCount}
        countLabel="hechos hoy"
      />

      <Card className="mb-6">
        <form onSubmit={handleAdd} className="flex flex-col gap-2.5 sm:flex-row">
          <input
            className={`${inputClasses} sm:flex-1`}
            placeholder='Nuevo hábito, ej: "tomar agua"'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AddButton accent="habits">Agregar</AddButton>
        </form>
      </Card>

      {habits.length === 0 ? (
        <EmptyState text="Agrega tu primer hábito para empezar a registrarlo." />
      ) : (
        <ul className="flex flex-col gap-3">
          {habits.map((habit) => {
            const doneToday = habit.completedDates.includes(today);
            const streak = calculateStreak(habit.completedDates);
            return (
              <li key={habit.id}>
                <Card className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold text-ink">
                      {habit.name}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs font-bold text-habits">
                      <FlameIcon className="h-3.5 w-3.5" />
                      <span>
                        {streak} {streak === 1 ? 'día seguido' : 'días seguidos'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleToday(habit.id)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      doneToday
                        ? 'bg-habits text-paper-light'
                        : 'border border-ink/15 bg-paper text-ink-soft hover:bg-paper-dark'
                    }`}
                  >
                    {doneToday ? 'Hecho hoy' : 'Marcar hoy'}
                  </button>
                  <DeleteButton onClick={() => remove(habit.id)} label="Borrar hábito" />
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

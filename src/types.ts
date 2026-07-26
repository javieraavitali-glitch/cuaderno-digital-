import type { SectionColor } from './theme';

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
}

export interface StudyNote {
  id: string;
  text: string;
  tag: string;
  createdAt: string;
}

export interface CustomSection {
  id: string;
  name: string;
  color: SectionColor;
  createdAt: string;
}

export type CustomEntryStatus = 'nueva' | 'progreso' | 'hecha';

export interface CustomEntry {
  id: string;
  title: string;
  notes: string;
  tag: string;
  status: CustomEntryStatus;
  createdAt: string;
}

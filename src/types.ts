export type BookStatus = 'pendiente' | 'leyendo' | 'leido';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  mood: string;
  createdAt: string;
}

export type IdeaStatus = 'nueva' | 'progreso' | 'implementada';

export interface Idea {
  id: string;
  text: string;
  category: string;
  status: IdeaStatus;
  createdAt: string;
}

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

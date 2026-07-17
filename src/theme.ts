export type SectionId = 'books' | 'music' | 'ideas' | 'habits' | 'notes';

interface AccentClasses {
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  ring: string;
  hoverBg: string;
}

// Nota: las clases quedan como strings literales completos (no se arman con
// template literals) para que el scanner de Tailwind las detecte en build.
export const ACCENT: Record<SectionId, AccentClasses> = {
  books: {
    text: 'text-books',
    bg: 'bg-books',
    bgSoft: 'bg-books-soft',
    border: 'border-books',
    ring: 'ring-books',
    hoverBg: 'hover:bg-books-soft',
  },
  music: {
    text: 'text-music',
    bg: 'bg-music',
    bgSoft: 'bg-music-soft',
    border: 'border-music',
    ring: 'ring-music',
    hoverBg: 'hover:bg-music-soft',
  },
  ideas: {
    text: 'text-ideas',
    bg: 'bg-ideas',
    bgSoft: 'bg-ideas-soft',
    border: 'border-ideas',
    ring: 'ring-ideas',
    hoverBg: 'hover:bg-ideas-soft',
  },
  habits: {
    text: 'text-habits',
    bg: 'bg-habits',
    bgSoft: 'bg-habits-soft',
    border: 'border-habits',
    ring: 'ring-habits',
    hoverBg: 'hover:bg-habits-soft',
  },
  notes: {
    text: 'text-notes',
    bg: 'bg-notes',
    bgSoft: 'bg-notes-soft',
    border: 'border-notes',
    ring: 'ring-notes',
    hoverBg: 'hover:bg-notes-soft',
  },
};

export const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'books', label: 'Libros', icon: '📚' },
  { id: 'music', label: 'Música', icon: '🎵' },
  { id: 'ideas', label: 'Ideas', icon: '💡' },
  { id: 'habits', label: 'Hábitos', icon: '💪' },
  { id: 'notes', label: 'Notas', icon: '📝' },
];

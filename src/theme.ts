export type FixedSectionId = 'habits' | 'notes';

export type SectionColor =
  | 'books'
  | 'music'
  | 'ideas'
  | 'habits'
  | 'notes'
  | 'clay'
  | 'moss'
  | 'berry'
  | 'ochre'
  | 'slate'
  | 'teal';

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
export const ACCENT: Record<SectionColor, AccentClasses> = {
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
  clay: {
    text: 'text-clay',
    bg: 'bg-clay',
    bgSoft: 'bg-clay-soft',
    border: 'border-clay',
    ring: 'ring-clay',
    hoverBg: 'hover:bg-clay-soft',
  },
  moss: {
    text: 'text-moss',
    bg: 'bg-moss',
    bgSoft: 'bg-moss-soft',
    border: 'border-moss',
    ring: 'ring-moss',
    hoverBg: 'hover:bg-moss-soft',
  },
  berry: {
    text: 'text-berry',
    bg: 'bg-berry',
    bgSoft: 'bg-berry-soft',
    border: 'border-berry',
    ring: 'ring-berry',
    hoverBg: 'hover:bg-berry-soft',
  },
  ochre: {
    text: 'text-ochre',
    bg: 'bg-ochre',
    bgSoft: 'bg-ochre-soft',
    border: 'border-ochre',
    ring: 'ring-ochre',
    hoverBg: 'hover:bg-ochre-soft',
  },
  slate: {
    text: 'text-slate',
    bg: 'bg-slate',
    bgSoft: 'bg-slate-soft',
    border: 'border-slate',
    ring: 'ring-slate',
    hoverBg: 'hover:bg-slate-soft',
  },
  teal: {
    text: 'text-teal',
    bg: 'bg-teal',
    bgSoft: 'bg-teal-soft',
    border: 'border-teal',
    ring: 'ring-teal',
    hoverBg: 'hover:bg-teal-soft',
  },
};

// Colores que se van asignando por turno a cada sección nueva que el
// usuario crea (en orden, sin repetir hasta dar la vuelta completa).
export const CUSTOM_COLOR_ORDER: SectionColor[] = [
  'books',
  'music',
  'ideas',
  'clay',
  'moss',
  'berry',
  'ochre',
  'slate',
  'teal',
];

export function colorForIndex(index: number): SectionColor {
  return CUSTOM_COLOR_ORDER[index % CUSTOM_COLOR_ORDER.length];
}

export const FIXED_SECTIONS: { id: FixedSectionId; label: string; color: SectionColor }[] = [
  { id: 'habits', label: 'Hábitos', color: 'habits' },
  { id: 'notes', label: 'Notas', color: 'notes' },
];

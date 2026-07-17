export function generateId(): string {
  return crypto.randomUUID();
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Cuenta días consecutivos hasta hoy (o hasta ayer si hoy todavía no se marcó,
 * ya que el día en curso no debe "romper" la racha antes de terminar).
 */
export function calculateStreak(completedDates: string[]): number {
  const done = new Set(completedDates);
  const cursor = new Date();
  if (!done.has(toISODate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (done.has(toISODate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

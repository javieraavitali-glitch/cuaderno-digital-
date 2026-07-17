import { ACCENT, SECTIONS, type SectionId } from '../theme';

export function Nav({
  active,
  onSelect,
  counts,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  counts: Record<SectionId, number>;
}) {
  return (
    <>
      {/* Sidebar: desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/10 bg-paper-dark/60 px-4 py-6 md:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="text-2xl">📓</span>
          <div>
            <h2 className="font-serif text-lg font-semibold leading-tight text-ink">
              Cuaderno Digital
            </h2>
            <p className="text-xs text-ink-soft">tu espacio personal</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          {SECTIONS.map((s) => {
            const c = ACCENT[s.id];
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s.id)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  isActive
                    ? `bg-paper-light shadow-sm ${c.text}`
                    : 'text-ink-soft hover:bg-paper-light/70'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition ${isActive ? c.bg : 'bg-ink/15'}`}
                />
                <span className="text-lg leading-none">{s.icon}</span>
                <span className="flex-1">{s.label}</span>
                {counts[s.id] > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${isActive ? c.bgSoft + ' ' + c.text : 'bg-ink/5 text-ink-faint'}`}
                  >
                    {counts[s.id]}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Bottom nav: mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-ink/10 bg-paper-light/95 backdrop-blur md:hidden">
        {SECTIONS.map((s) => {
          const c = ACCENT[s.id];
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-base transition ${isActive ? c.bgSoft : ''}`}
              >
                {s.icon}
              </span>
              <span className={isActive ? c.text : 'text-ink-faint'}>
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

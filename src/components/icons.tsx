type IconProps = { className?: string };

export function TrashIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m-6.5 0 .6 10.2A1.5 1.5 0 0 0 7.6 17.5h4.8a1.5 1.5 0 0 0 1.5-1.3L14.5 6" />
      <path d="M8.3 9.3v5M11.7 9.3v5" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8.8" cy="8.8" r="5.3" />
      <path d="m16.5 16.5-3.6-3.6" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M10 4.5v11M4.5 10h11" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.5 2.2c.3 2 1.7 3 2.9 4.4 1.3 1.5 2.1 3 2.1 4.9a5.5 5.5 0 1 1-11 0c0-1.3.4-2.3 1-3.2.2.9.8 1.6 1.6 1.6.9 0 1.4-.8 1.1-1.7-.5-1.6-.2-3.6 1.4-5.3.3-.4.9-.2.9.3-.1.4-.1.7 0 1z" />
    </svg>
  );
}

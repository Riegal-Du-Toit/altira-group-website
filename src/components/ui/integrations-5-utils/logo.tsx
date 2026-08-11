export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3c5 0 9 4 9 9 0 3.9-2.5 7.3-6 8.5v-3a5.8 5.8 0 0 0 3-5.5 6 6 0 1 0-12 0 5.8 5.8 0 0 0 3 5.5v3A9 9 0 0 1 12 3Z"
        fill="currentColor"
      />
      <path
        d="M9.2 20.5v-6c0-1.7 1.2-3 2.8-3s2.8 1.3 2.8 3v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

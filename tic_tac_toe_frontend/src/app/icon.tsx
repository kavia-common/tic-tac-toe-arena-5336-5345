export default function Icon() {
  // PUBLIC_INTERFACE
  /** App Router icon component for favicon generation.
   * Next.js will use this to serve /favicon.ico automatically.
   */
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect width="32" height="32" rx="6" fill="#ffffff" />
      <g stroke="#e6eaf0" strokeWidth="2">
        <line x1="11" y1="4" x2="11" y2="28" />
        <line x1="21" y1="4" x2="21" y2="28" />
        <line x1="4" y1="11" x2="28" y2="11" />
        <line x1="4" y1="21" x2="28" y2="21" />
      </g>
      <g fill="none" strokeWidth="3" strokeLinecap="round">
        <g stroke="#0070f3">
          <line x1="6" y1="6" x2="14" y2="14" />
          <line x1="14" y1="6" x2="6" y2="14" />
        </g>
        <circle cx="25" cy="25" r="5" stroke="#1db954" />
      </g>
    </svg>
  );
}

export function HangerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 4C10.34 4 9 5.34 9 7V7.5C6.5 8.5 4.5 10.8 4.5 13.5H3L12 21L21 13.5H19.5C19.5 10.8 17.5 8.5 15 7.5V7C15 5.34 13.66 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4V2.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  )
}

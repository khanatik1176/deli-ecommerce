import type { ReactNode } from "react";

const icon = "size-[22px]";

const socials: { label: string; href: string; svg: ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={icon}
        aria-hidden="true"
      >
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={icon}
        aria-hidden="true"
      >
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="2"
          fill="currentColor"
          stroke="none"
        />
        <circle cx="12" cy="12" r="3.6" stroke="#fff" />
        <circle cx="17" cy="7" r="0.6" fill="#fff" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    svg: (
      <svg viewBox="0 0 24 24" className={icon} aria-hidden="true">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="2"
          fill="currentColor"
        />
        <path
          d="M13.3 7h1.6c.2 1.2 1 2 2.2 2.1v1.6a3.9 3.9 0 0 1-2.2-.7v3.6a3 3 0 1 1-3-3v1.6a1.4 1.4 0 1 0 1.4 1.4V7z"
          fill="#fff"
        />
      </svg>
    ),
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-8 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-neutral-500 transition hover:text-neutral-950"
          >
            {s.svg}
          </a>
        </li>
      ))}
    </ul>
  );
}

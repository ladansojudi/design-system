import { cn } from "@/lib/utils";

// Sentinel mark: a shield with a single watch-point — minimal enough to read
// at 16px, coloured by the brand token so it follows the theme.
export function SentinelMark({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("shrink-0 text-snt-brand-primary-600", className)}
    >
      <path
        d="M12 2.5 4.5 5.4v6.1c0 4.6 3.1 8.6 7.5 10 4.4-1.4 7.5-5.4 7.5-10V5.4L12 2.5Z"
        fill="currentColor"
      />
      <circle cx="12" cy="11.5" r="2.6" className="fill-snt-surface-app" />
    </svg>
  );
}

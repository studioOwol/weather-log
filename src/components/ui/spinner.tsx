import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  variant?: "sun" | "circle"
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
}

export function Spinner({ size = "md", className, variant = "sun" }: SpinnerProps) {
  if (variant === "sun") {
    return (
      <div className={cn("relative inline-block", sizeClasses[size], className)}>
        <svg
          className="animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Center circle */}
          <circle
            cx="12"
            cy="12"
            r="3"
            fill="currentColor"
            className="text-primary"
          />
          {/* Sun rays */}
          <g className="text-primary/60">
            <line x1="12" y1="1" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    )
  }

  // Circle variant
  return (
    <div className={cn("relative inline-block", sizeClasses[size], className)}>
      <svg
        className="animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

// Loading overlay component for full-screen loading
interface LoadingOverlayProps {
  message?: string
  className?: string
}

export function LoadingOverlay({ message, className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8",
        className
      )}
    >
      <Spinner size="lg" variant="sun" />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  )
}

// Inline loading component
interface LoadingInlineProps {
  message?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function LoadingInline({ message, size = "sm", className }: LoadingInlineProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Spinner size={size} variant="sun" />
      {message && <span className="text-sm text-muted-foreground">{message}</span>}
    </div>
  )
}

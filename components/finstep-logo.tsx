import { cn } from "@/lib/utils";

interface FinstepLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
};

/** Finstep logo: ascending steps (one step at a time) + finstep.app wordmark */
export function FinstepLogo({ className, size = "md", showText = true }: FinstepLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full bg-finstep-brown dark:bg-foreground flex items-center justify-center shrink-0",
          sizes[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "text-white",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5",
            size === "lg" && "w-6 h-6",
            size === "xl" && "w-7 h-7"
          )}
          fill="currentColor"
        >
          {/* Ascending steps - finstep "one step at a time" */}
          <rect x="4" y="16" width="5" height="4" rx="0.5" />
          <rect x="6" y="12" width="5" height="4" rx="0.5" />
          <rect x="8" y="8" width="5" height="4" rx="0.5" />
          <rect x="10" y="4" width="5" height="4" rx="0.5" />
        </svg>
      </div>
      {showText && (
        <span className="font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          finstep<span className="text-finstep-orange">.app</span>
        </span>
      )}
    </div>
  );
}

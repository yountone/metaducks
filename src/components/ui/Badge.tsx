import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "pin" | "direct" | "underFaceValue" | "verified" | "premium";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded",
        {
          "bg-surface text-text-secondary border border-border":
            variant === "default",
          "bg-blue-50 text-blue-700 border border-blue-200": variant === "pin",
          "bg-green-50 text-green-700 border border-green-200":
            variant === "direct",
          "bg-accent-red/10 text-accent-red border border-accent-red/20":
            variant === "underFaceValue",
          "bg-success/10 text-success border border-success/20":
            variant === "verified",
          "bg-primary-light text-primary border border-primary/20":
            variant === "premium",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

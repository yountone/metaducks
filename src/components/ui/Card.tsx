import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-border rounded-xl p-4",
        onClick && "cursor-pointer hover:border-primary/30 transition-colors",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

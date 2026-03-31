import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "danger" | "info" | "neutral";

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string }> = {
  success: { bg: "bg-success/10", text: "text-success", dot: "bg-success", label: "Completed" },
  warning: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning", label: "Pending" },
  danger: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive", label: "Blocked" },
  info: { bg: "bg-info/10", text: "text-info", dot: "bg-info", label: "In Progress" },
  neutral: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground", label: "Unknown" },
};

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {label || config.label}
    </span>
  );
}

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({ label, value, change, changeType = "neutral", icon: Icon, className }: MetricCardProps) {
  return (
    <div className={cn("glass-card rounded-xl p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-label font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        {Icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </div>
        )}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      {change && (
        <span className={cn(
          "mt-1 inline-block text-data-sm",
          changeType === "positive" && "text-success",
          changeType === "negative" && "text-destructive",
          changeType === "neutral" && "text-muted-foreground"
        )}>
          {change}
        </span>
      )}
    </div>
  );
}

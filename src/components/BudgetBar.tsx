import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BudgetBarProps {
  label: string;
  percent: number;
  className?: string;
}

export function BudgetBar({ label, percent, className }: BudgetBarProps) {
  const color =
    percent >= 80 ? "bg-destructive" : percent >= 60 ? "bg-warning" : "bg-success";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-data-sm text-muted-foreground">{label}</span>
        <span className="text-data-sm font-mono font-medium text-foreground">
          {percent}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ boxShadow: `0 0 8px hsl(var(--${percent >= 80 ? 'destructive' : percent >= 60 ? 'warning' : 'success'}) / 0.4)` }}
        />
      </div>
    </div>
  );
}

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
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-data-sm text-muted-foreground">{label}</span>
        <span className="text-data-sm font-mono font-medium text-foreground">
          {percent}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

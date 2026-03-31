import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WorkspaceCardProps {
  name: string;
  status: "on-track" | "attention" | "critical";
  activeTasks: number;
  overdue: number;
  onClick?: () => void;
}

const statusDot = {
  "on-track": "bg-success",
  attention: "bg-warning",
  critical: "bg-destructive",
};

const statusLabel = {
  "on-track": "On track",
  attention: "Needs attention",
  critical: "Critical",
};

export function WorkspaceCard({ name, status, activeTasks, overdue, onClick }: WorkspaceCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-surface-hover"
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", statusDot[status])} />
        <span className="text-data font-medium text-foreground">{name}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-4">
        <div>
          <span className="font-mono text-2xl font-semibold text-foreground">{activeTasks}</span>
          <span className="ml-1 text-data-sm text-muted-foreground">active</span>
        </div>
        {overdue > 0 && (
          <div>
            <span className="font-mono text-lg font-semibold text-warning">{overdue}</span>
            <span className="ml-1 text-data-sm text-muted-foreground">overdue</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{statusLabel[status]}</p>
    </motion.button>
  );
}

import { motion } from "framer-motion";
import { X, AlertTriangle, Clock, DollarSign, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AttentionItem {
  id: string;
  type: "overdue" | "budget" | "checkin" | "alert";
  workspace: string;
  message: string;
  age: string;
}

const iconMap = {
  overdue: Clock,
  budget: DollarSign,
  checkin: UserX,
  alert: AlertTriangle,
};

const typeColor = {
  overdue: "text-warning",
  budget: "text-destructive",
  checkin: "text-warning",
  alert: "text-destructive",
};

interface AttentionCardProps {
  item: AttentionItem;
  onDismiss: (id: string) => void;
}

export function AttentionCard({ item, onDismiss }: AttentionCardProps) {
  const Icon = iconMap[item.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-surface-hover"
    >
      <div className={cn("mt-0.5 shrink-0", typeColor[item.type])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-data text-foreground">{item.message}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {item.workspace}
          </span>
          <span className="text-[11px] text-muted-foreground">{item.age}</span>
        </div>
      </div>
      <button
        onClick={() => onDismiss(item.id)}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

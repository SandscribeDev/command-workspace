import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GanttTask {
  id: string;
  title: string;
  workspace: string;
  assignee: string;
  startDay: number;
  duration: number;
  status: "success" | "info" | "warning" | "danger";
}

const tasks: GanttTask[] = [
  { id: "1", title: "Foundation work", workspace: "Charity Kenya", assignee: "Amina H", startDay: 0, duration: 5, status: "success" },
  { id: "2", title: "Berm walls", workspace: "Charity Kenya", assignee: "Mohamed A", startDay: 3, duration: 8, status: "warning" },
  { id: "3", title: "Roof repair Block B", workspace: "Charity Kenya", assignee: "Mohamed A", startDay: 7, duration: 4, status: "info" },
  { id: "4", title: "Borehole inspection", workspace: "Charity Kenya", assignee: "Fatima J", startDay: 10, duration: 2, status: "warning" },
  { id: "5", title: "Product sourcing", workspace: "FBA Business", assignee: "FBA Mgr", startDay: 1, duration: 6, status: "success" },
  { id: "6", title: "Product photography", workspace: "FBA Business", assignee: "—", startDay: 6, duration: 3, status: "danger" },
  { id: "7", title: "Listing optimization", workspace: "FBA Business", assignee: "FBA Mgr", startDay: 8, duration: 5, status: "info" },
  { id: "8", title: "Inventory restock", workspace: "Local Shop", assignee: "—", startDay: 2, duration: 2, status: "success" },
];

const totalDays = 14;
const dayLabels = Array.from({ length: totalDays }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
});

const barColor: Record<string, string> = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-destructive",
};

const GanttPage = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Timeline</h1>
          <p className="mt-1 text-data-sm text-muted-foreground">Gantt-style project timeline across all workspaces</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <div style={{ minWidth: 900 }}>
            {/* Header */}
            <div className="flex border-b border-border">
              <div className="w-56 shrink-0 border-r border-border px-4 py-2.5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Task</span>
              </div>
              <div className="flex flex-1">
                {dayLabels.map((label, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 border-r border-border px-1 py-2.5 text-center text-[10px] text-muted-foreground",
                      i === 0 && "bg-primary/5 font-medium text-primary"
                    )}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            {tasks.map((task, idx) => (
              <div
                key={task.id}
                className={cn(
                  "flex border-b border-border transition-colors",
                  hoveredId === task.id && "bg-surface-hover",
                  idx % 2 === 1 && "bg-surface-2/30"
                )}
                onMouseEnter={() => setHoveredId(task.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Label */}
                <div className="w-56 shrink-0 border-r border-border px-4 py-3">
                  <div className="text-data-sm font-medium text-foreground">{task.title}</div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{task.assignee}</span>
                    <StatusBadge status={task.status} className="text-[9px] px-1.5 py-0" />
                  </div>
                </div>

                {/* Chart area */}
                <div className="relative flex flex-1">
                  {/* Grid lines */}
                  {dayLabels.map((_, i) => (
                    <div key={i} className={cn("flex-1 border-r border-border", i === 0 && "bg-primary/5")} />
                  ))}

                  {/* Bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: `${(task.startDay / totalDays) * 100}%`,
                      width: `${(task.duration / totalDays) * 100}%`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      transformOrigin: "left",
                    }}
                    className={cn("h-6 rounded-md", barColor[task.status], "opacity-80")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GanttPage;

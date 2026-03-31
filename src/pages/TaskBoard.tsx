import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, X, User, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type TaskStatus = "pending" | "in_progress" | "completed" | "blocked";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  due: string;
  assigned: string;
  workspace: string;
  project: string;
  description: string;
}

const mockTasks: Task[] = [
  { id: "1", title: "Submit progress report", status: "pending", due: "Apr 5", assigned: "Amina H", workspace: "Charity Kenya", project: "Block B Housing", description: "Weekly progress report for Block B construction. Include photos of foundation work." },
  { id: "2", title: "Fix roof Block B", status: "in_progress", due: "Apr 12", assigned: "Mohamed A", workspace: "Charity Kenya", project: "Block B Housing", description: "Repair damaged roofing on units 3-5. Materials already procured." },
  { id: "3", title: "Buy materials list", status: "completed", due: "Mar 30", assigned: "Amina H", workspace: "Charity Kenya", project: "Block B Housing", description: "Purchase all items on the Q2 materials requisition list." },
  { id: "4", title: "Borehole inspection", status: "pending", due: "Apr 8", assigned: "—", workspace: "Charity Kenya", project: "Water Supply", description: "Schedule and conduct borehole water quality inspection." },
  { id: "5", title: "Invoice submission", status: "pending", due: "Apr 1", assigned: "Mohamed A", workspace: "FBA Business", project: "Supplier Payments", description: "Submit Q1 invoices to supplier portal before deadline." },
  { id: "6", title: "Product photography", status: "blocked", due: "Apr 3", assigned: "—", workspace: "FBA Business", project: "New Listings", description: "Blocked — waiting for sample products to arrive from supplier." },
];

const statusMap: Record<TaskStatus, { badge: "warning" | "info" | "success" | "danger"; label: string }> = {
  pending: { badge: "warning", label: "Pending" },
  in_progress: { badge: "info", label: "In Progress" },
  completed: { badge: "success", label: "Completed" },
  blocked: { badge: "danger", label: "Blocked" },
};

const tabs: { key: TaskStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "blocked", label: "Blocked" },
];

const TaskBoard = () => {
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState(mockTasks);

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
  };

  const updateStatus = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    setSelectedTask((prev) => (prev?.id === id ? { ...prev, status: newStatus } : prev));
  };

  return (
    <DashboardLayout title="Task Board">
      <div className="p-5 space-y-5 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-end">
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-data-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-[0_0_12px_hsl(220,70%,55%,0.3)]">
            <Plus className="h-3.5 w-3.5" />
            New Task
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-data-sm font-medium transition-all",
                filter === tab.key
                  ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px]",
                  filter === tab.key ? "bg-primary/20 text-primary" : "bg-border/50 text-muted-foreground"
                )}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden rounded-xl">
          <table className="w-full text-data">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Title
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="hidden px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Due
                </th>
                <th className="hidden px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                  Assigned
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task, i) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  onClick={() => setSelectedTask(task)}
                  className={cn(
                    "cursor-pointer border-b border-border/30 transition-colors hover:bg-surface-hover/50",
                    i % 2 === 1 && "bg-surface-2/20"
                  )}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{task.title}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={statusMap[task.status].badge} label={statusMap[task.status].label} />
                  </td>
                  <td className="hidden px-4 py-3 font-mono text-data-sm text-muted-foreground sm:table-cell">
                    {task.due}
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    {task.assigned}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
              onClick={() => setSelectedTask(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col glass-card border-l border-glass-border/50"
            >
              <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
                <h2 className="text-base font-semibold text-foreground">{selectedTask.title}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Status */}
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Status</label>
                  <div className="mt-2">
                    <StatusBadge status={statusMap[selectedTask.status].badge} label={statusMap[selectedTask.status].label} className="text-sm px-3 py-1" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(["pending", "in_progress", "completed", "blocked"] as TaskStatus[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedTask.id, s)}
                        className={cn(
                          "rounded-lg px-2.5 py-1 text-data-sm font-medium transition-all",
                          selectedTask.status === s
                            ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                            : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        {statusMap[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-data-sm">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned:</span>
                    <span className="text-foreground">{selectedTask.assigned}</span>
                  </div>
                  <div className="flex items-center gap-2 text-data-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Due:</span>
                    <span className="font-mono text-foreground">{selectedTask.due}</span>
                  </div>
                  <div className="flex items-center gap-2 text-data-sm">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Project:</span>
                    <span className="text-foreground">{selectedTask.project}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Description</label>
                  <p className="mt-2 text-data text-foreground leading-relaxed">{selectedTask.description}</p>
                </div>

                {/* Activity log */}
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Activity</label>
                  <div className="mt-2 space-y-2">
                    <div className="text-data-sm text-muted-foreground">
                      <span className="text-foreground">System</span> created this task
                      <span className="ml-1 font-mono text-[11px]">Mar 28</span>
                    </div>
                    <div className="text-data-sm text-muted-foreground">
                      <span className="text-foreground">{selectedTask.assigned}</span> was assigned
                      <span className="ml-1 font-mono text-[11px]">Mar 29</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default TaskBoard;

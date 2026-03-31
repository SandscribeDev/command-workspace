import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { BudgetBar } from "@/components/BudgetBar";
import { StatusBadge } from "@/components/StatusBadge";
import { ListTodo, Users, DollarSign, TrendingUp, ArrowLeft } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const workspaceData: Record<string, {
  name: string;
  status: "on-track" | "attention" | "critical";
  metrics: { tasks: number; workers: number; budget: number; completion: string };
  budgetPercent: number;
  recentActivity: { day: string; completed: number; created: number }[];
  taskBreakdown: { name: string; value: number; color: string }[];
  tasks: { title: string; status: "success" | "warning" | "info" | "danger"; assignee: string; due: string }[];
}> = {
  charity: {
    name: "Charity Kenya",
    status: "attention",
    metrics: { tasks: 3, workers: 8, budget: 45000, completion: "65%" },
    budgetPercent: 78,
    recentActivity: [
      { day: "Mon", completed: 2, created: 3 },
      { day: "Tue", completed: 1, created: 2 },
      { day: "Wed", completed: 3, created: 1 },
      { day: "Thu", completed: 0, created: 4 },
      { day: "Fri", completed: 2, created: 1 },
      { day: "Sat", completed: 1, created: 0 },
      { day: "Sun", completed: 0, created: 0 },
    ],
    taskBreakdown: [
      { name: "Completed", value: 12, color: "hsl(160, 72%, 37%)" },
      { name: "In Progress", value: 3, color: "hsl(228, 76%, 58%)" },
      { name: "Pending", value: 5, color: "hsl(38, 85%, 52%)" },
      { name: "Blocked", value: 1, color: "hsl(0, 65%, 52%)" },
    ],
    tasks: [
      { title: "Submit progress report", status: "warning", assignee: "Amina H", due: "Apr 5" },
      { title: "Fix roof Block B", status: "info", assignee: "Mohamed A", due: "Apr 12" },
      { title: "Borehole inspection", status: "warning", assignee: "—", due: "Apr 8" },
    ],
  },
  fba: {
    name: "FBA Business",
    status: "on-track",
    metrics: { tasks: 2, workers: 3, budget: 32000, completion: "85%" },
    budgetPercent: 42,
    recentActivity: [
      { day: "Mon", completed: 3, created: 1 },
      { day: "Tue", completed: 2, created: 2 },
      { day: "Wed", completed: 4, created: 0 },
      { day: "Thu", completed: 1, created: 3 },
      { day: "Fri", completed: 3, created: 1 },
      { day: "Sat", completed: 0, created: 0 },
      { day: "Sun", completed: 0, created: 0 },
    ],
    taskBreakdown: [
      { name: "Completed", value: 18, color: "hsl(160, 72%, 37%)" },
      { name: "In Progress", value: 2, color: "hsl(228, 76%, 58%)" },
      { name: "Pending", value: 1, color: "hsl(38, 85%, 52%)" },
      { name: "Blocked", value: 1, color: "hsl(0, 65%, 52%)" },
    ],
    tasks: [
      { title: "Product photography", status: "danger", assignee: "—", due: "Apr 3" },
      { title: "Invoice submission", status: "warning", assignee: "Mohamed A", due: "Apr 1" },
    ],
  },
  shop: {
    name: "Local Shop",
    status: "on-track",
    metrics: { tasks: 1, workers: 2, budget: 8000, completion: "92%" },
    budgetPercent: 21,
    recentActivity: [
      { day: "Mon", completed: 1, created: 0 },
      { day: "Tue", completed: 0, created: 1 },
      { day: "Wed", completed: 1, created: 0 },
      { day: "Thu", completed: 1, created: 1 },
      { day: "Fri", completed: 0, created: 0 },
      { day: "Sat", completed: 2, created: 0 },
      { day: "Sun", completed: 0, created: 0 },
    ],
    taskBreakdown: [
      { name: "Completed", value: 24, color: "hsl(160, 72%, 37%)" },
      { name: "In Progress", value: 1, color: "hsl(228, 76%, 58%)" },
      { name: "Pending", value: 0, color: "hsl(38, 85%, 52%)" },
      { name: "Blocked", value: 0, color: "hsl(0, 65%, 52%)" },
    ],
    tasks: [
      { title: "Inventory restock", status: "success", assignee: "Staff", due: "Mar 30" },
    ],
  },
};

const statusLabels: Record<string, string> = { success: "Completed", warning: "Pending", info: "In Progress", danger: "Blocked" };

const WorkspaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ws = workspaceData[id || ""] || workspaceData.charity;

  return (
    <DashboardLayout title={ws.name}>
      <div className="p-5 space-y-6 max-w-[1200px]">
        {/* Back */}
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-data-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Command Centre
        </button>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard label="Active Tasks" value={ws.metrics.tasks} icon={ListTodo} />
          <MetricCard label="Workers" value={ws.metrics.workers} icon={Users} />
          <MetricCard label="Budget Used" value={`$${(ws.metrics.budget / 1000).toFixed(0)}k`} icon={DollarSign} />
          <MetricCard label="Completion" value={ws.metrics.completion} icon={TrendingUp} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Activity */}
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4">
            <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground mb-4">Task Activity</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ws.recentActivity} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="wsCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(160, 72%, 37%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(160, 72%, 37%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="wsCreated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(228, 76%, 58%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(228, 76%, 58%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="completed" stroke="hsl(160, 72%, 37%)" strokeWidth={2} fill="url(#wsCompleted)" />
                  <Area type="monotone" dataKey="created" stroke="hsl(228, 76%, 58%)" strokeWidth={1.5} fill="url(#wsCreated)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie breakdown */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground mb-4">Task Breakdown</h2>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ws.taskBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" strokeWidth={2} stroke="hsl(240, 11%, 6%)">
                    {ws.taskBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [value, name]} contentStyle={{ background: "hsl(240, 10%, 8.5%)", border: "1px solid hsl(240, 6%, 16%)", borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {ws.taskBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-data-sm">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="ml-auto font-mono text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget + Task list */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground mb-4">Budget</h2>
            <BudgetBar label="Total budget used" percent={ws.budgetPercent} />
          </div>

          <div className="lg:col-span-2 rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground">Active Tasks</h2>
            </div>
            {ws.tasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors cursor-pointer" onClick={() => navigate("/tasks")}>
                <div className="flex items-center gap-3">
                  <StatusBadge status={task.status as any} label={statusLabels[task.status]} />
                  <span className="text-data text-foreground">{task.title}</span>
                </div>
                <div className="flex items-center gap-4 text-data-sm text-muted-foreground">
                  <span>{task.assignee}</span>
                  <span className="font-mono">{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkspaceDetail;

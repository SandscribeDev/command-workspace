import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AttentionCard, AttentionItem } from "@/components/AttentionCard";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { BudgetBar } from "@/components/BudgetBar";
import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";
import { Activity, Users, ListTodo, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const initialAttention: AttentionItem[] = [
  { id: "1", type: "overdue", workspace: "Charity Kenya", message: "Task overdue — berm walls construction, 2 days past deadline", age: "2h ago" },
  { id: "2", type: "budget", workspace: "Charity Kenya", message: "Budget at 80% — approaching limit for Q2 allocation", age: "5h ago" },
  { id: "3", type: "checkin", workspace: "Charity Kenya", message: "Worker not checked in — Ahmed missed 9am check-in", age: "1h ago" },
];

const activityData = [
  { day: "Mon", tasks: 4, checkins: 8 },
  { day: "Tue", tasks: 6, checkins: 7 },
  { day: "Wed", tasks: 3, checkins: 9 },
  { day: "Thu", tasks: 7, checkins: 6 },
  { day: "Fri", tasks: 5, checkins: 8 },
  { day: "Sat", tasks: 2, checkins: 3 },
  { day: "Sun", tasks: 1, checkins: 1 },
];

const spendingData = [
  { month: "Jan", charity: 12000, fba: 8000, shop: 2000 },
  { month: "Feb", charity: 15000, fba: 9500, shop: 2200 },
  { month: "Mar", charity: 18000, fba: 11000, shop: 1800 },
  { month: "Apr", charity: 14000, fba: 13000, shop: 2500 },
];

const CommandCentre = () => {
  const [attention, setAttention] = useState(initialAttention);
  const navigate = useNavigate();

  const dismiss = (id: string) => setAttention((prev) => prev.filter((item) => item.id !== id));

  return (
    <DashboardLayout title="Command Centre" subtitle={new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}>
      <div className="p-5 space-y-6 max-w-[1200px]">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard label="Active Tasks" value={6} change="+2 this week" changeType="neutral" icon={ListTodo} />
          <MetricCard label="Workers Online" value={5} change="of 8 total" changeType="neutral" icon={Users} />
          <MetricCard label="Overdue" value={2} change="+1 since yesterday" changeType="negative" icon={AlertTriangle} />
          <MetricCard label="Completion Rate" value="78%" change="+12% vs last week" changeType="positive" icon={Activity} />
        </div>

        {/* Two-column: Attention Feed + Activity Chart */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Attention Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground">Needs Attention</h2>
              <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">{attention.length}</span>
            </div>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {attention.map((item) => (
                  <AttentionCard key={item.id} item={item} onDismiss={dismiss} />
                ))}
              </AnimatePresence>
              {attention.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-8 text-center text-data-sm text-muted-foreground">
                  All clear — nothing needs your attention.
                </motion.div>
              )}
            </div>
          </div>

          {/* Activity chart */}
          <div className="lg:col-span-3 glass-card rounded-xl p-4">
            <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground mb-4">Weekly Activity</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(220, 70%, 55%)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(220, 70%, 55%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="checkinGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="tasks" stroke="hsl(220, 70%, 55%)" strokeWidth={2} fill="url(#taskGradient)" />
                  <Area type="monotone" dataKey="checkins" stroke="hsl(152, 60%, 42%)" strokeWidth={1.5} fill="url(#checkinGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center gap-4 text-data-sm">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_hsl(220,70%,55%,0.5)]" />
                <span className="text-muted-foreground">Tasks completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_6px_hsl(152,60%,42%,0.5)]" />
                <span className="text-muted-foreground">Worker check-ins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workspaces */}
        <div>
          <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground mb-3">Workspaces</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <WorkspaceCard name="Charity Kenya" status="attention" activeTasks={3} overdue={2} onClick={() => navigate("/ws/charity")} />
            <WorkspaceCard name="FBA Business" status="on-track" activeTasks={2} overdue={0} onClick={() => navigate("/ws/fba")} />
            <WorkspaceCard name="Local Shop" status="on-track" activeTasks={1} overdue={0} onClick={() => navigate("/ws/shop")} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3 glass-card rounded-xl p-4">
            <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground mb-4">Monthly Spending</h2>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]} />
                  <Bar dataKey="charity" fill="hsl(220, 70%, 55%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fba" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shop" fill="hsl(36, 80%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center gap-4 text-data-sm">
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-muted-foreground">Charity</span></div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /><span className="text-muted-foreground">FBA</span></div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /><span className="text-muted-foreground">Shop</span></div>
            </div>
          </div>

          <div className="lg:col-span-2 glass-card rounded-xl p-4 space-y-4">
            <h2 className="text-label font-medium uppercase tracking-wider text-muted-foreground">Budget Status</h2>
            <BudgetBar label="Charity Kenya" percent={78} />
            <BudgetBar label="FBA Business" percent={42} />
            <BudgetBar label="Local Shop" percent={21} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommandCentre;

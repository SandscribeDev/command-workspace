import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AttentionCard, AttentionItem } from "@/components/AttentionCard";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { BudgetBar } from "@/components/BudgetBar";
import { useNavigate } from "react-router-dom";

const initialAttention: AttentionItem[] = [
  {
    id: "1",
    type: "overdue",
    workspace: "Charity Kenya",
    message: "Task overdue — berm walls construction, 2 days past deadline",
    age: "2 hours ago",
  },
  {
    id: "2",
    type: "budget",
    workspace: "Charity Kenya",
    message: "Budget at 80% — approaching limit for Q2 allocation",
    age: "5 hours ago",
  },
  {
    id: "3",
    type: "checkin",
    workspace: "Charity Kenya",
    message: "Worker not checked in — Ahmed missed 9am check-in",
    age: "1 hour ago",
  },
];

const CommandCentre = () => {
  const [attention, setAttention] = useState(initialAttention);
  const navigate = useNavigate();

  const dismiss = (id: string) => {
    setAttention((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Page heading */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Command Centre
          </h1>
          <p className="mt-1 text-data-sm text-muted-foreground">
            Morning overview — {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>

        {/* Attention Feed */}
        <section>
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Needs Attention
          </h2>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {attention.map((item) => (
                <AttentionCard key={item.id} item={item} onDismiss={dismiss} />
              ))}
            </AnimatePresence>
            {attention.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-border bg-card p-6 text-center text-data-sm text-muted-foreground"
              >
                All clear — nothing needs your attention right now.
              </motion.div>
            )}
          </div>
        </section>

        {/* Workspace Cards */}
        <section>
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Workspaces
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <WorkspaceCard
              name="Charity Kenya"
              status="attention"
              activeTasks={3}
              overdue={2}
              onClick={() => navigate("/tasks")}
            />
            <WorkspaceCard
              name="FBA Business"
              status="on-track"
              activeTasks={2}
              overdue={0}
              onClick={() => navigate("/tasks")}
            />
            <WorkspaceCard
              name="Local Shop"
              status="on-track"
              activeTasks={1}
              overdue={0}
              onClick={() => navigate("/tasks")}
            />
          </div>
        </section>

        {/* Quick Financials */}
        <section>
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Quick Financials
          </h2>
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <BudgetBar label="Charity Kenya" percent={78} />
            <BudgetBar label="FBA Business" percent={42} />
            <BudgetBar label="Local Shop" percent={21} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CommandCentre;

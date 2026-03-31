import { DashboardLayout } from "@/components/DashboardLayout";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TreeNode {
  name: string;
  size?: number;
  children?: TreeNode[];
  fill?: string;
}

const treemapData: TreeNode[] = [
  {
    name: "Charity Kenya",
    children: [
      { name: "Block B Housing", size: 45000, fill: "hsl(228, 89%, 60%)" },
      { name: "Water Supply", size: 18000, fill: "hsl(228, 89%, 50%)" },
      { name: "Road Repair", size: 12000, fill: "hsl(228, 89%, 40%)" },
      { name: "Community Centre", size: 8000, fill: "hsl(228, 89%, 35%)" },
    ],
  },
  {
    name: "FBA Business",
    children: [
      { name: "Product Line A", size: 32000, fill: "hsl(160, 84%, 39%)" },
      { name: "Product Line B", size: 22000, fill: "hsl(160, 84%, 32%)" },
      { name: "Shipping", size: 15000, fill: "hsl(160, 84%, 25%)" },
    ],
  },
  {
    name: "Local Shop",
    children: [
      { name: "Inventory", size: 8000, fill: "hsl(38, 92%, 50%)" },
      { name: "Rent", size: 5000, fill: "hsl(38, 92%, 40%)" },
      { name: "Staff", size: 4000, fill: "hsl(38, 72%, 35%)" },
    ],
  },
];

// Flatten for recharts Treemap
const flatData = treemapData.flatMap((workspace) =>
  (workspace.children || []).map((child) => ({
    name: child.name,
    size: child.size || 0,
    workspace: workspace.name,
    fill: child.fill || "hsl(228, 89%, 60%)",
  }))
);

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  fill?: string;
}

const CustomContent = ({ x = 0, y = 0, width = 0, height = 0, name = "", size = 0, fill = "" }: CustomContentProps) => {
  const showLabel = width > 60 && height > 35;
  const showValue = width > 80 && height > 50;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="hsl(240, 15%, 4%)"
        strokeWidth={2}
        rx={4}
        style={{ cursor: "pointer" }}
      />
      {showLabel && (
        <text x={x + 8} y={y + 18} fontSize={12} fontFamily="Geist" fontWeight={500} fill="white">
          {name}
        </text>
      )}
      {showValue && (
        <text x={x + 8} y={y + 34} fontSize={11} fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.7)">
          ${(size / 1000).toFixed(0)}k
        </text>
      )}
    </g>
  );
};

// Sunburst-style breakdown cards
const workspaceTotals = treemapData.map((ws) => ({
  name: ws.name,
  total: (ws.children || []).reduce((sum, c) => sum + (c.size || 0), 0),
  children: ws.children || [],
}));

const TreemapPage = () => {
  const [view, setView] = useState<"treemap" | "breakdown">("treemap");

  return (
    <DashboardLayout title="Budget Allocation" subtitle="Treemap view">
      <div className="p-5 space-y-4 max-w-[1200px]">
        <div className="flex items-center justify-end">
          <div className="flex gap-1.5">
            {(["treemap", "breakdown"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-full px-3 py-1 text-data-sm font-medium transition-colors capitalize",
                  view === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {view === "treemap" ? (
          <div className="rounded-lg border border-border bg-card p-4" style={{ height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={flatData}
                dataKey="size"
                nameKey="name"
                content={<CustomContent />}
              >
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.[0]) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
                        <div className="text-data-sm font-medium text-foreground">{d.name}</div>
                        <div className="text-[11px] text-muted-foreground">{d.workspace}</div>
                        <div className="mt-1 font-mono text-data font-semibold text-foreground">
                          ${d.size?.toLocaleString()}
                        </div>
                      </div>
                    );
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {workspaceTotals.map((ws) => (
              <div key={ws.name} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-data font-medium text-foreground">{ws.name}</h3>
                <div className="mt-1 font-mono text-2xl font-semibold text-foreground">${(ws.total / 1000).toFixed(0)}k</div>
                <div className="mt-4 space-y-2">
                  {ws.children.map((child) => {
                    const pct = ((child.size || 0) / ws.total) * 100;
                    return (
                      <div key={child.name}>
                        <div className="flex items-center justify-between text-data-sm">
                          <span className="text-muted-foreground">{child.name}</span>
                          <span className="font-mono text-foreground">{pct.toFixed(0)}%</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: child.fill }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TreemapPage;

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DashboardLayout } from "@/components/DashboardLayout";

function PersonNode({ data }: { data: { name: string; role: string; avatar: string } }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-border bg-card p-3 shadow-md" style={{ minWidth: 120 }}>
      <Handle type="target" position={Position.Top} className="!bg-primary !border-none !w-2 !h-2" />
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
        {data.avatar}
      </div>
      <div className="mt-2 text-data-sm font-medium text-foreground text-center">{data.name}</div>
      <div className="text-[10px] text-muted-foreground">{data.role}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary !border-none !w-2 !h-2" />
    </div>
  );
}

function SystemNode({ data }: { data: { name: string; type: string } }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface-2 p-3" style={{ minWidth: 110 }}>
      <Handle type="target" position={Position.Top} className="!bg-info !border-none !w-2 !h-2" />
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{data.type}</div>
      <div className="mt-1 text-data-sm font-medium text-foreground">{data.name}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-info !border-none !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { person: PersonNode, system: SystemNode };

const nodes: Node[] = [
  // Owner
  { id: "owner", type: "person", position: { x: 300, y: 0 }, data: { name: "You (Owner)", role: "UK — Remote", avatar: "YO" } },
  // Managers
  { id: "amina", type: "person", position: { x: 100, y: 140 }, data: { name: "Amina Hassan", role: "Site Manager", avatar: "AH" } },
  { id: "mohamed", type: "person", position: { x: 350, y: 140 }, data: { name: "Mohamed Ali", role: "Field Worker", avatar: "MA" } },
  { id: "fba-mgr", type: "person", position: { x: 550, y: 140 }, data: { name: "FBA Manager", role: "Freelancer", avatar: "FM" } },
  // Workers
  { id: "w1", type: "person", position: { x: 0, y: 290 }, data: { name: "Hassan K", role: "Mason", avatar: "HK" } },
  { id: "w2", type: "person", position: { x: 180, y: 290 }, data: { name: "Fatima J", role: "Inspector", avatar: "FJ" } },
  { id: "w3", type: "person", position: { x: 350, y: 290 }, data: { name: "Ahmed O", role: "Driver", avatar: "AO" } },
  // Systems
  { id: "telegram", type: "system", position: { x: 80, y: 430 }, data: { name: "Telegram Bot", type: "Channel" } },
  { id: "dashboard", type: "system", position: { x: 280, y: 430 }, data: { name: "Dashboard", type: "Interface" } },
  { id: "pocketbase", type: "system", position: { x: 480, y: 430 }, data: { name: "PocketBase", type: "Database" } },
];

const edgeStyle = { stroke: "hsl(215 16% 25%)" };
const activeEdge = { stroke: "hsl(228 89% 60%)", strokeWidth: 2 };

const edges: Edge[] = [
  { id: "e1", source: "owner", target: "amina", style: activeEdge, animated: true, label: "manages", labelStyle: { fill: "hsl(215, 16%, 47%)", fontSize: 10 }, labelBgStyle: { fill: "hsl(240, 12%, 7%)" } },
  { id: "e2", source: "owner", target: "fba-mgr", style: activeEdge, animated: true, label: "manages", labelStyle: { fill: "hsl(215, 16%, 47%)", fontSize: 10 }, labelBgStyle: { fill: "hsl(240, 12%, 7%)" } },
  { id: "e3", source: "amina", target: "mohamed", style: edgeStyle, label: "oversees", labelStyle: { fill: "hsl(215, 16%, 47%)", fontSize: 10 }, labelBgStyle: { fill: "hsl(240, 12%, 7%)" } },
  { id: "e4", source: "amina", target: "w1", style: edgeStyle },
  { id: "e5", source: "amina", target: "w2", style: edgeStyle },
  { id: "e6", source: "mohamed", target: "w3", style: edgeStyle },
  { id: "e7", source: "w1", target: "telegram", style: edgeStyle, type: "step" },
  { id: "e8", source: "w2", target: "telegram", style: edgeStyle, type: "step" },
  { id: "e9", source: "w3", target: "telegram", style: edgeStyle, type: "step" },
  { id: "e10", source: "owner", target: "dashboard", style: activeEdge, type: "step" },
  { id: "e11", source: "telegram", target: "pocketbase", style: edgeStyle },
  { id: "e12", source: "dashboard", target: "pocketbase", style: activeEdge, animated: true },
];

const RelationshipGraph = () => {
  const [n, , onNodesChange] = useNodesState(nodes);
  const [e, , onEdgesChange] = useEdgesState(edges);

  return (
    <DashboardLayout title="Relationship Graph" subtitle="Team & systems">
      <div className="p-5 space-y-4 max-w-[1200px]">
        <div className="h-[600px] rounded-lg border border-border bg-card overflow-hidden">
          <ReactFlow
            nodes={n}
            edges={e}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            className="[&_.react-flow__background]:!bg-card"
          >
            <Background color="hsl(240 10% 14%)" gap={20} size={1} />
            <Controls className="[&_button]:!bg-surface-2 [&_button]:!border-border [&_button]:!text-muted-foreground [&_button:hover]:!bg-surface-hover" />
          </ReactFlow>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RelationshipGraph;

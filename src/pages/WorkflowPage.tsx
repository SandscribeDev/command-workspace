import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DashboardLayout } from "@/components/DashboardLayout";

// Custom node component
function WorkflowNode({ data }: { data: { label: string; type: string; status: string } }) {
  const statusColor: Record<string, string> = {
    active: "border-l-2 border-l-[hsl(var(--success))]",
    pending: "border-l-2 border-l-[hsl(var(--warning))]",
    blocked: "border-l-2 border-l-[hsl(var(--destructive))]",
    idle: "border-l-2 border-l-[hsl(var(--muted-foreground))]",
  };

  return (
    <div
      className={`rounded-lg border border-border bg-card px-4 py-3 shadow-md ${statusColor[data.status] || ""}`}
      style={{ minWidth: 160 }}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary !border-none !w-2 !h-2" />
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{data.type}</div>
      <div className="text-data font-medium text-foreground">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary !border-none !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { workflow: WorkflowNode };

const initialNodes: Node[] = [
  { id: "trigger", type: "workflow", position: { x: 250, y: 0 }, data: { label: "Telegram Message", type: "Trigger", status: "active" } },
  { id: "parse", type: "workflow", position: { x: 250, y: 100 }, data: { label: "Parse Command", type: "Process", status: "active" } },
  { id: "validate", type: "workflow", position: { x: 100, y: 220 }, data: { label: "Validate Worker", type: "Check", status: "active" } },
  { id: "route", type: "workflow", position: { x: 400, y: 220 }, data: { label: "Route to Workspace", type: "Router", status: "pending" } },
  { id: "task-update", type: "workflow", position: { x: 50, y: 350 }, data: { label: "Update Task", type: "Action", status: "idle" } },
  { id: "checkin", type: "workflow", position: { x: 250, y: 350 }, data: { label: "Worker Check-in", type: "Action", status: "idle" } },
  { id: "photo", type: "workflow", position: { x: 450, y: 350 }, data: { label: "Photo Evidence", type: "Action", status: "idle" } },
  { id: "notify", type: "workflow", position: { x: 250, y: 480 }, data: { label: "Notify Manager", type: "Output", status: "idle" } },
  { id: "pocketbase", type: "workflow", position: { x: 500, y: 480 }, data: { label: "Save to PocketBase", type: "Storage", status: "idle" } },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "trigger", target: "parse", animated: true, style: { stroke: "hsl(228 89% 60%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(228, 89%, 60%)" } },
  { id: "e2", source: "parse", target: "validate", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e3", source: "parse", target: "route", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e4", source: "validate", target: "task-update", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e5", source: "validate", target: "checkin", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e6", source: "route", target: "photo", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e7", source: "task-update", target: "notify", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e8", source: "checkin", target: "notify", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e9", source: "photo", target: "pocketbase", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
  { id: "e10", source: "notify", target: "pocketbase", style: { stroke: "hsl(215 16% 30%)" }, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(215, 16%, 30%)" } },
];

const WorkflowPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, style: { stroke: "hsl(228 89% 60%)" }, animated: true }, eds)),
    [setEdges]
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Workflow Builder</h1>
          <p className="mt-1 text-data-sm text-muted-foreground">n8n-style automation flow — Telegram bot processing pipeline</p>
        </div>
        <div className="h-[600px] rounded-lg border border-border bg-card overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            className="[&_.react-flow__background]:!bg-card"
          >
            <Background color="hsl(240 10% 14%)" gap={20} size={1} />
            <Controls className="[&_button]:!bg-surface-2 [&_button]:!border-border [&_button]:!text-muted-foreground [&_button:hover]:!bg-surface-hover" />
            <MiniMap
              nodeColor="hsl(228 89% 60%)"
              maskColor="hsl(240 15% 4% / 0.8)"
              className="!bg-surface-2 !border-border rounded-lg"
            />
          </ReactFlow>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowPage;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TaskBoard from "./pages/TaskBoard.tsx";
import WorkflowPage from "./pages/WorkflowPage.tsx";
import GeoMapPage from "./pages/GeoMapPage.tsx";
import RelationshipGraph from "./pages/RelationshipGraph.tsx";
import GanttPage from "./pages/GanttPage.tsx";
import TreemapPage from "./pages/TreemapPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/map" element={<GeoMapPage />} />
          <Route path="/graph" element={<RelationshipGraph />} />
          <Route path="/gantt" element={<GanttPage />} />
          <Route path="/treemap" element={<TreemapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

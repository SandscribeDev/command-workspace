import {
  LayoutDashboard,
  ListTodo,
  Building2,
  ShoppingBag,
  Package,
  GitBranch,
  Globe,
  Network,
  GanttChart,
  SquareStack,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Command Centre", url: "/", icon: LayoutDashboard },
  { title: "Task Board", url: "/tasks", icon: ListTodo },
];

const workspaces = [
  { title: "Charity Kenya", url: "/ws/charity", icon: Building2 },
  { title: "FBA Business", url: "/ws/fba", icon: Package },
  { title: "Local Shop", url: "/ws/shop", icon: ShoppingBag },
];

const visualizations = [
  { title: "Workflow", url: "/workflow", icon: GitBranch },
  { title: "Geo Map", url: "/map", icon: Globe },
  { title: "Relationships", url: "/graph", icon: Network },
  { title: "Timeline", url: "/gantt", icon: GanttChart },
  { title: "Treemap", url: "/treemap", icon: SquareStack },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderItems = (items: typeof mainNav) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-data-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeClassName="bg-sidebar-accent text-foreground font-medium"
          >
            <item.icon className="h-4 w-4 shrink-0 opacity-70" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="py-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 pb-3 mb-1">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-[10px] font-bold">
            OP
          </div>
          {!collapsed && (
            <span className="text-data font-semibold tracking-tight text-foreground">
              Operations
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-label font-medium uppercase text-muted-foreground px-4">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-label font-medium uppercase text-muted-foreground px-4">
            Workspaces
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(workspaces)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-label font-medium uppercase text-muted-foreground px-4">
            Visualizations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(visualizations)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-label font-medium uppercase text-muted-foreground px-4">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderItems([{ title: "Settings", url: "/settings", icon: Settings }])}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme switcher — bottom of sidebar */}
        {!collapsed && (
          <div className="mt-auto border-t border-sidebar-border pt-2">
            <ThemeSwitcher />
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

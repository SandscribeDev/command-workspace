import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User, Search } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-11 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
              {title && (
                <>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-data font-medium text-foreground">{title}</span>
                    {subtitle && <span className="text-data-sm text-muted-foreground">{subtitle}</span>}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-7 items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 text-data-sm text-muted-foreground transition-colors hover:text-foreground">
                <Search className="h-3 w-3" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="ml-1.5 hidden rounded bg-muted px-1 py-0.5 font-mono text-[10px] sm:inline">⌘K</kbd>
              </button>
              <button className="relative rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Bell className="h-3.5 w-3.5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">3</span>
              </button>
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-semibold">
                YL
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

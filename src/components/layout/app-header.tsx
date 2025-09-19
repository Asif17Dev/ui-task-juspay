import {
  Search,
  Bell,
  Grid3X3,
  Bookmark,
  RotateCcw,
  Notebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconLayoutSidebar, IconStar } from "@tabler/icons-react";

interface AppHeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

export function AppHeader({
  onToggleLeftSidebar,
  onToggleRightSidebar,
}: AppHeaderProps) {
  return (
    <header className="flex h-14 items-center border-b bg-header-background sticky top-0 z-50">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleLeftSidebar}
            className="h-8 w-8"
          >
            <IconLayoutSidebar className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden xl:inline-flex"
          >
            <IconStar className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden xl:inline-flex"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="text-sm text-muted-foreground hidden md:block">
            Dashboards / Default
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="w-64 pl-10" />
          </div>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleRightSidebar}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleRightSidebar}
            className="h-8 w-8"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleRightSidebar}
            className="h-8 w-8"
          >
            <Notebook className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

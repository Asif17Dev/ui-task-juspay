"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "@/components/layout/app-header";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

// shadcn sheet
import { Sheet, SheetContent } from "@/components/ui/sheet";

const queryClient = new QueryClient();

const App = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  }, [isMobile]);

  // detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLeftSidebar = () => {
    if (isMobile) {
      setLeftSidebarOpen(!leftSidebarOpen);
      setRightSidebarOpen(false);
    } else {
      setLeftSidebarOpen(!leftSidebarOpen);
    }
  };

  const toggleRightSidebar = () => {
    if (isMobile) {
      setRightSidebarOpen(!rightSidebarOpen);
      setLeftSidebarOpen(false);
    } else {
      setRightSidebarOpen(!rightSidebarOpen);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-page-background w-full flex">
              {/* LEFT SIDEBAR */}
              {isMobile ? (
                <Sheet open={leftSidebarOpen} onOpenChange={setLeftSidebarOpen}>
                  <SheetContent side="left" className="p-0 w-64">
                    <LeftSidebar collapsed={false} />
                  </SheetContent>
                </Sheet>
              ) : (
                <LeftSidebar collapsed={leftSidebarOpen} />
              )}

              {/* MAIN CONTENT */}
              <main className="flex-1 min-w-0">
                <AppHeader
                  onToggleLeftSidebar={toggleLeftSidebar}
                  onToggleRightSidebar={toggleRightSidebar}
                />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </main>

              {/* RIGHT SIDEBAR */}
              {isMobile ? (
                <Sheet
                  open={rightSidebarOpen}
                  onOpenChange={setRightSidebarOpen}
                >
                  <SheetContent side="right" className="p-0 w-64">
                    <RightSidebar collapsed={false} />
                  </SheetContent>
                </Sheet>
              ) : (
                <RightSidebar collapsed={rightSidebarOpen} />
              )}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

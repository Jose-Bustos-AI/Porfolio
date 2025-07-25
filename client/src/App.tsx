import { createContext, useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalNavbar from "@/components/GlobalNavbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
// Importaciones para la sección Portfolio (anteriormente Labs)
import Portfolio from "./pages/Portfolio";
import PortfolioPost from "./pages/PortfolioPost";
import PortfolioAdmin from "./pages/PortfolioAdmin";
import ErrorBoundary from "@/utils/errorBoundary";

// Mouse light follower context
export const MouseContext = createContext<{
  mouseX: number;
  mouseY: number;
}>({
  mouseX: 0,
  mouseY: 0,
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio/admin" component={PortfolioAdmin} /> {/* Esta ruta debe ir antes */}
      <Route path="/portfolio/:id" component={PortfolioPost} />
      <Route path="/portfolio" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <MouseContext.Provider value={mousePosition}>
            <div className="light-follow fixed inset-0 z-0 pointer-events-none" 
                 style={{ 
                   '--x': `${mousePosition.mouseX}px`, 
                   '--y': `${mousePosition.mouseY}px` 
                 } as React.CSSProperties}>
            </div>
            <Toaster />
            <GlobalNavbar />
            <Router />
          </MouseContext.Provider>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

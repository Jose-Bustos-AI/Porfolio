import { createContext, useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Verticales from "@/pages/Verticales";
// Importaciones para la sección Labs
import Labs from "./pages/Labs";
import LabsPost from "./pages/LabsPost";
import LabsAdmin from "./pages/LabsAdmin";

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
      <Route path="/verticales" component={Verticales} />
      <Route path="/labs/admin" component={LabsAdmin} /> {/* Esta ruta debe ir antes */}
      <Route path="/labs/:id" component={LabsPost} />
      <Route path="/labs" component={Labs} />
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
        <MouseContext.Provider value={mousePosition}>
          <div className="light-follow fixed inset-0 z-0 pointer-events-none" 
               style={{ 
                 '--x': `${mousePosition.mouseX}px`, 
                 '--y': `${mousePosition.mouseY}px` 
               } as React.CSSProperties}>
          </div>
          <Toaster />
          <Router />
        </MouseContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

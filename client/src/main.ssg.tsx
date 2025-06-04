import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import App from './App';
import './index.css';

// Crear cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 10, // 10 minutos
    },
  },
});

const AppWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </QueryClientProvider>
);

// Función para renderizar en servidor (SSG)
export async function render() {
  const { renderToString } = await import('react-dom/server');
  return renderToString(<AppWithProviders />);
}

// Función para hidratar en cliente
export function createApp() {
  const container = document.getElementById('root');
  if (!container) throw new Error('Root element not found');

  // Verificar si la aplicación está pre-renderizada
  if (container.innerHTML) {
    hydrateRoot(container, <AppWithProviders />);
  } else {
    const root = createRoot(container);
    root.render(<AppWithProviders />);
  }
}
"use client"

import { useState, useEffect } from "react";
import { BrainCircuit, ChevronUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  defaultExpanded?: boolean;
  autoCollapseAfterLoading?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = true,
  isLoading = false,
  autoCollapseAfterLoading = false
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [wasLoading, setWasLoading] = useState(isLoading);

  // Controlar el estado de expansión basado en el estado de carga
  useEffect(() => {
    // Si comienza a cargar, expandir la sección
    if (isLoading && !wasLoading) {
      setIsExpanded(true);
    }

    // Si termina de cargar y está configurado para auto-colapsar
    if (!isLoading && wasLoading && autoCollapseAfterLoading) {
      // Pequeño retraso antes de colapsar para que el usuario pueda ver los datos
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 800); // Retraso de 800ms

      return () => clearTimeout(timer);
    }

    // Actualizar el estado anterior
    setWasLoading(isLoading);
  }, [isLoading, wasLoading, autoCollapseAfterLoading]);

  return (
    <div className="my-2 rounded-xl overflow-hidden collapsible-section">
      <div
        className="bg-muted/20 dark:bg-muted/10 p-2 px-3 flex justify-between items-center cursor-pointer hover:bg-muted/30 dark:hover:bg-muted/20 transition-colors collapsible-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-1.5">
          {isLoading ? <Loader2 className="size-3 animate-spin " /> : <BrainCircuit className="size-3 text-muted-foreground/70" />}
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
        </div>
        <button
          className="text-muted-foreground/70 hover:text-muted-foreground p-1 rounded-full transition-transform duration-200"
          style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      </div>

      <div
        className={cn(
          "bg-muted/10 dark:bg-muted/5 p-3 text-sm text-muted-foreground border-t border-border/10 collapsible-content",
          isExpanded ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
        )}
        style={{
          transition: "max-height 0.3s ease, opacity 0.2s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
} 
"use client"

import { useState, useEffect } from "react";
import { Loader2, BrainCircuit } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface ReasoningAccordionProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  defaultExpanded?: boolean;
  autoCollapseAfterLoading?: boolean;
}

export function ReasoningAccordion({
  title,
  children,
  defaultExpanded = true,
  isLoading = false,
  autoCollapseAfterLoading = false
}: ReasoningAccordionProps) {
  const [isExpanded, setIsExpanded] = useState<string | undefined>(defaultExpanded ? "reasoning-item" : undefined);
  const [wasLoading, setWasLoading] = useState(isLoading);

  // Controlar el estado de expansión basado en el estado de carga
  useEffect(() => {
    // Si comienza a cargar, expandir la sección
    if (isLoading && !wasLoading) {
      setIsExpanded("reasoning-item");
    }

    // Si termina de cargar y está configurado para auto-colapsar
    if (!isLoading && wasLoading && autoCollapseAfterLoading) {
      // Pequeño retraso antes de colapsar para que el usuario pueda ver los datos
      const timer = setTimeout(() => {
        setIsExpanded(undefined);
      }, 800); // Retraso de 800ms

      return () => clearTimeout(timer);
    }

    // Actualizar el estado anterior
    setWasLoading(isLoading);
  }, [isLoading, wasLoading, autoCollapseAfterLoading]);

  return (
    <Accordion
      type="single"
      collapsible
      className="my-2 rounded-xl overflow-hidden border border-border/10"
      value={isExpanded}
      onValueChange={setIsExpanded}
    >
      <AccordionItem value="reasoning-item" className="border-0">
        <AccordionTrigger
          className="bg-muted/20 dark:bg-muted/10 py-2 px-3 hover:bg-muted/30 
                     dark:hover:bg-muted/20 transition-colors hover:no-underline"
        >
          <div className="flex items-center gap-1.5">
            {isLoading ?
              <Loader2 className="size-3 animate-spin text-muted-foreground/70" /> :
              <BrainCircuit className="size-3 text-muted-foreground/70" />
            }
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          {/* Contenedor con barra lateral */}
          <div className="relative flex">
            {/* Barra lateral decorativa */}
            <div className="w-[2px] shrink-0 self-stretch bg-gradient-to-b from-primary/10 via-primary/20 to-primary/10 dark:from-primary/5 dark:via-primary/30 dark:to-primary/5"></div>

            {/* Contenido con padding ajustado */}
            <div className="bg-muted/10 dark:bg-muted/5 px-4 py-3 text-sm text-muted-foreground w-full">
              {children}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 
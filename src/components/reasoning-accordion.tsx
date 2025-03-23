"use client"

import { useState, useEffect, useCallback } from "react";
import { Loader2, BrainCircuit } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface ReasoningAccordionProps {
  /** Título mostrado en el encabezado del acordeón */
  title: string;
  /** Contenido del acordeón */
  children: React.ReactNode;
  /** Indica si el contenido está cargando */
  isLoading?: boolean;
  /** Indica si el acordeón debe estar expandido por defecto */
  defaultExpanded?: boolean;
  /** Indica si el acordeón debe contraerse automáticamente cuando termina la carga */
  autoCollapseAfterLoading?: boolean;
}

/**
 * Componente de acordeón especializado para mostrar contenido de razonamiento
 * con soporte para estados de carga y colapso automático.
 */
export function ReasoningAccordion({
  title,
  children,
  defaultExpanded = true,
  isLoading = false,
  autoCollapseAfterLoading = false
}: ReasoningAccordionProps) {
  // Estado para controlar si el acordeón está expandido
  const [isExpanded, setIsExpanded] = useState<string | undefined>(
    defaultExpanded ? "reasoning-item" : undefined
  );

  // Seguimiento del estado de carga anterior para detectar cambios
  const [wasLoading, setWasLoading] = useState(isLoading);

  // Manejador para colapsar el acordeón con un retraso
  const handleCollapseWithDelay = useCallback(() => {
    const timer = setTimeout(() => {
      setIsExpanded(undefined);
    }, 800); // Retraso de 800ms para una mejor experiencia de usuario

    return () => clearTimeout(timer);
  }, []);

  // Efecto para controlar la expansión/contracción basada en el estado de carga
  useEffect(() => {
    // Si comienza a cargar, expandir el acordeón
    if (isLoading && !wasLoading) {
      setIsExpanded("reasoning-item");
    }

    // Si termina de cargar y debe autocontraerse
    if (!isLoading && wasLoading && autoCollapseAfterLoading) {
      return handleCollapseWithDelay();
    }

    // Actualizar el registro del estado de carga
    setWasLoading(isLoading);
  }, [isLoading, wasLoading, autoCollapseAfterLoading, handleCollapseWithDelay]);

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
          className={cn(
            "bg-muted/20 dark:bg-muted/10 py-2 px-3",
            "hover:bg-muted/30 dark:hover:bg-muted/20",
            "transition-colors hover:no-underline"
          )}
        >
          <div className="flex items-center gap-1.5">
            {isLoading ? (
              <Loader2 className="size-3 animate-spin text-muted-foreground/70" />
            ) : (
              <BrainCircuit className="size-3 text-muted-foreground/70" />
            )}
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-0 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="relative flex">
            {/* Barra lateral decorativa */}
            <div
              className="w-[2px] shrink-0 self-stretch bg-gradient-to-b from-primary/10 via-primary/20 to-primary/10 dark:from-primary/5 dark:via-primary/30 dark:to-primary/5"
              aria-hidden="true"
            />

            {/* Contenido */}
            <div className="bg-muted/10 dark:bg-muted/5 px-4 py-3 text-sm text-muted-foreground w-full">
              {children}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 
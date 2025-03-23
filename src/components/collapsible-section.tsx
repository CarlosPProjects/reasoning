"use client"

import { useState } from "react";
import { BrainCircuit, ChevronUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  defaultExpanded?: boolean;
} 

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = true,
  isLoading = false
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

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
import { BrainCog } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border/30 bg-background/80 backdrop-blur-md px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
          <BrainCog className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-medium leading-none tracking-tight">
            Chat Assistant
          </h1>
          <p className="text-xs text-muted-foreground">
            Smart responses with transparent reasoning
          </p>
        </div>
      </div>
    </header>
  );
} 
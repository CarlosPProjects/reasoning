import { BrainCog } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <BrainCog className="h-6 w-6 text-primary" />
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold leading-none tracking-tight">
          Reasoning Chatbot
        </h1>
        <p className="text-sm text-muted-foreground">
          Powered by AI with transparent reasoning
        </p>
      </div>
    </header>
  );
} 
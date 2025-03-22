"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { useState } from "react";
import { ChevronDown, ChevronUp, Code, FileText, BrainCircuit } from "lucide-react";

interface MessagePartProps {
  part: UIMessage['parts'][number];
  index: number;
}

// Componente reutilizable para las secciones colapsables
const CollapsibleSection = ({
  title,
  icon,
  children
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="my-2 rounded-xl overflow-hidden collapsible-section">
      <div
        className="bg-muted/20 dark:bg-muted/10 p-2 px-3 flex justify-between items-center cursor-pointer hover:bg-muted/30 dark:hover:bg-muted/20 transition-colors collapsible-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-1.5">
          {icon}
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
};

const MessagePart = ({ part, index }: MessagePartProps) => {
  switch (part.type) {
    case "text":
      return <p key={index} className="text-sm">{part.text}</p>;
    case "reasoning":
      return (
        <CollapsibleSection
          title="Razonamiento"
          icon={<BrainCircuit className="h-3.5 w-3.5 text-muted-foreground/70" />}
        >
          {part.reasoning}
        </CollapsibleSection>
      );
    case "source":
      return (
        <CollapsibleSection
          title="Fuente"
          icon={<FileText className="h-3.5 w-3.5 text-muted-foreground/70" />}
        >
          <a
            href={part.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-sm"
          >
            {part.source.url}
          </a>
        </CollapsibleSection>
      );
    case "tool-invocation":
      return (
        <CollapsibleSection
          title="Herramienta utilizada"
          icon={<Code className="h-3.5 w-3.5 text-muted-foreground/70" />}
        >
          <code className="font-mono text-xs">{part.toolInvocation.toolName}</code>
        </CollapsibleSection>
      );
    case "file":
      return (
        <div key={index} className="my-2">
          <img
            src={`data:${part.mimeType};base64,${part.data}`}
            alt="File attachment"
            className="max-w-full rounded-xl"
          />
        </div>
      );
    default:
      return null;
  }
};

interface ChatMessageProps {
  message: UIMessage;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full gap-3 py-3",
      isUser ? "justify-end user-message" : "justify-start ai-message"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 ring-1 ring-primary/20">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
        </Avatar>
      )}

      <Card className={cn(
        "py-0 max-w-[80%] shadow-sm",
        isUser
          ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
          : "rounded-2xl rounded-tl-sm backdrop-blur-sm bg-secondary/40 dark:bg-secondary/20"
      )}>
        <CardContent className="p-3 px-4">
          {message.parts.map((part: UIMessage['parts'][number], i: number) => (
            <MessagePart key={i} part={part} index={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 
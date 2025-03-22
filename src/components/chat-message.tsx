"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { BrainCircuit } from "lucide-react";
import { CollapsibleSection } from "@/components/collapsible-section";
import { MarkdownContent } from "@/components/markdown-content";

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

interface MessagePartProps {
  part: UIMessage['parts'][number];
  index: number;
}

const MessagePart = ({ part, index }: MessagePartProps) => {
  switch (part.type) {
    case "text":
      return <MarkdownContent key={index} content={part.text} />;
    case "reasoning":
      return (
        <CollapsibleSection
          title="Razonamiento"
          icon={<BrainCircuit className="h-3.5 w-3.5 text-muted-foreground/70" />}
        >
          <MarkdownContent content={part.reasoning} />
        </CollapsibleSection>
      );
    default:
      return null;
  }
};

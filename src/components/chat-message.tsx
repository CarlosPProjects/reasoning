"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { CollapsibleSection } from "@/components/collapsible-section";
import { MarkdownContent } from "@/components/markdown-content";
import { useState, useEffect } from "react";

interface ChatMessageProps {
  message: UIMessage;
  isUser: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isUser, isStreaming = false }: ChatMessageProps) {
  // Estado para controlar si el mensaje está en proceso de razonamiento
  const [isReasoning, setIsReasoning] = useState(false);

  // Verificar si el mensaje tiene una parte de tipo "reasoning"
  const hasReasoningPart = message.parts.some(part => part.type === "reasoning");

  // Cuando se recibe un nuevo mensaje no usuario con parte de razonamiento, establecer el estado
  useEffect(() => {
    if (!isUser && hasReasoningPart) {
      // Verificar si el mensaje tiene contenido vacío o incompleto en la parte de reasoning
      const reasoningPart = message.parts.find(part => part.type === "reasoning");
      const isReasoningEmpty = !reasoningPart?.reasoning || reasoningPart.reasoning.trim() === "";

      // Mostrar el loader si el razonamiento está vacío o si está en streaming
      setIsReasoning(isReasoningEmpty || isStreaming);

      // Si el razonamiento está completo y no está streaming, ocultar el loader después de un breve tiempo
      if (!isReasoningEmpty && !isStreaming) {
        const timer = setTimeout(() => {
          setIsReasoning(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isUser, message, hasReasoningPart, isStreaming]);

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
        <CardContent className="py-2 px-4">
          {message.parts.map((part: UIMessage['parts'][number], i: number) => (
            <MessagePart
              key={i}
              part={part}
              index={i}
              isLoading={!isUser && part.type === "reasoning" && isReasoning}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

interface MessagePartProps {
  part: UIMessage['parts'][number];
  index: number;
  isLoading?: boolean;
}

const MessagePart = ({ part, index, isLoading = false }: MessagePartProps) => {
  switch (part.type) {
    case "text":
      return <MarkdownContent key={index} content={part.text} />;
    case "reasoning":
      return (
        <CollapsibleSection
          title="Reasoning"
          isLoading={isLoading}
        >
          <MarkdownContent content={part.reasoning || ""} className="text-xs" />
        </CollapsibleSection>
      );
    default:
      return null;
  }
};

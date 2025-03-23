"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { MarkdownContent } from "@/components/markdown-content";
import { useState, useEffect } from "react";
import { ReasoningAccordion } from "@/components/reasoning-accordion";

interface ChatMessageProps {
  message: UIMessage;
  isUser: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isUser, isStreaming = false }: ChatMessageProps) {
  const [showReasoningLoader, setShowReasoningLoader] = useState(false);

  const hasReasoningPart = message.parts.some(part => part.type === "reasoning");

  const reasoningPart = message.parts.find(part => part.type === "reasoning");
  const isReasoningEmpty = reasoningPart && (!reasoningPart.reasoning || reasoningPart.reasoning.trim() === "");

  const textPart = message.parts.find(part => part.type === "text");
  const hasTextContent = textPart && textPart.text && textPart.text.trim() !== "";

  useEffect(() => {
    if (!isUser && hasReasoningPart) {
      const shouldShowLoader = isStreaming && (isReasoningEmpty || !hasTextContent);
      setShowReasoningLoader(shouldShowLoader);
    } else {
      setShowReasoningLoader(false);
    }
  }, [isUser, isStreaming, isReasoningEmpty, hasTextContent, hasReasoningPart]);

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
              isLoading={part.type === "reasoning" && showReasoningLoader}
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
        <ReasoningAccordion
          title="Reasoning"
          isLoading={isLoading}
          defaultExpanded={isLoading}
          autoCollapseAfterLoading={true}
        >
          <MarkdownContent
            content={part.reasoning || ""}
            className="text-xs text-muted-foreground/90 leading-relaxed tracking-wide"
          />
        </ReasoningAccordion>
      );
    default:
      return null;
  }
};

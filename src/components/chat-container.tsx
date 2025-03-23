import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat-message";
import { MessageCircleIcon } from "lucide-react"
import { UIMessage } from "ai";

interface ChatContainerProps {
  messages: UIMessage[];
  isStreaming?: boolean;
}

export function ChatContainer({ messages, isStreaming = false }: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-[calc(100vh-180px)] items-center justify-center p-8 text-center">
        <div className="space-y-3 max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <MessageCircleIcon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Welcome</h3>
          <p className="text-sm text-muted-foreground">
            Ask a question to start a conversation. I'll provide answers with reasoning and sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-180px)] px-3 sm:px-4">
      <div className="flex flex-col space-y-1 py-4">
        {messages.map((message, i) => {
          // Determine if this is a user message
          const isUser = message.role === 'user';

          // Para el último mensaje de asistente, si estamos en estado streaming, marcarlo
          const isLastAssistantMessage = !isUser && i === messages.length - 1;
          const isCurrentlyStreaming = isStreaming && isLastAssistantMessage;

          return (
            <ChatMessage
              key={i}
              message={message}
              isUser={isUser}
              isStreaming={isCurrentlyStreaming}
            />
          );
        })}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
} 
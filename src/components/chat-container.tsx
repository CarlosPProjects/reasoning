import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat-message";

interface ChatContainerProps {
  messages: any[];
}

export function ChatContainer({ messages }: ChatContainerProps) {
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
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Welcome to the Reasoning Chatbot</h3>
          <p className="text-muted-foreground">
            Ask a question to start a conversation. I'll show my reasoning process and sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-180px)] px-4">
      <div className="flex flex-col space-y-4 py-4">
        {messages.map((message, i) => {
          // Determine if this is a user message - user messages are odd-indexed (0-indexed)
          const isUser = message.role === 'user';
          return <ChatMessage key={i} message={message} isUser={isUser} />;
        })}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
} 
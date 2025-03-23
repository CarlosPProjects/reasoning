'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { ChatContainer } from '@/components/chat-container';
import { ChatInput } from '@/components/chat-input';
import { ChatHeader } from '@/components/chat-header';

export function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error
  } = useChat();

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error("An error occurred", {
        description: error.message || "Something went wrong",
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden transition-colors duration-300">
      <ChatHeader />
      <main className="flex-1 overflow-hidden relative">
        <ChatContainer
          messages={messages}
          isStreaming={status === "streaming"}
        />
      </main>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={status === "streaming"}
      />
    </div>
  );
} 
"use client"

import { useState, useEffect, memo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { MarkdownContent } from "@/components/markdown-content";
import { ReasoningAccordion } from "@/components/reasoning-accordion";

interface ChatMessageProps {
  /** Mensaje de la interfaz de usuario */
  message: UIMessage;
  /** Indica si el mensaje es del usuario o del asistente */
  isUser: boolean;
  /** Indica si el mensaje está siendo transmitido (streaming) */
  isStreaming?: boolean;
}

/**
 * Componente que renderiza un mensaje de chat con soporte para
 * diferentes tipos de contenido y estados de carga.
 */
export function ChatMessage({ message, isUser, isStreaming = false }: ChatMessageProps) {
  const [showReasoningLoader, setShowReasoningLoader] = useState(false);

  // Detección de tipos de partes del mensaje
  const hasReasoningPart = message.parts.some(part => part.type === "reasoning");

  // Verificación del contenido de razonamiento
  const reasoningPart = message.parts.find(part => part.type === "reasoning");
  const isReasoningEmpty = reasoningPart &&
    (!reasoningPart.reasoning || reasoningPart.reasoning.trim() === "");

  // Verificación del contenido de texto
  const textPart = message.parts.find(part => part.type === "text");
  const hasTextContent = textPart && textPart.text && textPart.text.trim() !== "";

  // Efecto para controlar la visibilidad del loader de razonamiento
  useEffect(() => {
    if (!isUser && hasReasoningPart) {
      // Mostrar el loader solo durante el streaming y si el razonamiento está vacío 
      // o no hay contenido de texto todavía
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
      {/* Avatar solo para mensajes del asistente */}
      {!isUser && (
        <Avatar className="h-8 w-8 ring-1 ring-primary/20">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
        </Avatar>
      )}

      {/* Contenedor del mensaje */}
      <Card className={cn(
        "py-0 max-w-[80%] shadow-sm",
        isUser
          ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
          : "rounded-2xl rounded-tl-sm backdrop-blur-sm bg-secondary/40 dark:bg-secondary/20"
      )}>
        <CardContent className="py-2 px-4">
          {message.parts.map((part, i) => (
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
  /** Parte del mensaje a renderizar */
  part: UIMessage['parts'][number];
  /** Índice de la parte en el arreglo de partes */
  index: number;
  /** Indica si esta parte está en estado de carga */
  isLoading?: boolean;
}

/**
 * Componente que renderiza diferentes tipos de partes de mensajes.
 * Memoizado para evitar re-renderizados innecesarios.
 */
const MessagePart = memo(({ part, index, isLoading = false }: MessagePartProps) => {
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
});

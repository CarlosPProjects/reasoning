import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";

interface MessagePartProps {
  part: UIMessage['parts'][number];
  index: number;
}

const MessagePart = ({ part, index }: MessagePartProps) => {
  switch (part.type) {
    case "text":
      return <p key={index} className="leading-7">{part.text}</p>;
    case "source":
      return (
        <div key={index} className="my-2 rounded-xl bg-muted/20 dark:bg-muted/10 p-3 backdrop-blur-sm">
          <p className="text-sm font-medium">Source:</p>
          <a
            href={part.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline"
          >
            {part.source.url}
          </a>
        </div>
      );
    case "reasoning":
      return (
        <div key={index} className="my-2 rounded-xl bg-muted/20 dark:bg-muted/10 p-3 backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">Reasoning:</p>
          <p className="text-sm text-muted-foreground">{part.reasoning}</p>
        </div>
      );
    case "tool-invocation":
      return (
        <div key={index} className="my-2 rounded-xl bg-amber-100/50 dark:bg-amber-950/30 p-3 backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">Tool Used:</p>
          <code className="text-sm font-mono">{part.toolInvocation.toolName}</code>
        </div>
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

      {isUser && (
        <Avatar className="h-8 w-8 ring-1 ring-accent/10">
          <AvatarFallback className="bg-accent/30 dark:bg-accent/20 text-xs">YOU</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 
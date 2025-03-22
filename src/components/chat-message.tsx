import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MessagePartProps {
  part: any;
  index: number;
}

const MessagePart = ({ part, index }: MessagePartProps) => {
  switch (part.type) {
    case "text":
      return <p key={index} className="leading-7">{part.text}</p>;
    case "source":
      return (
        <div key={index} className="my-2 rounded bg-muted p-3">
          <p className="text-sm font-medium">Source:</p>
          <a
            href={part.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline"
          >
            {part.source.url}
          </a>
        </div>
      );
    case "reasoning":
      return (
        <div key={index} className="my-2 rounded bg-muted/50 p-3">
          <p className="text-sm font-medium mb-1">Reasoning:</p>
          <p className="text-sm text-muted-foreground">{part.reasoning}</p>
        </div>
      );
    case "tool-invocation":
      return (
        <div key={index} className="my-2 rounded bg-amber-100 dark:bg-amber-950/30 p-3">
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
            className="max-w-full rounded-md"
          />
        </div>
      );
    default:
      return null;
  }
};

interface ChatMessageProps {
  message: any;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full gap-3 py-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
        </Avatar>
      )}

      <Card className={cn(
        "max-w-[80%]",
        isUser ? "bg-primary text-primary-foreground" : ""
      )}>
        <CardContent className="p-3">
          {message.parts.map((part: any, i: number) => (
            <MessagePart key={i} part={part} index={i} />
          ))}
        </CardContent>
      </Card>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-muted">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 
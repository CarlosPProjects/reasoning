"use client"

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  /** Contenido markdown a renderizar */
  content: string;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

/**
 * Componente que renderiza contenido markdown con estilos personalizados
 * y soporte para GFM (GitHub Flavored Markdown).
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  // Definición memoizada de los componentes personalizados para ReactMarkdown
  const components: Components = useMemo(() => ({
    pre: ({ node, ...props }) => (
      <pre
        className="bg-muted/20 dark:bg-muted/10 rounded-lg p-2 overflow-x-auto my-2 text-xs"
        {...props}
      />
    ),
    code: ({ node, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const inline = !match && !className;

      return inline ? (
        <code
          className="bg-muted/20 dark:bg-muted/10 rounded px-1 py-0.5 font-mono text-xs"
          {...props}
        >
          {children}
        </code>
      ) : (
        <code
          className={cn("font-mono text-xs", className)}
          {...props}
        >
          {children}
        </code>
      );
    },
    a: ({ node, ...props }) => (
      <a
        className="text-primary underline"
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 my-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 my-2" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="my-0.5" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="my-1.5" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-2 border-muted pl-3 italic my-2"
        {...props}
      />
    ),
  }), []);

  // Clases para el contenedor del markdown
  const containerClasses = cn(
    "markdown text-sm prose dark:prose-invert prose-sm max-w-none",
    "prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4",
    "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
    className
  );

  return (
    <div className={containerClasses}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 
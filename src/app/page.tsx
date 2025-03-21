'use client';

import { useChat } from '@ai-sdk/react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  return (
    <>
      {messages.map(message => (
        message.parts.map((part, i) => {
          switch (part.type) {
            case "text": return <p key={i}>{part.text}</p>;
            case "source": return <p key={i}>{part.source.url}</p>;
            case "reasoning": return <div key={i}>{part.reasoning}</div>;
            case "tool-invocation": return <div key={i}>{part.toolInvocation.toolName}</div>;
            case "file": return <img key={i} src={`data:${part.mimeType};base64,${part.data}`} />;
          }
        })
      ))}
      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
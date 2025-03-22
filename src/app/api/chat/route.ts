import { deepseek } from '@ai-sdk/deepseek';
import { smoothStream, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-reasoner"),
    experimental_transform: smoothStream({chunking: "word"}),
    messages,
  })

  return result.toDataStreamResponse({
    sendReasoning: true
  })
}
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-reasoner"),
    messages,
    onStepFinish: (step) => {
      console.log(step)
    },
    onChunk: (chunk) => {
      console.log(chunk)
    },
    onError: (error) => {
      console.log(error)
    },
    onFinish: (result) => {
      console.log(result)
    }
  })

  return result.toDataStreamResponse({
    sendReasoning: true
  })
}
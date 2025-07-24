import { NextRequest, NextResponse } from "next/server";
import { streamLLMResponse } from "@/llm";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { messages } = body;

  const completion = await streamLLMResponse(messages);
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  return new NextResponse(stream);
}

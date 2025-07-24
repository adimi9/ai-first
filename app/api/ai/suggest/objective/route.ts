import { suggestObjectives } from "@/llm";

export async function POST(request: Request) {
  const { description } = await request.json();
  const suggestedObjectives = await suggestObjectives(description);
  return Response.json(suggestedObjectives);
}

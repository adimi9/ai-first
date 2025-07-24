import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

const client = new OpenAI({
  apiKey: process.env.LLMAAS_API_KEY || "",
  baseURL: "https://litellm.govtext.gov.sg",
});

const systemPrompt: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a coach that helps teams create and set Objectives " +
    "and Key Results (OKRs) for high performance. " +
    "You provide guidance based on established OKR frameworks and best practices." +
    `
    Analyse objectives against the BIG framework:
    Bold: Push boundaries beyond business-as-usual
    Inspiring: Motivate and energise the team
    Goal-oriented: Clearly define the desired outcome

    Analyse key results using SMART framework:
    Specific: Clear and well-defined
    Measurable: Quantifiable progress indicators and outcomes 
    Ambitious: Stretches the team beyond comfort zone
    Relevant: Aligns with the objective and higher level goals
    Time-bound: Has a clear deadline
    ` +
    "You have access to a database of existing OKRs that can be used to answer questions. " +
    "Use the get_rag_response tool to search the database if the user asks about specific OKRs. " +
    "If you can answer the question based on your knowledge, you can answer it without using the tool.",
};

const objectiveSuggestionPrompt: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a coach that helps teams create and set Objectives " +
    "and Key Results (OKRs) for high performance. " +
    "You provide guidance based on established OKR frameworks and best practices." +
    `
    Analyse objectives against the BIG framework:
    Bold: Push boundaries beyond business-as-usual
    Inspiring: Motivate and energise the team
    Goal-oriented: Clearly define the desired outcome
    ` +
    "Given a user's description of their objective, " +
    "Help them to craft possible objectives that follow the BIG framework.",
};

interface RAGaasDocumentChunk {
  content: string;
  metadata: {
    dataset_id: string;
    chunk_id: string;
    document_id: string;
    document_name: string;
    chunk_size: number;
    score: number;
  };
}

interface RAGaaSQueryResponse {
  chunks: RAGaasDocumentChunk[];
  answer?: string;
  sources?: RAGaasDocumentChunk[];
  model?: string;
}

export async function* streamLLMResponse(
  chatHistory: ChatCompletionMessageParam[],
) {
  const tools = [
    {
      type: "function" as const,
      function: {
        name: "get_rag_response",
        description: "Search the database for relevant information",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "The query to search the database This should be semantically close to your target documents. Use the affirmative form rather than a question.",
            },
            type: {
              type: "string",
              description:
                "The type of document to search for. Either 'objective' or 'key_result'.",
            },
          },
        },
      },
    },
  ];

  while (true) {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini-prd-gcc2-lb",
      messages: [systemPrompt, ...chatHistory],
      stream: true,
      tools,
    });

    let toolCallIndex = 0;
    let toolCallId;
    let toolCallFunction;
    let toolCallArgs = "";
    const toolCalls = [];
    let finishReason = null;
    for await (const chunk of completion) {
      finishReason = chunk.choices[0].finish_reason;
      const delta = chunk.choices[0].delta;
      if (delta.content) {
        yield delta.content;
      }
      if (delta.tool_calls) {
        for (const toolCall of delta.tool_calls) {
          if (toolCall.index !== toolCallIndex) {
            toolCalls.push({
              function: {
                name: toolCallFunction!,
                arguments: toolCallArgs,
              },
              id: toolCallId!,
              type: "function" as const,
            });
            toolCallIndex = toolCall.index;
            toolCallArgs = "";
          }
          if (toolCall.id) toolCallId = toolCall.id;
          if (toolCall.function?.name)
            toolCallFunction = toolCall.function.name;
          toolCallArgs += toolCall.function?.arguments || "";
        }
      }
    }

    if (finishReason !== "tool_calls") {
      break;
    }

    toolCalls.push({
      function: {
        name: toolCallFunction!,
        arguments: toolCallArgs,
      },
      id: toolCallId!,
      type: "function" as const,
    });

    chatHistory.push({
      role: "assistant",
      tool_calls: toolCalls,
    });

    for (const toolCall of toolCalls) {
      if (toolCall.function.name === "get_rag_response") {
        const args = JSON.parse(toolCall.function.arguments);
        const { formattedChunks, chunkIds } = await retrieveDocuments(
          args.query,
          args.type,
        );
        const responseMessage: ChatCompletionMessageParam = {
          role: "tool",
          tool_call_id: toolCall.id,
          content: formattedChunks,
        };
        chatHistory.push(responseMessage);
        yield `<retrieve_${args.type}>${chunkIds.join(",")}</retrieve_${args.type}>`;
      }
    }
  }
}

async function retrieveDocuments(
  query: string,
  type: "objective" | "key_result",
) {
  const response = await fetch("https://amp.govtext.gov.sg/query", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": process.env.RAGAAS_API_KEY!,
    },
    body: JSON.stringify({
      dataset_ids: [
        type === "objective"
          ? process.env.RAGAAS_OBJECTIVE_DATASET_ID!
          : process.env.RAGAAS_KEY_RESULT_DATASET_ID!,
      ],
      text: query,
      hybrid_search_weights: { embedding_weight: 1, text_weight: 0 },
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid response received from RAG");
  }

  const { chunks }: RAGaaSQueryResponse = await response.json();

  // Format chunks into the desired string format
  const chunkStrings = [];
  const chunkIds = [];
  for (const chunk of chunks) {
    // Extract the number from document_name, e.g., objective_5.txt -> 5
    const match = chunk.metadata.document_name.match(/_(\d+)\.txt$/);
    const id = match ? match[1] : "";
    chunkIds.push(id);
    chunkStrings.push(`${id}: ${chunk.content}`);
  }
  const formattedChunks = chunkStrings.join("\n\n");

  return { formattedChunks, chunkIds };
}

export async function suggestObjectives(description: string) {
  const tools = [
    {
      type: "function" as const,
      function: {
        name: "suggest_objectives",
        description: "Give this tool a list of suggested objectives",
        parameters: {
          type: "object",
          properties: {
            suggested_objectives: {
              type: "array",
              description:
                "A list of suggested objectives based on the description",
              items: {
                type: "string",
                description: "A suggested objective",
              },
            },
          },
        },
      },
    },
  ];

  const messages: ChatCompletionMessageParam[] = [
    objectiveSuggestionPrompt,
    {
      role: "user",
      content: description,
    },
  ];

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini-prd-gcc2-lb",
    messages,
    tools,
    tool_choice: {
      type: "function",
      function: { name: "suggest_objectives" },
    },
  });

  const toolCall = completion.choices[0].message.tool_calls?.[0];
  const toolCallArgs = JSON.parse(toolCall?.function?.arguments || "[]");

  return toolCallArgs.suggested_objectives || [];
}

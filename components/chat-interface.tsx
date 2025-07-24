"use client";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Send } from "lucide-react";
import { message } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function parseXmlTags(content: string) {
  const xmlTagRegex = /<([a-zA-Z0-9_]+)>([\s\S]*?)<\/\1>/g;
  const tags: { tag: string; value: string }[] = [];
  let cleaned = content;
  let match;
  while ((match = xmlTagRegex.exec(content)) !== null) {
    tags.push({ tag: match[1], value: match[2] });
    cleaned = cleaned.replace(match[0], "");
  }
  return { cleaned: cleaned.trim(), tags };
}

export function ChatInterface() {
  const [messages, setMessages] = useState<message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    async function fetchStream() {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: messages }),
      });
      setLoading(false);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          console.log("Received chunk:", decoder.decode(value));
          const content = decoder.decode(value);
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === "assistant") {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + content },
              ];
            } else {
              return [...prev, { role: "assistant", content }];
            }
          });
        }
      }
    }
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      fetchStream();
    }
  }, [messages, toast]);

  function sendMessage() {
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);
    setUserInput("");
  }

  return (
    <div className="flex size-full flex-col">
      <div className="grow overflow-y-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {messages.length === 0 && <WelcomeMessage />}
          {messages.map((message, idx) => {
            if (message.role === "user") {
              return (
                <div
                  key={idx}
                  className="ml-auto max-w-lg rounded-lg bg-muted p-4"
                >
                  <p>{message.content}</p>
                </div>
              );
            } else {
              const { cleaned, tags } = parseXmlTags(message.content);
              return (
                <div key={idx} className="prose !max-w-none">
                  {tags.map((tag, idx) => {
                    if (tag.tag === "retrieve_key_result") {
                      const keyResultIds = tag.value.split(",").map(Number);
                      return (
                        <RetrievedKeyResults
                          key={idx}
                          keyResultIds={keyResultIds}
                        />
                      );
                    } else if (tag.tag === "retrieve_objective") {
                      const objectiveIds = tag.value.split(",").map(Number);
                      return (
                        <RetrievedObjectives
                          key={idx}
                          objectiveIds={objectiveIds}
                        />
                      );
                    }
                  })}
                  <Markdown>{cleaned}</Markdown>
                </div>
              );
            }
          })}
          {loading && "Loading..."}
        </div>
        <div ref={messagesEnd}></div>
      </div>
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-lg border border-gray-200 p-4">
          <Textarea
            disabled={loading}
            placeholder="Enter a message here"
            className="max-h-48 border-0 p-0 shadow-none focus-visible:ring-0"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (userInput.trim()) {
                  sendMessage();
                }
              }
            }}
          />
          <div className="flex items-center justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={sendMessage}
              disabled={loading || !userInput.trim()}
            >
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="w-full pt-32">
      <h2 className="text-3xl font-semibold">Need help with OKRs?</h2>
      <p className="mt-4">
        👋 Hello! I&apos;m askBERNARD, here to help you master the art of
        setting and achieving meaningful goals 🎯. Whether you&apos;re new to
        OKRs or looking to refine your existing ones, I&apos;ve got you covered!
        To get started, tell me what you&apos;re trying to achieve!
      </p>
    </div>
  );
}

function RetrievedKeyResults({ keyResultIds }: { keyResultIds: number[] }) {
  return (
    <div className="mb-2 rounded bg-blue-50 p-2 text-blue-900">
      Retrieved {keyResultIds.length} key results
    </div>
  );
}

function RetrievedObjectives({ objectiveIds }: { objectiveIds: number[] }) {
  return (
    <div className="mb-2 rounded bg-green-50 p-2 text-green-900">
      Retrieved {objectiveIds.length} objectives
    </div>
  );
}

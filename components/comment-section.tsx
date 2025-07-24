"use client";
import { Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import DeleteButton from "@/components/deleteButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  comment_id: number;
  content: string;
  created_at: string;
}

export default function CommentSection({
  keyResultId,
}: {
  keyResultId: number;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");

  const refreshComments = useCallback(() => {
    fetch(`/api/key_results/${keyResultId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [keyResultId]);

  useEffect(() => {
    refreshComments();
    setLoading(false);
  }, [refreshComments]);

  function onSubmit() {
    fetch(`/api/key_results/${keyResultId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    }).then(() => {
      refreshComments();
      setComment("");
    });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-6">
        <Textarea
          className="max-h-32"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (comment.trim()) {
                onSubmit();
              }
            }
          }}
        />
        {comment.trim() && (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setComment("");
              }}
            >
              Cancel
            </Button>
            <Button variant="outline" onClick={onSubmit}>
              <Send />
              Comment
            </Button>
          </div>
        )}
      </div>
      {comments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.comment_id}>
              <div className="flex items-center gap-2">
                <div className="grow overflow-auto">
                  <p className="text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString("en-SG")}
                  </p>
                  <p className="whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
                <div className="shrink-0">
                  <DeleteButton
                    id={comment.comment_id}
                    type="comments"
                    refreshTable={refreshComments}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet. Be the first?</p>
      )}
    </div>
  );
}

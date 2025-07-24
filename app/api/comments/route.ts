import { db } from "@/db/orm";
import { comments } from "@/db/schema";

export async function GET() {
  try {
    const allComments = await db
      .select({
        comment_id: comments.commentId,
        content: comments.content,
        created_at: comments.createdAt,
        key_result_id: comments.keyResultId,
      })
      .from(comments);
    return Response.json(allComments);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

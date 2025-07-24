import { db } from "@/db/orm";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ comment_id: string }> },
) {
  const { comment_id } = await params;
  try {
    const comment = await db
      .select({
        comment_id: comments.commentId,
        content: comments.content,
        created_at: comments.createdAt,
        key_result_id: comments.keyResultId,
      })
      .from(comments)
      .where(eq(comments.commentId, +comment_id));
    if (comment.length === 0) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json(comment[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch comment" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ comment_id: string }> },
) {
  const { comment_id } = await params;
  const body = await request.json();
  const { content } = body;
  try {
    const updatedComments = await db
      .update(comments)
      .set({ content })
      .where(eq(comments.commentId, +comment_id))
      .returning({ comment_id: comments.commentId });
    if (updatedComments.length === 0) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to edit comment" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ comment_id: string }> },
) {
  const { comment_id } = await params;
  try {
    const deletedComments = await db
      .delete(comments)
      .where(eq(comments.commentId, +comment_id))
      .returning({ comment_id: comments.commentId });
    if (deletedComments.length === 0) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}

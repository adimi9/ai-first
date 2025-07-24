import { db } from "@/db/orm";
import { comments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  try {
    const keyResultComments = await db
      .select({
        comment_id: comments.commentId,
        content: comments.content,
        created_at: comments.createdAt,
      })
      .from(comments)
      .where(eq(comments.keyResultId, +key_result_id))
      .orderBy(desc(comments.createdAt));
    return Response.json(keyResultComments);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  const body = await request.json();
  const { content } = body;
  try {
    const insertedComments = await db
      .insert(comments)
      .values({ content, keyResultId: +key_result_id })
      .returning({ comment_id: comments.commentId });
    return Response.json(insertedComments[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

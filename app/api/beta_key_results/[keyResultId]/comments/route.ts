
import { db } from "@/db/orm";
import { comments } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ keyResultId: string }> },
) {
  const { keyResultId } = await params;
  console.log("keyeyeyeyeye", keyResultId);  

  try {
    const keyResultComments = await db
      .select({
        comment_id: comments.commentId,
        content: comments.content,
        created_at: comments.createdAt,
        key_result_id: comments.keyResultId,
      })
      .from(comments)
      .where(eq(comments.keyResultId, +keyResultId))
      .orderBy(comments.createdAt);

    return NextResponse.json(keyResultComments);
  } catch (error) {
    console.error(`GET /comments error:`, error);
    return NextResponse.json({ error: "Failed to fetch comments." }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ keyResultId: string }> },
) {
 const { keyResultId } = await params; 

  try {
    const body = await request.json();
    const { content } = body;

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Comment content must be a non-empty string." }, { status: 400 });
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        content: content.trim(),
        keyResultId: +keyResultId,
      })
      .returning({
        comment_id: comments.commentId,
        content: comments.content,
        created_at: comments.createdAt,
        key_result_id: comments.keyResultId,
      });

    return NextResponse.json(
      {
        message: "Comment added successfully",
        comment: newComment,
        location: `/api/beta_key_results/${keyResultId}/comments/${newComment.comment_id}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`POST /comments error:`, error);
    return NextResponse.json({ error: "Failed to add comment." }, { status: 500 });
  }
}

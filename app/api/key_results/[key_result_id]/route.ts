import { db } from "@/db/orm";
import { keyResults, outbox } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  try {
    const keyResult = await db
      .select({
        key_result_id: keyResults.keyResultId,
        objective_id: keyResults.objectiveId,
        description: keyResults.description,
        priority: keyResults.priority,
        status: keyResults.status,
        target_date: keyResults.targetDate,
        created_at: keyResults.createdAt,
        last_updated: keyResults.lastUpdated,
      })
      .from(keyResults)
      .where(eq(keyResults.keyResultId, +key_result_id));
    if (keyResult.length == 0) {
      return Response.json({ error: "Key result not found" }, { status: 404 });
    }
    return Response.json(keyResult[0]);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to fetch key result" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  const body = await request.json();
  const { description, priority, status, progress, target_date } = body;

  const keyResultId = await db.transaction(async (tx) => {
    try {
      const [updatedKeyResult] = await tx
        .update(keyResults)
        .set({
          description,
          priority,
          status,
          progress,
          targetDate: target_date,
        })
        .where(eq(keyResults.keyResultId, +key_result_id))
        .returning({
          key_result_id: keyResults.keyResultId,
          objective_id: keyResults.objectiveId,
          description: keyResults.description,
          priority: keyResults.priority,
          status: keyResults.status,
          target_date: keyResults.targetDate,
          created_at: keyResults.createdAt,
          last_updated: keyResults.lastUpdated,
          progress: keyResults.progress,
          ragaas_document_id: keyResults.ragaasDocumentId,
        });

      await tx.insert(outbox).values({
        aggregateType: "key_result",
        payload: updatedKeyResult,
        eventType: "updated",
      });

      return updatedKeyResult.key_result_id;
    } catch (error) {
      console.error("PUT /api/key_results/[key_result_id] error:", error);
      tx.rollback();
    }
  });

  if (!keyResultId) {
    return Response.json({ error: "Key result not found" }, { status: 404 });
  }
  return Response.json({
    location: `/api/key_results/${keyResultId}`,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;

  const keyResultId = await db.transaction(async (tx) => {
    try {
      const [deletedKeyResult] = await tx
        .delete(keyResults)
        .where(eq(keyResults.keyResultId, +key_result_id))
        .returning({
          key_result_id: keyResults.keyResultId,
          objective_id: keyResults.objectiveId,
          description: keyResults.description,
          priority: keyResults.priority,
          status: keyResults.status,
          target_date: keyResults.targetDate,
          created_at: keyResults.createdAt,
          last_updated: keyResults.lastUpdated,
          progress: keyResults.progress,
          ragaas_document_id: keyResults.ragaasDocumentId,
        });
      await tx.insert(outbox).values({
        aggregateType: "key_result",
        payload: deletedKeyResult,
        eventType: "deleted",
      });

      return deletedKeyResult.key_result_id;
    } catch (error) {
      console.error("DELETE /api/key_results/[key_result_id] error:", error);
      tx.rollback();
    }
  });

  if (!keyResultId) {
    return Response.json({ error: "Key result not found" }, { status: 404 });
  }

  return Response.json({
    location: `/api/key_results/${keyResultId}`,
  });
}

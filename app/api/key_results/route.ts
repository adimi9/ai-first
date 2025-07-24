import { db } from "@/db/orm";
import { keyResults, objectives, outbox } from "@/db/schema";
import { and, asc, desc, eq, inArray, SQL } from "drizzle-orm";
import { NextRequest } from "next/server";
import { PgColumn } from "drizzle-orm/pg-core";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filtered_teams = searchParams.getAll("team");
  const sortBy = searchParams.get("sortBy");
  const sortDirection = searchParams.get("sortDirection");
  const sortFields: Record<string, PgColumn> = {
    description: keyResults.description,
    progress: keyResults.progress,
    last_updated: keyResults.lastUpdated,
  };
  const order = (sortDirection === "desc" ? desc : asc)(
    sortFields[sortBy || "description"],
  );

  try {
    const filters: SQL[] = [];
    if (filtered_teams.length > 0)
      filters.push(inArray(objectives.team, filtered_teams));

    const selectedKeyResults = await db
      .select({
        key_result_id: keyResults.keyResultId,
        objective_id: keyResults.objectiveId,
        description: keyResults.description,
        priority: keyResults.description,
        status: keyResults.status,
        progress: keyResults.progress,
        target_date: keyResults.targetDate,
        created_at: keyResults.createdAt,
        last_updated: keyResults.lastUpdated,
      })
      .from(keyResults)
      .leftJoin(objectives, eq(keyResults.objectiveId, objectives.objectiveId))
      .where(and(...filters))
      .orderBy(order);
    return Response.json(selectedKeyResults);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to fetch key results" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { objective_id, description, priority, status, progress, target_date } =
    body;

  const keyResultId = await db.transaction(async (tx) => {
    try {
      const [insertedKeyResult] = await tx
        .insert(keyResults)
        .values({
          objectiveId: objective_id,
          description,
          priority,
          status,
          progress,
          targetDate: target_date,
        })
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
        payload: insertedKeyResult,
        eventType: "created",
      });
      return insertedKeyResult.key_result_id;
    } catch (error) {
      console.error("POST /api/key_results error:", error);
      tx.rollback();
    }
  });
  if (keyResultId) {
    return Response.json({
      location: `/api/key_results/${keyResultId}`,
    });
  }
  return Response.json({ error: "Failed to add key result" }, { status: 500 });
}

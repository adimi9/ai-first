import { type NextRequest } from "next/server";
import { db } from "@/db/orm";
import { keyResults } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ objective_id: string }> },
) {
  const { objective_id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const sortFields: Record<string, PgColumn> = {
    description: keyResults.description,
    progress: keyResults.progress,
    last_updated: keyResults.lastUpdated,
  };
  const sortBy = searchParams.get("sortBy");
  const sortDirection = searchParams.get("sortDirection");

  try {
    const order = (sortDirection === "desc" ? desc : asc)(
      sortFields[sortBy || "description"],
    );
    const selectedKeyResults = await db
      .select({
        key_result_id: keyResults.keyResultId,
        objective_id: keyResults.objectiveId,
        description: keyResults.description,
        priority: keyResults.priority,
        status: keyResults.status,
        progress: keyResults.progress,
        target_date: keyResults.targetDate,
        created_at: keyResults.createdAt,
        last_updated: keyResults.lastUpdated,
      })
      .from(keyResults)
      .where(eq(keyResults.objectiveId, +objective_id))
      .orderBy(order);
    return Response.json(selectedKeyResults);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch key results" },
      { status: 500 },
    );
  }
}

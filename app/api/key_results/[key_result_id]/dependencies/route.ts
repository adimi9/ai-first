import { db } from "@/db/orm";
import { keyResultDependencies, keyResults } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  try {
    const dependencies = await db
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
      .from(keyResultDependencies)
      .innerJoin(
        keyResults,
        eq(keyResultDependencies.dependsOnKeyResultId, keyResults.keyResultId),
      )
      .where(eq(keyResultDependencies.keyResultId, +key_result_id));
    return Response.json(dependencies);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch dependent key results" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  const { depends_on_key_result_id } = await request.json();
  try {
    const inserted = await db
      .insert(keyResultDependencies)
      .values({
        keyResultId: +key_result_id,
        dependsOnKeyResultId: +depends_on_key_result_id,
      })
      .returning({
        key_result_id: keyResultDependencies.keyResultId,
        depends_on_key_result_id: keyResultDependencies.dependsOnKeyResultId,
      });
    return Response.json(inserted[0]);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to add dependent key result" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ key_result_id: string }> },
) {
  const { key_result_id } = await params;
  try {
    const deleted = await db
      .delete(keyResultDependencies)
      .where(eq(keyResultDependencies.keyResultId, +key_result_id))
      .returning({ key_result_id: keyResultDependencies.keyResultId });
    return Response.json(deleted);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to clear dependencies" },
      { status: 500 },
    );
  }
}

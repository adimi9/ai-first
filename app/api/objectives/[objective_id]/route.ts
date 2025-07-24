import { db } from "@/db/orm";
import { objectives, outbox } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ objective_id: string }> },
) {
  const { objective_id } = await params;

  try {
    const objective = await db
      .select({
        objective_id: objectives.objectiveId,
        description: objectives.description,
        problem_statement: objectives.problemStatement,
        team: objectives.team,
        assigned_to: objectives.assignedTo,
        created_at: objectives.createdAt,
        last_updated: objectives.lastUpdated,
      })
      .from(objectives)
      .where(eq(objectives.objectiveId, +objective_id));
    if (objective.length === 0) {
      return Response.json({ error: "Objective not found" }, { status: 404 });
    }
    return Response.json(objective[0]);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch objective" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ objective_id: string }> },
) {
  const { objective_id } = await params;
  const body = await request.json();
  const { description, problem_statement, assigned_to, team } = body;

  const objectiveId = await db.transaction(async (tx) => {
    try {
      const [updatedObjective] = await tx
        .update(objectives)
        .set({
          description,
          problemStatement: problem_statement,
          assignedTo: assigned_to,
          team,
        })
        .where(eq(objectives.objectiveId, +objective_id))
        .returning({
          objective_id: objectives.objectiveId,
          description: objectives.description,
          problem_statement: objectives.problemStatement,
          team: objectives.team,
          assigned_to: objectives.assignedTo,
          created_at: objectives.createdAt,
          last_updated: objectives.lastUpdated,
          ragaas_document_id: objectives.ragaasDocumentId
        });
      await tx.insert(outbox).values({
        aggregateType: "objective",
        payload: updatedObjective,
        eventType: "updated",
      });
      return updatedObjective.objective_id;
    } catch (error) {
      console.error("PUT /api/objectives/[objective_id] error:", error);
      tx.rollback();
    }
  });
  if (objectiveId) {
    return Response.json({
      location: `/api/objectives/${objectiveId}`,
    });
  }
  return Response.json(
    { error: "Failed to update objective." },
    { status: 500 },
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ objective_id: string }> },
) {
  const { objective_id } = await params;
  const objectiveId = await db.transaction(async (tx) => {
    try {
      const [deletedObjective] = await tx
        .delete(objectives)
        .where(eq(objectives.objectiveId, +objective_id))
        .returning({
          objective_id: objectives.objectiveId,
          description: objectives.description,
          problem_statement: objectives.problemStatement,
          team: objectives.team,
          assigned_to: objectives.assignedTo,
          created_at: objectives.createdAt,
          last_updated: objectives.lastUpdated,
          ragaas_document_id: objectives.ragaasDocumentId
        });
      await tx.insert(outbox).values({
        aggregateType: "objective",
        payload: deletedObjective,
        eventType: "deleted",
      });
      return deletedObjective.objective_id;
    } catch (error) {
      console.error("DELETE /api/objectives/[objective_id] error:", error);
      tx.rollback();
    }
  });
  if (objectiveId) {
    return Response.json({
      location: `/api/objectives/${objectiveId}`,
    });
  }
  return Response.json(
    { error: "Failed to delete objective." },
    { status: 500 },
  );
}
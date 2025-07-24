// HTTP
import { type NextRequest } from "next/server"; 

// Drizzle ORM 
import { and, desc, eq, ilike, inArray, SQL, sql } from "drizzle-orm"; // SQL Queries 
import { db } from "@/db/orm"; // Database Instance 
import { keyResults, objectives, outbox } from "@/db/schema"; // Database Schema Definitions

export async function GET(request: NextRequest) {

  // Retrieve query parameters 
  const searchParams = request.nextUrl.searchParams; 

  // From Search Bar 
  const searchQuery = searchParams.get("search"); // 
  // From Filters
  // 1. Teams  
  const filtered_teams = searchParams.getAll("team");
  // 2. Priority 
  const filtered_priorities = searchParams
    .getAll("priority")
    // - ensure validation with enum values defined in schema 
    .filter((value) =>
      (keyResults.priority.enumValues as string[]).includes(value),
    ) as (typeof keyResults.priority.enumValues)[number][];
  // 3. Status   
  const filtered_statuses = searchParams
    .getAll("status")
    // - ensure validation with enum values defined in schema 
    .filter((value) =>
      (keyResults.status.enumValues as string[]).includes(value),
    ) as (typeof keyResults.status.enumValues)[number][];

  try {
    const filters: SQL[] = [];
    if (searchQuery)
      filters.push(ilike(objectives.description, `%${searchQuery}%`));
    if (filtered_teams.length > 0)
      filters.push(inArray(objectives.team, filtered_teams));
    if (filtered_priorities.length > 0)
      filters.push(inArray(keyResults.priority, filtered_priorities));
    if (filtered_statuses.length > 0)
      filters.push(inArray(keyResults.status, filtered_statuses));

    const selectedObjectives = await db
      .select({
        objective_id: objectives.objectiveId,
        description: objectives.description,
        problem_statement: objectives.problemStatement,
        team: objectives.team,
        assigned_to: objectives.assignedTo,
        created_at: objectives.createdAt,
        last_updated: objectives.lastUpdated,
        progress: sql<number>`CAST(COALESCE(AVG(${keyResults.progress}), 0) AS int)`,
      })
      .from(objectives)
      .leftJoin(keyResults, eq(objectives.objectiveId, keyResults.objectiveId))
      .groupBy(
        objectives.objectiveId,
        objectives.description,
        objectives.problemStatement,
        objectives.team,
        objectives.assignedTo,
        objectives.createdAt,
        objectives.lastUpdated,
      )
      .where(and(...filters))
      .orderBy(desc(objectives.lastUpdated));

    return Response.json(selectedObjectives);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch objectives." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { description, problem_statement, team, assigned_to } = body;
  const objectiveId = await db.transaction(async (tx) => {
    try {
      const [insertedObjective] = await tx
        .insert(objectives)
        .values({
          description,
          problemStatement: problem_statement,
          team,
          assignedTo: assigned_to,
        })
        .returning({
          objective_id: objectives.objectiveId,
          description: objectives.description,
          problem_statement: objectives.problemStatement,
          team: objectives.team,
          assigned_to: objectives.assignedTo,
          created_at: objectives.createdAt,
          last_updated: objectives.lastUpdated,
          ragaas_document_id: objectives.ragaasDocumentId,
        });
      await tx.insert(outbox).values({
        aggregateType: "objective",
        payload: insertedObjective,
        eventType: "created",
      });
      return insertedObjective.objective_id;
    } catch (error) {
      console.error("POST /api/objectives error:", error);
      tx.rollback();
    }
  });
  if (objectiveId) {
    return Response.json({
      location: `/api/objectives/${objectiveId}`,
    });
  }
  return Response.json(
    { error: "Failed to create objective." },
    { status: 500 },
  );
}

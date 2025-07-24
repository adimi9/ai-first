import { type NextRequest, NextResponse } from "next/server";
import { sql, eq } from "drizzle-orm";
import { db } from "@/db/orm";
import { objectives, keyResults } from "@/db/schema";
// Define the shape of a single key result object as it comes directly from the database aggregation.
// Properties are nullable because of the LEFT JOIN, where keyResults might not exist for an objective.
interface RawKeyResult {
  id: number | null; // This will be a number from the DB integer column
  description: string | null;
  priority: string | null;
  targetDate: string | null; // Drizzle schema uses mode: 'string' for timestamps
  status: string | null;
  lastUpdated: string | null; // Drizzle schema uses mode: 'string' for timestamps
  progress: number | null;
}
/**
 * Handles GET requests to fetch objectives and their key results for a specific division.
 * The division name is expected as a query parameter 'name'.
 *
 * @param request The NextRequest object containing the division name in search parameters.
 * @returns A NextResponse containing the list of objectives with nested key results or an error.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const divisionName = searchParams.get("name");
  if (!divisionName) {
    return NextResponse.json(
      { error: "Division name is required." },
      { status: 400 }
    );
  }
  try {
    const objectivesWithKeyResults = await db
      .select({
        id: objectives.objectiveId,
        // *** CRITICAL FIX: Removed the stray '{' here ***
        description: objectives.description,
        overallProgress: sql<number>`CAST(COALESCE(AVG(${keyResults.progress}), 0) AS INTEGER)`,
        keyResults: sql<RawKeyResult[]>`json_agg(
          json_build_object(
            'id', ${keyResults.keyResultId},
            'description', ${keyResults.description},
            'priority', ${keyResults.priority},
            'targetDate', ${keyResults.targetDate},
            'status', ${keyResults.status},
            'lastUpdated', ${keyResults.lastUpdated},
            'progress', ${keyResults.progress}
          )
        )`.as('keyResults'),
      })
      .from(objectives)
      .leftJoin(keyResults, eq(objectives.objectiveId, keyResults.objectiveId))
      .where(eq(objectives.team, divisionName))
      // Simplified GROUP BY: Group by only the columns directly selected from the objectives table
      // (excluding aggregates), as objectiveId is the primary key and functionally determines others.
      .groupBy(objectives.objectiveId, objectives.description)
      .orderBy(objectives.description)
      .execute();
    // Map the raw database response to match the frontend's Objective interface.
    // The frontend's `Objective` interface expects a 'title' field like "Objective #1"
    // and 'id' as a string.
    const finalData = objectivesWithKeyResults.map((obj, index) => ({
        id: String(obj.id), // CRITICAL: Convert number ID to string for frontend
        title: `Objective #${index + 1}`, // Dynamically generate "Objective #1", "Objective #2", etc.
        description: obj.description,
        overallProgress: obj.overallProgress,
        // Filter out any potential null key results and convert their IDs to string
        keyResults: (obj.keyResults as RawKeyResult[] | null)?.filter(kr => kr.id !== null).map(kr => ({
          id: String(kr.id), // CRITICAL: Convert key result number ID to string for frontend
          description: kr.description!, // Assert not null after filter
          priority: kr.priority!, // Assert not null after filter
          targetDate: kr.targetDate!, // Assert not null after filter
          status: kr.status!, // Assert not null after filter
          lastUpdated: kr.lastUpdated!, // Assert not null after filter
          progress: kr.progress!, // Assert not null after filter
        })) || [],
    }));
    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Error fetching division data:", error);
    return NextResponse.json(
      { error: "Failed to fetch division data." },
      { status: 500 }
    );
  }
}










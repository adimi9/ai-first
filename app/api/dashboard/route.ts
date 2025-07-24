// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db/orm";
import { objectives, keyResults } from "@/db/schema";

/**
 * Handles GET requests to fetch aggregated OKR data for the management dashboard.
 * This endpoint calculates team progress, key result counts, and last updated times.
 *
 * @param request The NextRequest object.
 * @returns A NextResponse containing the aggregated OKR data or an error message.
 */
export async function GET() {
  try {
    // Perform the SQL query using Drizzle ORM to aggregate data
    const dashboardData = await db
      .select({
        // Select and alias the team name to 'title' as per your frontend interface
        title: objectives.team,
        // Calculate average progress of key results, default to 0 if no key results
        // and cast to integer.
        progress: sql<number>`CAST(COALESCE(AVG(${keyResults.progress}), 0) AS INTEGER)`,
        // Count the number of key results for each team
        keyResults: sql<number>`COUNT(${keyResults.keyResultId})`,
        // NEW: Count the number of distinct objectives for each team/assignedTo group
        numberOfObjectives: sql<number>`COUNT(DISTINCT ${objectives.objectiveId})`, // Added this line
        // Determine the most recent update timestamp between objectives and key results
        lastUpdated: sql<string>`COALESCE(MAX(${keyResults.lastUpdated}), MAX(${objectives.lastUpdated}))`,
        // Extract the first two characters of the assigned_to field for user initials
        userInitials: sql<string>`SUBSTRING(${objectives.assignedTo} FROM 1 FOR 2)`,
        // NEW: Select the full assigned_to name as ownerName
        ownerName: objectives.assignedTo, // Added this line
        // Determine the progress color based on the calculated progress
        progressColor: sql<string>`
          CASE
            WHEN COALESCE(AVG(${keyResults.progress}), 0) < 30 THEN '#CC3336'
            WHEN COALESCE(AVG(${keyResults.progress}), 0) >= 30 AND COALESCE(AVG(${keyResults.progress}), 0) < 60 THEN '#FF681E'
            WHEN COALESCE(AVG(${keyResults.progress}), 0) >= 60 AND COALESCE(AVG(${keyResults.progress}), 0) < 100 THEN '#069C56'
            ELSE '#069C56' -- For 100% completion
          END
        `,
        // Generate a unique ID for each row by hashing the combination of team and assigned_to.
        // This ensures uniqueness for React keys, as the data is grouped by these two fields.
        id: sql<string>`MD5(CONCAT(${objectives.team}, ${objectives.assignedTo}))`
      })
      .from(objectives)
      // Left join with keyResults to include objectives even if they have no key results
      .leftJoin(keyResults, sql`${objectives.objectiveId} = ${keyResults.objectiveId}`)
      // Group the results by team and the assigned person to aggregate correctly
      .groupBy(objectives.team, objectives.assignedTo)
      // Order the results by team name
      .orderBy(objectives.team)
      .execute();

    // Return the aggregated data as a JSON response
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch dashboard data." },
      { status: 500 }
    );
  }
}
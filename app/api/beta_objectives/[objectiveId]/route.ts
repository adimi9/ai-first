// app/api/beta_objectives/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/orm";
import { objectives } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ objectiveId: string }> },
) {
  const { objectiveId } = await params; // Correctly convert string ID from URL to number
  const contentType = request.headers.get("content-type");


  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid Content-Type. Expected application/json." },
      { status: 415 }
    );
  }

  try {
    const body = await request.json();

    const updatePayload: { description?: string } = {};

    if (typeof body.description === "string") {
      updatePayload.description = body.description;
    } else {
      return NextResponse.json(
        { error: "Description must be a string." },
        { status: 400 }
      );
    }

    const result = await db
      .update(objectives)
      .set(updatePayload)
      .where(eq(objectives.objectiveId, +objectiveId))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Objective not found or no changes made." },
        { status: 404 }
      );
    }

    const updatedObjectiveResponse = {
      id: String(result[0].objectiveId),
      title: "Updated Objective",
      description: result[0].description,
      lastUpdated: result[0].lastUpdated,
    };

    return NextResponse.json({
      message: "Objective updated successfully",
      updatedObjective: updatedObjectiveResponse,
    });
  } catch (error) {
    console.error(`Error updating objective ${objectiveId}:`, error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update objective." },
      { status: 500 }
    );
  }
}
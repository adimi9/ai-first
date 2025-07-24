// app/api/beta_key_results/[id]/route.ts

import { db } from "@/db/orm";
import { keyResults, outbox } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type PriorityEnum = 'Low Priority' | 'High Priority';
type StatusEnum = 'Not Started' | 'On Track' | 'At Risk' | 'Delayed' | 'Completed' | 'On Hold';


export async function GET(
  _request: NextRequest, // _request is unused but kept for signature
   { params }: { params: Promise<{ keyResultId: string }> },
) {
  // 1. Extract and Validate Key Result ID from URL
  const { keyResultId } = await params; 

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
        progress: keyResults.progress,
      })
      .from(keyResults)
      .where(eq(keyResults.keyResultId, +keyResultId)); // Use the converted numeric ID

    if (keyResult.length === 0) {
      return NextResponse.json({ error: "Key result not found" }, { status: 404 });
    }

    const transformedKeyResult = {
      ...keyResult[0],
      priority: (keyResult[0].priority as string).replace(' Priority', ''),
    };
    

    return NextResponse.json(transformedKeyResult);
  } catch (error) {
    console.error("GET /api/beta_key_results/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch key result" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ keyResultId: string }> },
) {
  const { keyResultId } = await params; 

  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid Content-Type. Expected application/json." },
      { status: 415 }
    );
  }

  try {
    const body = await request.json();
    const { description, priority, status, progress, target_date } = body;

    if (typeof description !== 'string' || !description.trim()) {
      return NextResponse.json({ error: "Description is required and must be a string." }, { status: 400 });
    }

    const validPriorities: PriorityEnum[] = ['High Priority', 'Low Priority'];
    if (typeof priority !== 'string' || !validPriorities.includes(priority as PriorityEnum)) {
      return NextResponse.json({ error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}.` }, { status: 400 });
    }

    const validStatuses: StatusEnum[] = ['Not Started', 'On Track', 'At Risk', 'Delayed', 'Completed', 'On Hold'];
    if (typeof status !== 'string' || !validStatuses.includes(status as StatusEnum)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}.` }, { status: 400 });
    }

    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      return NextResponse.json({ error: "Progress must be a number between 0 and 100." }, { status: 400 });
    }
    if (typeof target_date !== 'string' || !Date.parse(target_date)) {
      return NextResponse.json({ error: "Target date is required and must be a valid date string." }, { status: 400 });
    }

    const updatedId = await db.transaction(async (tx) => {
      try {
        const [updatedKeyResult] = await tx
          .update(keyResults)
          .set({
            description,
            priority: priority as PriorityEnum,
            status: status as StatusEnum,
            progress,
            targetDate: target_date,
          })
          .where(eq(keyResults.keyResultId, +keyResultId)) // Target the specific key result by its ID
          .returning({ // Return the updated fields to use in the outbox and response
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

        if (!updatedKeyResult) {
          tx.rollback();
          return null;
        }

        await tx.insert(outbox).values({
          aggregateType: "key_result",
          payload: updatedKeyResult,
          eventType: "updated",
        });

        return updatedKeyResult.key_result_id;
      } catch (error) {
        console.error("Transaction error during PUT /api/beta_key_results/[id]:", error);
        tx.rollback();
        throw error;
      }
    });

    if (!updatedId) {
      return NextResponse.json({ error: "Key result not found or no changes made." }, { status: 404 });
    }
    return NextResponse.json({
      message: "Key result updated successfully",
      location: `/api/beta_key_results/${updatedId}`,
    });
  } catch (error) {
    console.error("PUT /api/beta_key_results/[id] error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update key result." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest, // _request is unused but kept for signature
  { params }: { params: Promise<{ keyResultId: string }> },
) {
  const { keyResultId } = await params; // Convert string ID from URL to number

  try {
    const deletedId = await db.transaction(async (tx) => {
      try {
        const [deletedKeyResult] = await tx
          .delete(keyResults)
          .where(eq(keyResults.keyResultId, +keyResultId))
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

        if (!deletedKeyResult) {
          tx.rollback();
          return null;
        }

        await tx.insert(outbox).values({
          aggregateType: "key_result",
          payload: deletedKeyResult,
          eventType: "deleted",
        });

        return deletedKeyResult.key_result_id;
      } catch (error) {
        console.error("Transaction error during DELETE /api/beta_key_results/[id]:", error);
        tx.rollback();
        throw error;
      }
    });

    if (!deletedId) {
      return NextResponse.json({ error: "Key result not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Key result deleted successfully",
      location: `/api/beta_key_results/${deletedId}`,
    });
  } catch (error) {
    console.error("DELETE /api/beta_key_results/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete key result." },
      { status: 500 }
    );
  }
}
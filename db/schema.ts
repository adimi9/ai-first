import { pgTable, index, foreignKey, integer, text, timestamp, primaryKey, check, pgEnum, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const priority = pgEnum("priority", ['Low Priority', 'High Priority'])
export const status = pgEnum("status", ['Not Started', 'On Track', 'At Risk', 'Delayed', 'Completed', 'On Hold'])

export const comments = pgTable("comments", {
	commentId: integer("comment_id").primaryKey().generatedAlwaysAsIdentity({ name: "comments_comment_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	keyResultId: integer("key_result_id").notNull(),
}, (table) => [
	index("idx_comments_key_result_id").using("btree", table.keyResultId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.keyResultId],
			foreignColumns: [keyResults.keyResultId],
			name: "comments_key_result_id_fkey"
		}).onDelete("cascade"),
]);

export const keyResults = pgTable("key_results", {
	keyResultId: integer("key_result_id").primaryKey().generatedAlwaysAsIdentity({ name: "key_results_key_result_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	objectiveId: integer("objective_id").notNull(),
	description: text().notNull(),
	priority: priority().notNull(),
	status: status().default('Not Started').notNull(),
	targetDate: timestamp("target_date", { withTimezone: true, mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	lastUpdated: timestamp("last_updated", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	progress: integer().default(0).notNull(),
	ragaasDocumentId: text("ragaas_document_id"),
}, (table) => [
	index("idx_key_results_parent_id").using("btree", table.objectiveId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.objectiveId],
			foreignColumns: [objectives.objectiveId],
			name: "key_results_objective_id_fkey"
		}).onDelete("cascade"),
]);

export const objectives = pgTable("objectives", {
	objectiveId: integer("objective_id").primaryKey().generatedAlwaysAsIdentity({ name: "objectives_objective_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	description: text().notNull(),
	problemStatement: text("problem_statement"),
	team: text().notNull(),
	assignedTo: text("assigned_to").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	lastUpdated: timestamp("last_updated", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	ragaasDocumentId: text("ragaas_document_id"),
});

export const keyResultDependencies = pgTable("key_result_dependencies", {
	keyResultId: integer("key_result_id").notNull(),
	dependsOnKeyResultId: integer("depends_on_key_result_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.dependsOnKeyResultId],
			foreignColumns: [keyResults.keyResultId],
			name: "key_result_dependencies_depends_on_key_result_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.keyResultId],
			foreignColumns: [keyResults.keyResultId],
			name: "key_result_dependencies_key_result_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.keyResultId, table.dependsOnKeyResultId], name: "key_result_dependencies_pkey"}),
	check("key_result_dependencies_check", sql`key_result_id <> depends_on_key_result_id`),
]);

export const outbox = pgTable("outbox", {
	outboxId: integer("outbox_id").primaryKey().generatedAlwaysAsIdentity({ name: "outbox_outbox_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	aggregateType: text("aggregate_type").notNull(),
	payload: jsonb("payload").notNull(),
	eventType: text("event_type").notNull(),
});

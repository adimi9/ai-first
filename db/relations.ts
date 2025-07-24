import { relations } from "drizzle-orm/relations";
import { keyResults, comments, objectives, keyResultDependencies } from "./schema";

export const commentsRelations = relations(comments, ({one}) => ({
	keyResult: one(keyResults, {
		fields: [comments.keyResultId],
		references: [keyResults.keyResultId]
	}),
}));

export const keyResultsRelations = relations(keyResults, ({one, many}) => ({
	comments: many(comments),
	objective: one(objectives, {
		fields: [keyResults.objectiveId],
		references: [objectives.objectiveId]
	}),
	keyResultDependencies_dependsOnKeyResultId: many(keyResultDependencies, {
		relationName: "keyResultDependencies_dependsOnKeyResultId_keyResults_keyResultId"
	}),
	keyResultDependencies_keyResultId: many(keyResultDependencies, {
		relationName: "keyResultDependencies_keyResultId_keyResults_keyResultId"
	}),
}));

export const objectivesRelations = relations(objectives, ({many}) => ({
	keyResults: many(keyResults),
}));

export const keyResultDependenciesRelations = relations(keyResultDependencies, ({one}) => ({
	keyResult_dependsOnKeyResultId: one(keyResults, {
		fields: [keyResultDependencies.dependsOnKeyResultId],
		references: [keyResults.keyResultId],
		relationName: "keyResultDependencies_dependsOnKeyResultId_keyResults_keyResultId"
	}),
	keyResult_keyResultId: one(keyResults, {
		fields: [keyResultDependencies.keyResultId],
		references: [keyResults.keyResultId],
		relationName: "keyResultDependencies_keyResultId_keyResults_keyResultId"
	}),
}));
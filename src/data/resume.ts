import data from "../../elmar-kenigs.json";

/** Full resume payload from elmar-kenigs.json (types inferred). */
export type ResumeData = typeof data;

/**
 * Project list entries (rxresume-style). The JSON may use `items: []`, which infers as `never[]`
 * unless we describe the element shape explicitly.
 */
export interface ResumeProjectItem {
	id: string;
	hidden?: boolean;
	name: string;
	description?: string;
	website?: { url?: string; label?: string };
}

export const resume: ResumeData = data;

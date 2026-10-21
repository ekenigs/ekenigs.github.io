/** Filter list items where `hidden` is not true (resume export uses `hidden` on items and sections). */
export function visibleItems<T extends { hidden?: boolean }>(
	items: T[] | undefined,
): T[] {
	if (!items?.length) return [];
	return items.filter((item) => item.hidden !== true);
}

export function isSectionVisible(
	section: { hidden?: boolean } | undefined,
): boolean {
	return section?.hidden !== true;
}

/** Visible section with at least one visible item. */
export function hasVisibleItems<
	T extends { hidden?: boolean; items?: { hidden?: boolean }[] },
>(section: T | undefined): section is T {
	return isSectionVisible(section) && visibleItems(section?.items).length > 0;
}

export type LevelScale = "skills" | "languages";

const SKILL_LEVEL_LABELS = [
	"Exposure",
	"Capable",
	"Proficient",
	"Advanced",
	"Expert",
] as const;

const LANGUAGE_LEVEL_LABELS = [
	"Basic",
	"Working",
	"Conversational",
	"Professional",
	"Native-level",
] as const;

export function clampLevel(level: number, max = 5): number {
	return Math.min(Math.max(Math.round(level), 0), max);
}

export function levelLabels(scale: LevelScale, max = 5): readonly string[] {
	const labels =
		scale === "languages" ? LANGUAGE_LEVEL_LABELS : SKILL_LEVEL_LABELS;
	return labels.slice(0, max);
}

export function levelLabel(level: number, scale: LevelScale, max = 5): string {
	const safe = clampLevel(level, max);
	if (safe === 0) return "Not rated";
	const labels = levelLabels(scale, max);
	return labels[safe - 1] ?? labels[labels.length - 1];
}

const HTML_ENTITIES: Record<string, string> = {
	"&nbsp;": " ",
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
};

function decodeEntities(text: string): string {
	return text.replace(
		/&(?:nbsp|amp|lt|gt|quot|#39);/gi,
		(entity) => HTML_ENTITIES[entity.toLowerCase()] ?? entity,
	);
}

/** Strip HTML tags for meta descriptions (trusted static content). */
export function stripHtml(html: string): string {
	return decodeEntities(html.replace(/<[^>]*>/g, " "))
		.replace(/\s+/g, " ")
		.trim();
}

export interface LabeledListEntry {
	label: string;
	values: string[];
}

/** Split on commas that are not nested inside parentheses, e.g. "AWS (Lambda, CDK), CI/CD". */
function splitTopLevelCommas(text: string): string[] {
	const parts: string[] = [];
	let depth = 0;
	let current = "";
	for (const char of text) {
		if (char === "(") depth += 1;
		else if (char === ")") depth = Math.max(0, depth - 1);
		if (char === "," && depth === 0) {
			parts.push(current);
			current = "";
			continue;
		}
		current += char;
	}
	parts.push(current);
	return parts.map((part) => part.trim()).filter(Boolean);
}

/**
 * Parse a rich-text list of the form `<li><strong>Label:</strong> a, b, c</li>` (how custom
 * "summary" sections such as Skills and Languages are authored) into structured entries.
 * Returns `null` when any item does not follow that shape so callers can fall back to raw HTML.
 */
export function parseLabeledList(html: string): LabeledListEntry[] | null {
	const items = html.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi);
	if (!items?.length) return null;

	const entries: LabeledListEntry[] = [];
	for (const item of items) {
		const match = item.match(/<strong\b[^>]*>([\s\S]*?)<\/strong>([\s\S]*)$/i);
		if (!match) return null;
		const label = stripHtml(match[1]).replace(/:\s*$/, "").trim();
		if (!label) return null;
		entries.push({ label, values: splitTopLevelCommas(stripHtml(match[2])) });
	}
	return entries;
}

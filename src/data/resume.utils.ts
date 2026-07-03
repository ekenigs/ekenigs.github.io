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
	const labels = scale === "languages" ? LANGUAGE_LEVEL_LABELS : SKILL_LEVEL_LABELS;
	return labels.slice(0, max);
}

export function levelLabel(
	level: number,
	scale: LevelScale,
	max = 5,
): string {
	const safe = clampLevel(level, max);
	if (safe === 0) return "Not rated";
	const labels = levelLabels(scale, max);
	return labels[safe - 1] ?? labels[labels.length - 1];
}

/** Strip HTML tags for meta descriptions (trusted static content). */
export function stripHtml(html: string): string {
	return html
		.replace(/&nbsp;/gi, " ")
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

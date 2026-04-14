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

/** Strip HTML tags for meta descriptions (trusted static content). */
export function stripHtml(html: string): string {
	return html
		.replace(/&nbsp;/gi, " ")
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

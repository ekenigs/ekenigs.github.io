import data from "../../Elmar-Kenigs-Resume.json";

/**
 * Resume schema (Reactive Resume export). Typed explicitly rather than inferred from the JSON so
 * empty lists (`items: []`, inferred as `never[]`) keep their element shape.
 */

export interface ResumeLink {
	url?: string;
	label?: string;
	inlineLink?: boolean;
}

export interface ResumeCustomField {
	id: string;
	icon?: string;
	text?: string;
	link?: string;
}

export interface ResumeBasics {
	name: string;
	headline: string;
	email?: string;
	phone?: string;
	location?: string;
	website?: ResumeLink;
	customFields: ResumeCustomField[];
}

export interface ResumeSectionBase {
	title: string;
	hidden?: boolean;
}

export interface ResumeSummary extends ResumeSectionBase {
	content: string;
}

export interface ResumeSection<T> extends ResumeSectionBase {
	items: T[];
}

export interface ResumeItemBase {
	id: string;
	hidden?: boolean;
}

export interface ResumeProfileItem extends ResumeItemBase {
	icon?: string;
	network?: string;
	username?: string;
	website?: ResumeLink;
}

export interface ResumeExperienceItem extends ResumeItemBase {
	company: string;
	position: string;
	location?: string;
	period: string;
	website?: ResumeLink;
	description?: string;
}

export interface ResumeEducationItem extends ResumeItemBase {
	school: string;
	degree?: string;
	area?: string;
	grade?: string;
	location?: string;
	period: string;
	website?: ResumeLink;
	description?: string;
}

export interface ResumeProjectItem extends ResumeItemBase {
	name: string;
	description?: string;
	website?: ResumeLink;
}

export interface ResumeSkillItem extends ResumeItemBase {
	name: string;
	level: number;
	keywords?: string[];
}

export interface ResumeLanguageItem extends ResumeItemBase {
	language: string;
	fluency?: string;
	level: number;
}

export interface ResumeInterestItem extends ResumeItemBase {
	icon?: string;
	name: string;
	keywords?: string[];
}

/** Custom sections carry free-form HTML (`type: "summary"`). */
export interface ResumeCustomSectionItem extends ResumeItemBase {
	content: string;
}

export interface ResumeCustomSection
	extends ResumeSection<ResumeCustomSectionItem> {
	id: string;
	type: string;
}

export interface ResumeData {
	basics: ResumeBasics;
	summary: ResumeSummary;
	sections: {
		profiles: ResumeSection<ResumeProfileItem>;
		experience: ResumeSection<ResumeExperienceItem>;
		education: ResumeSection<ResumeEducationItem>;
		projects: ResumeSection<ResumeProjectItem>;
		skills: ResumeSection<ResumeSkillItem>;
		languages: ResumeSection<ResumeLanguageItem>;
		interests: ResumeSection<ResumeInterestItem>;
	};
	customSections: ResumeCustomSection[];
}

export const resume: ResumeData = data;

export interface ProfileLink {
	href: string;
	label: string;
	/** Lower-cased icon/network hint, e.g. "github-logo". */
	icon: string;
}

/**
 * Social profile links. The export keeps these in `basics.customFields` (LinkedIn, GitHub) and may
 * also list them under the `profiles` section; both are merged and de-duplicated by URL.
 */
export function profileLinks(): ProfileLink[] {
	const links: ProfileLink[] = [];
	const seen = new Set<string>();
	const push = (link: ProfileLink) => {
		if (seen.has(link.href)) return;
		seen.add(link.href);
		links.push(link);
	};

	for (const field of resume.basics.customFields) {
		const href = field.link?.trim();
		if (!href) continue;
		push({
			href,
			label: field.text?.trim() || href,
			icon: (field.icon ?? "").toLowerCase(),
		});
	}

	if (resume.sections.profiles.hidden !== true) {
		for (const item of resume.sections.profiles.items) {
			if (item.hidden === true) continue;
			const href = item.website?.url?.trim();
			if (!href) continue;
			push({
				href,
				label: item.network || item.username || href,
				icon: (item.icon || item.network || "").toLowerCase(),
			});
		}
	}

	return links;
}

/** First visible custom section whose title matches (case-insensitive). */
export function customSection(title: string): ResumeCustomSection | undefined {
	const wanted = title.trim().toLowerCase();
	return resume.customSections.find(
		(section) =>
			section.hidden !== true && section.title.trim().toLowerCase() === wanted,
	);
}

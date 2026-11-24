/**
 * Site content. Mirrors the general resume (phone number intentionally left out);
 * interests are kept here even though the resume no longer lists them.
 */

/** Index into the four-colour palette (`--c1` … `--c4`). */
export type Tone = 1 | 2 | 3 | 4;

export interface ExperienceItem {
	company: string;
	role: string;
	period: string;
	location: string;
	note?: string;
	url?: string;
	tone: Tone;
	current?: boolean;
	highlights: string[];
	tags: string[];
}

export interface SkillGroup {
	title: string;
	tone: Tone;
	items: string[];
}

export const basics = {
	name: "Elmar Kenigs",
	initials: "EK",
	headline: "Lead Software Engineer",
	focus: "TypeScript, React & AWS",
	email: "elmar.kenigs@gmail.com",
	location: "Zurich, Switzerland",
	permit: "Swiss B permit",
	site: "kenigs.dev",
	yearsOfExperience: 15,
	github: "https://github.com/ekenigs",
	linkedin: "https://www.linkedin.com/in/elmar-kenigs/",
};

export const summary =
	"Lead Software Engineer with 15 years of experience building web and mobile products with TypeScript, React, Next.js, Node.js, and AWS. Since July 2026 I have been the founding engineer at Sudory, building the AWS platform that scans customers' SaaS and cloud tools for compliance evidence. Before that, over four years, I grew from engineer on the Moonbeam web app to leading a team of 7 across web apps for several clients, owning hiring, architecture, and production launches.";

export const now = {
	role: "Founding Engineer at Sudory",
	text: "Building the AWS platform that scans SaaS and cloud tools for compliance evidence.",
	url: "https://sudory.com",
	label: "sudory.com",
};

export const experience: ExperienceItem[] = [
	{
		company: "Sudory",
		role: "Founding Engineer",
		period: "Jul 2026 — Present",
		location: "Zurich, Switzerland · Remote",
		note: "Sudory checks the security setup of a company's SaaS and cloud tools every day and turns it into compliance evidence for ISO 27001, NIS2, and DORA.",
		url: "https://sudory.com",
		tone: 1,
		current: true,
		highlights: [
			"Moved every provider scanner onto AWS as one-shot ECS Fargate tasks behind a generic orchestrator, defined with CDK, and retired the previous hosting.",
			"Built the AWS security scanner, whose collectors read IAM, EC2, S3, KMS, CloudTrail, and other services per Region and grade them against checks mapped to ISO 27001:2022 controls.",
			"Built the deploy pipeline in GitHub Actions, where a merge deploys staging and rebuilds only the scanners that changed, and production promotes the exact image digests that staging runs.",
			"Validated every provider API response with Zod schemas across 20 scanner packages, and grew the AWS emulator test suite from 5 to 104 tests.",
		],
		tags: ["AWS CDK", "ECS Fargate", "GitHub Actions", "Zod"],
	},
	{
		company: "OpsLayer, Inc.",
		role: "Lead Software Engineer",
		period: "Jan 2025 — Aug 2026",
		location: "Remote",
		url: "https://opslayer.com",
		tone: 2,
		highlights: [
			"Led a team of 7 engineers on web apps for several clients. Grew the team from 3 to 7, ran hiring and task assignment, and took each product from zero to production launch.",
			"Owned end-to-end delivery of an infrastructure-as-a-service web app for fintech clients through its production launch: the Next.js and Mantine frontend, the tRPC backend on Amazon Aurora PostgreSQL, and the AWS infrastructure (Amplify, Lambda, CloudFront, WAF) defined with CDK.",
			"Migrated the app to the Next.js App Router page by page, then to Next.js 15 and React 19.",
			"Hardened the app with tested Content Security Policy (CSP) headers, middleware validation of paths and query params, and an OWASP ZAP scan in GitHub Actions.",
		],
		tags: ["Next.js", "tRPC", "Aurora PostgreSQL", "AWS CDK", "OWASP ZAP"],
	},
	{
		company: "OpsLayer, Inc.",
		role: "Technical Lead",
		period: "Jun 2023 — Dec 2024",
		location: "Remote",
		note: "OpsLayer continued the PureStake team and its products.",
		url: "https://opslayer.com",
		tone: 2,
		highlights: [
			"Owned technical strategy for the Moonbeam web app and a second client web app, including the architecture of a cross-platform TypeScript SDK shared between them.",
			"Started the second web app from the first commit with Next.js, tRPC, and Mantine, and built its sign-in and its multi-step registration flow, which generates the customer's configuration files.",
			"Rewrote the SDK for v1 so it is no longer tied to one platform, then led the v3 redesign as ESM-only packages.",
		],
		tags: ["TypeScript", "Next.js", "tRPC", "Mantine"],
	},
	{
		company: "PureStake, Inc.",
		role: "Software Engineer",
		period: "Jan 2022 — Jun 2023",
		location: "Remote",
		url: "https://purestake.com",
		tone: 4,
		highlights: [
			"Led the frontend migration from Create React App to Next.js and AWS Amplify, which improved build times, SEO, and the deployment workflow.",
			"Built the first release of a TypeScript SDK for the app's transfers, published as npm packages with GitHub Actions release pipelines and acceptance tests.",
			"Introduced Playwright E2E testing in GitHub Actions across the Moonbeam web app, which caught regressions before releases and set the team's testing standards.",
		],
		tags: ["Next.js", "AWS Amplify", "Playwright", "GitHub Actions"],
	},
	{
		company: "E-FARM.COM GmbH",
		role: "Full Stack Node.js Software Engineer (Contractor)",
		period: "Jun 2021 — Jan 2022",
		location: "Hamburg, Germany",
		url: "https://e-farm.com",
		tone: 3,
		highlights: [
			"Developed the SmartTrade React Native app for machinery dealers to submit inventory through dynamic forms tied to sales workflows.",
		],
		tags: ["React Native", "Node.js"],
	},
	{
		company: "E-FARM.COM GmbH",
		role: "Backend Node.js Software Engineer (Contractor)",
		period: "Mar 2020 — Jan 2021",
		location: "Hamburg, Germany",
		url: "https://e-farm.com",
		tone: 3,
		highlights: [
			"Built multiple Node.js microservices with Nest.js and a RabbitMQ event-driven architecture to scale the machinery marketplace.",
		],
		tags: ["Node.js", "Nest.js", "RabbitMQ"],
	},
	{
		company: "Lokalportal GmbH",
		role: "React Frontend Engineer (Contractor)",
		period: "Aug 2019 — Mar 2020",
		location: "Hamburg, Germany",
		url: "https://start.lokalportal.de",
		tone: 1,
		highlights: [
			"Migrated class-based React components to Hooks and hardened the authentication layer with TypeScript and Cypress tests.",
		],
		tags: ["React", "TypeScript", "Cypress"],
	},
	{
		company: "Hermes Europe GmbH",
		role: "Lead Full-Stack Software Engineer",
		period: "Jul 2018 — Mar 2019",
		location: "Hamburg, Germany",
		url: "https://www.hermesworld.com",
		tone: 2,
		highlights: [
			"Promoted to Lead Engineer on a new warehouse logistics project. Owned the technical architecture and daily coordination of 5 to 7 engineers, whom I hired and onboarded with technical interviews and onboarding docs I wrote.",
			"Built an end-to-end parcel processing and tracking system: Node.js backend, React web app, React Native mobile app, and Electron desktop app.",
		],
		tags: ["Node.js", "React", "React Native", "Electron"],
	},
	{
		company: "Hermes Europe GmbH",
		role: "Full-Stack Software Engineer",
		period: "Nov 2015 — Jul 2018",
		location: "Hamburg, Germany",
		url: "https://www.hermesworld.com",
		tone: 2,
		highlights: [
			"Built backend microservices (Node.js) and customer apps (Angular.js) for a large-scale logistics platform.",
			"Developed a full-stack label generation system processing thousands of international e-commerce parcels daily.",
		],
		tags: ["Node.js", "Angular.js"],
	},
	{
		company: "Various",
		role: "Web & Mobile Developer, earlier roles",
		period: "Aug 2011 — Oct 2015",
		location: "Riga, Latvia · Frankfurt am Main, Germany",
		tone: 4,
		highlights: [
			"Agent Stick (2011–2013): built and launched an iOS game with Objective-C and Cocos2D that reached several hundred thousand App Store downloads.",
		],
		tags: ["Objective-C", "Cocos2D", "iOS"],
	},
];

export const education = {
	degree: "Bachelor of Engineering, Computer Science",
	school: "Riga Technical University",
	period: "2010 — 2013",
	url: "https://www.rtu.lv/en",
};

export const skills: SkillGroup[] = [
	{
		title: "Core competencies",
		tone: 1,
		items: [
			"Technical Leadership",
			"System Architecture",
			"Hiring",
			"Mentoring",
			"Code Review",
			"Full-Stack Development",
		],
	},
	{
		title: "AI dev tools & agents",
		tone: 2,
		items: [
			"Claude Code",
			"Cursor",
			"Agent Skills",
			"MCP (Model Context Protocol)",
		],
	},
	{
		title: "Languages & runtimes",
		tone: 3,
		items: ["TypeScript", "JavaScript", "Node.js"],
	},
	{
		title: "Frameworks & libraries",
		tone: 4,
		items: [
			"React.js",
			"Next.js",
			"Vue 3",
			"Nuxt",
			"React Native",
			"Nest.js",
			"TanStack",
			"tRPC",
			"Zod",
			"Electron",
			"Jotai",
			"Redux",
			"TailwindCSS",
			"Mantine",
		],
	},
	{
		title: "Databases & messaging",
		tone: 1,
		items: [
			"PostgreSQL (Amazon Aurora, Supabase)",
			"DynamoDB",
			"MongoDB",
			"Drizzle ORM",
			"RabbitMQ",
			"Amazon SQS",
			"Amazon SNS",
		],
	},
	{
		title: "Cloud & DevOps",
		tone: 2,
		items: [
			"AWS Amplify",
			"Lambda",
			"ECS Fargate",
			"CloudFront",
			"WAF",
			"S3",
			"IAM",
			"KMS",
			"CloudFormation",
			"CDK",
			"Infrastructure as Code",
			"Docker",
			"GitHub Actions",
			"CI/CD",
			"pnpm",
			"Turborepo",
		],
	},
	{
		title: "Security & monitoring",
		tone: 3,
		items: [
			"Content Security Policy (CSP)",
			"OWASP ZAP",
			"AWS WAF",
			"cdk-nag",
			"ISO 27001 controls",
			"Sentry",
			"Flagsmith feature flags",
		],
	},
	{
		title: "Testing & linting",
		tone: 4,
		items: [
			"Vitest",
			"Jest",
			"Playwright",
			"Cypress",
			"Unit Testing",
			"End-to-End (E2E) Testing",
			"ESLint",
			"Biome.js",
		],
	},
];

export const languages = [
	{ name: "Russian", level: "Native" },
	{ name: "English", level: "C1" },
	{ name: "Latvian", level: "C1" },
	{ name: "German", level: "B2" },
];

export const interests = ["Snowboarding", "Hiking", "Kitesurfing"];

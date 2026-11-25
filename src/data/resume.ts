/**
 * Site content. Mirrors the full resume (phone number intentionally left out).
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
	"Lead Software Engineer with 15 years of experience building web and mobile products with TypeScript, React, Next.js, Node.js, and AWS. Since July 2026 I have been the founding engineer at Sudory, building the AWS platform that scans customers' SaaS and cloud tools for compliance evidence. Before that, over four years, I grew from engineer on the Moonbeam dApp to leading a team of 7 across the Tanssi, Moonbeam, and DataHaven dApps, owning hiring, architecture, and mainnet launches. Earlier I led a team of 5 to 7 engineers at Hermes on logistics software that processes thousands of parcels a day. I like taking a feature from the first idea to release and staying hands-on in the code.";

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
			"Built AWS account onboarding for customers: a guided wizard with a CloudFormation quick-create stack, an ExternalId per integration, and an AssumeRole check before the first scan.",
			"Built the deploy pipeline in GitHub Actions, where a merge deploys staging and rebuilds only the scanners that changed, and production promotes the exact image digests that staging runs.",
			"Validated every provider API response with Zod schemas across 20 scanner packages, and grew the AWS emulator test suite from 5 to 104 tests.",
			"Added cdk-nag AwsSolutions and NIST 800-53 checks that fail the build on a new finding, and stored scan evidence in versioned, KMS-encrypted S3 buckets audited by CloudTrail.",
		],
		tags: ["Vue 3", "Nuxt", "TypeScript", "Supabase", "AWS CDK", "ECS Fargate"],
	},
	{
		company: "OpsLayer, Inc.",
		role: "Lead Software Engineer",
		period: "Jan 2025 — Aug 2026",
		location: "Remote",
		url: "https://opslayer.com",
		tone: 2,
		highlights: [
			"Led a team of 7 engineers on the Tanssi, DataHaven, and Glacis dApps. Grew the team from 3 to 7, ran hiring and task assignment, and took each product from zero to mainnet launch.",
			"Owned end-to-end delivery of the Tanssi dApp through its 2025 mainnet launch: the Next.js and Mantine frontend, the tRPC backend on Amazon Aurora PostgreSQL, and the AWS infrastructure (Amplify, Lambda, CloudFront, WAF) defined with CDK.",
			"Built the Tanssi dApp's bridge to Ethereum, reward claims for operators and delegators, and multisig support, backed by scheduled AWS Lambda jobs and Drizzle ORM.",
			"Migrated the Tanssi dApp to the Next.js App Router page by page, then to Next.js 15 and React 19.",
			"Hardened the Tanssi dApp with tested Content Security Policy (CSP) headers, middleware validation of paths and query params, an OWASP ZAP scan in GitHub Actions, and CloudFront alarms over SNS.",
			"Drove all technical decisions for the new DataHaven dApp, defining the frontend architecture and the integrations with the Main Storage Provider backend services and the DataHaven chain, so users can upload, preview, and download files.",
		],
		tags: [
			"Next.js",
			"TypeScript",
			"tRPC",
			"Mantine",
			"Wagmi",
			"Drizzle ORM",
			"AWS CDK",
		],
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
			"Owned technical strategy for the Tanssi and Moonbeam dApps, including the architecture for XCM-SDK cross-chain interactions.",
			"Started the Tanssi dApp from the first commit with Next.js, tRPC, and Mantine, and built its appchain registration flow, which checks balances, generates chain spec files, reserves a ParaId, and registers the chain.",
			"Rewrote XCM-SDK for v1 so it is no longer tied to Moonbeam, then led the v3 redesign: ESM-only packages, no Ethers.js dependency, and a new MRL package for transfers routed through Wormhole.",
			"Moved the Tanssi dApp's data to an Amazon Aurora PostgreSQL cluster defined in CDK, with Drizzle ORM schemas and migrations, and moved its scheduled jobs from GitHub workflows to AWS Lambda.",
			"Mentored a team of 3 engineers on WAGMI and Polkadot.js integrations and on E2E testing with Playwright. Reviewed critical PRs before release.",
			"Defined the shared tooling for both dApps: Playwright E2E suites, Vitest unit tests, Biome.js linting, and GitHub Actions CI.",
		],
		tags: [
			"Next.js",
			"TypeScript",
			"XCM-SDK",
			"Polkadot.js",
			"tRPC",
			"Mantine",
			"Playwright",
		],
	},
	{
		company: "PureStake, Inc.",
		role: "Web3 Software Engineer",
		period: "Jan 2022 — Jun 2023",
		location: "Remote",
		url: "https://purestake.com",
		tone: 4,
		highlights: [
			"Built wallet connection and state management for the v1 Moonbeam dApp with Ethers.js, handling multi-chain interactions across Moonbeam, Moonriver, and Moonbase Alpha.",
			"Led the frontend migration from Create React App to Next.js and AWS Amplify, which improved build times, SEO, and the deployment workflow.",
			"Built the first release of XCM-SDK, a TypeScript SDK for cross-chain asset transfers between Polkadot parachains, published as npm packages with GitHub Actions release pipelines and acceptance tests.",
			"Built the wallet connectors and the cross-chain (XCM) transfer flow for Moonbeam dApp v2 with WAGMI, WalletConnect, and Polkadot.js, which set the Web3 patterns the team kept using.",
			"Introduced Playwright E2E testing with MetaMask in GitHub Actions across the Moonbeam dApp, which caught regressions before releases and set the team's testing standards.",
		],
		tags: [
			"Next.js",
			"TypeScript",
			"Wagmi",
			"Polkadot.js",
			"Ethers.js",
			"XCM-SDK",
			"Playwright",
		],
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
			"Built Nest.js backend services and MongoDB models to support diverse machinery data across web and mobile clients.",
			"Connected the React and React Native frontends to the backend via a shared schema sync, enabling auto-generated dealer questionnaires.",
		],
		tags: [
			"TypeScript",
			"React Native",
			"Expo",
			"Redux",
			"Nest.js",
			"AWS",
			"DynamoDB",
			"MongoDB",
		],
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
			"Created a data aggregation service that renders HTML templates into PDF sales documents automatically from internal systems for the sales team.",
			"Developed a microservice that integrates third-party APIs to push machinery listings to partner websites.",
		],
		tags: [
			"TypeScript",
			"Node.js",
			"Nest.js",
			"RabbitMQ",
			"HTML-to-PDF",
			"Third-party APIs",
		],
	},
	{
		company: "Lokalportal GmbH",
		role: "React Frontend Engineer (Contractor)",
		period: "Aug 2019 — Mar 2020",
		location: "Hamburg, Germany",
		url: "https://start.lokalportal.de",
		tone: 1,
		highlights: [
			"Improved frontend business logic and state management for a public news and community portal.",
			"Migrated class-based React components to Hooks, improving code readability and maintenance.",
			"Hardened the authentication layer with TypeScript and Cypress tests.",
		],
		tags: ["React", "Redux", "TypeScript", "Cypress"],
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
			"Delivered warehouse management tools with the product team, enabling daily processing of thousands of international parcels.",
		],
		tags: [
			"TypeScript",
			"React",
			"React Native",
			"Electron",
			"Node.js",
			"Express",
			"Hapi.js",
		],
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
			"Created the public parcel tracking page end-to-end, used by thousands of end customers daily.",
			"Developed a full-stack label generation system processing thousands of international e-commerce parcels daily.",
		],
		tags: ["TypeScript", "Node.js", "Express", "Angular.js"],
	},
	{
		company: "yasni GmbH",
		role: "Web Developer",
		period: "Dec 2014 — Oct 2015",
		location: "Frankfurt am Main, Germany",
		tone: 4,
		highlights: [
			"Maintained and enhanced the UI of a high-traffic search engine with PHP, JavaScript, and MySQL.",
			"Fixed production bugs across the platform, improving stability for public users.",
		],
		tags: ["JavaScript", "PHP", "MySQL"],
	},
	{
		company: "Freelance",
		role: "Web Developer",
		period: "Jan 2013 — Nov 2014",
		location: "Frankfurt am Main, Germany",
		tone: 4,
		highlights: [
			"Built custom WordPress sites for small businesses and entrepreneurs launching their first online presence.",
			"Redesigned existing sites with PHP, JavaScript, jQuery, and Bootstrap to improve usability and appearance.",
		],
		tags: ["WordPress", "PHP", "JavaScript", "jQuery", "Bootstrap"],
	},
	{
		company: "Agent Stick",
		role: "Mobile Game Developer",
		period: "Aug 2011 — Feb 2013",
		location: "Riga, Latvia",
		tone: 4,
		highlights: [
			'Developed the "Agent Stick" iOS game with Objective-C, Cocos2D, and Box2D physics.',
			"Programmed the core game logic, character animations, and an on-screen drawing mechanic for physics interactions.",
			"Launched the game on the App Store, where it reached several hundred thousand downloads.",
		],
		tags: ["Objective-C", "Cocos2D", "Box2D", "iOS"],
	},
];

export const volunteering = {
	role: "Volunteer",
	org: "Web Zürich",
	location: "Zurich, Switzerland",
	text: "A free community meetup with talks on web development, running since 2016.",
	url: "https://webzurich.ch",
};

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
			"Web3 Development",
		],
	},
	{
		title: "Web3 & blockchain",
		tone: 2,
		items: [
			"Ethers.js",
			"WAGMI",
			"Viem",
			"Polkadot.js",
			"XCM-SDK",
			"WalletConnect",
			"RainbowKit",
			"Wormhole",
			"EVM",
			"Substrate",
		],
	},
	{
		title: "AI dev tools & agents",
		tone: 3,
		items: [
			"Claude Code",
			"Cursor",
			"Agent Skills",
			"MCP (Model Context Protocol)",
		],
	},
	{
		title: "Languages & runtimes",
		tone: 4,
		items: ["TypeScript", "JavaScript", "Node.js"],
	},
	{
		title: "Frameworks & libraries",
		tone: 1,
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
		],
	},
	{
		title: "State management",
		tone: 2,
		items: ["Jotai", "Redux", "React Context"],
	},
	{
		title: "UI & styling",
		tone: 3,
		items: ["TailwindCSS", "Mantine", "MaterialUI"],
	},
	{
		title: "Databases & messaging",
		tone: 4,
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
		tone: 1,
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
		tone: 2,
		items: [
			"Content Security Policy (CSP)",
			"OWASP ZAP",
			"AWS WAF",
			"cdk-nag",
			"ISO 27001 controls",
			"Sentry",
			"Feature Flags",
		],
	},
	{
		title: "Static analysis & linting",
		tone: 3,
		items: ["ESLint", "Biome.js", "Prettier", "Oxlint", "Oxfmt", "Fallow"],
	},
	{
		title: "Testing",
		tone: 4,
		items: [
			"Vitest",
			"Jest",
			"Playwright",
			"Cypress",
			"Unit Testing",
			"End-to-End (E2E) Testing",
		],
	},
];

export const languages = [
	{ name: "Russian", level: "Native" },
	{ name: "English", level: "C1" },
	{ name: "German", level: "B2" },
	{ name: "Latvian", level: "C1" },
];

export const interests = ["Snowboarding", "Hiking", "Kitesurfing"];

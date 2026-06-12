import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSummaryTextAnimation } from "./summary-animation";

function shouldSkipAnimations(): boolean {
	return (
		window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
		window.matchMedia("(pointer: coarse)").matches
	);
}

type LevelSectionSpeed = "fast" | "normal";

const levelSectionConfig: Record<
	LevelSectionSpeed,
	{
		rowDuration: number;
		rowStagger: number;
		dotDuration: number;
		dotStagger: number;
		dotStart: number;
		rowOverlap: number;
	}
> = {
	fast: {
		rowDuration: 0.35,
		rowStagger: 0.05,
		dotDuration: 0.28,
		dotStagger: 0.04,
		dotStart: 0.12,
		rowOverlap: 0.18,
	},
	normal: {
		rowDuration: 0.45,
		rowStagger: 0.07,
		dotDuration: 0.38,
		dotStagger: 0.05,
		dotStart: 0.18,
		rowOverlap: 0.14,
	},
};

function initLevelSectionAnimation(
	sectionId: string,
	speed: LevelSectionSpeed,
): void {
	const section = document.querySelector(`#${sectionId}`);
	const rows = section?.querySelectorAll("[data-animate-stagger] > li");
	if (!section || !rows || rows.length === 0) return;

	const config = levelSectionConfig[speed];
	gsap.set(rows, { opacity: 0, y: 20 });
	const dots = section.querySelectorAll("[data-level-dot]");
	gsap.set(dots, { opacity: 0, x: 20 });

	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "top 88%",
			once: true,
			invalidateOnRefresh: true,
		},
	});

	rows.forEach((row, index) => {
		timeline.to(
			row,
			{
				opacity: 1,
				y: 0,
				duration: config.rowDuration,
				ease: "power2.out",
			},
			index * config.rowStagger,
		);

		const rowDots = row.querySelectorAll("[data-level-dot]");
		if (rowDots.length === 0) return;

		timeline.to(
			rowDots,
			{
				opacity: 1,
				x: 0,
				duration: config.dotDuration,
				ease: "power3.out",
				stagger: { each: config.dotStagger, from: "end" },
			},
			index === 0 ? config.dotStart : `-=${config.rowOverlap}`,
		);
	});
}

export function initScrollAnimations(): void {
	if (shouldSkipAnimations()) return;

	document.documentElement.classList.add("js-ready");
	gsap.registerPlugin(ScrollTrigger);

	const heroItems = document.querySelectorAll("[data-animate-hero]");
	if (heroItems.length > 0) {
		gsap.to(heroItems, {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power3.out",
			stagger: 0.15,
			delay: 0.2,
		});
	}

	const sections = document.querySelectorAll("[data-animate-section]");
	sections.forEach((section) => {
		gsap.to(section, {
			opacity: 1,
			y: 0,
			duration: 0.7,
			ease: "power2.out",
			scrollTrigger: {
				trigger: section,
				start: "top 85%",
				once: true,
				invalidateOnRefresh: true,
			},
		});
	});

	const headings = document.querySelectorAll("[data-animate-heading]");
	headings.forEach((heading) => {
		ScrollTrigger.create({
			trigger: heading,
			start: "top 85%",
			once: true,
			invalidateOnRefresh: true,
			onEnter: () => heading.classList.add("is-visible"),
		});
	});

	const staggerContainers = document.querySelectorAll("[data-animate-stagger]");
	staggerContainers.forEach((container) => {
		if (container.closest("#skills, #languages")) return;

		const children = container.children;
		if (children.length === 0) return;

		gsap.to(children, {
			opacity: 1,
			y: 0,
			duration: 0.55,
			ease: "power2.out",
			stagger: 0.08,
			scrollTrigger: {
				trigger: container,
				start: "top 88%",
				once: true,
				invalidateOnRefresh: true,
			},
		});
	});

	initLevelSectionAnimation("skills", "fast");
	initLevelSectionAnimation("languages", "normal");

	initSummaryTextAnimation();

	const refreshScrollTriggers = () => ScrollTrigger.refresh();
	window.addEventListener("load", refreshScrollTriggers, { once: true });
	window.addEventListener("resize", refreshScrollTriggers, { passive: true });
	refreshScrollTriggers();
}

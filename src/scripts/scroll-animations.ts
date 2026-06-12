import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSummaryTextAnimation } from "./summary-animation";

function shouldSkipAnimations(): boolean {
	return (
		window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
		window.matchMedia("(pointer: coarse)").matches
	);
}

function initLevelDotsEnterAnimation(sectionId: string): void {
	const rows = document.querySelectorAll(
		`#${sectionId} [data-animate-stagger] > li`,
	);
	if (rows.length === 0) return;

	const dotTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: `#${sectionId}`,
			start: "top 85%",
			once: true,
		},
	});

	rows.forEach((row, index) => {
		const dots = row.querySelectorAll("[data-level-dot]");
		if (dots.length === 0) return;

		dotTimeline.to(
			dots,
			{
				opacity: 1,
				x: 0,
				duration: 0.45,
				ease: "power3.out",
				stagger: { each: 0.07, from: "end" },
			},
			index === 0 ? 0.3 : "-=0.15",
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
			},
		});
	});

	const headings = document.querySelectorAll("[data-animate-heading]");
	headings.forEach((heading) => {
		ScrollTrigger.create({
			trigger: heading,
			start: "top 85%",
			once: true,
			onEnter: () => heading.classList.add("is-visible"),
		});
	});

	const staggerContainers = document.querySelectorAll("[data-animate-stagger]");
	staggerContainers.forEach((container) => {
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
			},
		});
	});

	initLevelDotsEnterAnimation("skills");
	initLevelDotsEnterAnimation("languages");

	initSummaryTextAnimation();
}

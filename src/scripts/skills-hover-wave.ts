import gsap from "gsap";

function shouldSkip(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initLevelDotsHoverWave(): void {
	if (shouldSkip()) return;

	const cards = document.querySelectorAll<HTMLElement>("[data-level-card]");
	cards.forEach((card) => {
		if (card.dataset.hoverWaveBound === "true") return;
		card.dataset.hoverWaveBound = "true";

		const dots = card.querySelectorAll("[data-level-dot]");
		if (dots.length === 0) return;

		card.addEventListener("mouseenter", () => {
			gsap.killTweensOf(dots);
			gsap.set(dots, { y: 0 });

			gsap.to(dots, {
				y: -6,
				duration: 0.16,
				ease: "power2.out",
				stagger: 0.055,
				yoyo: true,
				repeat: 1,
			});
		});

		card.addEventListener("mouseleave", () => {
			gsap.killTweensOf(dots);
			gsap.set(dots, { y: 0 });
		});
	});
}

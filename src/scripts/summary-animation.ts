import gsap from "gsap";

function wrapWords(container: HTMLElement): HTMLElement[] {
	if (container.dataset.wordsWrapped === "true") {
		return Array.from(container.querySelectorAll(".summary-word"));
	}

	const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
		acceptNode(node) {
			return node.textContent?.trim()
				? NodeFilter.FILTER_ACCEPT
				: NodeFilter.FILTER_REJECT;
		},
	});

	const textNodes: Text[] = [];
	let current = walker.nextNode();
	while (current) {
		if (current instanceof Text) textNodes.push(current);
		current = walker.nextNode();
	}

	for (const textNode of textNodes) {
		const parent = textNode.parentElement;
		if (!parent) continue;

		const parts = textNode.textContent?.split(/(\s+)/) ?? [];
		const fragment = document.createDocumentFragment();

		for (const part of parts) {
			if (!part) continue;
			if (/^\s+$/.test(part)) {
				fragment.appendChild(document.createTextNode(part));
				continue;
			}
			const span = document.createElement("span");
			span.className = "summary-word inline-block";
			span.textContent = part;
			fragment.appendChild(span);
		}

		parent.replaceChild(fragment, textNode);
	}

	container.dataset.wordsWrapped = "true";
	return Array.from(container.querySelectorAll(".summary-word"));
}

export function initSummaryTextAnimation(): void {
	const container = document.querySelector("#summary [data-animate-summary]");
	if (!(container instanceof HTMLElement)) return;

	const words = wrapWords(container);
	if (words.length === 0) return;

	gsap.to(words, {
		opacity: 1,
		y: 0,
		duration: 0.4,
		ease: "power2.out",
		stagger: 0.028,
		delay: 0.2,
		scrollTrigger: {
			trigger: "#summary",
			start: "top 85%",
			once: true,
		},
	});
}

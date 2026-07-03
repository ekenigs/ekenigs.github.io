export function initPageNav(): void {
	const nav = document.querySelector<HTMLElement>("[data-page-nav]");
	if (!nav) return;

	const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
	if (links.length === 0) return;

	const sections: { id: string; el: HTMLElement }[] = [];
	for (const link of links) {
		const id = link.getAttribute("href")?.slice(1);
		if (!id) continue;
		const el = document.getElementById(id);
		if (el) sections.push({ id, el });
	}

	if (sections.length === 0) return;

	const setActive = (id: string | null): void => {
		for (const link of links) {
			const linkId = link.getAttribute("href")?.slice(1) ?? "";
			const active = id !== null && linkId === id;
			link.classList.toggle("is-active", active);
			if (active) {
				link.setAttribute("aria-current", "location");
			} else {
				link.removeAttribute("aria-current");
			}
		}
	};

	const scrollMarker = (): number => nav.offsetHeight + 16;

	const updateFromScroll = (): void => {
		const marker = scrollMarker();
		let activeId = sections[0].id;

		for (const { id, el } of sections) {
			if (el.getBoundingClientRect().top <= marker) {
				activeId = id;
			}
		}

		setActive(activeId);
	};

	let ticking = false;
	const onScroll = (): void => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			ticking = false;
			updateFromScroll();
		});
	};

	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", onScroll, { passive: true });
	window.addEventListener("load", updateFromScroll, { once: true });

	const syncFromHash = (): void => {
		const id = window.location.hash.slice(1);
		if (id && sections.some((section) => section.id === id)) {
			setActive(id);
			return;
		}
		updateFromScroll();
	};

	window.addEventListener("hashchange", syncFromHash);
	syncFromHash();
}

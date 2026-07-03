/** One slide per viewport; step equals the visible scrollport width. */
function getCarouselStep(track: HTMLElement): number {
	return track.clientWidth;
}

function getActiveSlideIndex(track: HTMLElement): number {
	const slides = track.querySelectorAll<HTMLElement>("[data-carousel-slide]");
	if (!slides.length) return 0;

	const trackCenter = track.scrollLeft + track.clientWidth / 2;
	let closestIndex = 0;
	let closestDistance = Number.POSITIVE_INFINITY;

	slides.forEach((slide, index) => {
		const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
		const distance = Math.abs(slideCenter - trackCenter);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = index;
		}
	});

	return closestIndex;
}

function initCarousel(item: HTMLElement): void {
	const track = item.querySelector<HTMLElement>("[data-carousel-track]");
	const prev = item.querySelector<HTMLButtonElement>("[data-carousel-prev]");
	const next = item.querySelector<HTMLButtonElement>("[data-carousel-next]");
	const status = item.querySelector<HTMLElement>("[data-carousel-status]");
	if (!track || !prev || !next) return;

	const prevBtn = prev;
	const nextBtn = next;
	const carousel = track;
	const slideCount = Number(item.dataset.slideCount ?? carousel.children.length) || 1;
	const edgeEps = 2;

	function updateStatus(): void {
		const index = getActiveSlideIndex(carousel);
		const humanIndex = index + 1;
		if (status) {
			status.textContent = `${humanIndex} / ${slideCount}`;
		}
		prevBtn.setAttribute("aria-label", `Previous screenshot (${humanIndex} of ${slideCount})`);
		nextBtn.setAttribute("aria-label", `Next screenshot (${humanIndex} of ${slideCount})`);
	}

	function goNext(): void {
		const step = getCarouselStep(carousel);
		const maxScroll = carousel.scrollWidth - carousel.clientWidth;
		if (carousel.scrollLeft >= maxScroll - edgeEps) {
			carousel.scrollTo({ left: 0, behavior: "smooth" });
		} else {
			carousel.scrollBy({ left: step, behavior: "smooth" });
		}
	}

	function goPrev(): void {
		const step = getCarouselStep(carousel);
		const maxScroll = carousel.scrollWidth - carousel.clientWidth;
		if (carousel.scrollLeft <= edgeEps) {
			carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
		} else {
			carousel.scrollBy({ left: -step, behavior: "smooth" });
		}
	}

	prevBtn.addEventListener("click", goPrev);
	nextBtn.addEventListener("click", goNext);
	carousel.addEventListener("scroll", updateStatus, { passive: true });
	window.addEventListener("resize", updateStatus);
	updateStatus();
}

type GalleryImage = { src: string; alt: string };
type PortfolioLayout = "portrait" | "landscape";

function initLightbox(root: HTMLElement): void {
	const modal = root.querySelector<HTMLElement>("[data-portfolio-modal]");
	const modalViewport = root.querySelector<HTMLElement>("[data-modal-viewport]");
	const modalImg = root.querySelector<HTMLImageElement>("[data-modal-img]");
	const btnClose = root.querySelector<HTMLButtonElement>("[data-modal-close]");
	const btnPrev = root.querySelector<HTMLButtonElement>("[data-modal-prev]");
	const btnNext = root.querySelector<HTMLButtonElement>("[data-modal-next]");
	const backdrop = root.querySelector<HTMLElement>("[data-modal-backdrop]");

	if (
		!modal ||
		!modalViewport ||
		!modalImg ||
		!btnClose ||
		!btnPrev ||
		!btnNext ||
		!backdrop
	) {
		return;
	}

	// GSAP animates sections with transform, which makes fixed descendants
	// position relative to the section instead of the viewport.
	if (modal.parentElement !== document.body) {
		document.body.appendChild(modal);
	}

	const modalEl = modal;
	const modalViewportEl = modalViewport;
	const modalImgEl = modalImg;
	const btnCloseEl = btnClose;
	const btnPrevEl = btnPrev;
	const btnNextEl = btnNext;
	const backdropEl = backdrop;

	let images: GalleryImage[] = [];
	let index = 0;
	let layout: PortfolioLayout = "landscape";
	let triggerEl: HTMLElement | null = null;

	function applyLayout(nextLayout: PortfolioLayout): void {
		layout = nextLayout;
		const portrait = layout === "portrait";
		modalEl.classList.toggle("portfolio-modal--portrait", portrait);
		modalViewportEl.classList.toggle(
			"portfolio-modal__viewport--portrait",
			portrait,
		);
		modalViewportEl.classList.toggle(
			"portfolio-modal__viewport--landscape",
			!portrait,
		);
		modalImgEl.classList.toggle("portfolio-modal__img--portrait", portrait);
		modalImgEl.classList.toggle("portfolio-modal__img--landscape", !portrait);
	}

	function updateImage(): void {
		const item = images[index];
		if (item) {
			modalImgEl.src = item.src;
			modalImgEl.alt = item.alt;
		}
		const humanIndex = index + 1;
		modalEl.setAttribute(
			"aria-label",
			`Image preview (${humanIndex} of ${images.length})`,
		);
		btnPrevEl.setAttribute(
			"aria-label",
			`Previous image (${humanIndex} of ${images.length})`,
		);
		btnNextEl.setAttribute(
			"aria-label",
			`Next image (${humanIndex} of ${images.length})`,
		);
		if (layout === "portrait") {
			modalViewportEl.scrollTop = 0;
		}
	}

	function open(
		imgs: GalleryImage[],
		idx: number,
		fromEl: HTMLElement,
		itemLayout: PortfolioLayout,
	): void {
		images = imgs;
		index = idx;
		triggerEl = fromEl;
		applyLayout(itemLayout);
		updateImage();
		modalEl.classList.remove("hidden");
		modalEl.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
		btnCloseEl.focus();
	}

	function close(): void {
		modalEl.classList.add("hidden");
		modalEl.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
		triggerEl?.focus();
		triggerEl = null;
	}

	function step(delta: number): void {
		if (!images.length) return;
		index = (index + delta + images.length) % images.length;
		updateImage();
	}

	root
		.querySelectorAll<HTMLButtonElement>("[data-open-lightbox]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				const article = btn.closest<HTMLElement>("[data-portfolio-item]");
				if (!article?.dataset.images) return;
				let imgs: GalleryImage[];
				try {
					imgs = JSON.parse(article.dataset.images) as GalleryImage[];
				} catch {
					return;
				}
				const idx = Number(btn.dataset.imageIndex ?? 0);
				const itemLayout =
					article.dataset.layout === "portrait" ? "portrait" : "landscape";
				open(imgs, idx, btn, itemLayout);
			});
		});

	btnCloseEl.addEventListener("click", close);
	backdropEl.addEventListener("click", close);
	btnPrevEl.addEventListener("click", () => step(-1));
	btnNextEl.addEventListener("click", () => step(1));

	function onKeydown(e: KeyboardEvent): void {
		if (modalEl.classList.contains("hidden")) return;
		if (e.key === "Escape") {
			e.preventDefault();
			close();
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			step(-1);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			step(1);
		}
	}

	document.addEventListener("keydown", onKeydown);
}

function initPortfolioRoot(root: HTMLElement): void {
	root
		.querySelectorAll<HTMLElement>("[data-portfolio-item]")
		.forEach(initCarousel);
	initLightbox(root);
}

function boot(): void {
	document
		.querySelectorAll<HTMLElement>("[data-portfolio-root]")
		.forEach(initPortfolioRoot);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", boot);
} else {
	boot();
}

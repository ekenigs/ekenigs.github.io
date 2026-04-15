/** One slide per viewport; step equals the visible scrollport width. */
function getCarouselStep(track: HTMLElement): number {
	return track.clientWidth;
}

function initCarousel(item: HTMLElement): void {
	const track = item.querySelector<HTMLElement>("[data-carousel-track]");
	const prev = item.querySelector<HTMLButtonElement>("[data-carousel-prev]");
	const next = item.querySelector<HTMLButtonElement>("[data-carousel-next]");
	if (!track || !prev || !next) return;

	const edgeEps = 2;

	function goNext(): void {
		const step = getCarouselStep(track);
		const maxScroll = track.scrollWidth - track.clientWidth;
		if (track.scrollLeft >= maxScroll - edgeEps) {
			track.scrollTo({ left: 0, behavior: "smooth" });
		} else {
			track.scrollBy({ left: step, behavior: "smooth" });
		}
	}

	function goPrev(): void {
		const step = getCarouselStep(track);
		const maxScroll = track.scrollWidth - track.clientWidth;
		if (track.scrollLeft <= edgeEps) {
			track.scrollTo({ left: maxScroll, behavior: "smooth" });
		} else {
			track.scrollBy({ left: -step, behavior: "smooth" });
		}
	}

	prev.addEventListener("click", goPrev);
	next.addEventListener("click", goNext);
}

type GalleryImage = { src: string; alt: string };

function initLightbox(root: HTMLElement): void {
	const modal = root.querySelector<HTMLElement>("[data-portfolio-modal]");
	const modalImg = root.querySelector<HTMLImageElement>("[data-modal-img]");
	const btnClose = root.querySelector<HTMLButtonElement>("[data-modal-close]");
	const btnPrev = root.querySelector<HTMLButtonElement>("[data-modal-prev]");
	const btnNext = root.querySelector<HTMLButtonElement>("[data-modal-next]");
	const backdrop = root.querySelector<HTMLElement>("[data-modal-backdrop]");

	if (!modal || !modalImg || !btnClose || !btnPrev || !btnNext || !backdrop) {
		return;
	}

	const modalEl = modal;
	const modalImgEl = modalImg;
	const btnCloseEl = btnClose;
	const btnPrevEl = btnPrev;
	const btnNextEl = btnNext;
	const backdropEl = backdrop;

	let images: GalleryImage[] = [];
	let index = 0;
	let triggerEl: HTMLElement | null = null;

	function updateImage(): void {
		const item = images[index];
		if (item) {
			modalImgEl.src = item.src;
			modalImgEl.alt = item.alt;
		}
	}

	function open(imgs: GalleryImage[], idx: number, fromEl: HTMLElement): void {
		images = imgs;
		index = idx;
		triggerEl = fromEl;
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
				open(imgs, idx, btn);
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

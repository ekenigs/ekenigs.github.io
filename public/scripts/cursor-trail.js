(() => {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
	if (prefersReducedMotion || hasCoarsePointer) return;

	const canvas = document.querySelector('[data-cursor-trail]');
	if (!(canvas instanceof HTMLCanvasElement)) return;
	if (canvas.dataset.initialized === 'true') return;
	canvas.dataset.initialized = 'true';

	const context = canvas.getContext('2d');
	if (!context) return;

	const trailPoints = [];
	const maxTrailPoints = 26;
	const pointLifetimeMs = 520;
	let rafId = 0;
	const interactiveSelector = [
		'a',
		'button',
		'input',
		'select',
		'textarea',
		'label',
		'summary',
		'[role="button"]',
		'[role="link"]',
		'[contenteditable="true"]',
		'[data-cursor-trail-ignore]',
	].join(',');

	const getColor = () =>
		document.documentElement.classList.contains('dark') ? '52,211,153' : '5,150,105';

	const resizeCanvas = () => {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.floor(window.innerWidth * dpr);
		canvas.height = Math.floor(window.innerHeight * dpr);
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;
		context.setTransform(dpr, 0, 0, dpr, 0, 0);
	};

	const render = () => {
		const now = performance.now();
		const color = getColor();
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = trailPoints.length - 1; i >= 0; i -= 1) {
			if (now - trailPoints[i].time > pointLifetimeMs) {
				trailPoints.splice(i, 1);
			}
		}

		for (let i = 1; i < trailPoints.length; i += 1) {
			const prev = trailPoints[i - 1];
			const point = trailPoints[i];
			const ageRatio = 1 - (now - point.time) / pointLifetimeMs;
			const progressRatio = i / trailPoints.length;
			const alpha = Math.max(0, ageRatio) * progressRatio * 0.9;
			if (alpha <= 0.015) continue;

			context.beginPath();
			context.moveTo(prev.x, prev.y);
			context.lineTo(point.x, point.y);
			context.strokeStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
			context.lineWidth = 1.5 + progressRatio * 4;
			context.lineCap = 'round';
			context.lineJoin = 'round';
			context.stroke();
		}

		if (trailPoints.length > 1) {
			rafId = window.requestAnimationFrame(render);
		} else {
			rafId = 0;
		}
	};

	const addPoint = (x, y) => {
		trailPoints.push({ x, y, time: performance.now() });
		if (trailPoints.length > maxTrailPoints) {
			trailPoints.splice(0, trailPoints.length - maxTrailPoints);
		}
		if (!rafId) {
			rafId = window.requestAnimationFrame(render);
		}
	};

	const hasActiveTextSelection = () => {
		const selection = window.getSelection();
		return Boolean(selection && !selection.isCollapsed);
	};

	const isInteractiveElement = (target) => {
		if (!(target instanceof Element)) return false;
		return Boolean(target.closest(interactiveSelector));
	};

	const handlePointerMove = (event) => {
		if (event.pointerType !== 'mouse') return;
		if (hasActiveTextSelection()) return;
		if (isInteractiveElement(event.target)) return;
		addPoint(event.clientX, event.clientY);
	};

	const handlePointerLeave = () => {
		if (!rafId && trailPoints.length > 1) {
			rafId = window.requestAnimationFrame(render);
		}
	};

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas, { passive: true });
	window.addEventListener('pointermove', handlePointerMove, { passive: true });
	window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
})();

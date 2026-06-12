import * as THREE from "three";

const PARTICLE_COUNT = 80;
const GOLD = 0xf59e0b;
const ORANGE = 0xea580c;

function shouldSkip(): boolean {
	return (
		window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
		window.matchMedia("(pointer: coarse)").matches
	);
}

export function initHeroScene(): void {
	if (shouldSkip()) return;

	const canvas = document.querySelector("[data-hero-scene]");
	if (!(canvas instanceof HTMLCanvasElement)) return;
	if (canvas.dataset.initialized === "true") return;
	canvas.dataset.initialized = "true";

	const renderer = new THREE.WebGLRenderer({
		canvas,
		alpha: true,
		antialias: true,
		powerPreference: "low-power",
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
	camera.position.z = 5;

	const positions = new Float32Array(PARTICLE_COUNT * 3);
	const colors = new Float32Array(PARTICLE_COUNT * 3);
	const velocities: THREE.Vector3[] = [];

	const colorGold = new THREE.Color(GOLD);
	const colorOrange = new THREE.Color(ORANGE);

	for (let i = 0; i < PARTICLE_COUNT; i += 1) {
		positions[i * 3] = (Math.random() - 0.5) * 10;
		positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

		const mix = Math.random();
		const c = colorGold.clone().lerp(colorOrange, mix);
		colors[i * 3] = c.r;
		colors[i * 3 + 1] = c.g;
		colors[i * 3 + 2] = c.b;

		velocities.push(
			new THREE.Vector3(
				(Math.random() - 0.5) * 0.004,
				(Math.random() - 0.5) * 0.003,
				(Math.random() - 0.5) * 0.002,
			),
		);
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

	const material = new THREE.PointsMaterial({
		size: 0.06,
		vertexColors: true,
		transparent: true,
		opacity: 0.75,
		sizeAttenuation: true,
		depthWrite: false,
	});

	const points = new THREE.Points(geometry, material);
	scene.add(points);

	const mouse = new THREE.Vector2(0, 0);
	let rafId = 0;

	const resize = () => {
		const parent = canvas.parentElement;
		if (!parent) return;
		const { width, height } = parent.getBoundingClientRect();
		renderer.setSize(width, height, false);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	};

	const onPointerMove = (event: PointerEvent) => {
		const rect = canvas.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
	};

	const animate = () => {
		const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
		const posArray = posAttr.array as Float32Array;

		for (let i = 0; i < PARTICLE_COUNT; i += 1) {
			const idx = i * 3;
			posArray[idx] += velocities[i].x;
			posArray[idx + 1] += velocities[i].y;
			posArray[idx + 2] += velocities[i].z;

			const dx = posArray[idx] - mouse.x * 3;
			const dy = posArray[idx + 1] - mouse.y * 2;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 1.5) {
				posArray[idx] += dx * 0.002;
				posArray[idx + 1] += dy * 0.002;
			}

			if (Math.abs(posArray[idx]) > 5) velocities[i].x *= -1;
			if (Math.abs(posArray[idx + 1]) > 3) velocities[i].y *= -1;
			if (Math.abs(posArray[idx + 2]) > 2) velocities[i].z *= -1;
		}

		posAttr.needsUpdate = true;
		points.rotation.y += 0.0004;
		renderer.render(scene, camera);
		rafId = requestAnimationFrame(animate);
	};

	const cleanup = () => {
		cancelAnimationFrame(rafId);
		window.removeEventListener("resize", resize);
		window.removeEventListener("pointermove", onPointerMove);
		geometry.dispose();
		material.dispose();
		renderer.dispose();
	};

	resize();
	window.addEventListener("resize", resize, { passive: true });
	window.addEventListener("pointermove", onPointerMove, { passive: true });
	animate();

	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			cancelAnimationFrame(rafId);
			rafId = 0;
		} else if (!rafId) {
			animate();
		}
	});

	window.addEventListener("pagehide", cleanup, { once: true });
}

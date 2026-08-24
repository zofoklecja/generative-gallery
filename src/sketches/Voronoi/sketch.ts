import type { Position } from "./types";

type Params = {
	canvasCtx: CanvasRenderingContext2D | null;
	mouseRef: React.RefObject<Position | null>;
	CANVAS_HEIGHT: number;
	CANVAS_WIDTH: number;
};

const MAX_RGB = 256;
const REPEL_RADIUS = 10;
const REPEL_FORCE = 1;

export default ({
	canvasCtx,
	mouseRef,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
}: Params) => {
	let drawRequestId = 0;

	const particles = Array.from({ length: 20 }, () => {
		const angle = Math.random() * Math.PI * 2;
		return {
			x: Math.random() * CANVAS_WIDTH,
			y: Math.random() * CANVAS_HEIGHT,
			vx: Math.cos(angle),
			vy: Math.sin(angle),
			color: {
				r: Math.floor(Math.random() * MAX_RGB),
				g: Math.floor(Math.random() * MAX_RGB),
				b: Math.floor(Math.random() * MAX_RGB),
			},
		};
	});

	if (!canvasCtx) {
		return { start: () => {}, stop: () => {} };
	}

	const imageData = canvasCtx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
	const data = imageData.data;

	const draw = () => {
		drawRequestId = requestAnimationFrame(draw);

		for (let j = 0; j < CANVAS_HEIGHT; j++) {
			for (let i = 0; i < CANVAS_WIDTH; i++) {
				let minDistance: number = Infinity;
				let closestIdx: number = 0;
				particles.forEach(({ x, y }, idx) => {
					if (minDistance > (i - x) ** 2 + (j - y) ** 2) {
						minDistance = (i - x) ** 2 + (j - y) ** 2;
						closestIdx = idx;
					}
				});

				const bufferStart = (j * CANVAS_WIDTH + i) * 4;
				data[bufferStart] = particles[closestIdx].color.r; // R
				data[bufferStart + 1] = particles[closestIdx].color.g; // G
				data[bufferStart + 2] = particles[closestIdx].color.b; // B
				data[bufferStart + 3] = 255; // A
			}
		}
		canvasCtx.putImageData(imageData, 0, 0);

		particles.forEach((_particle, idx) => {
			canvasCtx.fillStyle = "black";
			canvasCtx.fillRect(particles[idx].x, particles[idx].y, 3, 3);

			if (particles[idx].x >= CANVAS_WIDTH || particles[idx].x < 0) {
				particles[idx].vx *= -1;
			}

			if (particles[idx].y >= CANVAS_HEIGHT || particles[idx].y < 0) {
				particles[idx].vy *= -1;
			}

			if (mouseRef.current) {
				const dx = particles[idx].x - mouseRef.current.x;
				const dy = particles[idx].y - mouseRef.current.y;
				const dist = Math.sqrt(dx ** 2 + dy ** 2);

				if (dist < REPEL_RADIUS) {
					particles[idx].vx += (dx / dist) * REPEL_FORCE;
					particles[idx].vy += (dy / dist) * REPEL_FORCE;
				}
			}

			particles[idx].x += particles[idx].vx;
			particles[idx].y += particles[idx].vy;
		});
	};

	return { start: draw, stop: () => cancelAnimationFrame(drawRequestId) };
};

type Params = {
	canvasCtx: CanvasRenderingContext2D | null;
	CANVAS_HEIGHT: number;
	CANVAS_WIDTH: number;
};

const MAX_RGB = 256;

export default ({ canvasCtx, CANVAS_HEIGHT, CANVAS_WIDTH }: Params) => {
	let drawRequestId = 0;

	const particles = Array.from({ length: 20 }, () => ({
		x: Math.random() * CANVAS_WIDTH,
		y: Math.random() * CANVAS_HEIGHT,
		angle: Math.random() * Math.PI * 2,
		color: {
			r: Math.floor(Math.random() * MAX_RGB),
			g: Math.floor(Math.random() * MAX_RGB),
			b: Math.floor(Math.random() * MAX_RGB),
		},
	}));

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

		particles.forEach(({ x, y }, idx) => {
			canvasCtx.fillStyle = "black";
			canvasCtx.fillRect(x, y, 3, 3);

			if (particles[idx].x > CANVAS_WIDTH || particles[idx].x < 0) {
				particles[idx].angle = Math.PI - particles[idx].angle;
			}

			if (particles[idx].y > CANVAS_HEIGHT || particles[idx].y < 0) {
				particles[idx].angle = -particles[idx].angle;
			}

			particles[idx].x = x + Math.cos(particles[idx].angle);
			particles[idx].y = y + Math.sin(particles[idx].angle);
		});
	};

	return { start: draw, stop: () => cancelAnimationFrame(drawRequestId) };
};

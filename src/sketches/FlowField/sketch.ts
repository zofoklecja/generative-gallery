import { createNoise2D } from "simplex-noise";

type FlowFieldParams = {
	velocity: number;
	noiseScale: number;
	fade: number;
};

type Params = {
	canvasCtx: CanvasRenderingContext2D | null;
	paramsRef: React.RefObject<FlowFieldParams>;
	CANVAS_HEIGHT: number;
	CANVAS_WIDTH: number;
};

export default ({
	canvasCtx,
	paramsRef,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
}: Params) => {
	let drawRequestId = 0;

	const noise = createNoise2D();
	const particles = Array.from({ length: 500 }, () => ({
		x: Math.random() * CANVAS_WIDTH,
		y: Math.random() * CANVAS_HEIGHT,
	}));

	if (!canvasCtx) {
		return { start: () => {}, stop: () => {} };
	}

	const draw = () => {
		drawRequestId = requestAnimationFrame(draw);
		canvasCtx.fillStyle = `rgba(255, 255, 255, ${paramsRef.current.fade / 10})`;
		canvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		canvasCtx.fillStyle = "black";

		particles.forEach(({ x, y }, i) => {
			canvasCtx.fillRect(x, y, 3, 3);
			const angle: number =
				noise(
					(x * paramsRef.current.noiseScale) / 1000,
					(y * paramsRef.current.noiseScale) / 1000,
				) *
				Math.PI *
				2;

			particles[i].x = x + Math.cos(angle) * paramsRef.current.velocity;
			particles[i].y = y + Math.sin(angle) * paramsRef.current.velocity;

			if (
				particles[i].x > CANVAS_WIDTH ||
				particles[i].y > CANVAS_HEIGHT ||
				particles[i].x < 0 ||
				particles[i].y < 0
			) {
				particles[i].x = Math.random() * CANVAS_WIDTH;
				particles[i].y = Math.random() * CANVAS_HEIGHT;
			}
		});
	};

	return { start: draw, stop: () => cancelAnimationFrame(drawRequestId) };
};

type VoronoiParams = {};

type Params = {
	canvasCtx: CanvasRenderingContext2D | null;
	paramsRef: React.RefObject<VoronoiParams>;
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

	const particles = Array.from({ length: 20 }, () => ({
		x: Math.random() * CANVAS_WIDTH,
		y: Math.random() * CANVAS_HEIGHT,
		paramsRef,
	}));

	if (!canvasCtx) {
		return { start: () => {}, stop: () => {} };
	}

	const draw = () => {
		drawRequestId = requestAnimationFrame(draw);

		particles.forEach(({ x, y }) => {
			canvasCtx.fillRect(x, y, 3, 3);
		});
	};

	return { start: draw, stop: () => cancelAnimationFrame(drawRequestId) };
};

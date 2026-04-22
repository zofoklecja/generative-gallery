import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas = canvasRef.current;
		const canvasCtx = canvas.getContext("2d");

		const noise = createNoise2D();

		let drawRequestId: number = 0;
		let offset: number = 0;
		const draw = () => {
			if (!canvasCtx) {
				cancelAnimationFrame(drawRequestId);
				return;
			}

			drawRequestId = requestAnimationFrame(draw);
			canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			canvasCtx.fillStyle = "black";
			canvasCtx.strokeStyle = "purple";

			const STEP = 20;
			const SEGMENT_LENGTH = 10;
			for (let i = STEP; i < CANVAS_WIDTH; i += STEP) {
				for (let j = STEP; j < CANVAS_HEIGHT; j += STEP) {
					canvasCtx.beginPath();
					canvasCtx.moveTo(i, j);
					const angle: number = (noise(i, j) + offset) * Math.PI * 2;
					canvasCtx.lineTo(
						i + Math.cos(angle) * SEGMENT_LENGTH,
						j + Math.sin(angle) * SEGMENT_LENGTH,
					);
					canvasCtx.stroke();
				}
			}

			offset += 0.01;
		};

		draw();

		return () => {
			cancelAnimationFrame(drawRequestId);
		};
	}, []);

	return (
		<main>
			<h1>Generative Gallery</h1>
			<canvas
				ref={canvasRef}
				height={CANVAS_HEIGHT}
				width={CANVAS_WIDTH}
			/>
		</main>
	);
}

export default App;

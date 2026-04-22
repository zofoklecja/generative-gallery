import { useEffect, useRef } from "react";

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

		let drawRequestId: number = 0;
		const draw = () => {
			if (!canvasCtx) {
				cancelAnimationFrame(drawRequestId);
				return;
			}

			drawRequestId = requestAnimationFrame(draw);

			canvasCtx.fillStyle = "black";
			canvasCtx.strokeStyle = "purple";

			const STEP = 20;
			for (let i = STEP; i < CANVAS_WIDTH; i += STEP) {
				for (let j = STEP; j < CANVAS_HEIGHT; j += STEP) {
					canvasCtx.beginPath();
					canvasCtx.moveTo(i, j);
					canvasCtx.lineTo(i + 5, j + 5);
					canvasCtx.stroke();
				}
			}
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

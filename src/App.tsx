import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

type Particle = { x: number; y: number };

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas = canvasRef.current;
		const canvasCtx = canvas.getContext("2d");

		let particles: Array<Particle> = [];
		for (let o = 0; o < 1000; o++) {
			particles.push({
				x: Math.random() * CANVAS_WIDTH,
				y: Math.random() * CANVAS_HEIGHT,
			});
		}

		let drawRequestId: number = 0;
		const draw = () => {
			if (!canvasCtx) {
				cancelAnimationFrame(drawRequestId);
				return;
			}

			drawRequestId = requestAnimationFrame(draw);
			canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			canvasCtx.fillStyle = "black";
			canvasCtx.strokeStyle = "purple";

			particles.forEach(({ x, y }) => {
				canvasCtx.fillRect(x, y, 1, 1);
			});
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

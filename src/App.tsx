import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const VELOCITY = 0.5;
const NOISE_SCALE = 0.005;

type Particle = { x: number; y: number };

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas = canvasRef.current;
		const canvasCtx = canvas.getContext("2d");

		const noise = createNoise2D();

		const particles = Array.from({ length: 500 }, () => ({
			x: Math.random() * CANVAS_WIDTH,
			y: Math.random() * CANVAS_HEIGHT,
		}));

		let drawRequestId = 0;
		const draw = () => {
			if (!canvasCtx) {
				cancelAnimationFrame(drawRequestId);
				return;
			}

			drawRequestId = requestAnimationFrame(draw);
			canvasCtx.fillStyle = "rgba(255, 255, 255, 0.05)";
			canvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			canvasCtx.fillStyle = "black";

			particles.forEach(({ x, y }, i) => {
				canvasCtx.fillRect(x, y, 3, 3);
				const angle: number =
					noise(x * NOISE_SCALE, y * NOISE_SCALE) * Math.PI * 2;

				particles[i].x = x + Math.cos(angle) * VELOCITY;
				particles[i].y = y + Math.sin(angle) * VELOCITY;

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

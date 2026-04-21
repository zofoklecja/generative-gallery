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
		let x = 0;
		let y = 0;
		const draw = () => {
			if (!canvasCtx) {
				cancelAnimationFrame(drawRequestId);
				return;
			}

			drawRequestId = requestAnimationFrame(draw);
			canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			canvasCtx.fillStyle = "peru";
			canvasCtx.fillRect(x, y, 120, 120);

			if (y <= CANVAS_HEIGHT) {
				x++;
				y++;
			} else {
				x = 0;
				y = 0;
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

import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useControls } from "leva";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

type Particle = { x: number; y: number };

function FlowField() {
	const { velocity, noiseScale, fade } = useControls({
		velocity: {
			value: 0.5,
			min: 0.1,
			max: 3,
			step: 0.1,
		},
		noiseScale: {
			value: 1,
			min: 1,
			max: 90,
			step: 1,
		},
		fade: {
			value: 0.5,
			min: 0.1,
			max: 2,
			step: 0.1,
		},
	});
	const paramsRef = useRef({ velocity, noiseScale, fade });
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		paramsRef.current = { velocity, noiseScale, fade };
	}, [velocity, noiseScale, fade]);

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

				particles[i].x =
					x + Math.cos(angle) * paramsRef.current.velocity;
				particles[i].y =
					y + Math.sin(angle) * paramsRef.current.velocity;

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
		<canvas ref={canvasRef} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />
	);
}

export default FlowField;

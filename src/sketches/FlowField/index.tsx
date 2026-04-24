import { useEffect, useRef } from "react";
import { useControls } from "leva";
import draw from "./sketch.ts";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

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
		const canvasCtx = canvasRef.current.getContext("2d");
		const { start, stop } = draw({
			canvasCtx,
			paramsRef,
			CANVAS_HEIGHT,
			CANVAS_WIDTH,
		});

		start();

		return () => stop();
	}, []);

	return (
		<canvas ref={canvasRef} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />
	);
}

export default FlowField;

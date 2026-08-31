import { useEffect, useRef } from "react";
import draw from "./sketch.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts";
import type { Position } from "./types.ts";
import { useControls } from "leva";

function Voronoi() {
	const { velocity, particleNumber } = useControls({
		velocity: {
			value: 1,
			min: 0.5,
			max: 5,
			step: 0.5,
		},
		particleNumber: {
			value: 20,
			min: 10,
			max: 100,
			step: 10,
		},
	});
	const paramsRef = useRef({ velocity, particleNumber });
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef<Position | null>(null);
	const callbackRef = useRef<{
		restart: () => void;
		start: () => void;
		stop: () => void;
	} | null>(null);

	useEffect(() => {
		paramsRef.current.velocity = velocity;
	}, [velocity]);

	useEffect(() => {
		paramsRef.current.particleNumber = particleNumber;
		callbackRef.current?.restart();
	}, [particleNumber]);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvasCtx = canvasRef.current.getContext("2d");
		callbackRef.current = draw({
			canvasCtx,
			paramsRef,
			mouseRef,
			CANVAS_HEIGHT,
			CANVAS_WIDTH,
		});

		callbackRef.current?.start();

		return () => stop();
	}, []);

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		mouseRef.current = {
			x: e.nativeEvent.offsetX,
			y: e.nativeEvent.offsetY,
		};
	};

	return (
		<canvas
			ref={canvasRef}
			height={CANVAS_HEIGHT}
			width={CANVAS_WIDTH}
			onMouseMove={onMouseMove}
		/>
	);
}

export default Voronoi;

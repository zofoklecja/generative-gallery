import { useEffect, useRef } from "react";
import draw from "./sketch.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts";
import type { Position } from "./types.ts";

function Voronoi() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef<Position | null>(null);

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		mouseRef.current = {
			x: e.nativeEvent.offsetX,
			y: e.nativeEvent.offsetY,
		};
	};

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvasCtx = canvasRef.current.getContext("2d");
		const { start, stop } = draw({
			canvasCtx,
			mouseRef,
			CANVAS_HEIGHT,
			CANVAS_WIDTH,
		});

		start();

		return () => stop();
	}, []);

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

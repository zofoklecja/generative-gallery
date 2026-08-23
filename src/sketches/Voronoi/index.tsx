import { useEffect, useRef } from "react";
import draw from "./sketch.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts";

function Voronoi() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvasCtx = canvasRef.current.getContext("2d");
		const { start, stop } = draw({
			canvasCtx,
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

export default Voronoi;

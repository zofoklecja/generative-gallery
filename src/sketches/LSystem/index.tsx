import { useEffect, useRef } from "react";
import expand from "./sketch.ts";

function LSystem() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvasCtx = canvasRef.current.getContext("2d");
		expand({
			canvasCtx,
			axiom: "F",
			rules: { F: "F+F-F-F+F" },
			depth: 3,
		});
	}, []);

	return <canvas ref={canvasRef} height={600} width={800} />;
}

export default LSystem;

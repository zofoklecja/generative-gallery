import { useEffect, useRef } from "react";
import { expand, interpret } from "./sketch.ts";

function LSystem() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvasCtx = canvasRef.current.getContext("2d");
		const expandedAxiom = expand({
			axiom: "F",
			rules: { F: "FF+[+F-F-F]-[-F+F+F]" },
			depth: 4,
		});

		if (!canvasCtx) {
			return;
		}
		const { start, stop } = interpret({
			canvasCtx,
			input: expandedAxiom,
		});

		start();

		return () => stop();
	}, []);

	return <canvas ref={canvasRef} height={600} width={800} />;
}

export default LSystem;

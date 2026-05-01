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
			rules: { F: "F+F-F-F+F" },
			depth: 3,
		});

		interpret({
			canvasCtx,
			input: expandedAxiom,
		});
	}, []);

	return <canvas ref={canvasRef} height={600} width={800} />;
}

export default LSystem;

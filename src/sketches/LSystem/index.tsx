import { useEffect, useRef } from "react";
import { expand, interpret } from "./sketch.ts";
import { useControls } from "leva";

function LSystem() {
	const { step, angle, initialAngle } = useControls({
		step: {
			value: 10,
			min: 1,
			max: 20,
			step: 1,
		},
		angle: {
			value: 0.3,
			min: 0.1,
			max: 1,
			step: 0.1,
		},
		initialAngle: {
			value: 0.25,
			min: 0.1,
			max: 1,
			step: 0.1,
		},
	});
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
		canvasCtx.clearRect(0, 0, 800, 600);
		interpret({
			canvasCtx,
			params: { step, angle, initialAngle },
			input: expandedAxiom,
		});
	}, [step, angle, initialAngle]);

	return <canvas ref={canvasRef} width={800} height={600} />;
}

export default LSystem;

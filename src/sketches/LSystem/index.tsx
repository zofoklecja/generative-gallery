import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts";
import { expand, interpret } from "./sketch.ts";
import { parseRules } from "./utils.ts";

const PRESETS = {
	tree: { axiom: "F", rules: "F:FF+[+F-F-F]", depth: 4 },
	snowflake: { axiom: "F", rules: "F:F+F-F-F+F", depth: 3 },
	fern: { axiom: "X", rules: "X:F+[[X]-X]-F[-FX]+X,F:FF", depth: 5 },
};

function LSystem() {
	const [{ preset, scale: step, angle, axiom, rules, depth }, set] =
		useControls(() => ({
			preset: {
				value: "",
				options: PRESETS,
			},
			scale: {
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
			axiom: "F",
			rules: "F:FF+[+F-F-F]",
			depth: 2,
		}));
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (typeof preset === "object") {
			console.log(preset);
			set({
				axiom: preset.axiom,
				rules: preset.rules,
				depth: preset.depth,
			});
		}
	}, [preset]);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvasCtx = canvasRef.current.getContext("2d");
		const expandedAxiom = expand({
			axiom,
			rules: parseRules(rules),
			depth,
		});

		if (!canvasCtx) {
			return;
		}
		canvasCtx.clearRect(0, 0, 800, 600);
		interpret({
			canvasCtx,
			params: { step, angle },
			input: expandedAxiom,
		});
	}, [step, angle, axiom, rules, depth]);

	return (
		<canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
	);
}

export default LSystem;

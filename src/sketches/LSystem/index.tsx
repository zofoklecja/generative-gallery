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
	const [{ preset, scale, angle, axiom, rules, depth }, set] = useControls(
		() => ({
			preset: {
				value: "tree",
				options: Object.keys(PRESETS),
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
			depth: 4,
		}),
	);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (preset in PRESETS) {
			set(PRESETS[preset as keyof typeof PRESETS]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- set is guaranteed to be constant
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
		canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		interpret({
			canvasCtx,
			params: { scale, angle },
			input: expandedAxiom,
		});
	}, [scale, angle, axiom, rules, depth]);

	return (
		<canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
	);
}

export default LSystem;

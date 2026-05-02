import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

type ExpandParams = {
	axiom: string;
	rules: Record<string, string>;
	depth: number;
};

type LSystemParams = {
	step: number;
	angle: number;
};

type InterpretParams = {
	canvasCtx: CanvasRenderingContext2D;
	params: LSystemParams;
	input: string;
};

const INITIAL_ANGLE = 0.25;

export const expand = ({ axiom, rules, depth }: ExpandParams) => {
	let result = axiom;
	const applyRules = (input: string) =>
		[...input].map((char) => rules[char] ?? char).join("");

	for (let i = 0; i < depth; i++) {
		result = applyRules(result);
	}
	return result;
};

export const interpret = ({ canvasCtx, params, input }: InterpretParams) => {
	let x = CANVAS_WIDTH / 2;
	let y = CANVAS_HEIGHT;
	let angle = INITIAL_ANGLE;
	const history: { x: number; y: number; angle: number }[] = [];
	[...input].forEach((el) => {
		if (el === "+") {
			angle -= params.angle;
		} else if (el === "-") {
			angle += params.angle;
		} else if (el === "F") {
			canvasCtx.beginPath();
			canvasCtx.moveTo(x, y);
			x += Math.cos(angle * Math.PI * 2) * params.step;
			y -= Math.sin(angle * Math.PI * 2) * params.step;
			canvasCtx.lineTo(x, y);
			canvasCtx.stroke();
		} else if (el === "[") {
			history.push({ x, y, angle });
		} else if (el === "]") {
			const restoredState = history.pop();
			if (restoredState) {
				x = restoredState.x;
				y = restoredState.y;
				angle = restoredState.angle;
			}
		}
	});
};

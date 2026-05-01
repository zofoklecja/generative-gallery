type Params = {
	axiom: string;
	rules: Record<string, string>;
	depth: number;
};

const STEP = 20;
const ANGLE = 0.3;

export const expand = ({ axiom, rules, depth }: Params) => {
	let result = axiom;
	const applyRules = (input: string) =>
		[...input].map((char) => rules[char] ?? char).join("");

	for (let i = 0; i < depth; i++) {
		result = applyRules(result);
	}
	return result;
};

export const interpret = ({
	canvasCtx,
	input,
}: {
	canvasCtx: CanvasRenderingContext2D | null;
	input: String;
}) => {
	let x = 400;
	let y = 600;
	let angle = 0.25;
	let history: { x: number; y: number; angle: number }[] = [];
	if (!canvasCtx) {
		return;
	}
	canvasCtx.beginPath();
	canvasCtx.moveTo(x, y);
	[...input].forEach((el) => {
		if (el === "+") {
			angle -= ANGLE;
		} else if (el === "-") {
			angle += ANGLE;
		} else if (el === "F") {
			x = x + Math.cos(angle * Math.PI * 2) * STEP;
			y = y - Math.sin(angle * Math.PI * 2) * STEP;
			canvasCtx.lineTo(x, y);
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
	canvasCtx.stroke();
};

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
	canvasCtx: CanvasRenderingContext2D;
	input: string;
}) => {
	let drawRequestId = 0;
	let x = 400;
	let y = 600;
	let angle = 0.25;
	const history: { x: number; y: number; angle: number }[] = [];
	let idx = 0;
	const start = () => {
		if (idx < input.length) {
			drawRequestId = requestAnimationFrame(start);
			canvasCtx.beginPath();
			canvasCtx.moveTo(x, y);

			if (input[idx] === "+") {
				angle -= ANGLE;
			} else if (input[idx] === "-") {
				angle += ANGLE;
			} else if (input[idx] === "F") {
				x = x + Math.cos(angle * Math.PI * 2) * STEP;
				y = y - Math.sin(angle * Math.PI * 2) * STEP;
				canvasCtx.lineTo(x, y);
			} else if (input[idx] === "[") {
				history.push({ x, y, angle });
			} else if (input[idx] === "]") {
				const restoredState = history.pop();
				if (restoredState) {
					x = restoredState.x;
					y = restoredState.y;
					angle = restoredState.angle;
				}
			}
			canvasCtx.stroke();
			idx++;
		}
	};

	return { start, stop: () => cancelAnimationFrame(drawRequestId) };
};

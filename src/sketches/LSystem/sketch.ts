type Params = {
	canvasCtx: CanvasRenderingContext2D | null;
	axiom: string;
	rules: Record<string, string>;
	depth: number;
};
const STEP = 20;
const ANGLE = 0.3;

export default ({ canvasCtx, axiom, rules, depth }: Params) => {
	let result = axiom;

	const expand = (input: string) =>
		[...input].map((char) => rules[char] ?? char).join("");

	for (let i = 0; i < depth; i++) {
		result = expand(result);
	}

	const interpret = (input: string) => {
		let x = 400;
		let y = 600;
		let angle = 0.25;
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
			}
		});
		canvasCtx.stroke();
	};
	interpret(result);
	return result;
};

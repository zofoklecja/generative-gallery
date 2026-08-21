export default () => {
	let drawRequestId = 0;
	const start = () => {};

	return { start, stop: () => cancelAnimationFrame(drawRequestId) };
};

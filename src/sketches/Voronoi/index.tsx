import { useEffect } from "react";
import draw from "./sketch.ts";

function Voronoi() {
	useEffect(() => {
		const { start, stop } = draw();
		start();

		return () => stop();
	});
}

export default Voronoi;

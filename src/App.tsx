import { useState } from "react";
import FlowField from "./sketches/FlowField";
import LSystem from "./sketches/LSystem";

const SKETCHES = [
	{ id: "flow-field", label: "Flow Field", component: FlowField },
	{ id: "l-system", label: "L-System", component: LSystem },
] as const;
type SketchId = (typeof SKETCHES)[number]["id"];

function App() {
	const [activeSketch, setActiveSketch] = useState<SketchId | null>(null);
	const ActiveSketch = SKETCHES.find((s) => s.id === activeSketch)?.component;

	return (
		<main>
			<h1>Generative Gallery</h1>
			<nav>
				{SKETCHES.map(({ id, label }) => (
					<button key={id} onClick={() => setActiveSketch(id)}>
						{label}
					</button>
				))}
				<button onClick={() => setActiveSketch(null)}>Clear</button>
			</nav>
			{ActiveSketch && <ActiveSketch />}
		</main>
	);
}

export default App;

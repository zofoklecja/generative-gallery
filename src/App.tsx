import { useState } from "react";
import FlowField from "./sketches/FlowField";

const SKETCHES = [
	{ id: "flow-field", label: "Flow Field", component: FlowField },
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

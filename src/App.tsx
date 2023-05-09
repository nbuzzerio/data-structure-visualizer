import { useState } from "react";
import "./App.css";
import Tree from "./Tree";

function App() {
  const [structure, setStructure] = useState<string>("");


  const structureList = ['stack', 'tree'].map((structure) => {
    return (
      <li key={structure}>
        <button className="rounded-full px-5 py-3 uppercase text-slate-200 bg-blue-900 border-2 border-slate-200 min-w-[150px]" onClick={() => setStructure(structure)}>{structure}</button>
      </li>
    )
  })

  return (
    <div className="App bg-gray-600 min-h-screen p-5">
      <header className="flex gap-10 py-10 items-center">
        <a href="/" className="text-3xl font-extrabold">DataStructure Visualizer</a>
        <ul className="flex gap-10">
          {structureList}
        </ul>
      </header>
      <h1 className="text-3xl font-bold underline uppercase">
        {structure ? structure : "Choose a structure"}
      </h1>
      {structure === 'tree' && <Tree />}
    </div>
  );
}

export default App;
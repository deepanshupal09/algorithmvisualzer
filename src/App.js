import { useEffect, useState } from "react";
import Sorting from "./components/Sorting";
import Graph from "./components/Graph";

export default function App() {
  const [selected, setSelected] = useState(1);
  function handleClick(s) {
    setSelected(s);
  }
  return (
    <div className="font-montserrat text-lg">
      <div className="flex justify-center space-x-[7rem]  p-5  text-xl">
        <div className="justify-self-start cursor-pointer">
          Algorithm Visualizer
        </div>
        <div className="flex justify-center justify-self-center space-x-[7rem]">
          <div
            className={`hover:text-blue-500 cursor-pointer transition hover:scale-125 duration-500 ${
              selected === 1 ? "text-blue-500 scale-125" : ""
            }`}
            onClick={() => {
              handleClick(1);
            }}
          >
            Sorting
          </div>
          <div
            className={`hover:text-blue-500 cursor-pointer transition hover:scale-125 duration-500 ${
              selected === 2 ? "text-blue-500 scale-125" : ""
            }`}
            onClick={() => {
              handleClick(2);
            }}
          >
            Graph
          </div>
        </div>
      </div>

      <div className={`${selected === 1 ? "" : "hidden"}`}>
        <Sorting />
      </div>

      <div className={`${selected === 2 ? "" : "hidden"}`}>
        <Graph />

      </div>
    </div>
  );
}

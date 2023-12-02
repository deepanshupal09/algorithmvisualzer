import { useEffect, useState } from "react";
import Sorting from "./components/Sorting";
import Graph from "./components/Graph";

export default function App() {
  const [selected, setSelected] = useState(1);
  const [hover, setHover] = useState(1);
  function handleClick(s) {
    setSelected(s);
  }
  return (
    <div className="font-montserrat text-sm md:text-lg">
      <div className="flex justify-between bg-gray-800 text-white rounded-[2rem] mt-2 mx-1 space-x-[7rem]  px-5 py-10 text-sm  md:text-xl">
        <div className="cursor-pointer justify-start">
          Algorithm Visualizer
        </div>
        <div className="">
          <div className="flex justify-center space-x-[7rem]">
            <div
              className={`cursor-pointer  transition-all duration-500 ${
                selected === 1 ? "" : ""
              }`}
              onClick={() => {
                setSelected(1);
              }}
              onMouseEnter={() => {
                setHover(1);
              }}
              onMouseLeave={() => {
                setHover(selected);
              }}
            >
              Sorting
            </div>
            <div
              className={`cursor-pointer transition-all duration-500 ${
                selected === 2 ? "" : ""
              }`}
              onClick={() => {
                setSelected(2);
              }}
              onMouseEnter={() => {
                setHover(2);
              }}
              onMouseLeave={() => {
                setHover(selected);
              }}
            >
              Graph
            </div>
          </div>
          <div
            className={`line mt-3 w-[30%] h-[1px] bg-white transition-all duration-500 ${
              hover === 2 ? "transform translate-x-[11.3rem] max-md:translate-x-[9.5rem]" : ""
            }`}
          ></div>
        </div>
        <div className="w-[0%] md:w-[6%]"> </div>
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

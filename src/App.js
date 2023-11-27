import { useState } from "react";
import Navbar from "./components/navbar";
import { Slider } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function App() {
  const [selected, setSelected] = useState(1);
  const [arr, setArr] = useState([10, 8, 6, 4, 7, 2, 1, 3, 8, 1]);
  const [size, setSize] = useState(10);
  const [age, setAge] = useState();
  const [speed, setSpeed] = useState(1);
  const [algo, setAlgo] = useState(1);

  function handleClick(s) {
    setSelected(s);
  }

  function handleSize(newValue) {
    setSize(newValue);
    let a = createRandomArray(newValue);
    setArr(a);
  }

  function createRandomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1); // Random number between 0 and 99
    }
    return arr;
  }

  return (
    <div className="font-montserrat text-lg">
      <div className="flex   p-5  text-xl">
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
      

      <div
        className={`${
          selected === 1 ? "" : "hidden"
        } justify-between flex p-5 my-6`}
      >
        {/* Sorting */}
        <div className="flex h-[80vh] w-[80%] items-end pr-4">
          {arr.map((element) => {
            let max = Math.max(...arr);
            let h = (element / max) * 100;
            return (
              <div
                style={{ height: `${h}%`, width: `calc(${100 / size}%` }}
                className={` bg-blue-500 rounded-md text-white border  `}
              ></div>
            );
          })}
        </div>
        <div className="w-[20%] ">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
            <Select
              value={algo}
              labelId="demo-simple-select-label"
              onChange={(event) => {
                setAlgo(event.target.value);
              }}
              id="demo-simple-select"
              label="Algorithm"
            >
              <MenuItem value={1}>Bubble Sort</MenuItem>
              <MenuItem value={2}>Insertion Sort</MenuItem>
              <MenuItem value={3}>Merge Sort</MenuItem>
              <MenuItem value={4}>Heap Sort</MenuItem>
              <MenuItem value={5}>Quick Sort</MenuItem>
            </Select>
          </FormControl>
          <div>
            <div className="py-4">Array Size: {size} </div>
            <Slider
              sx={{
                color: "#3b82f6",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 24,
                  width: 24,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                    boxShadow: "inherit",
                  },
                  "&:before": {
                    display: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: "#3b82f6",
                  transformOrigin: "bottom left",
                  transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
                  "&:before": { display: "none" },
                  "&.MuiSlider-valueLabelOpen": {
                    transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
                  },
                  "& > *": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
              onChange={(event, newValue) => {
                handleSize(newValue);
              }}
              value={size}
              min={10}
              max={100}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
          <div>
            <div className="py-4">Speed: {speed}x</div>
            <Slider
              sx={{
                color: "#3b82f6",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 24,
                  width: 24,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                    boxShadow: "inherit",
                  },
                  "&:before": {
                    display: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: "#3b82f6",
                  transformOrigin: "bottom left",
                  transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
                  "&:before": { display: "none" },
                  "&.MuiSlider-valueLabelOpen": {
                    transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
                  },
                  "& > *": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
              onChange={(event, newValue) => {
                setSpeed(newValue);
              }}
              value={speed}
              min={1}
              max={10}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
          <div className=" flex py-5">
            <button
              className="w-[50%] bg-blue-500 font-semibold border rounded-lg text-white p-4"
              onClick={() => {
                handleSize(size);
              }}
            >
              {" "}
              <ShuffleIcon></ShuffleIcon> Randomize
            </button>
            <button className="w-[50%] bg-green-500 font-semibold border rounded-lg text-white p-4">
              Visualize!
            </button>
          </div>
        </div>
      </div>

      <div className={`${selected === 2 ? "" : "hidden"}`}>{/* Graph */}</div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { Slider } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function App() {
  const [selected, setSelected] = useState(1);
  const [arr, setArr] = useState([
    [10, 0],
    [8, 0],
    [6, 0],
    [4, 0],
    [7, 0],
    [2, 0],
    [1, 0],
    [3, 0],
    [8, 0],
    [1, 0],
  ]);
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [algo, setAlgo] = useState(1);
  const [states, setStates] = useState([]);

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
      arr.push([Math.floor(Math.random() * 100) + 1, 0]); // Random number between 0 and 99
    }
    return arr;
  }
  useEffect(() => {
    console.log("arr: ", arr);
  }, [arr]);
  useEffect(() => {
    async function visualize() {
      for (let state of states) {
        setArr(state);
        await sleep(200 / speed);
      }
    }
    visualize();
  }, [states]);

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function bubblesort() {
    let st = [];
    let nums = JSON.parse(JSON.stringify(arr));
    console.log("bubble sort");
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (nums[j][0] > nums[j + 1][0]) {
          [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
          for (let k = 0; k < size; k++) {
            nums[k][1] = 0;
          }
          // nums[j][1] = 1;
          nums[j + 1][1] = 1;
          st.push(JSON.parse(JSON.stringify(nums)));
        }
      }
    }
    for (let i = 0; i < size; i++) {
      nums[i][1] = 0;
    }
    st.push(JSON.parse(JSON.stringify(nums)));
    for (let i = 0; i < size; i++) {
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
    }
    setStates(st);
  }

  function insertionsort() {
    console.log("insertion sort");
    let st = [];
    let nums = JSON.parse(JSON.stringify(arr));
    for (let i = 1; i < size; i++) {
      let j = i;
      while (j > 0 && nums[j - 1][0] > nums[j][0]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
        for (let k = 0; k < size; k++) {
          nums[k][1] = 0;
        }
        nums[j - 1][1] = 1;
        // nums[j][1] = 1;
        st.push(JSON.parse(JSON.stringify(nums)));
        j--;
      }
    }

    for (let i = 0; i < size; i++) {
      nums[i][1] = 0;
    }
    st.push(JSON.parse(JSON.stringify(nums)));
    for (let i = 0; i < size; i++) {
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
    }
    setStates(st);
  }

  function mergesort() {
    console.log("merge sort");
    let st = [];
    let nums = JSON.parse(JSON.stringify(arr));
    mergeSortHelper(nums, 0, size - 1, st);
    for (let i = 0; i < size; i++) {
      nums[i][1] = 0;
    }
    st.push(JSON.parse(JSON.stringify(nums)));
    for (let i = 0; i < size; i++) {
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
    }
    setStates(st);
  }

  function mergeSortHelper(nums, start, end, st) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      mergeSortHelper(nums, start, mid, st);
      mergeSortHelper(nums, mid + 1, end, st);
      merge(nums, start, mid, end, st);
    }
  }

  function merge(nums, start, mid, end, st) {
    let left = nums.slice(start, mid + 1);
    let right = nums.slice(mid + 1, end + 1);
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      if (left[i][0] <= right[j][0]) {
        nums[k] = left[i];
        i++;
      } else {
        nums[k] = right[j];
        j++;
      }
      for (let l = 0; l < size; l++) {
        nums[l][1] = 0;
      }
      nums[k][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
      k++;
    }

    while (i < left.length) {
      nums[k] = left[i];
      for (let l = 0; l < size; l++) {
        nums[l][1] = 0;
      }
      nums[k][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
      i++;
      k++;
    }

    while (j < right.length) {
      nums[k] = right[j];
      for (let l = 0; l < size; l++) {
        nums[l][1] = 0;
      }
      nums[k][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
      j++;
      k++;
    }
  }

  function heapsort() {
    console.log('heap sort')
    let nums = JSON.parse(JSON.stringify(arr));
    let st = []
    for(let i = size/2-1;i >= 0;i--) {
      heapify(nums,size,i,st)
    }

    for(let i=size-1;i>=0;i--) {
      [nums[0],nums[i]] = [nums[i],nums[0]]
      for(let k=0;k<size;k++) {
        nums[k][1]  = 0;
      }
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
      heapify(nums,i,0,st)
    }

    for (let i = 0; i < size; i++) {
      nums[i][1] = 0;
    }
    st.push(JSON.parse(JSON.stringify(nums)));
    for (let i = 0; i < size; i++) {
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
    }
    setStates(st);
  }

  function heapify(nums,n,i,st) {
    let largest = i;
    let left = 2*i+1;
    let right = 2*i+2;

    if (left < n && nums[left][0] > nums[largest][0]) {
      largest = left;
    }
    if (right < n && nums[right][0] > nums[largest][0]) {
      largest = right;
    }

    if (largest !== i) {
      [nums[i],nums[largest]] = [nums[largest],nums[i]];
      for(let k=0;k<size;k++) {
        nums[k][1] = 0;
      }
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
      heapify(nums,n,largest,st)
    }
  }

  function partition(nums,low,high,st) {
    let pivot = nums[high][0]
    let i = low - 1;

    for(let j=low;j<high;j++) {
      if (nums[j][0] <= pivot) {
        i++;
        [nums[i],nums[j]] = [nums[j],nums[i]]
        for(let k=0;k<size;k++) {
          nums[k][1] = 0;
        }
        nums[i][1] = 1;
        st.push(JSON.parse(JSON.stringify(nums)));
      }
    }
    [nums[i+1],nums[high]] = [nums[high],nums[i+1]]
    for(let k=0;k<size;k++) {
      nums[k][1] = 0;
    }
    nums[i+1][1] = 1;
    st.push(JSON.parse(JSON.stringify(nums)));

    return (i+1)
  }

  function quickSortHelper(nums,low,high,st) {
    if(low < high) {
      let p = partition(nums,low,high,st);
      quickSortHelper(nums,low,p-1,st);
      quickSortHelper(nums,p+1,high,st);
    }

  }

  function quicksort() {

    let st = [];
    console.log('quick sort')
    let nums = JSON.parse(JSON.stringify(arr));
    quickSortHelper(nums,0,size-1,st);

    for (let i = 0; i < size; i++) {
      nums[i][1] = 0;
    }
    st.push(JSON.parse(JSON.stringify(nums)));
    for (let i = 0; i < size; i++) {
      nums[i][1] = 1;
      st.push(JSON.parse(JSON.stringify(nums)));
    }
    setStates(st);


  }

  async function handleVisualize() {
    if (algo === 1) {
      bubblesort();
    } else if (algo === 2) {
      insertionsort();
    } else if (algo === 3) {
      mergesort();
    } else if (algo === 4) {
      heapsort();
    } else if (algo === 5) {
      quicksort();
    }
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

      <div
        className={`${
          selected === 1 ? "" : "hidden"
        } justify-between flex p-5 my-6`}
      >
        {/* Sorting */}
        <div className="flex h-[80vh] w-[80%] items-end pr-4">
          {arr.map((element) => {
            let max = arr[0][0];
            arr.forEach((e) => {
              if (e[0] > max) max = e[0];
            });
            let h = (element[0] / max) * 100;
            // console.log(element[0])
            // console.log(max)
            return (
              <div
                style={{
                  height: `${h}%`,
                  width: `calc(${100 / size}%`,
                  backgroundColor: `${
                    element[1] === 0 ? "#3b82f6" : "#22c55e"
                  }`,
                }}
                className={`rounded-md text-white border`}
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
            <button
              className="w-[50%] bg-green-500 font-semibold border rounded-lg text-white p-4"
              onClick={handleVisualize}
            >
              Visualize!
            </button>
          </div>
        </div>
      </div>

      <div className={`${selected === 2 ? "" : "hidden"}`}>{/* Graph */}</div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Sorting from "./components/Sorting";
import Graph from "./components/Graph";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { ModalClose } from "@mui/joy";
import Button from "@mui/joy/Button";
import img1 from "../src/images/sortingalgorithm.png";
import img2 from "../src/images/sliders.png";
import img3 from "../src/images/btnsort.png";
import img4 from "../src/images/graphtab.png";
import img5 from "../src/images/graphalgo.png";
import img6 from "../src/images/dragdrop.gif";
import img7 from "../src/images/walls.gif";
import img8 from "../src/images/slidergraph.gif";
import img9 from "../src/images/resetgraph.png";
import img10 from "../src/images/find possible path.png";

export default function App() {
  const [selected, setSelected] = useState(1);
  const [hover, setHover] = useState(1);
  const [open, setOpen] = useState(true);
  const [slide, setSlide] = useState(1);

  function handleClick(s) {
    setSelected(s);
  }
  return (
    <>
      <div className="font-montserrat text-sm md:text-lg">
        <div className="flex justify-between bg-gray-800 text-white rounded-[2rem] mt-2 mx-1 space-x-[7rem]  px-5 pb-10 pt-12 text-sm  md:text-xl">
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
                hover === 2
                  ? "transform translate-x-[11.3rem] max-md:translate-x-[9.5rem]"
                  : ""
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
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(3px)" },
                    entered: { opacity: 1, backdropFilter: "blur(3px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                width: "800px",
                height: "500px",
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
              size="lg"
            >
              <ModalClose />

              <DialogTitle>
                <div className={`${slide === 1 ? "" : "hidden"}`}>
                  Welcome to Algorithm Visualizer{" "}
                  <span className="text-slate-800 text-lg font-normal">
                    {" "}
                    &nbsp;({slide}/11){" "}
                  </span>
                </div>
                <div className={`${slide > 1 && slide <= 4 ? "" : "hidden"}`}>
                  Sorting Algorithm{" "}
                  <span className="text-slate-800 text-lg font-normal">
                    {" "}
                    &nbsp;({slide}/11){" "}
                  </span>
                </div>
                <div className={`${slide > 4 && slide < 11 ? "" : "hidden"}`}>
                  Graph Algorithm{" "}
                  <span className="text-slate-800 text-lg font-normal">
                    {" "}
                    &nbsp;({slide}/11){" "}
                  </span>
                </div>
                <div className={`${slide === 11 ? "" : "hidden"}`}>
                  Still there?{" "}
                  <span className="text-slate-800 text-lg font-normal">
                    {" "}
                    &nbsp;({slide}/11){" "}
                  </span>
                </div>
              </DialogTitle>
              <DialogContent className="flex flex-col justify-between">
                <div className="">
                  <div className={`${slide === 1 ? "" : "hidden"} my-5`}>
                    This short tutorial will guide you through using this
                    Algorithm Visualizer. If you've seen this before, press the
                    X button above to skip this.
                  </div>
                  <div className={`${slide === 2 ? "" : "hidden"} my-2`}>
                    <div>
                      Select an algorithm from the dropdown menu (Bubble Sort,
                      Insertion Sort, Merge Sort, Heap Sort, Quick Sort).
                    </div>
                    <div className="scale-[85%]">
                      <img src={img1} />
                    </div>
                  </div>
                  <div className={`${slide === 3 ? "" : "hidden"} my-5`}>
                    <div>
                      Adjust the array size and animation speed using sliders.
                      <div className="mt-5">
                        <img src={img2} />
                      </div>
                    </div>
                  </div>
                  <div className={`${slide === 4 ? "" : "hidden"} my-5`}>
                    <div> Click "Reset" to reset the visualization.</div>
                    <div> Click "Start" to begin the visualization.</div>
                    <div className="mt-5">
                      <img src={img3} />
                    </div>
                    <div> Pause and play options are available.</div>
                  </div>
                  <div className={`${slide === 5 ? "" : "hidden"} my-5`}>
                    <div>
                      Explore graph algorithms by clicking on the "Graph" tab.
                    </div>
                    <div className="mt-5">
                      <img src={img4} />
                    </div>
                  </div>
                  <div className={`${slide === 6 ? "" : "hidden"} my-5`}>
                    <div>
                      Choose from algorithms such as Breadth-First Search,
                      Depth-First Search, or Dijkstra's Algorithm.
                    </div>
                    <div className="mt-5">
                      <img src={img5} />
                    </div>
                  </div>
                  <div className={`${slide === 7 ? "" : "hidden"} my-5`}>
                    <div>
                      Click and drag to reposition the starting and ending nodes
                      on the grid.
                    </div>
                    <div className="mt-5 mx-auto">
                      <img
                        src={img6}
                        style={{
                          width: "800px",
                          height: "270px",
                          objectFit: "contain",
                        }}
                        alt="Step 8"
                      />
                    </div>
                  </div>
                  <div className={`${slide === 8 ? "" : "hidden"} my-5`}>
                    <div>
                      Modify the grid by clicking on any cell to add or remove a
                      wall.
                    </div>
                    <div className="mt-5 mx-auto">
                      <img
                        src={img7}
                        style={{
                          width: "800px",
                          height: "270px",
                          objectFit: "contain",
                        }}
                        alt="Step 8"
                      />
                    </div>
                  </div>
                  <div className={`${slide === 9 ? "" : "hidden"} my-5`}>
                    <div>Adjust the animation speed using the slider.</div>
                    <div>
                      <div className="mt-5">
                        <img src={img8} />
                      </div>
                      Click "Find the possible path" to witness the algorithm in
                      action.
                      <div className="mt-5">
                        <img src={img10} />
                      </div>
                    </div>
                  </div>
                  <div className={`${slide === 10 ? "" : "hidden"} my-5`}>
                    <div>
                      Manage the grid with options to clear walls, or reset the
                      entire board as needed.
                    </div>
                    <div className="mt-5">
                      <img src={img9} />
                    </div>
                  </div>
                  <div className={`${slide === 11 ? "" : "hidden"} my-5`}>
                    Whoa, you made it to the end!.Thank you for sticking with us
                    till the end of this tutorial. Go explore some algorithms
                    and have fun!
                  </div>
                </div>
                <div
                  className="flex justify-between"
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    width: window.innerWidth <= 768 ? "89%" : "94%",
                  }}
                >
                  <Button
                    disabled={slide === 1}
                    onClick={() => setSlide(slide - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      if (slide < 11) {
                        setSlide(slide + 1);
                      } else {
                        setOpen(false);
                        // setSlide(1);
                      }
                    }}
                  >
                    {slide === 11 ? "Finish" : "Next"}
                  </Button>
                </div>
                {/* <iframe className="m-auto"  width="90%" height="90%" src="https://www.youtube.com/embed/iK95rIRVbMo?autoplay=1&mute=1" title='myVideo'>
              </iframe>  */}
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
  );
}

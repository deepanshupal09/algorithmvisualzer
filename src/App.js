import { useEffect, useState } from "react";
import Sorting from "./components/Sorting";
import Graph from "./components/Graph";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { ModalClose } from "@mui/joy";

export default function App() {
  const [selected, setSelected] = useState(1);
  const [hover, setHover] = useState(1);
  const [open, setOpen] = useState(true);

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
                width: '800px',
                height: '500px',
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
              size="lg"
            >
              <ModalClose />

              <DialogTitle>Tutorial</DialogTitle>
              <DialogContent className="">
              <iframe className="m-auto"  width="90%" height="90%" src="https://www.youtube.com/embed/iK95rIRVbMo?autoplay=1&mute=1" title='myVideo'>
              </iframe> 
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
  );
}

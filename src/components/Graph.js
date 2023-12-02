import React,{useEffect, useState} from 'react'
import '../styles/Pathfinder.css';
import BFS from '../algorithm/bfs';
import DFS from '../algorithm/dfs';
import Djikstra from '../algorithm/djikstra';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from '@mui/material/Slider';


var rows = 22;
var cols = 32; //34

var START_NODE_ROW = 4, START_NODE_COL = 6;
var END_NODE_ROW = rows-6, END_NODE_COL = cols-6;
var InitSR = START_NODE_ROW, InitSC = START_NODE_COL;
var InitER = END_NODE_ROW, InitEC = END_NODE_COL;

var animateTime = 35; // 8,35,80

function Graph() {
  const [Grid,setGrid] = useState([]);  // array destructuring
  const [isMousePress,setIsMousePress] = useState(false);
  const [pathID,setPathID] = useState(0);
  const [pathExist,setPathExist] = useState(false);
  const [animateType,setAnimateTimeType] = useState(2);


  useEffect(()=>{
    gridInitialize();
    //   popupClickHandle();
  },[])

  useEffect(()=>{
    console.log(pathExist);
    if(pathExist===true){
        console.log("hello")
        var btns = document.getElementsByClassName('button-4');
        for(let i=0; i<btns.length; i++){
            if(btns[i]) {
                btns[i].disabled = true;
            }
        }
        btns[btns.length-1].disabled=false;
    }
    else{
        var btns = document.getElementsByClassName('button-4');
        for(let i=0; i<btns.length; i++){
            if(btns[i]) {
                btns[i].disabled = false;
            }
        }
    }
  },[pathExist])

  const gridInitialize =()=>{
      var grid = new Array(rows);
      for(let i=0; i<rows; i++) grid[i] = new Array(cols);

      for(let i=0; i<rows; i++){
          for(let j=0; j<cols; j++){
              grid[i][j] = new Spot(i,j);
          }
      }
      /* -- add neighbors of each node ---
      for(let i=0; i<rows; i++){
          for(let j=0; j<cols; j++){
              grid[i][j].getNeighbors(grid);
          }
      } */
      setGrid(grid);
  }
  // animate the algorithm
  async function animateVisitedNodes(visitedNodes){
      for(let i=0; i<visitedNodes.length; i++){
          const node = visitedNodes[i];
          await waitForAnimatoin(animateTime);
          if(node.x === START_NODE_ROW && node.y === START_NODE_COL)
          document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited START_NODE";

          else if(node.x === END_NODE_ROW && node.y === END_NODE_COL)
          document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited END_NODE";

          else document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited";
      }
  }
  async function animateShortestPath(pathNode){
      pathNode.reverse();
      for(let i=0; i<pathNode.length; i++){
          const node = pathNode[i];
          await waitForAnimatoin(animateTime);
          if(i===0) 
          document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath START_NODE";
          else if(i+1 === pathNode.length) 
          document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath END_NODE";
          else document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath";
      }
  }

  const pathFinding = async () =>{
      var btns = document.getElementsByClassName('button-4');

      // console.log(document.getElementsByTagName('select'));
      // console.log(document.getElementsByClassName('button-4'));
      
      var selects = document.getElementsByTagName('select');
      if(selects.length > 0) {
          selects[0].disabled = true;
          if(selects.length > 1) {
              selects[1].disabled = true;
          }
      }

      var btns = document.getElementsByClassName('button-4');
      for(let i=0; i<btns.length; i++){
          if(btns[i]) {
              btns[i].disabled = true;
          }
        }
        
      var startNode = Grid[START_NODE_ROW][START_NODE_COL];
      var endNode = Grid[END_NODE_ROW][END_NODE_COL];

      switch(pathID){
          case 0:
              var obj = BFS(Grid,startNode,endNode,rows,cols);
              await animateVisitedNodes(obj.visitedNodes);
              await animateShortestPath(obj.path);
          break;
          case 1:
              obj = DFS(Grid,startNode,endNode,rows,cols);
              await animateVisitedNodes(obj.visitedNodes);
              await animateShortestPath(obj.path);
          break;
          case 2:
              obj = Djikstra(Grid,startNode,endNode,rows,cols);
              await animateVisitedNodes(obj.visitedNodes);
              await animateShortestPath(obj.path);
          break;
      }

      if(selects.length > 0) {
          selects[0].disabled = false;
          if(selects.length > 1) {
              selects[1].disabled = false;
          }
      }
      for(let i=0; i<btns.length; i++){
          if(btns[i]) {
              btns[i].disabled = false;
          }
      }

      setPathExist(true);
  }

  
  const clearPathHandle = () =>{
      for(let i=0; i<rows; i++){
          for(let j=0; j<cols; j++){
              if(i===START_NODE_ROW && j===START_NODE_COL){
                  document.getElementById(`row${i}_col${j}`).className = "square START_NODE";
              }
              else if(i===END_NODE_ROW && j===END_NODE_COL){
                  document.getElementById(`row${i}_col${j}`).className = "square END_NODE";
              }
              else if(!Grid[i][j].isWall)
              document.getElementById(`row${i}_col${j}`).className = "square";
          }
      }
  }

  const createWall=(row,col)=>{
      /*
          ********* the concept should be known array reference and copy *****
      */
     if(!pathExist){
        var newGrid = [...Grid] // array copy
        var node = newGrid[row][col];
        node.isWall = !node.isWall;
        newGrid[row][col] = node;
        setGrid(newGrid);
     }
  }

  const onMouseDown = (row,col)=>{
      if(isValid(row,col)){
          setIsMousePress(true);
          createWall(row,col);
      }
  }
  const onMouseEnter = (row,col)=>{
      if(isMousePress === true && isValid(row,col)){
          createWall(row,col);
      }
  }
  const onMouseUp = ()=>{
      setIsMousePress(()=>false);
  }
  

  const setStartEndNode = (id, r, c) =>{
    if(!pathExist){
      if(id === 1){
          let newGrid = [...Grid] // array copy
          let preStartNode = newGrid[START_NODE_ROW][START_NODE_COL];
          let curStartNode = newGrid[r][c];
          preStartNode.isStart = !preStartNode.isStart;
          curStartNode.isStart = !curStartNode.isStart;
          setGrid(newGrid);

          START_NODE_ROW = r;
          START_NODE_COL = c;
      }
      else{
          let newGrid = [...Grid] // array copy
          let preEndNode = newGrid[END_NODE_ROW][END_NODE_COL];
          let curEndNode = newGrid[r][c];
          preEndNode.isEnd = !preEndNode.isEnd;
          curEndNode.isEnd = !curEndNode.isEnd;
          setGrid(newGrid);

          END_NODE_ROW = r;
          END_NODE_COL = c;
      } 
    }
  }

    const animationTimeHandle = (type) =>{
        if(type === 3) animateTime = 8;
        else if(type === 2) animateTime = 35;
        else animateTime = 80;
        setAnimateTimeType(type);
        console.log(type);
    }
    const marks = [
        {
        value: 1,
        label: 'Slow',
        },
        {
        value: 2,
        label: 'Average',
        },
        {
        value: 3,
        label: 'Fast',
        },
    ];
  
  function valuetext(value) {
    return value;
  }
  
  function valueLabelFormat(value) {
    return value;
  }

  return (
    <div className="path-container">
        <div className="path-ui-position">
            <div className='grid'>
                <div onMouseLeave={()=>{setIsMousePress(false)}}>
                {/* JSX Node Of Grid (2D Array) */}
                {Grid.map((R,idx_r)=>{
                return (<div key={idx_r} className='ROW'>
                            {R.map((Value,idx_c)=>{
                                    const {x,y,isStart,isEnd,isWall} = Value;
                                    return <Node key={idx_c} 
                                    pv={{x,y,isStart,isEnd,isWall,onMouseDown,onMouseEnter,onMouseUp,setStartEndNode}}>
                                    </Node>
                                })
                            }
                        </div>)
                })}
                </div>
            </div>
            <div>
                <div className="button-formcontrol">
                    {/* <select className='my-drop-down' value={pathID} onChange={(e)=>{setPathID(parseInt(e.target.value))}}>
                        <option value="0">Breadth-First Search</option>
                        <option value="1">Depth-First Search</option>
                        <option value="2">Djikstra's Algorithm</option>
                    </select> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" className='my-drop-down-label'>Algorithm</InputLabel>
                        <Select
                            className="my-drop-down"
                            value={pathID}
                            labelId="demo-simple-select-label"
                            onChange={(e)=>{setPathID(parseInt(e.target.value))}}
                            id="demo-simple-select"
                            label="Algorithm"
                        >
                            <MenuItem value={0}>Breadth-First Search</MenuItem>
                            <MenuItem value={1}>Depth-First Search</MenuItem>
                            <MenuItem value={2}>Djikstra's Algorithm</MenuItem>
                            {/* <MenuItem value={4}>Heap Sort</MenuItem>
                            <MenuItem value={5}>Quick Sort</MenuItem> */}
                        </Select>
                    </FormControl>
                    <button className='button-4 start-btn' onClick={pathFinding}>
                        Find the possible path
                    </button>
                </div>
                <div className='path-speed-btns'>
                    {/* <button className={`button-1 ${animateType===1 && 'curr-speed-btn'}`} onClick={()=>animationTimeHandle(1)}>Fast</button>
                    <button className={`button-1 ${animateType===2 && 'curr-speed-btn'}`} onClick={()=>animationTimeHandle(2)}>Average</button>
                    <button className={`button-1 ${animateType===3 && 'curr-speed-btn'}`} onClick={()=>animationTimeHandle(3)}>Slow</button> */}
                    <Slider
                        sx={{
                            color: "#3b82f6",
                            marginLeft: "10px",
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
                        aria-label="Restricted values"
                        defaultValue={1}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        min={1}
                        max={3}
                        marks={marks}
                        onChange={(e,ne)=>animationTimeHandle(ne)}
                    />
                </div>
                <div className='last-buttons'>
                    <div className='last-buttons-1st2nd'>
                        <button className='button-4 button-5' onClick={gridInitialize}>Clear walls</button>
                        {/* <button className='button-4 button-5' onClick={clearPathHandle}>Clear path</button> */}
                        <button className='button-4 button-5' style={{backgroundColor: '#ef4444', color: 'white'}}onClick={()=>{
                            START_NODE_ROW = InitSR;
                            START_NODE_ROW = InitSC;
                            END_NODE_ROW = InitER;
                            END_NODE_COL = InitEC;
                            clearPathHandle();
                            gridInitialize();
                            setPathExist(false);
                        }}>
                            Reset board
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

class Spot {
  constructor(i, j) {
      this.x = i;
      this.y = j;
      this.isWall = false;
      this.isStart = (i===START_NODE_ROW && j===START_NODE_COL);
      this.isEnd = (i===END_NODE_ROW && j===END_NODE_COL);
  }
}

function Node({pv}){
    
  const {x,y,isStart,isEnd,isWall,onMouseDown,onMouseEnter,onMouseUp,setStartEndNode} = pv;
  const allowDrop=(e)=>{e.preventDefault();}
  const drag=(e)=>{e.dataTransfer.setData("myID", e.target.id);}
  const drop=(e)=>{
      e.preventDefault();
      var data = e.dataTransfer.getData("myID");
      var dom = document.getElementById(data);
      var id = parseInt(dom.attributes.data_type.value);
      if(e.target.attributes.data_type.value !== "3" || e.target.attributes.wall.value === "true") return;
      
      // call the function
      var r = parseInt(e.target.attributes.data_x.value)
      var c = parseInt(e.target.attributes.data_y.value)
      setStartEndNode(id,r,c);
  }

  var classNode = isStart?"START_NODE":(isEnd?"END_NODE":(isWall?"obtacle":""));
  var typeId = isStart?"1":(isEnd?"2":"3");

  //if start or end node, dragging the node is possible
  if(isStart || isEnd){
      return (
          <div 
          className={'square '+classNode} id={'row'+x+'_col'+y}
          data_x={x} 
          data_y={y} 
          data_type={typeId} 
          wall="false"
          draggable="true"
          onDragStart={drag} 
          onDrop={drop} 
          onDragOver={allowDrop}
          >
          </div>
      )
  }
  //if regular node, mouse handlers can be activated accrodingly
  else{
      return(
          <div onMouseDown={(e)=>{
              e.preventDefault(); // it is necessary
              onMouseDown(x,y)}
          } 
          onMouseEnter={(e)=>{
              e.preventDefault();
              onMouseEnter(x,y)}
          } 
          onMouseUp={(e)=>{
              e.preventDefault();
              onMouseUp()}
          } 
          className={'square '+classNode} id={'row'+x+'_col'+y}
          data_x={x} 
          data_y={y} 
          data_type={typeId} 
          wall={isWall.toString()}
          onDrop={drop} 
          onDragOver={allowDrop}
          >
          </div>
      )
  }
}

async function waitForAnimatoin(time){
  return new Promise((resolve)=>{
      setTimeout(()=>{
          resolve('');
      },time)
  })
}
const isValid = (r,c) =>{
  if((r===START_NODE_ROW && c===START_NODE_COL) || (r===END_NODE_ROW && c===END_NODE_COL)) return 0;
  else return 1;
}
export default Graph;



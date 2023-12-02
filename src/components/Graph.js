import React,{useEffect, useState} from 'react'
import '../styles/Pathfinder.css';
import BFS from '../algorithm/bfs';
import DFS from '../algorithm/dfs';
import Djikstra from '../algorithm/djikstra';
import Modal from '../extras/Modal';


var rows = 22;
var cols = 34; //34

var START_NODE_ROW = 4, START_NODE_COL = 6;
var END_NODE_ROW = rows-6, END_NODE_COL = cols-6;
var InitSR = START_NODE_ROW, InitSC = START_NODE_COL;
var InitER = END_NODE_ROW, InitEC = END_NODE_COL;

var animateTime = 35; // 8,35,80

function Graph() {
  const [Grid,setGrid] = useState([]);  // array destructuring
  const [isMousePress,setIsMousePress] = useState(false);
  const [pathID,setPathID] = useState(0);
  const [animateType,setAnimateTimeType] = useState(2);


  useEffect(()=>{
      gridInitialize();
      popupClickHandle();
  },[])

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
      // document.getElementsByTagName('select')[0].disabled = true;
      // document.getElementsByTagName('select')[1].disabled = true;
      // for(let i=0; i<btns.length; i++){
      //     btns[i].disabled = true;
      // }

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

      // document.getElementsByTagName('select')[0].disabled = false;
      // document.getElementsByTagName('select')[1].disabled = false;
      // for(let i=0; i<btns.length; i++){
      //     btns[i].disabled = false;
      // }

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

      // <audio controls autoplay>
      //     <source src={Sober} type="audio/mpeg"/>
      // </audio>
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
      var newGrid = [...Grid] // array copy
      var node = newGrid[row][col];
      node.isWall = !node.isWall;
      newGrid[row][col] = node;
      setGrid(newGrid);
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
  const animationTimeHandle = (type) =>{
      if(type === 1) animateTime = 8;
      else if(type === 2) animateTime = 35;
      else animateTime = 80;
      setAnimateTimeType(type);
  }

  const setStartEndNode = (id, r, c) =>{
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
  const popupClickHandle = () =>{
      var blur = document.getElementById("Container-blur");
      blur.classList.toggle('active');
      var popup = document.getElementById("popup");
      popup.classList.toggle('unActive');
  }
  return (
    // <div>
            <>
      <Modal style={{border: "1px solid #334155", paddingBottom: "20px"}} popupClickHandle = {popupClickHandle}>
          <h3 style={{color:"#334155",textAlign:"center"}}>Video Tutorial</h3>
          <div style={{display:"flex",justifyContent:"center"}}>
              {/* <iframe width="90%" height="300px" src="https://www.youtube.com/embed/iK95rIRVbMo?autoplay=1&mute=1" title='myVideo'> */}
              {/* </iframe>  */}
          </div>
      </Modal>

      <div id="Container-blur">
          <div className='path-container'>
              <div className='path-header'>
                      <div>
                          <div style={{"display":"flex","margin":"6px auto"}}>
                              <div>
                                  <button className='button-4 start-btn' onClick={pathFinding}>
                                      Find the possible path
                                  </button>
                              </div>
                              <div>
                                  <select className='my-drop-down' value={pathID} onChange={(e)=>{setPathID(parseInt(e.target.value))}}>
                                      <option value="0">Breadth-First Search</option>
                                      <option value="1">Depth-First Search</option>
                                      <option value="2">Djikstra's Algorithm</option>
                                  </select>
                              </div>
                          </div>
                          <div className='path-speed-btns'>
                              <button className={`button-1 ${animateType===1 && 'curr-speed-btn'}`} onClick={()=>animationTimeHandle(1)}>Fast</button>
                              <button className={`button-1 ${animateType===2 && 'curr-speed-btn'}`} onClick={()=>animationTimeHandle(2)}>Average</button>
                              <button className={`button-1 ${animateType===3 && 'curr-speed-btn'}`} onClick={()=>animationTimeHandle(3)}>Slow</button>
                          </div>
                      </div>
                          <div style={{"display":"flex"}}>
                              <button className='button-4' onClick={gridInitialize}>Clear walls</button>
                              <button className='button-4' onClick={clearPathHandle}>Clear path</button>
                              <button className='button-4' onClick={()=>{
                                  START_NODE_ROW = InitSR;
                                  START_NODE_ROW = InitSC;
                                  END_NODE_ROW = InitER;
                                  END_NODE_COL = InitEC;
                                  clearPathHandle();
                                  gridInitialize();
                              }}>
                                  Reset board
                              </button>
                          </div>
                      {/* </div> */}
              </div>
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
          </div>
      </div>
      </>
    // </div>
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
import { useState } from 'react';
import './App.css'

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

import { dijkstrasAlgorithm } from './scripts/Node';

function App() {
  const currentModeState = useState("add");
  const nodesState = useState([]);
  const selectedNodeState = useState();

  function runDijkstras() {
    dijkstrasAlgorithm(nodesState[0], selectedNodeState[0]);
  }

  return (
    <>
      <div className="mainContainer">
        <Sidebar currentModeState={currentModeState} selectedNodeState={selectedNodeState} runDijkstras={runDijkstras} />
        <Canvas currentModeState={currentModeState} nodesState={nodesState} selectedNodeState={selectedNodeState} />
      </div>
    </>
  )
}

export default App

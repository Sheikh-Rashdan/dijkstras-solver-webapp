import { useState } from 'react';
import './App.css'

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

import { dijkstrasAlgorithm } from './scripts/Node';

function App() {
  const currentModeState = useState("add");
  const nodesState = useState([]);
  const selectedNodeState = useState();
  const inputWeightState = useState(null);
  const isWeightInputErrorState = useState(false);

  function runDijkstras() {
    dijkstrasAlgorithm(nodesState, selectedNodeState[0]);
  }

  return (
    <>
      <div className="mainContainer">
        <Sidebar currentModeState={currentModeState} selectedNodeState={selectedNodeState} inputWeightState={inputWeightState} isWeightInputErrorState={isWeightInputErrorState} nodesState={nodesState} runDijkstras={runDijkstras} />
        <Canvas currentModeState={currentModeState} nodesState={nodesState} selectedNodeState={selectedNodeState} inputWeightState={inputWeightState} isWeightInputErrorState={isWeightInputErrorState} />
      </div>
    </>
  )
}

export default App

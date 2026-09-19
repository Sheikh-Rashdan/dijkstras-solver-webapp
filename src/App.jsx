import { useState } from 'react';
import './App.css'

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

function App() {
  const currentModeState = useState("add");
  const nodesState = useState([]);
  const selectedNodeState = useState();

  return (
    <>
      <div className="mainContainer">
        <Sidebar currentModeState={currentModeState} selectedNodeState={selectedNodeState} />
        <Canvas currentModeState={currentModeState} nodesState={nodesState} selectedNodeState={selectedNodeState} />
      </div>
    </>
  )
}

export default App

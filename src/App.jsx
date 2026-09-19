import { useState } from 'react';
import './App.css'

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

function App() {
  const currentModeState = useState("add");
  const nodesState = useState([]);

  return (
    <>
      <div className="mainContainer">
        <Sidebar currentModeState={currentModeState} />
        <Canvas currentModeState={currentModeState} nodesState={nodesState} />
      </div>
    </>
  )
}

export default App

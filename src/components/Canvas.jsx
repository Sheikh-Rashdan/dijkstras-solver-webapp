import "./Canvas.css";
import Node from "../scripts/Node";

import NodeDiv from "./NodeDiv";

let uniqueNodeNumber = 0;

function Canvas({ currentModeState, nodesState, selectedNodeState }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [nodes, setNodes] = nodesState;

    return (
        <section className={`canvasSection ${currentMode}Mode`} onClick={e => interactWithCanvas(e, currentMode, nodesState)}>
            {nodes.map(node => {
                return (
                    <NodeDiv
                        key={node.id}
                        node={node}
                        currentModeState={currentModeState}
                        nodesState={nodesState}
                        selectedNodeState={selectedNodeState}
                    />
                );
            })}
        </section>
    );
}

function addNode(e, nodesState) {
    const offset = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    const [nodes, setNodes] = nodesState;

    let flag = false;
    nodes.forEach(node => {
        if (flag === true) return;
        if (node.pos[0] === offset[0] && node.pos[1] === offset[1]) flag = true;
    });
    if (flag) return;

    const nodeObj = new Node(uniqueNodeNumber, offset);

    const newNodes = [...nodes];
    newNodes.push(nodeObj);
    setNodes(newNodes);
}

function interactWithCanvas(e, currentMode, nodesState) {
    switch (currentMode) {
        case "add":
            addNode(e, nodesState)
            uniqueNodeNumber++;
            break;
    }
}

export default Canvas;
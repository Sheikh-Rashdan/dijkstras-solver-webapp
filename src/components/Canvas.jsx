import "./Canvas.css";

let uniqueNodeNumber = 0;

function addNode(e, nodesState) {
    const offset = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    const [nodes, setNodes] = nodesState;

    let flag = false;
    nodes.forEach(node => {
        if (flag === true) return;
        if (node[0] === offset[0] && node[1] === offset[1]) flag = true;
    });
    if (flag) return;

    const nodeObj = { "id": uniqueNodeNumber, pos: offset };

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

function Canvas({ currentModeState, nodesState }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [nodes, setNodes] = nodesState;

    return (
        <section className="canvasSection" onClick={e => interactWithCanvas(e, currentMode, nodesState)}>
            {nodes.map(({ id, pos }) => <Node key={id} id={id} pos={pos} currentMode={currentMode} nodesState={nodesState} />)}
        </section>
    );
}

function Node({ id, pos, currentMode, nodesState }) {
    const left = `${pos[0] - 24}px`;
    const top = `${pos[1] - 24}px`;

    function onClick(currentMode, nodesState) {
        const [nodes, setNodes] = nodesState;

        if (currentMode !== "remove") return;
        let newNodes = nodes.filter(node => {
            return !(node.id === id);
        });
        setNodes(newNodes);
    }

    return (
        <div
            className={`node ${currentMode === "remove" ? "removeMode" : ""}`}
            style={{ "left": left, "top": top }}
            onClick={() => onClick(currentMode, nodesState)}
        >
            {id}
        </div>
    );
}

export default Canvas;
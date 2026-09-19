import "./Canvas.css";
import Node from "../scripts/Node";

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

function NodeDiv({ node, currentModeState, nodesState, selectedNodeState }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [nodes, setNodes] = nodesState;
    const [selectedNode, setSelectedNode] = selectedNodeState;

    const left = `${node.pos[0] - 24}px`;
    const top = `${node.pos[1] - 24}px`;

    function interactWithNode() {
        switch (currentMode) {
            case "remove":
                removeNode();
                break;
            case "select":
                selectNode();
                break;
            case "connect":
                connectNode();
                break;
        }
    }

    function removeNode() {
        const newNodes = nodes.filter(currentNode => {
            return !(currentNode.id === node.id);
        });
        setNodes(newNodes);

        if (selectedNode?.id === node.id) {
            setSelectedNode(undefined);
        }
    }

    function selectNode() {
        if (node.id === selectedNode?.id) {
            setSelectedNode(undefined);
            return;
        }

        setSelectedNode(node);
    }

    function connectNode() {
        if (node.id === selectedNode.id) return;
        if (Array.from(node.neighbours.keys()).includes(selectedNode)) return;

        node.addNeighbour(selectedNode, 5);

        setCurrentMode("select");
        setSelectedNode(undefined);
    }

    return (
        <div
            className={`node ${currentMode}Mode ${selectedNode?.id === node.id ? "selected" : ""}`}
            style={{ "left": left, "top": top }}
            onClick={interactWithNode}
            // MARK: implement dragging
            draggable={currentMode === "move"}
        >
            {node.id}
        </div>
    );
}

export default Canvas;
import "./NodeDiv.css";

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

export default NodeDiv;
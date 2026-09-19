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

        const newNodes = [...nodes];
        setNodes(newNodes);
        setCurrentMode("select");
        setSelectedNode(undefined);
    }


    function onDrag({ clientX, clientY, nativeEvent }) {
        if (clientX === 0 && clientY === 0) return;

        const [x, y] = [nativeEvent.offsetX - 24, nativeEvent.offsetY - 24];
        const newPos = [node.pos[0] + x, node.pos[1] + y];
        node.pos = newPos;

        const newNodes = [...nodes];
        setNodes(newNodes);
    }

    function onDragStart({ dataTransfer }) {
        const dragImage = document.createElement("div");
        dragImage.style.position = "absolute";
        dragImage.style.top = "-9999px";
        dragImage.style.width = "1px";
        dragImage.style.height = "1px";
        document.body.appendChild(dragImage);
        dataTransfer.setDragImage(dragImage, 0, 0);
    }

    return (
        <div
            className={`node ${currentMode}Mode ${selectedNode?.id === node.id ? "selected" : ""}`}
            style={{ "left": left, "top": top }}
            onClick={interactWithNode}
            draggable={currentMode === "move"}
            onDrag={onDrag}
            onDragStart={onDragStart}
        >
            {node.id}
        </div>
    );
}

export default NodeDiv;
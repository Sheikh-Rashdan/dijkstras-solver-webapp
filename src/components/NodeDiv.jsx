import "./NodeDiv.css";
import { resetDijkstras } from '../scripts/Node.jsx';

function NodeDiv({ node, currentModeState, nodesState, selectedNodeState, setDraggingNode }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [nodes, setNodes] = nodesState;
    const [selectedNode, setSelectedNode] = selectedNodeState;

    const left = `calc(${node.pos[0]}px - 1.5rem)`;
    const top = `calc(${node.pos[1]}px - 1.5rem)`;

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

        resetDijkstras(nodesState);

        node.neighbours.keys().forEach(neighbourNode => neighbourNode.removeNeighbour(node));

        const newNodes = nodes.filter(currentNode => {
            return !(currentNode.id === node.id);
        });
        setNodes(newNodes);

        if (selectedNode?.id === node.id) {
            setSelectedNode(undefined);
        }
    }

    function selectNode() {

        resetDijkstras(nodesState);

        if (node.id === selectedNode?.id) {
            setSelectedNode(undefined);
            return;
        }

        setSelectedNode(node);
    }

    function connectNode() {

        resetDijkstras(nodesState);

        if (node.id === selectedNode.id) return;
        if (Array.from(node.neighbours.keys()).includes(selectedNode)) return;

        node.addNeighbour(selectedNode, 5);

        const newNodes = [...nodes];
        setNodes(newNodes);
    }

    function onPointerDown({ clientX, clientY }) {
        if (currentMode === "move") {
            node.dragPos = node.pos;
            node.clientPos = [clientX, clientY];
            setDraggingNode(node);
        }
    }

    return (
        <div
            className={`node ${currentMode}Mode ${selectedNode?.id === node.id ? "selected" : ""}`}
            style={{ "left": left, "top": top }}
            onClick={interactWithNode}
            onPointerDown={onPointerDown}
        >
            {node.id}
        </div>
    );
}

export default NodeDiv;
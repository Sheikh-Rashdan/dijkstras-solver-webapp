import "./Canvas.css";
import Node from "../scripts/Node";

import NodeDiv from "./NodeDiv";
import { useEffect, useState } from "react";
import { C } from "@boxicons/react";

let uniqueNodeNumber = 0;

function Canvas({ currentModeState, nodesState, selectedNodeState }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [nodes, setNodes] = nodesState;

    const [edges, setEdges] = useState(new Map());
    const [draggingNode, setDraggingNode] = useState(null);

    function interactWithCanvas({ nativeEvent }) {
        switch (currentMode) {
            case "add":
                addNode([nativeEvent.offsetX, nativeEvent.offsetY], nodesState)
                uniqueNodeNumber++;
                break;
        }
    }

    function addNode(offset) {
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

    function dragNode(x, y) {
        if (draggingNode === null) return;

        const newX = draggingNode.dragPos[0] + x - draggingNode.clientPos[0];
        const newY = draggingNode.dragPos[1] + y - draggingNode.clientPos[1];
        draggingNode.pos = [newX, newY];

        const newNodes = [...nodes];
        setNodes(newNodes);
    }

    function onPointerMove({ clientX, clientY }) {
        dragNode(clientX, clientY);
    }

    function onTouchMove({ touches }) {
        const touch = touches[0];
        const [x, y] = [touch.clientX, touch.clientY];
        dragNode(x, y);
    }

    function onPointerUp() {
        setDraggingNode(null);
    }

    useEffect(() => {
        const newEdges = new Map(edges);
        nodes.forEach(node => {
            node.neighbours.keys().forEach(neighbourNode => {
                let startPos = node.pos;
                let startId = node.id;

                let finishId = neighbourNode.id;
                let finishPos = neighbourNode.pos;

                if (startId < finishId) {
                    [startId, finishId] = [finishId, startId];
                    [startPos, finishPos] = [finishPos, startPos];
                }
                newEdges.set(`${startId}-${finishId}`, [startPos, finishPos]);
            });
        });
        setEdges(newEdges);
    }, [nodes]);

    return (
        <section
            className={`canvasSection ${currentMode}Mode`}
            onClick={e => interactWithCanvas(e, currentMode, nodesState)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onTouchMove={onTouchMove}
            onTouchEnd={onPointerUp}
        >
            {nodes.map(node => {
                return (
                    <NodeDiv
                        key={node.id}
                        node={node}
                        currentModeState={currentModeState}
                        nodesState={nodesState}
                        selectedNodeState={selectedNodeState}
                        setDraggingNode={setDraggingNode}
                    />
                );
            })}
            <svg width="100%" height="100%">
                {Array.from(edges.entries()).map(([key, pos]) => {
                    return <line key={key} x1={pos[0][0]} y1={pos[0][1]} x2={pos[1][0]} y2={pos[1][1]} />;
                })}
            </svg>
        </section>
    );
}

export default Canvas;
import { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import { MinusSquare, PlusSquare, Connector, CursorClick, Move, ChevronRightCircle } from '@boxicons/react';

function Sidebar({ currentModeState, selectedNodeState, inputWeightState, isWeightInputErrorState, nodesState, runDijkstras }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [selectedNode, setSelectedNode] = selectedNodeState;
    const [inputWeight, setInputWeight] = inputWeightState;
    const [isWeightInputError, setIsWeightInputError] = isWeightInputErrorState;
    const [nodes, setNodes] = nodesState;

    const [sortByDistance, setSortByDistance] = useState(false);
    const weightInputRef = useRef(null);

    const connectActive = currentMode === "connect";
    const nodeSelected = Boolean(selectedNode);

    function setWeightFromInput(e) {
        let weight = null;
        let isError = false;
        try {
            weight = parseFloat(e.target.value);
            if (weight <= 0 || !weight) throw RangeError("Weight must be greater than 0.");
        } catch (e) {
            isError = true;
        }
        setInputWeight(weight);
        setIsWeightInputError(isError);
    }

    useEffect(() => {
        if (isWeightInputError) {
            const target = weightInputRef.current;
            if (target === null) return;
            target.focus();
        }
    }, [isWeightInputError]);

    return (
        <section className="sidebarSection">
            <div className="sidebarGrid">
                <ToggleButton identifier="add" activeElementState={currentModeState}>
                    <PlusSquare pack="filled" size="md" />
                    Create
                </ToggleButton>
                <ToggleButton identifier="remove" activeElementState={currentModeState}>
                    <MinusSquare pack="filled" size="md" />
                    Remove
                </ToggleButton>
                <ToggleButton identifier="select" activeElementState={currentModeState}>
                    <CursorClick pack="filled" size="md" />
                    Select
                </ToggleButton>
                <ToggleButton identifier="move" activeElementState={currentModeState}>
                    <Move pack="filled" size="md" />
                    Move
                </ToggleButton>
            </div>
            <hr />
            <ToggleButton
                identifier={"connect"}
                activeElementState={currentModeState}
                horizontal={true}
                disabled={!nodeSelected}
            >
                <Connector pack="filled" />
                {connectActive ? "Connecting" : "Connect"}
            </ToggleButton>
            <input
                ref={weightInputRef}
                className={`${isWeightInputError ? "error" : ""}`}
                placeholder="Weight"
                type="number"
                min="0"
                inputMode="numeric"
                onChange={setWeightFromInput}
            />
            <hr />
            <p className="infoText">Selected: {selectedNode?.id ?? "None"}</p>
            <div className="resultsContainer">
                <p className="resultsTitle">Results:</p>
                {nodes.some(node => node.shortestDistance !== null)
                    ? <div className="resultsGrid noScrollbar">
                        <div className="resultsPair">
                            <p style={{ "cursor": "pointer" }} onClick={() => setSortByDistance(false)}>Node</p>
                            <p style={{ "cursor": "pointer" }} onClick={() => setSortByDistance(true)}>Distance</p>
                        </div>
                        {(sortByDistance ? [...nodes].sort((a, b) => a.shortestDistance - b.shortestDistance) : nodes).map(node => {
                            if (!node.shortestDistance) return;
                            return (
                                <div className="resultsPair" key={node.id}>
                                    <p className="result">
                                        {node.id}
                                    </p>
                                    <p className="result">
                                        {node.shortestDistance}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    : "N/A"}
            </div>
            <hr />
            <button disabled={!nodeSelected || connectActive} onClick={runDijkstras}>
                <ChevronRightCircle pack="filled" />
                Calculate
            </button>
        </section>
    );
}

function ToggleButton({ children, identifier, activeElementState, horizontal = false, disabled = false }) {
    const [activeElement, setActiveElement] = activeElementState;
    const active = identifier == activeElement;

    function onClick() {
        setActiveElement(identifier);
    }

    return (
        <button className={`toggleButton ${active ? "active" : ""} ${horizontal ? "horizontal" : ""}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Sidebar;
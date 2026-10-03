import { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import { MinusSquare, PlusSquare, CursorClick, Move, ChevronRightCircle, CaretDown, CaretRight, LinkBreak, Link } from '@boxicons/react';

function Sidebar({ currentModeState, selectedNodeState, inputWeightState, isWeightInputErrorState, nodesState, runDijkstras }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [selectedNode, setSelectedNode] = selectedNodeState;
    const [inputWeight, setInputWeight] = inputWeightState;
    const [isWeightInputError, setIsWeightInputError] = isWeightInputErrorState;
    const [nodes, setNodes] = nodesState;

    const sortByDistanceState = useState(false);
    const [sortByDistance, setSortByDistance] = sortByDistanceState;
    const weightInputRef = useRef(null);

    const connectActive = currentMode === "connect";
    const disconnectActive = currentMode === "disconnect";
    const nodeSelected = Boolean(selectedNode);

    function setWeightFromInput(e) {
        let weight = null;
        let isError = false;
        try {
            weight = parseFloat(e.target.value);
            if (isNaN(weight) || weight < 0) throw RangeError("Weight must be greater than 0.");
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
                    <PlusSquare className="icon" pack="filled" size="md" />
                    Create
                </ToggleButton>
                <ToggleButton identifier="remove" activeElementState={currentModeState}>
                    <MinusSquare className="icon" pack="filled" size="md" />
                    Remove
                </ToggleButton>
                <ToggleButton identifier="select" activeElementState={currentModeState}>
                    <CursorClick className="icon" pack="filled" size="md" />
                    Select
                </ToggleButton>
                <ToggleButton identifier="move" activeElementState={currentModeState}>
                    <Move className="icon" pack="filled" size="md" />
                    Move
                </ToggleButton>
            </div>
            <hr />
            <div className="connectGrid">
                <ToggleButton
                    identifier={"connect"}
                    activeElementState={currentModeState}
                    horizontal={true}
                    disabled={!nodeSelected}
                >
                    <Link pack="filled" />
                    {connectActive ? "Connecting" : "Connect"}
                </ToggleButton>
                <ToggleButton
                    identifier={"disconnect"}
                    activeElementState={currentModeState}
                    horizontal={true}
                    disabled={!nodeSelected}
                >
                    <LinkBreak pack="filled" />
                    {disconnectActive ? "Disconnecting" : "Disconnect"}
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
            </div>
            <hr />
            <p className="infoText">Selected: {selectedNode?.id ?? "None"}</p>
            <div className="resultsContainer">
                <p className="resultsTitle">Results:</p>
                {nodes.some(node => node.shortestDistance !== null)
                    ? <div className="resultsGrid noScrollbar">
                        <div className="resultsPair">
                            <ToggleButton className="resultsColumnHeader" identifier={false} activeElementState={sortByDistanceState} horizontal={true}>
                                {sortByDistance ?
                                    <CaretRight className="icon" pack="filled" /> :
                                    <CaretDown className="icon" pack="filled" />
                                }
                                Node
                            </ToggleButton>
                            <ToggleButton className="resultsColumnHeader" identifier={true} activeElementState={sortByDistanceState} horizontal={true}>
                                {sortByDistance ?
                                    <CaretDown className="icon" pack="filled" /> :
                                    <CaretRight className="icon" pack="filled" />
                                }
                                Distance
                            </ToggleButton>
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

function ToggleButton({ children, className, identifier, activeElementState, horizontal = false, disabled = false }) {
    const [activeElement, setActiveElement] = activeElementState;
    const active = identifier == activeElement;

    function onClick() {
        setActiveElement(identifier);
    }

    return (
        <button className={`${className} toggleButton ${active ? "active" : ""} ${horizontal ? "horizontal" : ""}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Sidebar;
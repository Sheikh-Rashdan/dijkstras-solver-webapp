import "./Sidebar.css";
import { MinusSquare, PlusSquare, Connector, CursorClick, Move, ChevronRightCircle } from '@boxicons/react';

function Sidebar({ currentModeState, selectedNodeState, inputWeightState, isWeightInputErrorState, runDijkstras }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [selectedNode, setSelectedNode] = selectedNodeState;
    const [inputWeight, setInputWeight] = inputWeightState;
    const [isWeightInputError, setIsWeightInputError] = isWeightInputErrorState;

    const connectActive = currentMode === "connect";
    const nodeSelected = selectedNode !== undefined;

    function setWeightFromInput(e) {
        let weight = null;
        let isError = false;
        try {
            weight = parseFloat(e.target.value);
            if (weight <= 0 || weight === NaN) throw RangeError("Weight must be greater than 0.");
        } catch (e) {
            isError = true;
        }
        setInputWeight(weight);
        setIsWeightInputError(isError);
    }

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
                className={`${isWeightInputError ? "error" : ""}`}
                placeholder="Weight"
                type="number"
                min="0"
                inputMode="numeric"
                onChange={setWeightFromInput}
            />
            <button disabled={!nodeSelected || connectActive} onClick={runDijkstras}>
                <ChevronRightCircle pack="filled" />
                Start
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
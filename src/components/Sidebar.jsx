import "./Sidebar.css";
import { MinusSquare, PlusSquare, Connector, CursorClick, Move, ChevronRightCircle } from '@boxicons/react';

function Sidebar({ currentModeState, selectedNodeState, runDijkstras }) {
    const [currentMode, setCurrentMode] = currentModeState;
    const [selectedNode, setSelectedNode] = selectedNodeState;

    const connectActive = currentMode === "connect";
    const nodeSelected = selectedNode !== undefined;

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
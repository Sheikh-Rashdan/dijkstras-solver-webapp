import "./Sidebar.css";
import { MinusSquare, PlusSquare, Connector, CursorClick } from '@boxicons/react';

function Sidebar({ currentModeState, selectedNodeState }) {
    const [selectedNode, setSelectedNode] = selectedNodeState;
    const connectActive = selectedNode !== undefined;

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
            </div>
            <button disabled={!connectActive}>
                <Connector pack="filled" />
                Connect
            </button>
        </section>
    );
}

function ToggleButton({ children, identifier, activeElementState }) {
    const [activeElement, setActiveElement] = activeElementState;
    const active = identifier == activeElement;

    function onClick() {
        setActiveElement(identifier);
    }

    return (
        <button className={`toggleButton ${active ? "active" : ""}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Sidebar;
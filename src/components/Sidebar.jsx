import "./Sidebar.css";
import { MinusSquare, PlusSquare } from '@boxicons/react';

function Sidebar({ currentModeState }) {
    return (
        <section className="sidebarSection">
            <div className="sidebarGrid">
                <ToggleButton identifier="add" activeElementState={currentModeState}>
                    <PlusSquare pack="filled" size="md" />
                    Add Node
                </ToggleButton>
                <ToggleButton identifier="remove" activeElementState={currentModeState}>
                    <MinusSquare pack="filled" size="md" />
                    Remove Node
                </ToggleButton>
            </div>
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
        <button className={`${active ? "active" : ""}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Sidebar;
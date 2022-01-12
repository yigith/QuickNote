import { useContext } from "react";
import AppContext from "./AppContext";

function Enterance() {
    const ctx = useContext(AppContext);

    const handleSubmit = function(event) {
        event.preventDefault();
        // todo: get notebook through api

        ctx.setNoteBook({ id: 1, name: "coding" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="name.." required maxLength={50} />
            <button>Enter</button>
        </form>
    )
}

export default Enterance

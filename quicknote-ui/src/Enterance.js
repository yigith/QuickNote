import axios from "axios";
import { useContext, useState } from "react";
import AppContext from "./AppContext";
const API_URL = process.env.REACT_APP_API_URL;

function Enterance() {
    const [name, setName] = useState("");
    const ctx = useContext(AppContext);
    
    const handleSubmit = function(event) {
        event.preventDefault();
        // todo: get notebook through api
        axios.post(API_URL + "NoteBooks", { name })
            .then(function(response) {
                ctx.setNoteBook(response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} 
                type="text" placeholder="name.." required maxLength={50} />
            <button>Enter</button>
        </form>
    )
}

export default Enterance

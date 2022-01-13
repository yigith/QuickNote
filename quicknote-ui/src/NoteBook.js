import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
const API_URL = process.env.REACT_APP_API_URL;

function NoteBook() {
    const [notes, setNotes] = useState([]);
    const ctx = useContext(AppContext);

    useEffect(() => {
        axios.get(API_URL + "Notes?noteBookId=" + ctx.noteBook.id)
            .then(function(response) {
                setNotes(response.data);
            });
    }, [])

    return (
        <div>
            <h1>Notes of '{ctx.noteBook.name}'</h1>

            <ul>
                { notes.map(x => <li key={x.id}>{ x.title }</li>)}
            </ul>
        </div>
    )
}

export default NoteBook

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import AppContext from "./AppContext";
const API_URL = process.env.REACT_APP_API_URL;

function NoteBook() {
    const [id, setId] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const ctx = useContext(AppContext);
    
    const showNote = function (index) {
        if (index >= notes.length) return;
        setSelectedIndex(index);
        setId(notes[index].id);
        setTitle(notes[index].title);
        setContent(notes[index].content);
    };

    useEffect(() => {
        axios.get(API_URL + "Notes?noteBookId=" + ctx.noteBook.id)
            .then(function (response) {
                setNotes(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedIndex < 0)
            showNote(0);
    }, [notes]);

    const handleClose = function (event) {
        event.preventDefault();
        ctx.setNoteBook(null);
    }

    const handleListItemClick = function (event, index) {
        event.preventDefault();
        showNote(index);
    };


    return (
        <div className="h-100 d-flex flex-column">
            <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand >
                        QuickNote
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleClose}>
                                <FontAwesomeIcon icon={["fas", "window-close"]} className="me-1" />
                                Close
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className="flex-sm-fill">
                <Row className="h-100">
                    <Col sm={4} md={3} className="py-3">
                        <h4 className="mb-3 mt-2">Notes of '{ctx.noteBook.name}'</h4>
                        <ListGroup defaultActiveKey="#note-0">
                            {notes.map((x, i) => (
                                <ListGroup.Item key={i} action href={"#note-" + i} onClick={e => handleListItemClick(e, i)}>
                                    {x.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={8} md={9} className="d-flex flex-column py-3">
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Title.." 
                                value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 flex-fill">
                            <Form.Control as="textarea" rows="10" className="h-100" placeholder="Your note.." 
                                value={content} onChange={e => setContent(e.target.value) } />
                        </Form.Group>
                        <div>
                            <Button variant="primary">
                                <FontAwesomeIcon icon={["fas", "save"]} className="me-2" />
                                Save
                            </Button>
                            <Button variant="danger" className="ms-2">
                                <FontAwesomeIcon icon={["fas", "trash"]} className="me-2" />
                                Delete
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NoteBook;

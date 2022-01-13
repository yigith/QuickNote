import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from './AppContext';
import { useState } from 'react';
import NoteBook from './NoteBook'
import Enterance from './Enterance'
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
  const [noteBook, setNoteBook] = useState(null);

  return (
    <AppContext.Provider value={{noteBook, setNoteBook}}>
      <div className="App w-100 h-100">
        {noteBook ? <NoteBook /> : <Enterance />}
      </div>
    </AppContext.Provider>
  );
}

export default App;

import AppContext from './AppContext';
import { useState } from 'react';
import NoteBook from './NoteBook'
import Enterance from './Enterance'
import './App.css';

function App() {
  const [noteBook, setNoteBook] = useState(null);

  return (
    <AppContext.Provider value={{noteBook, setNoteBook}}>
      <div className="App">
        {noteBook ? <NoteBook /> : <Enterance />}
      </div>
    </AppContext.Provider>
  );
}

export default App;

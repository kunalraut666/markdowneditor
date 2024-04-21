import React from "react"
import Sidebar from "./component/Sidebar"
import Editor from "./component/Editor"
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './component/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './component/About'
import Navbar from './component/Navebar'
import Split from "react-split"
import { nanoid } from "nanoid"
import { useLocation } from "react-router-dom";

export default function App() {
  const [notes, setNotes] = React.useState(
    // this is call lazzy initliztion mean while first time page render only that time local storage call
     JSON.parse(localStorage.getItem('notes')) || []
  )
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

   // Get the current location
   const location = useLocation();
   const pathname = location.pathname;  
   console.log(pathname);

// side effect process handle by use effect
React.useEffect(function() {
  localStorage.setItem("notes" , JSON.stringify(notes))
}, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Your Title"
    }

    setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    let newArr =[];
    setNotes(oldNotes => {
      for(let i=0; i<oldNotes.length; i++){
        let noteObj = oldNotes[i];
        if(noteObj.id === currentNoteId){
               newArr.unshift({...noteObj , body : text})
        }else{
         newArr.push(noteObj);
        }
      }
      return newArr;
    })
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  function deleteNote(e , noteId){
    e.stopPropagation();
    setNotes(prevNotes  => prevNotes.filter(note => note.id !== noteId))

  }

  return (
    <>
    <Navbar
        title={"Markdown Editor"}
        about="About"
      />
        <Routes>
          <Route path="/analytics" element={<Home title={"Text Analyser"} />} />
          <Route path="/about" element={<About />} />
        </Routes>

{location.pathname !== "/analytics" && location.pathname !== "/about" ? (
        <main>
          {
            notes.length > 0 ? (
              <Split
                sizes={[30, 70]}
                direction="horizontal"
                className="split"
              >
                <Sidebar
                  notes={notes}
                  currentNote={findCurrentNote()}
                  setCurrentNoteId={setCurrentNoteId}
                  newNote={createNewNote}
                  deleteNoteFn={deleteNote}
                />
                {
                  currentNoteId && notes.length > 0 && (
                    <Editor
                      currentNote={findCurrentNote()}
                      updateNote={updateNote}
                    />
                  )
                }
              </Split>
            ) : (
              <div className="no-notes">
                <h1>You have no notes</h1>
                <button
                  className="first-note"
                  onClick={createNewNote}
                >
                  Create one now
                </button>
              </div>
            )
          }
        </main>
      ) : null}
    </>
  )
}



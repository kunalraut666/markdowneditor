import React from "react";
import "./style.css"
export default function Sidebar(props) {
    
  const noteElements = props.notes.map((note) => {
             let str =JSON.stringify(note.body)
               let bodyArr =str.split("\\")
               
 return (
   <div key={note.id}>
     <div
       className={`title ${
         note.id === props.currentNote.id ? "selected-note" : ""
       }`}
       onClick={() => props.setCurrentNoteId(note.id)}
     >
       <h4 className="text-snippet"> {bodyArr[0]} </h4>

       <button
         className="delete-btn"
         // Your onClick event handler here
         onClick={(event) => props.deleteNoteFn(event ,note.id)}
       >
         <i className="gg-trash trash-icon"></i>
       </button>
     </div>
   </div>
 );
});

  return (
    <section className="pane sidebar " style={{
      height: '80vh',
      overflowY: 'auto',
    }}>
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

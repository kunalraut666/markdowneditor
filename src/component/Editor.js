import React, { useEffect } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import { Link } from 'react-router-dom';

export default function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [textDetails, setTextDetails] = React.useState("");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  // Function to handle downloading the note content
  const downloadNote = () => {
    const element = document.createElement("a");
    const file = new Blob([currentNote.body], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "note.md";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  // Function to handle sending text details to analytics page
  const sendToAnalytics = () => {
    const encodedText = encodeURIComponent(currentNote.body); // Encode the text for URL
    setTextDetails(encodedText); // Save encoded text details
  };

  // Use useEffect to trigger navigation after textDetails state has been updated
  useEffect(() => {
    if (textDetails) {
      // Navigate to analytics page with text details
      window.location.href = `/analytics?text=${textDetails}`;
    }
  }, [textDetails]);

  return (
    <section className="pane editor" >
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={70}
        heightUnits="vh"
      />
      <button type="button" className="btn btn-secondary" onClick={downloadNote} style={{
        float: 'right'
      }}>Download Markdown</button>

      <Link to="#" className='btn btn-secondary mx-2' onClick={sendToAnalytics} style={{
        float: 'right'
      }}>Analyze Notes</Link>
    </section>
  );
}

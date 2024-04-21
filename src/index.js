// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//     <App />
//   </>
// );


// Root.js or index.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

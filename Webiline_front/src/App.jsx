import React from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";

const App = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
      <main>
        <Routing></Routing>
      </main>
    </div>
  );
};

export default App;

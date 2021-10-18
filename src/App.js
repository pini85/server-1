import logo from "./logo.svg";
import "./App.css";
import IFrame from "./Iframe";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("localstroage value", localStorage.getItem("id"));
  }, []);
  return (
    <div style={{ height: "80vh" }}>
      <IFrame></IFrame>
    </div>
  );
}

export default App;

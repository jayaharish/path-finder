import { useState } from "react";
import "./App.scss";
import { ActionHeader } from "./components/ActionHeader";

import { Header } from "./components/Header";
import { Visualiser } from "./components/Visualiser";
import { AlgorithmActionContextProvider } from "./context/AlgorithmActionContext";
import { AlgorithmContextProvider } from "./context/AlgorithmContext";

function App() {
  return (
    <div className="App">
      <AlgorithmContextProvider>
        <AlgorithmActionContextProvider>
          <Header></Header>
          <ActionHeader></ActionHeader>
          <Visualiser></Visualiser>
        </AlgorithmActionContextProvider>
      </AlgorithmContextProvider>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.scss";
import { ActionHeader } from "./components/ActionHeader";

import { Header } from "./components/Header";
import { AlgorithmActionContextProvider } from "./context/AlgorithmActionContext";
import { AlgorithmContextProvider } from "./context/AlgorithmContext";

function App() {
  return (
    <div className="App">
      <AlgorithmContextProvider>
        <AlgorithmActionContextProvider>
          <Header></Header>
          <ActionHeader></ActionHeader>
        </AlgorithmActionContextProvider>
      </AlgorithmContextProvider>
    </div>
  );
}

export default App;

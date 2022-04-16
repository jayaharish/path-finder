import { useState } from 'react'
import './App.scss'

import {Header} from './components/Header'
import { AlgorithmContextProvider } from './context/AlgorithmContext'

function App() {

  return (
    <div className="App">
      <AlgorithmContextProvider>
        <Header></Header>
      </AlgorithmContextProvider>
    </div>
  )
}

export default App

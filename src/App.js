import './App.css';
import FileNavigator from "./FileNavigator"
import FileViewer from "./FileViewer"

import {useState} from "react";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

const Router = BrowserRouter;

function Header() {
  return (
    <header className="App-header">
      <h1>Workout Notebook</h1>
    </header>
  )
}

function App() {
  let [showMisc, setShowMisc] = useState(true);

  return (
    <div className="App">
      {showMisc?<Header/>:""}
      <Router>
      <main className="flex-row">
        {showMisc?<FileNavigator/>:""}
        
        <Routes>
          <Route path="/view/*" element={<FileViewer/>}></Route>
        </Routes>
      </main>
      </Router>
      <span id="toggle-sidebar" onClick={()=>setShowMisc(!showMisc)}>👁</span>
    </div>
  );
}

export default App;

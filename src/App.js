import './App.css';
import FileNavigator from "./FileNavigator"
import FileViewer from "./FileViewer"
import {useLocation} from "react-router-dom";

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

      <div id="global-controls">
        <span id="open-file" onClick={()=>{
          const hasTextFile = window.location.href.includes(".txt") || window.location.href.includes(".md")
          if(!hasTextFile) alert("You haven't opened a workout yet to be able to see it's full text format")
          window.open(window.location.href.replace("view/", "data/notebooks/"));
        }}>📖</span>
        <span id="toggle-sidebar" onClick={()=>setShowMisc(!showMisc)}>👁</span>
      </div>
      
    </div>
  );
}

export default App;

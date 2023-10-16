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
  let [shownCreds, setShownCreds] = useState(false);
  return (
    <header className="App-header" style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", padding:"0 10px"}}>
      <h1>Workout Notebook</h1>
      
      {!shownCreds
        ?
        (<h2 style={{margin:"10px 0 10px 10px", cursor:"help"}} onClick={()=>{ setShownCreds(true) }}>By Weng</h2>)
        :
        (
          <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end"}}>
            <h2 style={{margin:"10px 0"}}>
            <a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style={{maxWidth:"10ch", verticalAlign:"middle", marginRight:"10px"}}/></a>
            <a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://camo.githubusercontent.com/0f56393c2fe76a2cd803ead7e5508f916eb5f1e62358226112e98f7e933301d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d626c75653f7374796c653d666c6174266c6f676f3d6c696e6b6564696e266c6162656c436f6c6f723d626c7565" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style={{maxWidth:"10ch", verticalAlign:"middle", marginRight:"10px"}}/></a>
            <a target="_blank" href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow"><img src="https://camo.githubusercontent.com/0bf5ba8ac9f286f95b2a2e86aee46371e0ac03d38b64ee2b78b9b1490df38458/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f596f75747562652d7265643f7374796c653d666c6174266c6f676f3d796f7574756265266c6162656c436f6c6f723d726564" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style={{maxWidth:"10ch", verticalAlign:"middle"}}/></a>  
            </h2>
          </div>
        )
      }
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

import './App.css';
import FileNavigator from "./FileNavigator"
import FileViewer from "./FileViewer"
import Welcome from "./Welcome"
import {useLocation} from "react-router-dom";

import {useState, useEffect} from "react";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { initAfterHasUnlocked, beep, beepFinal } from "./Audio.utils.js";
import {passwordValid} from "./Password.utils.js"

const Router = BrowserRouter;

function Header() {
  let [shownCreds, setShownCreds] = useState(false);

  return (
    <header className="App-header" style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", padding:"0 10px"}}>
      <h1 style={{padding:"10px 0"}}><a href="/" style={{color:"white", textDecoration:"none"}}>Workout Notebook</a></h1>
      
      {!shownCreds
        ?
        (<h2 style={{margin:"10px 0 10px 10px", cursor:"help"}} onClick={()=>{ setShownCreds(true) }}>By Weng</h2>)
        :
        (
          <div id="creds" style={{display:"flex", flexDirection:"row", alignItems:"flex-end", gap:"4px"}}>
              
              <a href="https://github.com/Siphon880gh/" rel="nofollow" target="_blank">
                  <img class="my-badge" src="https://img.shields.io/badge/Github-darkgray?style=flat&amp;logo=github&amp;labelColor=darkgray&amp;logoColor=white" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Github-darkgray?style=flat&amp;logo=youtube&amp;labelColor=lightgray&amp;labelColor=white" style={{display:"inline"}}/>
              </a>

              <a href="https://www.linkedin.com/in/weng-fung/" rel="nofollow" target="_blank">
                  <img class="my-badge" src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style={{display:"inline"}}/>
              </a>

              <a href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow" target="_blank">
                  <img class="my-badge" src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style={{display:"inline"}}/>
              </a>

              <a href="https://www.wengindustries.com/" rel="nofollow" target="_blank">
                  <img class="my-badge" src="https://img.shields.io/badge/WengIndustry.com-black?style=flat&amp;logo=googlehome&amp;labelColor=black&amp;logoColor=white" alt="Website" data-canonical-src="https://img.shields.io/badge/WengIndustry.com-black?style=flat&amp;logo=googlehome&amp;labelColor=black&amp;logoColor=black" style={{display:"inline"}}/>
              </a>

              {/* <a href="https://www.paypal.com/donate?business=T42BK25TYPZSA&amp;item_name=Buy+me+coffee+%28I+develop+free+apps%29&amp;currency_code=USD" target="_blank" title="Donate to this project using Buy Me A Coffee" alt="Paypal">
                  <img class="my-badge" src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" style={{display:"inline"}}/>
              </a> */}

          </div>
        )
      }
    </header>
  )
}

function App() {
  let [showMisc, setShowMisc] = useState(true);
  let [audioActive, setAudioActive] = useState(false);
  let [password, setPassword] = useState("");

  function getPassword() {
    var password = prompt("Enter password to unlock premium workouts", "");
    if(password!==passwordValid) {
      localStorage.removeItem("workout_player__password")
      setPassword("");
      alert("Incorrect password. Continue with basic workouts.");
    } else {
      localStorage.setItem("workout_player__password", passwordValid);
      setPassword(passwordValid);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("workout_player__password")) {
      setPassword(localStorage.getItem("workout_player__password"))
    }
  }) // useEffect

  return (
    <div className="App">
      {showMisc?<Header/>:""}
      <Router basename="/app/workout-player/build">
        <main className="flex-row">
          {showMisc?<FileNavigator password={password} setPassword={setPassword}/>:""}
          
          <Routes>
            <Route path="/view/*" element={<FileViewer beep={beep} beepFinal={beepFinal}/>}></Route>
            <Route path="/" element={<Welcome/>}></Route>
          </Routes>
        </main>
      </Router>

      <div id="global-controls">
        <span id="open-file" onClick={()=>{
          const hasTextFile = window.location.href.includes(".txt") || window.location.href.includes(".md")
          if(!hasTextFile) { 
            alert("You haven't opened a workout yet to be able to see it's full text format") 
          } else {
            window.open(window.location.href.replace("view/", "data/notebooks/"))
          }
        }}>📑</span>
        <span id="toggle-sidebar" onClick={()=>setShowMisc(!showMisc)}>👁</span>
        <span id="password" onClick={()=>{ getPassword() }}>🔑</span>
        <span id="audio" className={audioActive?"active":""} onClick={(event)=>{ event.stopPropagation(); setAudioActive(true); initAfterHasUnlocked(); }}></span>
        <span style={{clear:"both"}}></span>
      </div>
      
    </div>
  );
}

export default App;

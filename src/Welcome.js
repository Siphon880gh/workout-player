import './Welcome.css';
import {useState, useEffect} from "react";

function Welcome() {

  return (
    <div id="welcome" style={{textAlign:"center", width:"100%", lineHeight:"20px"}}>
        <h1>Welcome</h1>
        <p>Get to working out with timers and rep counters! Workouts are on the other panel.</p>
        <p>I'm focused mostly on rehab, flexibility, etc, outside of bodybuilding because there are already countless resources on bodybuilding. I find it interesting that people's postures can be corrected with routine exercises. There could also be workouts that burn fat.</p>
        <p>A quick note - A folder shows the number of workouts, eg. (3). Some workouts are premium and only accessed with valid password 🔑, so you may be teased there are more exercises than appears.</p>
    </div>
  )
}

export default Welcome;
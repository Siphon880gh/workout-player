import "./FileViewer.css"
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {
  Video,
  Picture,
  Detail,
  Interval,
  Sets} from "./FileViewer.Types.js";

import {tickUp, reset} from "./FileViewer.Timer.js";


function FileViewer(props) {

  // Changed route
  let [relativePath, setRelativePath] = useState("");

  // Load text file into HTML
  let [html, setHTML] = useState("");

  // Counter when playing
  let [playing, setPlayMode] = useState(true);
  let [elapsed, setElapsed] = useState(-1);

  // Counter for youtube, etc
  let [playingMedia, setPlayModeMedia] = useState(false);
  let [elapsedMedia, setElapsedMedia] = useState(-1);

  let [atExercise, setAtExercise] = useState(0);
  let [workoutLength, setWorkoutLength] = useState(0);
  function incrementWorkout() {
    if(atExercise===workoutLength) {
      setAtExercise(-1)
      setFinishedWorkout(true);
    } else {
      setAtExercise(atExercise + 1)
    }
  } // incrementWorkout
  let [finishedWorkout, setFinishedWorkout] = useState(false);

  let [atRound, setAtRound] = useState(-1);
  let [roundsLength, setRoundsLength] = useState(10);
  function incrementRound() {
    if(atRound===roundsLength) {
      setAtRound(0)
    } else {
      setAtRound(atRound + 1)
    }
  } // incrementRound

  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    console.log("Changed file viewer")
    const newRelativePath= window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length);
    setRelativePath(newRelativePath)

  },[useLocation().pathname])

  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    if(relativePath.length===0) return;

    const uriBeforeViewPath = window.location.href.substr(0,window.location.href.indexOf("/view")+1);
    const constructedRequestURI = uriBeforeViewPath + "data/notebooks/" + relativePath;
    console.log({relativePath, uriBeforeViewPath, constructedRequestURI})

    fetch(constructedRequestURI).then(response=>response.text()).then(data=>{
      console.log({constructedRequestURI})
      console.log({data:data.split(/---/gm)})

      /**
       * Video
       * Detail
       * Duration
       * Sets
       */

      let groups = data.split(/---/gm);
      setWorkoutLength(groups.length);
      groups = groups.map((group,i)=>{
        group = group.trim(); // removes newlines before and after
        console.log(group);
        let lines = group.split("\n")
        let types = lines.map((line,j)=>{
          let key = ["el",i,j].join("-");
          let data = line.split(" ");
          data.shift(0,1); // Mutable

          if(j===0) {
            return (<summary key={key}>{line}</summary>)
          } else if(line.length<2) {
            return "";
          } else if(line.indexOf("VIDEO ")===0 || line.indexOf("VID ")===0) {
            return (<Video key={key} data={data}/>)
          } else if(line.indexOf("PICTURE ")===0 || line.indexOf("PIC ")===0) {
            return (<Picture key={key} data={data}/>)
          } else if(line.indexOf("DETAIL ")===0 || line.indexOf("DET ")===0) {
            return (<Detail key={key} data={data}/>)
          } else if(line.indexOf("INTERVAL ")===0 || line.indexOf("INT ")===0) {
            return (<Interval key={key} data={data}/>)
          } else if(line.indexOf("SET ")===0) {
            return (<Sets key={key} data={data}/>)
          }
          return (<div key={key}></div>)
        })
        return types;
      }) // map

      let expandables = groups.map((group,i)=>{ // group is an array of elements
        return (
          <details key={"ex-"+i} className="exercise" id={["exercise", i].join("-")} open={atExercise===i}>
            {group}
          </details>
        )

      })

      setHTML(expandables)
    })

  },[relativePath])

  useEffect(()=>{
    tickUp({playing, setElapsed, elapsed})
  }, [playing, elapsed])

  useEffect(()=>{
    tickUp({playing:playingMedia, setElapsed:setElapsedMedia, elapsed:elapsedMedia})
  }, [playingMedia, elapsedMedia])

    return (
      <div className="file-viewer">
        <div className="file-viewer-contents">
          {html}
        </div>
        <span id="play-mode">
          <div  onClick={()=>setPlayMode(!playing)}>
            <div className={["icon", "icon-play", !playing?"active":""].join(" ")}>⏯</div>
            <div className={["icon", "icon-pause", playing?"active":""].join(" ")}>⏸</div>
          </div>
          <div>{elapsed}</div>
          <div>playing {playing?"T":"F"}</div>
          <hr/>
          <div  onClick={()=>setPlayModeMedia(!playingMedia)}>
            <div className={["icon", "icon-play", !playingMedia?"active":""].join(" ")}>⏯</div>
            <div className={["icon", "icon-pause", playingMedia?"active":""].join(" ")}>⏸</div>
          </div>
          <div>{elapsedMedia}</div>
          <div>playing {playingMedia?"T":"F"}</div>
          <hr/>
          <div style={{cursor:"pointer"}} onClick={()=>{ incrementWorkout() }}>⏭</div>
          <div>atExercise {atExercise}</div>
          <div>workoutLength {workoutLength}</div>
          <div>finWO {finishedWorkout?"T":"F"}</div>
          <hr/>
          <div style={{cursor:"pointer"}} onClick={()=>{ incrementRound() }}>⏭</div>
          <div>atRound {atRound}</div>
        </span>
      </div>
    );
  }

export default FileViewer;
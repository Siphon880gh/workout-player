import "./FileViewer.css"
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {
  Video,
  Picture,
  Detail,
  Interval,
  Set,
  Spacing
} from "./FileViewer.Types.js";

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
  function preSetAtExercise(i, isOpened) {
    // Data wrangling
    if(isOpened===null) {
      isOpened = false;
    } else {
      isOpened = true;
    }

    if(isOpened) { // was opened, now close
    } else { // new opened
      setAtExercise(i);
      // Jump to
      document.querySelector("html,body").scrollTo(0,document.querySelector(`#exercise-${i}`).offsetTop, 1000, "easeInOutQuint")
    }
  } // preSetAtExercise
  let [workoutLength, setWorkoutLength] = useState(0);
  let [workoutLengths, setWorkoutLengths] = useState([]);

  function displayError(msg) {
    // TODO: Should appear on the website as a slide-in then slide-out, so immediately know format errors of the workout text file
    console.error(msg);
  }

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
    // console.log("Changed file viewer")
    const newRelativePath= window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length);
    setRelativePath(newRelativePath)

  },[useLocation().pathname])

  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    if(relativePath.length===0) return;

    const uriBeforeViewPath = window.location.href.substr(0,window.location.href.indexOf("/view")+1);
    const constructedRequestURI = uriBeforeViewPath + "data/notebooks/" + relativePath;
    // console.log({relativePath, uriBeforeViewPath, constructedRequestURI})

    fetch(constructedRequestURI).then(response=>response.text()).then(data=>{
      // console.log({constructedRequestURI})
      // console.log({data:data.split(/---/gm)})

      /**
       * Video
       * Detail
       * Duration
       * Sets
       */
      
      let groups = data.split(/---/gm);
      // setWorkoutLength(groups.length); // TODO:
      setWorkoutLengths([]);
      
      groups = groups.map((group,i)=>{
        group = group.trim(); // removes newlines before and after
        // console.log(group);
        // Only allow rep or set, but not both; Only allow one video.
        let specializeExercise = false;
        let specializeVideo = false;
        
        let lines = group.split("\n")
        console.log({testC: lines});

        let types = lines.map((line,j)=>{
          let key = ["el",i,j].join("-");
          let data = line.split(" ");
          data.shift(0,1); // Mutable

          if(j===0) {
            return (<summary key={key} onClick={(event)=>{preSetAtExercise(i, event.target.closest("details").getAttribute("open"))}}>{line}</summary>)
          } else if(line.length===0) {
            return (<Spacing key={key}></Spacing>)
          } else if(line.length<2) {
            return "";
          } else if(line.indexOf("VIDEO ")===0 || line.indexOf("VID ")===0) {
            if(specializeVideo===false) {
              specializeVideo = "YT"
            } else {
              displayError("Error: You are only allowed one video @ "+groups[0])
              return "";
            }
            return (<Video key={key} data={data}/>)
          } else if(line.indexOf("PICTURE ")===0 || line.indexOf("PIC ")===0) {
            return (<Picture key={key} data={data}/>)
          } else if(line.indexOf("DETAIL ")===0 || line.indexOf("DET ")===0) {
            return (<Detail key={key} data={data}/>)
          } else if(line.indexOf("INTERVAL ")===0 || line.indexOf("INT ")===0) {
            if(specializeExercise===false) {
              specializeExercise = "INTERVAL"
            } else if(specializeExercise!=="INTERVAL") {
              displayError("Error: You are only allowed one exercise type INTERVAL or SET per exercise @ "+groups[0])
              return "";
            }
            if(i>=workoutLengths.length) {
              console.log("Creating new workout lengths slot")
              workoutLengths.push(1)
              setWorkoutLengths(workoutLengths);
            } else {
              console.log("Updating top workout lengths slot")
              workoutLengths[i] = workoutLengths[i] + 1;
              setWorkoutLengths(workoutLengths);
            }
            return (<Interval key={key} data={data}/>)
          } else if(line.indexOf("SET ")===0) {
            if(specializeExercise===false) {
              specializeExercise = "SET"
            } else if(specializeExercise!=="SET") {
              displayError("Error: You are only allowed one exercise type INTERVAL or SET per exercise @ "+groups[0])
              return "";
            }
            if(i>=workoutLengths.length) {
              console.log("Creating new workout lengths slot")
              workoutLengths.push(1)
              setWorkoutLengths(workoutLengths);
            } else {
              console.log("Updating top workout lengths slot")
              workoutLengths[i] = workoutLengths[i] + 1;
              setWorkoutLengths(workoutLengths);
            }
            return (<Set key={key} data={data}/>)
          }
        })

        if(i>=workoutLengths.length) {
          workoutLengths.push(0)
        }
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
          <div onClick={()=>setPlayMode(!playing)}>
            <div className={["icon", "icon-play", !playing?"active":""].join(" ")}>⏯</div>
            <div className={["icon", "icon-pause", playing?"active":""].join(" ")}>⏸</div>
          </div>
          <div id="test-diagnostics" style={{backgroundColor:"gray", borderRadius:"5px", padding:"10px", marginTop:"10px", opacity:.95}}>
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
            <hr/>
            <div>woLens {workoutLengths.join(",")}</div>
          </div>
        </span>
      </div>
    );
  }

export default FileViewer;
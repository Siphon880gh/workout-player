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

  function displayError(msg) {
    // TODO: Should appear on the website as a slide-in then slide-out, so immediately know format errors of the workout text file
    console.error(msg);
  }

  // Changed route
  // let [relativePath, setRelativePath] = useState("");

  // Load text file into HTML
  let [html, setHTML] = useState("");

  // Counter when playing
  let [playing, setPlayMode] = useState(true); // Slide show play
  let [elapsed, setElapsed] = useState(-1);

  // Counter for youtube, etc
  let [playingMedia, setPlayModeMedia] = useState(false);
  let [elapsedMedia, setElapsedMedia] = useState(-1);

  let [atExercise, setAtExercise] = useState(0);
  function preSetAtExercise(i) {


      // Set exercise, reset rounds, reset video time position, etc
      setAtExercise(i);
      setWorkoutCount(workoutCounts[i]);
      setElapsedMedia(-1);
      setAtRound(0);
      setRoundsLength(-1);
      setFinishedWorkout(false);
  } // preSetAtExercise

  function incrementExercise() {
    if(atExercise===workoutCount) {
      setAtExercise(-1)
      setFinishedWorkout(true);

    } else {
      setAtExercise(atExercise + 1);

      if(playing) {
        // It automatically opens next exercise and jump there
        document.querySelector("html,body").scrollTo(0,document.querySelector(`#exercise-${atExercise + 1}`).offsetTop, 1000, "easeInOutQuint")
      }
    }
  } // incrementExercise

  let [workoutCount, setWorkoutCount] = useState(0);
  let [workoutCounts, setWorkoutCounts] = useState([]);

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


  // useEffect(()=>{

  //   // Decided against useParams hook so I don't have to code for every single level of /../../
  //   // console.log("Changed file viewer")
  //   const newRelativePath= window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length);
  //   setRelativePath(newRelativePath)

  // },[useLocation().pathname])

    // Decided against useParams hook so I don't have to code for every single level of /../../
    // if(relativePath.length===0) return;


    // let nameUrl = window.location.href
    // nameUrl = "data/notebooks/" + nameUrl.substr(nameUrl.indexOf("view")+5)
    let [txt,setTxt] = useState("");

    useEffect(()=>{
      
      setWorkoutCounts([]) // otherwise sometimes increment from before
      setWorkoutCount(0);
      setElapsedMedia(-1);
      setAtRound(0);
      setRoundsLength(-1);
      setFinishedWorkout(false);


      const uriBeforeViewPath = window.location.href.substr(0,window.location.href.indexOf("/view")+1);
      const constructedRequestURI = uriBeforeViewPath + "data/notebooks/" + window.location.href.substring(window.location.href.indexOf("/view/")+"/view/".length);;
      console.log({uriBeforeViewPath, constructedRequestURI})

      // let nameUrl = window.location.href
      // nameUrl = nameUrl.substring(0, nameUrl.indexOf("view")-1) + "/data/notesbooks/" + nameUrl.substring(nameUrl.indexOf("view") + "view".length+1)
      // console.table({nameUrl})
      
      fetch(constructedRequestURI).then(response=>response.text()).then(data=>{
      // fetch(nameUrl).then(response=>response.text()).then(data=>{
        // console.log({constructedRequestURI})
        // console.log({data:data.split(/---/gm)})
        if(!data.includes("<!DOCTYPE html>" && data.length)) {

          let groups = data.split(/---/gm);
          groups.forEach((group,i)=>{
            let specializeExercise = false;

            // First line if empty will be removed
            let lines = group.split("\n");
            while(lines.length && lines[0].length===0) {
              lines.shift();
            }
            
            lines.forEach((line, j)=>{


              if(line.indexOf("INTERVAL ")===0 || line.indexOf("INT ")===0) {
                if(specializeExercise===false) {
                  specializeExercise = "INTERVAL"
                } else if(specializeExercise!=="INTERVAL") {
                  return ""; // Don't count
                }
                // workoutCounts
                if(i>=workoutCounts.length) {
                  console.log("Creating new workout lengths slot")
                  workoutCounts.push(1)
                  setWorkoutCounts(workoutCounts);
                } else {
                  console.log("Updating top workout lengths slot")
                  workoutCounts[i] = workoutCounts[i] + 1;
                  setWorkoutCounts(workoutCounts);
                }
              } else if(line.indexOf("SET ")===0) {
                if(specializeExercise===false) {
                  specializeExercise = "SET"
                } else if(specializeExercise!=="SET") {
                  return ""; //  // Don't count
                }

                // workoutCounts
                if(i>=workoutCounts.length) {
                  console.log("Creating new workout lengths slot")
                  workoutCounts.push(1)
                  setWorkoutCounts(workoutCounts);
                } else {
                  console.log("Updating top workout lengths slot")
                  workoutCounts[i] = workoutCounts[i] + 1;
                  setWorkoutCounts(workoutCounts);
                }
              } // else if

            }); // line forEach

        }); // group forEach
        setTxt(data);
      } // if resource valid, then we parse
    }); // fetch

    },[]); // useEffect

    function TxtToComponents(props) {
      const {data} = props
      // debugger;
      let groups = data.split(/---/gm);
      console.log({groups})
      // setWorkoutCount(groups.length); // TODO:
      // debugger;

      function ProcessGroup(props) {
        let {group, i} = props;
        // console.log({group})
        // console.log(group);
        // Only allow rep or set, but not both; Only allow one video.
        let specializeExercise = false;
        let specializeVideo = false;
        
        let lines = group.split("\n");
        while(lines.length && lines[0].length===0) {
          lines.shift();
        }
        console.log(lines)
        // console.log({title:lines[0]})
        // console.log({testC: lines});

        let workCount = -1;

        let types = lines.map((line,j)=>{
          let key = ["el",i,j].join("-");
          let data = line.split(" ");
          data.shift(0,1); // Mutable

          if(j===0) {
            return (<summary key={key} onClick={()=>{preSetAtExercise(i)}}>{line}</summary>)
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
            return (<Interval key={key} data={data}/>)
          } else if(line.indexOf("SET ")===0) {
            if(specializeExercise===false) {
              specializeExercise = "SET"
            } else if(specializeExercise!=="SET") {
              displayError("Error: You are only allowed one exercise type INTERVAL or SET per exercise @ "+groups[0])
              return "";
            }

            workCount++
            return (<Set key={key} data={data} inspect={{workCount, atRound}} isActive={i===atExercise && workCount===atRound}/>)
          } // else if Set
        }) // lines map

        if(i>=workoutCounts.length) {
          workoutCounts.push(0)
        }
        return types;
      } // group


      let expandables = groups.map((group,i)=>{ // group is an array of elements
        return (
          <details key={"ex-"+i} className="exercise" id={["exercise", i].join("-")} open={atExercise===i}>
            <ProcessGroup group={group} i={i}/>
          </details>
        )

      });

      console.log({expandables})

      return expandables;

  } // TxtToComponents

  useEffect(()=>{
    tickUp({playing, setElapsed, elapsed})
  }, [playing, elapsed])

  useEffect(()=>{
    tickUp({playing:playingMedia, setElapsed:setElapsedMedia, elapsed:elapsedMedia})
  }, [playingMedia, elapsedMedia])


  // Test passed: Setting play mode to false pauses the countup
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setPlayMode(false);
  //   }, 5000)
  // }, [])
    
    return (
      <div className="file-viewer">
        <div className="file-viewer-contents">
          {txt.length?<TxtToComponents data={txt}/>:""}
        </div>
        <Diagnostics data={{
          playing,
          elapsed,
          elapsedMedia,
          atExercise,
          workoutCount,
          finishedWorkout,
          atRound,
          workoutCounts,
          setPlayMode,
          setPlayModeMedia,
          incrementExercise,
          incrementRound,
          playingMedia,
          setElapsed

        }}></Diagnostics>
      </div>
    );
  }

function Diagnostics(props) {
  let {
    playing,
    elapsed,
    elapsedMedia,
    atExercise,
    workoutCount,
    finishedWorkout,
    atRound,
    workoutCounts,
    setPlayMode,
    setPlayModeMedia,
    incrementExercise,
    incrementRound,
    playingMedia,
    setElapsed
  } = props.data;

  
  return (
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
      <div style={{cursor:"pointer"}} onClick={()=>{ incrementExercise() }}>⏭</div>
      <div>atExercise {atExercise}</div>
      <div>workoutCount {workoutCount}</div>
      <div>finWO {finishedWorkout?"T":"F"}</div>
      <hr/>
      <div style={{cursor:"pointer"}} onClick={()=>{ incrementRound() }}>⏭</div>
      <div>atRound {atRound}</div>
      <hr/>
      <div>woCounts {workoutCounts.join(",")}</div>
    </div>
  </span>
  )
}

export default FileViewer;
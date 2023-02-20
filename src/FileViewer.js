import "./FileViewer.css"
import {useState, useEffect} from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {useLocation} from "react-router-dom";
import {
  Video,
  Picture,
  Detail,
  Interval,
  Set,
  Spacing
} from "./FileViewer.Types.js";
import {parseWorkoutData} from "./FileViewer.Utils.js";

// import {tickUp, reset} from "./FileViewer.Timer.js";
// import ReactTestUtils from 'react-dom/test-utils'; // ES6


const queryClient = new QueryClient()

const fetchWorkout = async () => {
  const uriBeforeViewPath = window.location.href.substring(0,window.location.href.indexOf("/view")+1);
  const constructedRequestURI = uriBeforeViewPath + "data/notebooks/" + window.location.href.substring(window.location.href.indexOf("/view/")+"/view/".length);

  const res = await fetch(constructedRequestURI);
  const text = await res.text();
  const dataWrangled = parseWorkoutData(text)
  // console.log({dataWrangled})
  console.log("FETCHED")
  return dataWrangled;
};


function Workout() {

  const { data:workout, status, error } = useQuery("workoutQuery", fetchWorkout);

  String.prototype.toTitleCase = function() {
    let newPhrase = this.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ");
    console.log({newPhrase})
    return newPhrase
  }

  function eachExercise(exercises) {
    exercises.map((exercise,i)=>{
      return [<div>exercise.name</div>];
    })
  }

  return (<div>
    {error && (error)}
    {!error && workout?.workoutName && (

      <>
        <h1>Workout: {workout.workoutName.toTitleCase()}</h1>
        {workout.exercises.map((exercise,i)=>{
          return (
            <details key={i}>
              <summary>{exercise.name}</summary>
            </details>
          )
        })}
      </>


    )}


  </div>)
} // Workout

function FileViewer(props) {

  // Load text file into HTML
  // let [html, setHTML] = useState("");

  // // Counter when playing
  // let [playing, setPlayMode] = useState(true); // Slide show play
  // let [elapsed, setElapsed] = useState(-1);

  // // Counter for youtube, etc
  // // let [playingMedia, setPlayModeMedia] = useState(false);
  // // let [elapsedMedia, setElapsedMedia] = useState(-1);

  // let [atExercise, setAtExercise] = useState(0);
  // function preSetAtExercise(i) {


  //     // Set exercise, reset rounds, reset video time position, etc
  //     setAtExercise(i);
  //     setWorkoutCount(workoutData.exercises[i]);
  //     // setElapsedMedia(-1);
  //     setAtRound(0);
  //     setRoundsLength(-1);
  //     setFinishedWorkout(false);
  // } // preSetAtExercise

  // function incrementExercise() {
  //   if(atExercise===workoutCount) {
  //     setAtExercise(-1)
  //     setFinishedWorkout(true);

  //   } else {
  //     setAtExercise(atExercise + 1);

  //     // if(playing) {
  //     //   // It automatically opens next exercise and jump there
  //     //   document.querySelector("html,body").scrollTo(0,document.querySelector(`#exercise-${atExercise + 1}`).offsetTop, 1000, "easeInOutQuint")
  //     // }
  //   }
  // } // incrementExercise

  // let [workoutCount, setWorkoutCount] = useState(0);
  // let [workoutData, setWorkoutData] = useState({exercises:[]});

  // let [finishedWorkout, setFinishedWorkout] = useState(false);

  // let [atRound, setAtRound] = useState(-1);
  // let [roundsLength, setRoundsLength] = useState(10);
  // function incrementRound() {
  //   if(atRound===roundsLength) {
  //     setAtRound(0)
  //   } else {
  //     setAtRound(atRound + 1)
  //   }
  // } // incrementRound

  //   let [txt,setTxt] = useState("");

  //   useEffect(()=>{
      
  //     setWorkoutData({exercises:[]}) // otherwise sometimes increment from before
  //     setWorkoutCount(0);
  //     // setElapsedMedia(-1);
  //     setAtRound(0);
  //     setRoundsLength(-1);
  //     setFinishedWorkout(false);




      // Workaround: it's still running twice occasionally
      // if(window.lastRequest===constructedRequestURI)
      //   return;

      //   console.log({a:window.lastRequest,b:constructedRequestURI})



    // return ()=>{

    //   // window.lastRequest = null;;
    //   // setWorkoutRounds([]);
    // }


    // },[]); // useEffect


  // useEffect(()=>{
  //   tickUp({playing, setElapsed, elapsed})
  // }, [playing, elapsed])

  // useEffect(()=>{
  //   tickUp({playing:playingMedia, setElapsed:setElapsedMedia, elapsed:elapsedMedia})
  // }, [playingMedia, elapsedMedia])


  // useEffect(()=>{

  //   if(!window.ran) {
  //     window.ran = true;
  //     window.playInRound = true;
  //   timer.current.si = setInterval(()=>{
  //     if(window.playInRound) {
  //       timer.current.count++;
  //       document.getElementById("dangerous-html").innerHTML = timer.current.count;
  //     }
  //     // console.log(timer.current.count);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer.current.s);
  //   };
  // }
  // }, []);

  // let [elapsedTest, setElapsedTest] = useState(0);

  // useEffect(()=>{

  //       setTimeout(()=>{
  //         setElapsedTest(elapsedTest+1);
  //       }, 1000)
  // }, [elapsedTest])

  // let elapsedTestMemo = useMemo(() => elapsedTest, [elapsedTest]);
    
    return (
      <div className="file-viewer">
        <div className="file-viewer-contents">
          <QueryClientProvider client={queryClient}>
                <Workout/>    
          </QueryClientProvider>
        </div>
        {/* <Diagnostics data={{
          playing,
          elapsed,
          elapsedMedia,
          atExercise,
          workoutCount,
          finishedWorkout,
          atRound,
          workoutData,
          setPlayMode,
          setPlayModeMedia,
          incrementExercise,
          incrementRound,
          playingMedia,
          setElapsed,
          elapsedTestMemo

        }}></Diagnostics> */}
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
    workoutData,
    setPlayMode,
    setPlayModeMedia,
    incrementExercise,
    incrementRound,
    playingMedia,
    setElapsed,
    elapsedTestMemo
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
      <div>woCounts {workoutData.exercises.join(",")}</div>
      <hr/>
      <div id="dangerous-html" dangerouslySetInnerHTML={{__html: ''}}></div>
      <hr/>
      <div id="test-memo">Test: {elapsedTestMemo}</div>
    </div>
  </span>
  )
}

export default FileViewer;
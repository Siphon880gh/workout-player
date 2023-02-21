import "./FileViewer.css"
import {useState, useEffect} from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {useLocation} from "react-router-dom";
import {
  Video,
  Picture,
  Instruction,
  Interval,
  Set,
  Spacing
} from "./FileViewer.Types.js";
import {parseWorkoutData} from "./FileViewer.Utils.js";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

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

function workoutReducer(state = { activeExercise: 0, activeRound:0 }, action) {
  switch (action.type) {
    case 'exercise/incremented':
      let {exercises} = action.payload;
          if(state.activeExercise===-1)
            return { // // if played all exercises already, it won't restart automatically
              activeExercise: -1,
              activeRound: -1
            }
          else if((state.activeExercise + 1) !== exercises.length)
            return { // increment exercise, restart current round to 0
              activeExercise: state.activeExercise + 1,
              activeRound: 0
            }
          else
            return {  // if just played all exercises already
              activeExercise: -1,
              activeRound: -1
            }
    case 'round/incremented':
      const [roundNum, roundTotal] = action.payload;
      return { 
        ...state,

        activeRound: (()=>{
          if(state.activeRound===-1)
            return -1; // if played all rounds already, it won't restart automatically
          else if((state.activeRound + 1) !== roundTotal)
            return state.activeRound + 1; // increment exercise
          else
            return -1; // if just played all rounds already
        })()
    }
    default:
      return state
  }
}

let store = configureStore({ reducer: workoutReducer })
store.subscribe(() => {
  console.log(store.getState())
})

let ConnectedExercise= connect((state, ownProps)=>{
  return {
    activeExercise: state.activeExercise,
    ...ownProps
  }
})(Exercise);

let ConnectedSet = connect((state, ownProps)=>{
  return {
    ...state,
    ...ownProps
  }
})(Set);

let ConnectedInterval = connect((state, ownProps)=>{
  return {
    ...state,
    ...ownProps
  }
})(Interval);

function Exercise({exercise,i, activeExercise}) {
  return (
    <details key={["exercise", i].join("-")} className="exercise" open={activeExercise===i}>
      <summary>{exercise.name}</summary>
      
      {/* Pictures */}
      {exercise.pictures.map((picture,j)=>{
        return <Picture key={["info-pic", j].join("-")} data={picture}/>
      })}

      {/* Instruction */}
      {exercise.instructions.map((instruction,j)=>{
        return <Instruction key={["info-instruction", j].join("-")} data={instruction}/>
      })}
      {
        (()=>{
          let done = false;
          if(exercise.roundType==="SETS") {
            return exercise.sets.map((set,roundNum)=>{
              let props = {
                store,
                done,
                exerciseNum: i,
                roundNum,
                roundTotal: exercise.sets.length
              }
              return (<ConnectedSet key={["round-set", roundNum].join("-")} {...props}/>)
            })
          } else if(exercise.roundType==="INTERVALS") {
            return exercise.intervals.map((interval,roundNum)=>{
              let props = {
                store,
                done,
                exerciseNum: i,
                roundNum,
                roundTotal: exercise.intervals.length
              }
              return (<ConnectedInterval key={["round-interval", roundNum].join("-")} {...props}/>)
            })
          }
        })()
      }
    </details>)
}

function Workout() {

  const { data:workout, status, error } = useQuery("workoutQuery", fetchWorkout);

  return (<div>
    {error && (error)}
    {!error && workout?.workoutName && (

      <>
        <h1 id="workout-title">Workout: {workout.workoutName.toTitleCase()}</h1>

        {/* <button onClick={()=> { 
          store.dispatch({type: 'exercise/incremented', payload:{exercises:workout.exercises}})
         }} style={{marginBottom:"20px"}}>Test dispatch by incrementing exercise</button> */}

        {workout.exercises.map((exercise,i)=>{
          
          return (
            <ConnectedExercise {...{exercise,i}}></ConnectedExercise>
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
            <Provider store={store}>
                <Workout/>    
            </Provider>
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
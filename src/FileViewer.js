import "./FileViewer.css"
import {useEffect} from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  FbReel,
  MiscVideo,
  YoutubeShort,
  YoutubeVid,
  Picture,
  Instruction,
  Interval,
  Set
} from "./FileViewer.Types.js";
import {parseWorkoutData} from "./FileViewer.Utils.js";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import {useLocation} from "react-router-dom";

const queryClient = new QueryClient()

const fetchAndParseWorkout = async () => {
  const uriBeforeViewPath = window.location.href.substring(0,window.location.href.indexOf("/view")+1);
  const constructedRequestURI = uriBeforeViewPath + "data/notebooks/" + window.location.href.substring(window.location.href.indexOf("/view/")+"/view/".length);

  const res = await fetch(constructedRequestURI);
  const text = await res.text();
  let dataWrangled = {};

  // WORKOUT: Catch when a file cannot load and tell user to update the Navigation Panel by running the command. 
  // When fetch fails to find a .txt file, by default it fetches the index.html 
  // So the workaround is to look for the title line of index.html
  if(text.includes("<title>Workout Notebook</title>")) {
    dataWrangled = {
      exercises: [],
      workoutDescs: [
        "You probably deleted or renamed the file but have not updated the app's Navigation Panel.",
        "Currently you must run `npm run start` whenever you change the file structure of public/data/notebooks."
      ],
      workoutName: "ERROR"
    }
  } else {
    dataWrangled = parseWorkoutData(text)
  }

  // console.log({constructedRequestURI})
  // console.log({res})
  // console.log({text})
  // console.log({dataWrangled})
  // console.log("FETCHED")
  return dataWrangled;
};

function workoutReducer(
  state = { activeExercise: 0, activeRound:0, repsDone: false }, 
  action) {

  switch (action.type) {
    case 'workout/reinit':
      return { // f played all exercises already, it won't restart automatically
        ...state,
        activeExercise: 0,
        activeRound: 0,
        repsDone: false
      }
    case 'exercise/incremented':
      let {exercises} = action.payload;

      if(state.activeExercise===-1) {
        return { // f played all exercises already, it won't restart automatically
          ...state,
          activeExercise: -1,
          activeRound: -1
        }
      } else if((state.activeExercise + 1) !== exercises.length) {
          // increment exercise, restart current round to 0
        window.jumpToElementById(`exercise-${state.activeExercise + 1}`)
        return {
          ...state,
          activeExercise: state.activeExercise + 1,
          activeRound: 0,
          repsDone: false
        }
      } else {
        window.jumpToElementById("workout-finished");
        return {  // if just played all exercises already
          ...state,
          activeExercise: -1,
          activeRound: -1
        }
      }
    case 'round/reps-done/start-rest': 
      return {
        ...state,
        repsDone: true
      }
    case 'interval/countdown/start':
      var {ready,active,rest} = action.payload;

  // eslint-disable-next-line no-redeclare
      return {
        ...state,
        countdownStart:(()=>{
          if(ready!==-1) return ready;
          else if(active!==-1) return active;
          else if(rest!==-1) return rest;
        })(), 
        countdownType:(()=>{
          if(ready!==-1) return "ready";
          else if(active!==-1) return "active";
          else if(rest!==-1) return "rest";
        })()
      }
    case 'interval/countdown/next':
      // eslint-disable-next-line no-unused-vars
      var {roundNum, roundTotal, exerciseNum, exerciseTotal, roundDetails, countdownType, workoutRx} = action.payload;
      var {activeRound, activeExercise} = state;

      function getNextCountdown__countdownType__countdownStart(roundDetails, countdownType) {
        var [ready,active,rest] = [-1,-1,-1];
        try {
            var arr = roundDetails.split(" ").concat(["", "", ""]);
            ready = arr[0];
            active = arr[1];
            rest = arr[2];
        } catch {
            window.displayError("Error getting interval round details. Likely you have no set or interval round in an exercise!")
        }
        const castToSeconds = window.intuitiveDuration__getSeconds_cm;
        ready = castToSeconds(ready)
        active = castToSeconds(active)
        rest = castToSeconds(rest)

        var countdownStart = -1;

        if(countdownType===-1) {
          if(ready!==-1) {
            countdownType = "ready";
            countdownStart = ready;
          } else if(active!==-1) {
            countdownType = "active";
            countdownStart = active;
          } else if(rest!==-1) {
            countdownType = "rest";
            countdownStart = rest;
          } else {
            countdownType = -1;
          }
        } else if(countdownType==="ready") {
          if(active!==-1) {
            countdownType = "active";
            countdownStart = active;
          } else if(rest!==-1) {
            countdownType = "rest";
            countdownStart = rest;
          } else {
            countdownType = -1;
          }
        } else if(countdownType==="active") {
          if(rest!==-1) {
            countdownType = "rest";
            countdownStart = rest;
          } else {
            countdownType = -1;
          }
        } else if(countdownType==="rest") {
            countdownType = -1;
        }
        return {
          countdownType,
          countdownStart
        }
      } // getNextCountdown

      // eslint-disable-next-line no-redeclare
      var {countdownType, countdownStart} = getNextCountdown__countdownType__countdownStart(roundDetails, countdownType)

      if(countdownType!==-1) {
        console.log("FROM countdownType!==-1")
        return {
          ...state,
          countdownStart,
          countdownType
        }
      } else if(countdownType===-1) {
          if(activeRound+1!==roundTotal) {
              console.log("FROM activeRound+1!==roundTotal")
              activeRound++;
          } else {
            if(activeExercise+1!==exerciseTotal) {
              console.log("FROM activeExercise+1!==exerciseTotal")
              activeRound = 0;
              activeExercise++;
            } else if(activeExercise+1===exerciseTotal) { // End of all exercises and rounds
              activeRound = -1;
              activeExercise = -1;
              return {
                ...state,
                activeRound:-1,
                activeExercise:-1,
                countdownStart:-1,
                countdownType:-1
              }
            }
          }

        if(activeExercise===-1) { // Another way: End of all exercises and rounds
          return {
            ...state,
            activeRound:-1,
            activeExercise:-1,
            countdownStart:-1,
            countdownType:-1
          }
        }
        let newExercise = workoutRx.exercises[activeExercise];
        let newRoundType = newExercise.roundType;
        let newRoundDetails = newRoundType==="SETS"?newExercise.sets[activeRound]:newExercise.intervals[activeRound];

        // eslint-disable-next-line no-redeclare
        var {countdownType, countdownStart} = getNextCountdown__countdownType__countdownStart(newRoundDetails, -1);

        return {
          ...state,
          activeRound,
          activeExercise,
          countdownStart,
          countdownType
        }

      } // rest countdown done so either we go to next round or next exercise's first round or workout is done

      break;
    case 'round/incremented':
      // eslint-disable-next-line no-redeclare, no-unused-vars
      var [roundNum, roundTotal, exerciseTotal] = action.payload;
      // console.log(action.payload)
      
      if(state.activeRound===-1) {
        // if played all rounds already, it won't restart automatically
        return state;
      } else if((state.activeRound + 1) !== roundTotal) {
        // increment round        
        return {
          ...state,
          activeRound: state.activeRound+1,
          repsDone: false,
        }
      } else if
      ((state.activeRound + 1) === roundTotal 
      && (state.activeExercise) !== -1 
      && (state.activeExercise + 1) !== exerciseTotal) {
        
        // if can advance to next exercise
        window.jumpToElementById(`exercise-${state.activeExercise+1}`)
        return {
          ...state,
          activeExercise: state.activeExercise+1,
          activeRound: 0,
          repsDone: false,
        }
      } else {
        // at the last exercise and last round
        window.jumpToElementById("workout-finished");
        return {
          ...state,
          activeExercise: -1,
          activeRound: -1
        }
      }
    default:
      return state
  } // switch
} // workoutReducer

window.store = configureStore({ reducer: workoutReducer }) // Window scope for testing purposes
let store = window.store; // Then React scope

// For testing purposes, will print to console when state changes
// store.subscribe(() => {
//   console.log("State changed: ");
//   console.log(store.getState())
// })

let ConnectedWorkout= connect((state, ownProps)=>{
  return {
    activeExercise: state.activeExercise,
    ...ownProps
  }
})(Workout);

let ConnectedExercise= connect((state, ownProps)=>{
  return {
    activeExercise: state.activeExercise,
    ...ownProps
  }
})(Exercise);

let ConnectedSet = connect((state, ownProps)=>{

  let workoutRx = ownProps.workoutRx;
  let roundDetails = workoutRx.exercises[ownProps.exerciseNum].sets[ownProps.roundNum];
  
  let repsRequired = -1;
  try {
    repsRequired = roundDetails.split(" ")[0]
    repsRequired = parseInt(repsRequired); // reformatted
  } catch {
    window.displayError("Error getting set round details. Likely you have no set or interval round in an exercise!")
  }

  let countdownType = "rest";
  let enums = { REST_PERIOD:1 } // 0th position is number of reps in a set round
  let countdownStart = roundDetails.split(" ")[enums.REST_PERIOD];
  const castToSeconds = window.intuitiveDuration__getSeconds_cm;
  countdownStart = castToSeconds(countdownStart); // reforamt

  return {
    ...state,
    repsRequired,
    countdownType,
    countdownStart,
    ...ownProps
  }
})(Set);

let ConnectedInterval = connect((state, ownProps)=>{

  let workoutRx = ownProps.workoutRx;
  let roundDetails = state.activeExercise!==-1?workoutRx.exercises[ownProps.exerciseNum].intervals[ownProps.roundNum]:"";

  return {
    ...state,

    roundDetails,

    ...ownProps
  }
})(Interval);

function Exercise({exercise, exerciseTotal, i, activeExercise, workoutRx}) {
  return (
      <details id={["exercise", i].join("-")} className="exercise" open={activeExercise===i}>
        <summary><h3>{exercise.name}</h3></summary>
        
        {/* Facebook Reel's */}
        {exercise.fbreels.map((fbreel,j)=>{
          return <FbReel key={["info-fb-reel", i, j].join("-")} data={Object.assign(fbreel, {i, j})}/>
        })}
        
        {/* Youtube Vid's */}
        {exercise.youtubevids.map((youtubevid,j)=>{
          return <YoutubeVid key={["info-youtube", i, j].join("-")} data={Object.assign(youtubevid, {i, j})}/>
        })}

        {/* Youtube Shorts's */}
        {exercise.youtubeshorts.map((youtubeshort,j)=>{
          return <YoutubeShort key={["info-youtube", i, j].join("-")} data={Object.assign(youtubeshort, {i, j})}/>
        })}

        {/* Misc Videos: Instagram, Tiktok, FB reel, Vimeo, etc */}
        {exercise.miscvideos.map((miscvideo,j)=>{
          return <MiscVideo key={["info-misc-video", i, j].join("-")} data={Object.assign(miscvideo, {i, j})}/>
        })}
        

        {/* Pictures */}
        {exercise.pictures.map((picture,j)=>{
          return <Picture key={["info-pic", i,  j].join("-")} data={picture}/>
        })}

        {/* Instruction */}
        {exercise.instructions.map((instruction,j)=>{
          return <Instruction key={["info-instruction", i,  j].join("-")} data={instruction}/>
        })}
        {
          (()=>{
            if(exercise.roundType==="SETS") {
              return exercise.sets.map((set,roundNum)=>{
                let props = {
                  store,
                  workoutRx,
                  exerciseNum: i,
                  exerciseTotal,
                  roundNum,
                  roundTotal: exercise.sets.length
                }
                return (<ConnectedSet key={["round-set", i, roundNum].join("-")} {...props}/>)
              })
            } else if(exercise.roundType==="INTERVALS") {
              return exercise.intervals.map((interval,roundNum)=>{
                let props = {
                  store,
                  workoutRx,
                  exerciseNum: i,
                  exerciseTotal,
                  roundNum,
                  roundTotal: exercise.intervals.length
                }
                return (<ConnectedInterval key={["round-interval", i, roundNum].join("-")} {...props}/>)
              })
            }
          })()
        }
      </details>
    )
}

function Workout({activeExercise}) {

  function jumpToActiveWorkout() {
    if(!document.querySelector(".interval.active")) {
      let wantRestart = confirm("All exercises finished already. Restart workout?");
      if(wantRestart) {
        window.location.reload();
      }
    }
    document.querySelector(".interval.active")?.closest("details")?.scrollIntoView()
  }

  let location = useLocation();

  const { data:workoutRx, status, error } = useQuery(["workoutQuery", location], fetchAndParseWorkout);
  // console.log({workoutRx})

  useEffect(()=>{
    store.dispatch({type: 'workout/reinit'})
  }, [location])

  return (<div>
    {status && (status!=="success")}
    {error && (error)}
    {!error && workoutRx?.workoutName && (

      <>
        {/* Title */}
        <h2 id="workout-title">Workout: {decodeURI(workoutRx.workoutName.toTitleCase())}</h2>
        {
          workoutRx?.workoutDescs?.length?
          (<div id="workout-desc">{workoutRx?.workoutDescs?.map((workoutdesc,i)=>(<p key={["workoutdesc", i].join("-")}>{workoutdesc}</p>))}</div>):
          ([])
        }
        
        {/* Exercise Components */}
        {workoutRx.exercises.map((exercise,i, exercises)=>{
          return (
            <ConnectedExercise key={["exercise", i].join("-")} {...{workoutRx, exercise, exerciseTotal:exercises.length || 0, i}}></ConnectedExercise>
          )
        })}

        {/* Finished workout message */}
        <div id="workout-finished" style={{display:(activeExercise===-1)?"flex":"none"}}>Congrats! Workout Finished.</div>
        <span id="jump-to-active" onClick={()=>{jumpToActiveWorkout();}}>🎯</span>
      </>

    )}


  </div>)
} // Workout

function FileViewer(props) {

    return (
      <div className="file-viewer">
        <div className="file-viewer-contents">
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ConnectedWorkout/>    
            </Provider>
          </QueryClientProvider>
        </div>
      </div>
    );
  }

export default FileViewer;
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

      if(state.activeExercise===-1) {
        return { // // if played all exercises already, it won't restart automatically
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
          activeRound: 0
        }
      } else {
        window.jumpToElementById("workout-finished");
        return {  // if just played all exercises already
          ...state,
          activeExercise: -1,
          activeRound: -1
        }
      }
      break;
    case 'round/incremented':
        const [roundNum, roundTotal, exerciseTotal] = action.payload;
        console.log(action.payload)
        
        if(state.activeRound===-1) {
          // if played all rounds already, it won't restart automatically
          return state;
        } else if((state.activeRound + 1) !== roundTotal) {
          // increment round        
          return {
            ...state,
            activeRound: state.activeRound+1
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
        break;
    default:
      return state
  } // switch
} // workoutReducer

let store = configureStore({ reducer: workoutReducer })
store.subscribe(() => {
  console.log(store.getState())
})

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
  let roundDetails = workoutRx.exercises[state.activeExercise].sets[state.activeRound];
  
  let repsRequired = roundDetails.split(" ")[0]
  repsRequired = parseInt(repsRequired);

  let repsDone = false;


  return {
    ...state,
    repsRequired,
    repsDone: false,
    ...ownProps
  }
})(Set);

let ConnectedInterval = connect((state, ownProps)=>{
  return {
    ...state,
    ...ownProps
  }
})(Interval);

function Exercise({exercise, exerciseTotal, i, activeExercise, workoutRx}) {
  return (
      <details id={["exercise", i].join("-")} className="exercise" open={activeExercise===i}>
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
                  exerciseTotal,
                  roundNum,
                  roundTotal: exercise.sets.length,
                  workoutRx
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
                  roundTotal: exercise.intervals.length,
                  workoutRx
                }
                return (<ConnectedInterval key={["round-interval", roundNum].join("-")} {...props}/>)
              })
            }
          })()
        }
      </details>
    )
}

function Workout({activeExercise}) {

  const { data:workoutRx, status, error } = useQuery("workoutQuery", fetchWorkout);

  return (<div>
    {error && (error)}
    {!error && workoutRx?.workoutName && (

      <>
        {/* Title */}
        <h1 id="workout-title">Workout: {workoutRx.workoutName.toTitleCase()}</h1>

        {/* Test incrementing */}
        <button onClick={()=> { 
          store.dispatch({type: 'exercise/incremented', payload:{exercises:workoutRx.exercises}})
         }} style={{margin:"10px auto", display:"block"}}>Test incrementing exercise</button>
        <button onClick={()=> { // aa
          store.dispatch({type: 'round/incremented', payload:(()=>{
            let activeRound = store.getState().activeRound;
            let roundTotal = workoutRx?.exercises[store?.getState()?.activeExercise]?.roundTotal;
            let exerciseTotal = workoutRx.exercises.length;
            return [
              activeRound,
              roundTotal,
              exerciseTotal
            ]
          })() // dispatch round/incremented
          })
         }} 
         style={{margin:"10px auto", display:"block"}}>Test incrementing round</button>

        {/* Exercise Components */}
        {workoutRx.exercises.map((exercise,i, exercises)=>{
          return (
            <ConnectedExercise key={["exercise", i].join("-")} {...{workoutRx, exercise, exerciseTotal:exercises.length || 0, i}}></ConnectedExercise>
          )
        })}

        {/* Finished workout message */}
        <div id="workout-finished" style={{display:(activeExercise===-1)?"flex":"none"}}>Congrats! Workout Finished.</div>
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
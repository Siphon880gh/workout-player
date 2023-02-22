import {useState, useMemo, useEffect, componentWillUnmount, useRef, componentDidUpdate, shouldComponentUpdate, componentWillUpdate, componentShouldUpdate} from "react";

import "./FileViewer.Types.css";

function Video() {
    return (
        <div className="video">Video type</div>
    )
}

function Picture({data}) {
    data = data.split(" ");
    // console.log({data})
    
    let styleObject = {}
    
    let wantInLine = data[data.length-1] === "--";
    // console.log({wantInLine})
    // console.log({data})
    if(wantInLine) {
        styleObject.display = "inline-block";
    } else {
        styleObject.display = "block";
    }

    if(data.length>=3) {
            if(!data[2].toLowerCase().includes("n")) { // na, n/a, N/A, NA
            styleObject.maxHeight = data[2];
            styleObject.minHeight = data[2];
        }
    }
    if(data.length>=2) {
        if(!data[1].toLowerCase().includes("n")) { // na, n/a, N/A, NA
            styleObject.maxWidth = data[1];
            styleObject.minWidth = data[1];
        }
    }
    
    
    return (
        <img className="picture" src={data[0]} style={styleObject} alt={data[0]}></img>
    )
}

/* 
    Notice data is split at spaces for all types. Could make an exception for Detail,
    but because of time constraints, I sacrificed slight performance for developer experience.
    Future version can optimize.
*/
function Instruction({data}) {
    return (
        <p className="detail">{data}</p>
    )
}

function Interval(
    {
        store, 
        workoutRx,
        
        activeExercise, 
        exerciseTotal, 
        exerciseNum, 
        
        activeRound, 
        roundNum, // active round in the active exercise
        roundTotal, // total number of rounds in the exercise

        roundDetails, // all three countdowns of the interval round, eg. 5s 30s 15s for ready, active, and rest periods
        countdownType,
        countdownStart
    }) {

    let [countdownProgress, setCountdownProgress] = useState(-1)
    // let [rerender, setForceRerender] = useState(0)


    // Init countdowns
    useEffect(()=>{
        var [ready,active,rest] = roundDetails.split(" ");
        const castToSeconds = window.intuitiveDuration__getSeconds;
        ready = castToSeconds(ready)
        active = castToSeconds(active)
        rest = castToSeconds(rest)

        store.dispatch({type: 'interval/countdown/start', payload:{roundNum, roundTotal, exerciseTotal, ready, active, rest, countdownType, workoutRx}})
    }, []);

    function updateTimer() {
        if(activeExercise==-1) {
            return;
        }
        else if(activeExercise===exerciseNum && activeRound===roundNum && countdownProgress<countdownStart) {
            setTimeout(()=>{
                setCountdownProgress(countdownProgress+1);       
                if(countdownProgress+1===countdownStart) { // increment to next round
                    store.dispatch({type: 'interval/countdown/next', payload:{roundNum, roundTotal, exerciseNum, exerciseTotal, roundDetails, countdownType, workoutRx}})
                    setCountdownProgress(0);    
                } 
            }, 1000);
        }
    }
    useEffect(()=>{
        setCountdownProgress(0)
    }, [])
    useEffect(updateTimer, [countdownProgress]) // Doesn't run on initial so hence need the one above with [] dependencies

    return (
        <div className={["interval", activeExercise===exerciseNum && activeRound===roundNum?"active":""].join(" ")} style={{marginBottom:"10px"}}>
            {(activeExercise===exerciseNum && activeRound===roundNum)?
            (
                <>
                    <h3 className="interval-name">Interval {roundNum+1}:</h3>
                    <span className="interval-countdown interval-countdown-ready">
                        { (countdownType==="ready")?(countdownStart-countdownProgress)+"s":""}
                    </span>
                    <span className="interval-countdown interval-countdown-active">
                        { (countdownType==="active")?(countdownStart-countdownProgress)+"s":""}
                    </span>
                    <span className="interval-countdown interval-countdown-rest">
                        { (countdownType==="rest")?(countdownStart-countdownProgress)+"s":""}
                    </span>
                </>    
            )
            :(<></>)}

            {/* <div>
                re {rerender}
            </div> */}
        </div>
    )
} // Interval

function Set(
    {
        store, 
        workoutRx,
        
        activeExercise, 
        exerciseTotal, 
        exerciseNum, 
        
        activeRound, 
        roundNum, // active round in the active exercise
        roundTotal, // total number of rounds in the exercise

        repsRequired,
        repsDone,

        countdownType,
        countdownStart
    }) {

    let [countdownProgress, setCountdownProgress] = useState(0)

    useEffect(()=>{
        // console.log({repsDone, b:activeExercise===exerciseNum,c:activeRound===roundNum, d:countdownProgress<countdownStart})
        if(activeExercise==-1) {
            return;
        }
        else if(repsDone && activeExercise===exerciseNum && activeRound===roundNum && countdownProgress<countdownStart) {
            setTimeout(()=>{
                if(countdownProgress+1>=countdownStart) { // increment to next round
                    store.dispatch({type: 'round/incremented', payload:[roundNum, roundTotal, exerciseTotal]})
                    setCountdownProgress(0); 
                } 
                setCountdownProgress(countdownProgress+1);       
            }, 1000);
        }
    }, [repsDone, countdownProgress])

    return (
        <div className={["set", activeExercise===exerciseNum&&activeRound===roundNum?"active":""].join(" ")} style={{marginBottom:"10px"}}>
            <h3 className="set-name">Set {roundNum+1}:</h3>
            <button className="set-done" 
                style={{marginRight:"10px", display:repsDone?"none":"inline-block"}}
                onClick={()=> { 
                    // if(activeExercise===exerciseNum) {
                        // store.dispatch({type: 'round/incremented', payload:[roundNum, roundTotal, exerciseTotal]})
                    store.dispatch({type: 'round/reps-done/start-rest'})
                    // }
                }}
            >{repsRequired} {repsRequired===1?"Rep":"Reps"} Done</button>
            <span className="set-countdown">
                { (repsDone && countdownType==="rest")?(countdownStart-countdownProgress)+"s":""}
            </span>
        </div>
    )
} // Set

function Spacing() {
    return (
        <br></br>
    )
}



export {
    Video,
    Picture,
    Instruction,
    Interval,
    Set,
    Spacing
}
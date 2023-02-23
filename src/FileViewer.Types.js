import {useState, useMemo, useEffect, componentWillUnmount, useRef, componentDidUpdate, shouldComponentUpdate, componentWillUpdate, componentShouldUpdate} from "react";

import "./FileViewer.Types.css";

function Youtube({data}) {
    data = data.split(" ");
    if(data.length===1) {
        data = data.concat(["na", "na"]);
    } else if(data.length===2) {
        data = data.concat(["na"]);
    }
    {/* 
        Reference
        <iframe src="https://www.youtube.com/embed/lETF5JRgEN8?start=362&end=365" style="width:400px; height:200px"></iframe> 
        <iframe src="https://www.youtube.com/watch?v=" style="width:400px; height:200px"></iframe> 
        http://youtu.be/FdeioVndUhs
    */}
    let [url, start, end] = data;
    url = ((token)=>{
        if(token.includes("?v=")) {
            let leftDelimiter = "?v=";
            let rightDelimiter = "&";
            let fromStart = token.substr(token.indexOf(leftDelimiter) + leftDelimiter.length);
            if(fromStart.includes(rightDelimiter)) { // Could be end of line and no need to delimit right token
                fromStart = fromStart.substr(0, fromStart.indexOf(rightDelimiter));
            }
            token = fromStart;
        } else if(token.includes("embed/")) {
            let leftDelimiter = "embed/";
            let rightDelimiter = "?";
            let fromStart = token.substr(token.indexOf(leftDelimiter) + leftDelimiter.length);
            if(fromStart.includes(rightDelimiter)) { // Could be end of line and no need to delimit right token
                fromStart = fromStart.substr(0, fromStart.indexOf(rightDelimiter));
            }
            token = fromStart;
        } else if(token.includes("youtu.be/")) {

            let leftDelimiter = "youtu.be/";
            let rightDelimiter = "/";
            let fromStart = token.substr(token.indexOf(leftDelimiter) + leftDelimiter.length);
            if(fromStart.includes(rightDelimiter)) { // Could be end of line and no need to delimit right token
                fromStart = fromStart.substr(0, fromStart.indexOf(rightDelimiter));
            }
            token = fromStart;
        }
        return "https://www.youtube.com/embed/" + token;
    })(url)
    // console.log({dL:data.length});

    let hasStart = !start.includes("n");
    let hasEnd = !end.includes("n");
    const getSeconds = window.timemarks__getSeconds_cm;

    if(hasStart && !hasEnd) {
        url = url + "?start=" + getSeconds(start);
    } else if(hasStart && hasEnd) {
        url = url + "?start=" + getSeconds(start) + "&end=" + getSeconds(end);
    } else if(!hasStart && !hasEnd) {
    } else if(!hasStart && hasEnd) {
        url = url + "?end=" + getSeconds(end);
    }

    return (
        <div className="youtube">
            <iframe src={url} frameBorder="0"></iframe>
            <div className="loading-sprite">Loading Youtube...</div>
            {(!url.includes("start=") || !url.includes("end=")) && (<div className="clip-indicator"></div>)}
        </div>
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
    useEffect(updateTimer, [activeRound,countdownProgress]) // Doesn't run on initial so hence need the one above with [] dependencies

    return (
        <div className={["interval", activeExercise===exerciseNum && activeRound===roundNum?"active":""].join(" ")} style={{marginBottom:"10px"}}>
            <h4 className="interval-name">Interval {roundNum+1}{(activeExercise===exerciseNum && activeRound===roundNum)?":":""}</h4>
            {(activeExercise===exerciseNum && activeRound===roundNum)?
            (
                <>
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
            <h4 className="set-name">Set {roundNum+1}:</h4>
            <button className="set-done" 
                style={{marginRight:"10px", display:repsDone?"none":"inline-block"}}
                onClick={()=> { 
                    // if(activeExercise===exerciseNum) {
                        // store.dispatch({type: 'round/incremented', payload:[roundNum, roundTotal, exerciseTotal]})
                    store.dispatch({type: 'round/reps-done/start-rest'})
                    // }
                }}
            >DONE {repsRequired} {repsRequired===1?"Rep":"Reps"}</button>
            <span className="set-countdown">
                { (repsDone && countdownType==="rest")?(countdownStart-countdownProgress)+"s":""}
            </span>
        </div>
    )
} // Set


export {
    Youtube,
    Picture,
    Instruction,
    Interval,
    Set
}
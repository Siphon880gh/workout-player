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

function Interval() {
    return (
        <div className="interval">Interval type</div>
    )
}

function Set({activeExercise, activeRound, store, roundNum, roundTotal, exerciseNum, exerciseTotal, done}) {

    // let {workCount, atRound} = props.inspect;
    return (
        // <div workCount={workCount} atRound={atRound} className={["sets", props.isActive?"active":""].join(" ")}>Set type</div>
        <div className={["set", activeExercise===exerciseNum&&activeRound===roundNum?"active":""].join(" ")} style={{marginBottom:"10px"}}>
            <div className="set-name">Set {roundNum+1}:</div>
            {/* <button className="set-done" style={{marginRight:"10px", display:done?"none":"block"}} onClick={(event)=>{ props.setDone(true);}}>Done</button> */}
            <button className="set-done" 
                style={{marginRight:"10px", display:done?"none":"inline-block"}}
                onClick={()=> { 
                    if(activeExercise===exerciseNum) {
                        store.dispatch({type: 'round/incremented', payload:[roundNum, roundTotal, exerciseTotal]})
                    }
                }}
            >Done</button>
            <span className="set-countdown"></span>
        </div>
    )
}

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
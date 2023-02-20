import {useState, useMemo, useEffect, componentWillUnmount, useRef, componentDidUpdate, shouldComponentUpdate, componentWillUpdate, componentShouldUpdate} from "react";

import "./FileViewer.Types.css";

function Video() {
    return (
        <div className="video">Video type</div>
    )
}

function Picture({data}) {
    // console.log({data})
    let whObject = {}
    if(data.length>=2) {
        if(!data[1].toLowerCase().includes("n")) { // na, n/a, N/A, NA
            whObject.maxWidth = data[1];
            whObject.minWidth = data[1];
        }
    }

    if(data.length>=3) {
            if(!data[2].toLowerCase().includes("n")) { // na, n/a, N/A, NA
            whObject.maxHeight = data[2];
            whObject.minHeight = data[2];
        }
    }


    return (
        <div className="picture"><img src={data[0]} style={whObject} alt={data[0]}></img></div>
    )
}

/* 
    Notice data is split at spaces for all types. Could make an exception for Detail,
    but because of time constraints, I sacrificed slight performance for developer experience.
    Future version can optimize.
*/
function Detail({data}) {
    return (
        <p className="detail">{data.join(" ")}</p>
    )
}

function Interval() {
    return (
        <div className="duration">Duration type</div>
    )
}

function Set(props) {

    // let {workCount, atRound} = props.inspect;
    return (
        // <div workCount={workCount} atRound={atRound} className={["sets", props.isActive?"active":""].join(" ")}>Set type</div>
        <div className={["set", props.isActive?"active":""].join(" ")} style={{marginBottom:"10px"}}>
            <b className="set-name">Set {props.inspect.workCount+1}:</b>
            <button className="set-done" style={{marginRight:"10px", display:props.done?"none":"block"}} onClick={(event)=>{ props.setDone(true);}}>Done</button>
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
    Detail,
    Interval,
    Set,
    Spacing
}
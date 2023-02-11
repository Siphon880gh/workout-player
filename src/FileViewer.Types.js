
function Video() {
    return (
        <div className="video">Video type</div>
    )
}

function Picture({data}) {
    console.log({data})
    return (
        <div className="picture"><img src={data[0]}></img></div>
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

function Sets() {
    return (
        <div className="sets">Sets type</div>
    )
}


export {
    Video,
    Picture,
    Detail,
    Interval,
    Sets
}
import "./FileViewer.css"
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {
  Video,
  Detail,
  Duration,
  Sets} from "./FileViewer.Types.js"


function FileViewer(props) {

  // Changed route
  let [relativePath, setRelativePath] = useState("");

  // LOad text file into HTML
  let [html, setHTML] = useState("");

  // Counter when playing
  let [playing, setPlayMode] = useState(true);


  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    console.log("Changed file viewer")
    const newRelativePath= window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length);
    setRelativePath(newRelativePath)

  },[useLocation().pathname])

  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    if(relativePath.length===0) return;

    const uriBeforeViewPath = window.location.href.substr(0,window.location.href.indexOf("/view")+1);
    const constructedRequestURI = uriBeforeViewPath + "data/notebooks/" + relativePath;
    console.log({relativePath, uriBeforeViewPath, constructedRequestURI})

    fetch(constructedRequestURI).then(response=>response.text()).then(data=>{
      console.log({constructedRequestURI})
      console.log({data:data.split(/---/gm)})

      /**
       * Video
       * Detail
       * Duration
       * Sets
       */

      let groups = data.split(/---/gm);
      groups = groups.map((group,i)=>{
        group = group.trim(); // removes newlines before and after
        console.log(group);
        let lines = group.split("\n")
        let types = lines.map((line,j)=>{
          let key = ["el",i,j].join("-");
          if(j===0) {
            return (<summary key={key}>{line}</summary>)
          } else if(line.length<2) {
            return "";
          } else if(line.indexOf("AA ")===0) {
            return (<Video key={key}/>)
          } else if(line.indexOf("BB ")===0) {
            return (<Detail key={key}/>)
          } else if(line.indexOf("CC ")===0) {
            return (<Duration key={key}/>)
          } else if(line.indexOf("DD ")===0) {
            return (<Sets key={key}/>)
          } else if(line.indexOf("CC ")===0) {
            
          }
        })
        return types;
      })

      let expandables = groups.map((group,i)=>{ // group is an array of elements
        return (
          <details key={"ex-"+i}>
            {group}
          </details>
        )

      })

      setHTML(expandables)
    })

  },[relativePath])

    return (
      <div className="file-viewer">
        <div className="file-viewer-contents">
          {html}
        </div>
        <span id="play-mode" onClick={()=>setPlayMode(!playing)}>
          <div className={["icon", "icon-play", !playing?"active":""].join(" ")}>⏯</div>
          <div className={["icon", "icon-pause", playing?"active":""].join(" ")}>⏸</div>
        </span>
      </div>
    );
  }

export default FileViewer;
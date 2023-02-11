import "./FileViewer.css"
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {
  Video,
  Detail,
  Duration,
  Sets} from "./FileView.Types.js"


function FileViewer(props) {

  let [relativePath, setRelativePath] = useState("");
  let [html, setHTML] = useState("");


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
      groups = groups.map(group=>{
        group = group.trim(); // removes newlines before and after
        console.log(group);
        let lines = group.split("\n")
        let types = lines.map((line,i)=>{
          if(i===0) {
            return (<summary>{line}</summary>)
          } else if(line.length<2) {
            return "";
          } else if(line.indexOf("AA ")===0) {
            return (<Video/>)
          } else if(line.indexOf("BB ")===0) {
            return (<Detail/>)
          } else if(line.indexOf("CC ")===0) {
            return (<Duration/>)
          } else if(line.indexOf("DD ")===0) {
            return (<Sets/>)
          } else if(line.indexOf("CC ")===0) {
            
          }
        })
        return types;
      })

      let expandables = groups.map((group,i)=>{ // group is an array of elements
        return (
          <details key={"exercise-"+i}>
            {group}
          </details>
        )

      })

      setHTML(expandables)
    })

  },[relativePath])

    return (
      <div className="file-viewer">
        {html}
      </div>
    );
  }

export default FileViewer;
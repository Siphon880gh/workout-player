import "./FileViewer.css"
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
function FileViewer(props) {

  let [relativePath, setRelativePath] = useState("");


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

    fetch(constructedRequestURI).then(response=>response.text()).then(response=>{
      console.log({constructedRequestURI})
      console.log({response})
    })

  },[relativePath])

    return (
      <div className="file-viewer">
        <div>Relative path from URL: {relativePath}</div>
      </div>
    );
  }

export default FileViewer;
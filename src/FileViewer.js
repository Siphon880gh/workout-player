import "./FileViewer.css"
import {useState, useEffect} from "react";
function FileViewer(props) {

  let [relativePath, setRelativePath] = useState("");

  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    setRelativePath((()=>{
      return window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length)
    })())

  },[window.location.href])

    return (
      <div className="file-viewer">
        <div>Relative path from URL: {relativePath}</div>
      </div>
    );
  }

export default FileViewer;
import "./FileViewer.css"
import {useState, useEffect} from "react";

function FileViewer(props) {

  let [passed, setPassed] = useState("");
  let [relativePath, setRelativePath] = useState("");

  useEffect(()=>{
    if(props?.passed) {
      setPassed(props.passed)
    }

    setRelativePath((()=>{
      return window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length)
    })())
  })


    return (
      <div className="file-viewer">
        <div>Passed prop: {passed}</div>
        <div>Relative path from URL: {relativePath}</div>
      </div>
    );
  }

export default FileViewer;
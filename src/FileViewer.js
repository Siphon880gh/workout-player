import "./FileViewer.css"
import {useState, useEffect} from "react";

function FileViewer(props) {

  let [passed, setPassed] = useState("");

  useEffect(()=>{
    if(props?.passed) {
      setPassed(props.passed)
    }
  })


    return (
      <div className="file-viewer">{passed}</div>
    );
  }

export default FileViewer;
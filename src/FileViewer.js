import "./FileViewer.css"
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
function FileViewer(props) {

  let [relativePath, setRelativePath] = useState("");

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  }

  useEffect(()=>{

    // Decided against useParams hook so I don't have to code for every single level of /../../
    setRelativePath((()=>{
      console.log("Changed file viewer")
      return window.location.href.substr(window.location.href.indexOf("/view/")+"/view/".length)
    })())

  },[useLocation().pathname])

    return (
      <div className="file-viewer">
        <div>Relative path from URL: {relativePath}</div>
      </div>
    );
  }

export default FileViewer;
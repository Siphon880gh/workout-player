import "./FileNavigator.css"
import importedLis from "./data/paths.json";
import {useState, useEffect} from "react";

function FileNavigator() {
  let [lis, setLis] = useState([]);

  useEffect(()=>{
    setLis(importedLis);
  })


    return (
      <nav className="file-navigator">
        <ul id="tree-main">
          {
            lis.length>0?(
            lis.map((li,key)=>{
              
              const {
                id,
                className,
                parent,
                level,
                path,
                textContent} = li;

              return (
                <li key={key} id={id} className={className} parent={parent} level={level} path={path}><i className="icon"></i><span className="title">{textContent}</span></li>

              );
            })):""
          }
            {/* <li id="hash1" className="file" parent="tree-main" level="0" path="F1.md"><i className="icon"></i><span className="title">F1.md</span></li>
            <li id="hash2" className="file" parent="tree-main" level="0" path="F2.md"><i className="icon"></i><span className="title">F2.md</span></li>
            <li id="hash3" className="file" parent="tree-main" level="0" path="F3.md"><i className="icon"></i><span className="title">F3.md</span></li>
            <li id="hash4" className="dir" parent="tree-main" level="0" path="dir/"><i className="icon"></i><span className="title">Dir</span></li>
            <li id="hash4a" className="file" parent="hash4" level="1" path="dir/F1.md"><i className="icon"></i><span className="title">D1 F1.md</span></li>
            <li id="hash4b" className="file" parent="hash4" level="1" path="dir/F2"><i className="icon"></i><span className="title">D1 F2.md</span></li>
            <li id="hash4c" className="dir" parent="hash4" level="1" path="dir/dir2"><i className="icon"></i><span className="title">Dir</span></li>
            <li id="hash4c1" className="file" parent="hash4c" level="2" path="dir/dir2/F1"><i className="icon"></i><span className="title">D1 D2 F1.md</span></li>
            <li id="hash4c1" className="file" parent="hash4c" level="2" path="dir/dir2/F2"><i className="icon"></i><span className="title">D1 D2 F2.md</span></li>
            <li id="hash5" className="file" parent="tree-main" level="0" path="F4"><i className="icon"></i><span className="title">F4.md</span></li> */}
        </ul>
      </nav>
    );
  }

export default FileNavigator;
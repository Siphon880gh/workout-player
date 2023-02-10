import "./FileNavigator.css"
import importedLis from "./data/paths.json";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function FileNavigator() {
  let [lis, setLis] = useState([]);
  let [rerenderCode, setReeenderCode] = useState(Date.now());

  useEffect(()=>{
    importedLis = importedLis.map(li=>{ li.active=false; return li; });
    setLis(importedLis);
  }, [])

  function changeFolderStatus(i) {
    if(lis[i].className==="file") {
      return;
    }

    // Is directory
    let newLis = lis;
    let newStatus = !newLis[i].active;
    lis[i].active = newStatus;
    for(let j=i+1; j<lis.length; j++) {
      if(lis[j].className!=="file")
        break;
      newLis[j].active = newStatus;
    }

    setLis(newLis);
    setReeenderCode(Date.now()); // lis[i].active doesn't rerender component, so this is the other pattern that will make it happen
    // console.log(lis);
  }


    return (
      <nav className="file-navigator">
        <ul id="tree-main">
          {
            lis.length>0?(
            lis.map((li,i)=>{
              
              const {
                id,
                className,
                parent,
                level,
                path,
                textContent} = li;

              return (
                <Link key={i} to={"/view/"+path}><li id={id} rerendercode={rerenderCode} className={[className, lis[i].active?"active":""].join(" ")} parent={parent} level={level} path={path} onClick={()=>{ changeFolderStatus(i) }}><i className="icon"></i><span className="title">{textContent}</span></li></Link>

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
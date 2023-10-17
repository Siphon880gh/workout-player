import "./FileNavigator.css"
import importedLis from "./paths.json";
import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom"
import {passwordValid, premiumTokensRegEx} from "./Password.utils.js"

function FileNavigator({password}) {
  let [lis, setLis] = useState([]);
  let [rerenderCode, setReeenderCode] = useState(Date.now());

  useEffect(()=>{
    // Model will track expanded/collapsed
    importedLis = importedLis.map(li=>{ li.expanded=false; return li; });
    setLis(importedLis);
  }, [])

  function changeFolderStatus(i, fromElement) {
    const level = parseInt(fromElement.getAttribute("level"));

    // Validate is folder with contents to expand
    if(lis[i].className==="file") { // a file does not get expanded in a file navigator
      return;
    } else if(i+1>=importedLis.length || (lis[i+1].level !== level+1)) { // nothing to expand
      return;
    }

    let newLis = lis;
    let currentParent = lis[i].textContent;
    let currentNestedLevel = parseInt(lis[i].level)+1;

    // Toggle folder status
    let newStatus = !newLis[i+1].expanded;
    newLis[i].expanded = newStatus;

    // Toggle file statuses downward from clicked list item where applicable
    // TODO: Rewrite so is not O(n^2) worse case
    for(let j=i+1; j<lis.length; j++) {
      // if(lis[j].level!==level+1) // If the flattened node is no longer at the next level, we are done showing files/folders from expanding
      //   break;
      // ^ Have run until the last item of flattened tree to make multi-level nested subdirectories possible without interferring with the expansion
      
      // if file belongs the clicked folder and is of proper child level and is a file (because you can have nested folders), then expand:
      if(newLis[j].parent===currentParent && newLis[j].level === currentNestedLevel && newLis[j].className==="file")
        newLis[j].expanded = newStatus;
    }

    setLis(newLis);
    setReeenderCode(Date.now()); // lis[i].expanded doesn't rerender component, so this is the other pattern that will make it happen
    // console.log(lis);
  }

  // Hide / show premium workouts based on if correct password is entered
  // This check runs whenever the `password` state changes
  const [hiderAttributes, SetHiderAttributes] = useState({});
  useEffect(() => {
    if (password === passwordValid) {
      SetHiderAttributes({ 'data-hidden': 'false' });
    } else {
      SetHiderAttributes({ 'data-hidden': 'true' });
    }
  }, [password]);
  

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
                descendants,
                textContent} = li;

                // console.log({textContent})

              // Open first level. Remember is a flattened array and file-type li is either none or displayed by expanded property
              // console.log({className})
              // if(className==="file" && level===1) {
              //   lis[i].expanded = true;
              // }

                const mockRoute = (path) => {
                  // eslint-disable-next-line no-restricted-globals
                  event.preventDefault()
                  window.history.pushState({}, "", path);
                }

                // Hide folders/files that have (wip), etc in their name, if correct password not entered
                let regex = premiumTokensRegEx;
                let hider = {}
                
                if (regex.test(textContent)) {
                    hider = hiderAttributes
                }
                

              return (
                (className==="file")?
                  // (<a key={i} href="#" old-href={"/view/"+path} onClick={(event)=> { mockRoute("/view/"+path, event) }}>
                  (<NavLink key={i} to={"/view/"+path}>
                    <li id={id} 
                      rerendercode={rerenderCode} 
                      className={[className, lis[i].expanded?"expanded":""].join(" ")} 
                      parent={parent} level={level} path={path} descendants={descendants} 
                      onClick={(event)=>{ changeFolderStatus(i, event.target) }}
                      {...hider}
                    >
                    <span className="icon" 
                      onClick={(event)=>{ changeFolderStatus(i, event.target.parentElement) }}></span>
                    <span className="title"
                      onClick={(event)=>{ changeFolderStatus(i, event.target.parentElement) }}>{textContent}</span>
                    </li>
                  </NavLink>
                  ):(
                    <span key={i} className="no-link">
                      <li id={id} 
                        rerendercode={rerenderCode} 
                        className={[className, lis[i].expanded?"expanded":""].join(" ")} 
                        parent={parent} level={level} path={path} descendants={descendants} 
                        onClick={(event)=>{ changeFolderStatus(i, event.target) }}
                        {...hider}
                      >
                      <span className="icon" 
                        onClick={(event)=>{ changeFolderStatus(i, event.target.parentElement) }}></span>
                      <span className="title"
                        onClick={(event)=>{ changeFolderStatus(i, event.target.parentElement) }}>{textContent}</span>
                      </li>
                    </span>
                  )
              );
            })):""
          }
            {/*
            Reference:
            
            <li id="hash1" className="file" parent="tree-main" level="0" path="F1.md"><i className="icon"></i><span className="title">F1.md</span></li>
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
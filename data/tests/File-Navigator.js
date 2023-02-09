// Let's say tree is already scanned
const tree = {
  "name": "test",
  "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test",
  "relativePath": ".",
  "type": "directory",
  "isSymbolicLink": false,
  "isEmpty": false,
  "sizeInBytes": 0,
  "size": "0 B",
  "hash": "4b3a6ee3725045a561f6431516647490",
  "children": [
      {
          "name": ".gitignore",
          "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test/.gitignore",
          "relativePath": ".gitignore",
          "type": "file",
          "isSymbolicLink": false,
          "extension": "",
          "sizeInBytes": 0,
          "size": "0 B",
          "hash": "a084b794bc0759e7a6b77810e01874f2"
      },
      {
          "name": "backend",
          "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test/backend",
          "relativePath": "backend",
          "type": "directory",
          "isSymbolicLink": false,
          "isEmpty": false,
          "sizeInBytes": 0,
          "size": "0 B",
          "hash": "f35b0a849476e3d099aeae22a448512e",
          "children": [
              {
                  "name": "firebase.json",
                  "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test/backend/firebase.json",
                  "relativePath": "backend/firebase.json",
                  "type": "file",
                  "isSymbolicLink": false,
                  "extension": "json",
                  "sizeInBytes": 0,
                  "size": "0 B",
                  "hash": "dfd70b60f8469fdc3ee3b3935d64d130"
              },
              {
                  "name": "notes.txt",
                  "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test/backend/notes.txt",
                  "relativePath": "backend/notes.txt",
                  "type": "file",
                  "isSymbolicLink": false,
                  "extension": "txt",
                  "sizeInBytes": 0,
                  "size": "0 B",
                  "hash": "a5d5286f1e67b6cd6876223e53f999c4"
              },
              {
                  "name": "server",
                  "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test/backend/server",
                  "relativePath": "backend/server",
                  "type": "directory",
                  "isSymbolicLink": false,
                  "isEmpty": false,
                  "sizeInBytes": 0,
                  "size": "0 B",
                  "hash": "bf3efa035ad1e230b2ea39b501226c7e",
                  "children": [
                      {
                          "name": "server.js",
                          "path": "/Users/wff/dev/web/weng/tools/workout-notebooks/data/tests/test/backend/server/server.js",
                          "relativePath": "backend/server/server.js",
                          "type": "file",
                          "isSymbolicLink": false,
                          "extension": "js",
                          "sizeInBytes": 0,
                          "size": "0 B",
                          "hash": "78c12f5adc1848d13b1c6f07055d996e"
                      }
                  ]
              }
          ]
      }
  ]
}; // tree

function FileNavigator() {
    return (
      <nav className="file-navigator">
        <ul id="tree-main">
            <li id="hash1" className="file" parent="tree-main" level="0" path="F1.md"><i className="icon"></i><span className="title">F1.md</span></li>
            <li id="hash2" className="file" parent="tree-main" level="0" path="F2.md"><i className="icon"></i><span className="title">F2.md</span></li>
            <li id="hash3" className="file" parent="tree-main" level="0" path="F3.md"><i className="icon"></i><span className="title">F3.md</span></li>
            <li id="hash4" className="dir" parent="tree-main" level="0" path="dir/"><i className="icon"></i><span className="title">Dir</span></li>
            <li id="hash4a" className="file" parent="hash4" level="1" path="dir/F1.md"><i className="icon"></i><span className="title">D1 F1.md</span></li>
            <li id="hash4b" className="file" parent="hash4" level="1" path="dir/F2"><i className="icon"></i><span className="title">D1 F2.md</span></li>
            <li id="hash4c" className="dir" parent="hash4" level="1" path="dir/dir2"><i className="icon"></i><span className="title">Dir</span></li>
            <li id="hash4c1" className="file" parent="hash4c" level="2" path="dir/dir2/F1"><i className="icon"></i><span className="title">D1 D2 F1.md</span></li>
            <li id="hash4c1" className="file" parent="hash4c" level="2" path="dir/dir2/F2"><i className="icon"></i><span className="title">D1 D2 F2.md</span></li>
            <li id="hash5" className="file" parent="tree-main" level="0" path="F4"><i className="icon"></i><span className="title">F4.md</span></li>
        </ul>
      </nav>
    );
  }

  module.exports = FileNavigator;
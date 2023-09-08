const dree = require("dree");
const fs = require("fs");

const sampleFolderTree = "public/data/tests/test/";

/**
 * 
 * In production, update.js would recursely traverse through the "notebooks/" folder
 * Then create or update a paths.json
 * Then render the file explorer side panel of all folders/files of workout files off of paths.json
 * Again the workout files are MD files formatted a certain way with media files, instructions and whether it's reps or duration based.
 * 
 */

// Make sure .DS_Store's don't ruin the file structure integrity
(function setupGlobal() {
    if (fs.existsSync('.DS_Store')) {
        fs.unlinkSync(".DS_Store")
    }
    if (fs.existsSync('public/.DS_Store')) {
        fs.unlinkSync("public/.DS_Store")
    }
    if (fs.existsSync('public/data/.DS_Store')) {
        fs.unlinkSync('public/data/.DS_Store')
    }
    if (fs.existsSync('public/data/tests/.DS_Store')) {
        fs.unlinkSync('public/data/tests/.DS_Store')
    }
    if (fs.existsSync(sampleFolderTree+'.DS_Store')) {
        fs.unlinkSync(sampleFolderTree+'.DS_Store')
    }
    if (fs.existsSync(sampleFolderTree+'backend/.DS_Store')) {
        fs.unlinkSync(sampleFolderTree+'backend/.DS_Store')
    }
    if (fs.existsSync(sampleFolderTree+'backend/server/.DS_Store')) {
        fs.unlinkSync(sampleFolderTree+'backend/server/.DS_Store')
    }
})();

/** 
 * 
 * Reference
 * 
 * {
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
 * 
 * 
 * Reference
 * 
 * <li id="hash1" className="file" parent="tree-main" level="0" path="F1.md"><i className="icon"></i><span className="title">F1.md</span></li>
 * 
 * 
 */


describe("The dtree would recursively get transformed and flattened for rendering later", ()=>{

    let tree = {}
    beforeAll(()=>{
        tree = dree.scan(sampleFolderTree, {emptyDirectory:true, hash:true, descendants:true});
    })

    test("Simple transformation and flattening fits dree file structure", ()=>{
        let flattened = [];

        function recurse(arr, i, flattened) {
            // Current value is arr[i]
            // Beginning of array starts with -1 so can increment to 0
            i++;
            if(i>=arr.length) {
                return flattened; // Return final flattened[]
            } else if(arr[i]?.children?.length) {
                flattened.push("dir"); // Add to flattened[]
                return recurse(arr[i].children, -1, flattened) // This is FS directory node. Step into its children array.
            } else {
                flattened.push("file"); // Add to flattened[]
                return recurse(arr, i, flattened) // Step next
            }
    
        }
        let i = -1;
        console.log({tree});
        flattened = recurse([tree],i,[]); // At object representing FS directory node "/test". Step into its children array
        flattened.shift(0,1);
    
        console.log({flattened})
    
        expect(flattened.length).toEqual(6);
        expect(flattened).toEqual(["file","dir","file","file","dir","file"]);
    })

    test("Practical transformation and flattening fits dree file structure", ()=>{
        let flattened = [];

        function transform(object, level) {
            return {
                id: "hash-"+object?.hash, 
                className: object?.type==="directory"?"dir":"file",
                parent: object?.path?.match(/.*\/(.*)\/.*\w+/)[1],
                level: object?.relativePath?.split("/").length - 1,
                path: object?.relativePath,
                textContent: object?.name // actually filename from dree
            }
        }
        function recurse(arr, i, flattened) {
            // Current value is arr[i]
            // Beginning of array starts with -1 so can increment to 0
            i++;
            if(i>=arr.length) {
                return flattened; // Return final flattened[]
            } else if(arr[i]?.children?.length) {
                flattened.push(transform(arr[i])); // Add to flattened[]
                return recurse(arr[i].children, -1, flattened) // This is FS directory node. Step into its children array.
            } else {
                flattened.push(transform(arr[i])); // Add to flattened[]
                return recurse(arr, i, flattened) // Step next
            }
    
        }
        let i = -1;
        console.log({tree});
        flattened = recurse([tree],i,[]); // At object representing FS directory node "/test". Step into its children array
        flattened.shift(0,1);
    
        console.log({flattened})
    
        expect(flattened.length).toEqual(6);
        expect(flattened[0].className).toEqual("file");
        expect(flattened[1].className).toEqual("dir");
    })
});
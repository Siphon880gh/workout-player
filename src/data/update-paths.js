const dree = require("dree");
const fs = require("fs");

const notebooksFolder = "src/data/notebooks/";

let tree = {}
tree = dree.scan(notebooksFolder, {emptyDirectory:true, hash:true, descendants:true});

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
let recurseHelpers = {

    transform: function(object) {
        return {
            id: "hash-"+object?.hash, 
            className: object?.type==="directory"?"dir":"file",
            parent: object?.path?.match(/.*\/(.*)\/.*\w+/)[1],
            level: object?.relativePath?.split("/").length - 1,
            path: object?.relativePath,
            textContent: object?.name // actually filename from dree
        }
    },
    validate: function(filename) {
        let correctType = false;

        if(filename.substr(-3).toLowerCase()===".md") {
            correctType = true;
        } else if(filename.substr(-4).toLowerCase()===".txt") { 
            correctType = true;
        }
        return correctType;
    }
} // recurseHelpers

function recurse(tree) {

    tree.forEach((node)=>{
        if(node.name===".DS_Store") {
            fs.unlinkSync(node.path);
            return true; // next loop
        } else if(node.type==="directory") {
            const transformedNode = recurseHelpers.transform(node);
            flattened = flattened.concat(transformedNode);
            if(Array.isArray(node?.children)) // Empty folders don't have .children
                recurse(node.children)
        } else if(node.type==="file" && !recurseHelpers.validate(node.name)) { // filter out files that are not .md, .txt, etc
            return true; // next loop 
        } else if(node.type==="file") {
            const transformedNode = recurseHelpers.transform(node);
            flattened = flattened.concat(transformedNode);
        }

        // console.log({fType: node.type, fName: node.name})
    });

    return flattened;
}

flattened = recurse([tree]); // At object representing FS directory node "/test". Step into its children array
flattened.shift(0,1);
// console.log({treeString: JSON.stringify(flattened)});

fs.writeFile("./src/data/paths.json", JSON.stringify(flattened), "utf8", (err)=>{})
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
        // let transformed = transform(arr[i], ".", -1);
        flattened.push(transform(arr[i])); // Add to flattened[]
        return recurse(arr, i, flattened) // Step next
    }

}
let i = -1;
console.log({tree});
flattened = recurse([tree],i,[]); // At object representing FS directory node "/test". Step into its children array
flattened.shift(0,1);

fs.writeFile("./src/data/paths.json", JSON.stringify(flattened), "utf8", (err)=>{})

console.log({flattened})
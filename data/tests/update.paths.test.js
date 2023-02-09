const dree = require("dree");
const fs = require("fs");

const sampleFolderTree = "data/tests/test/";

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
    if (fs.existsSync('data/.DS_Store')) {
        fs.unlinkSync("data/.DS_Store")
    }
    if (fs.existsSync('data/tests/.DS_Store')) {
        fs.unlinkSync('data/tests/.DS_Store')
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

describe("Dtree with for-loop", ()=>{

    it("Should scan", function() {
        let tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
        console.log(JSON.stringify(tree))

        // Should expect 2 because it counts hidden files like .gitignore
        expect(tree.children.length).toEqual(2)

        // Should expect false because /backend folder is not empty
        expect(tree.children[1].isEmpty).toEqual(false)
    })


    describe("Folder hash changes", function() {
        let tree = dree.scan(sampleFolderTree, {emptyDirectory:true, hash:true})
        // console.log(tree)
        let hashA1 = "", hashA2 = "", hashB = "", hashC = "";
        
        it("Should NOT change the hash of the parent folder when scanned again", ()=>{
            hashA1 = tree.hash;
            tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
            hashA2 = tree.hash;
            expect(hashA1).toEqual(hashA2)
        })
        
        it("Should change the hash of parent folder when added a file", ()=>{
            // Does adding a file to the folder change the folder's hash?
            fs.writeFileSync(sampleFolderTree+"temp.tmp", "foo", "utf8", (err)=>{});
            expect(fs.existsSync(sampleFolderTree+'temp.tmp')).toEqual(true); // created where we expected
            tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
            hashB = tree.hash;
            expect(hashA2).not.toEqual(hashB)
            
        })
        
        it("Should change the hash of parent folder when removed a file", ()=>{
            if(fs.existsSync(sampleFolderTree+'temp.tmp'))
                fs.unlinkSync(sampleFolderTree+'temp.tmp')
            tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
            hashC = tree.hash;
            expect(hashB).not.toEqual(hashC)
        })
    }) // Folder hash changes

}); // For-loop

describe("The dtree would recursively get flattened", ()=>{

    const subject = [
        "a",
        "b",
        [1,2,"3",4,"5"]
    ]
    describe("Test data structure", function() {
        it("Should maintain element order after declaring nested mixed values", function() {
            expect(subject[0]).toEqual("a")
            expect(subject[2].length).toBeGreaterThan(0);
            expect(subject[2][0]).toEqual(1);
            expect(subject[2][2]).toEqual("3");
            expect(subject[2][4]).toEqual("5");
            // Test Jest is strict with types
            expect(1).not.toEqual("1")
        });
    })

    describe("Test flattening with recursion", function() {
        it("Should flatten the array", function() {
            let flattened = [];
            function recurse(arr, i, flattened) {
                // Current value is arr[i]
                // Beginning of array starts with -1 so can increment to 0

                i++;
                if(i>=arr.length) {
                    return flattened; // Return final flattened[]
                } else if(Array.isArray(arr[i])) {
                    return recurse(arr[i], -1, flattened) // Step into subarray
                } else {
                    flattened.push(arr[i]); // Add to flattened[]
                    return recurse(arr, i, flattened) // Step next
                }

            }
            let i = -1;
            flattened = recurse(subject,i,[]);

            
            // Test Jest is strict with types
            expect(1).toEqual(1)

            // Test length is as expected after flatenning
            expect(flattened.length).toEqual(7)
        });
    }); // Recursion flattening

});
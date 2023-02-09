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

describe("The dtree would recursively get transformed and flattened for rendering later", ()=>{
    let tree = dree.scan(sampleFolderTree, {emptyDirectory:true, hash:true})

    describe("Dummy", ()=>{
        it("Is a dummy pass", ()=>{
            expect(1).toBe(1)
        })
    })

});
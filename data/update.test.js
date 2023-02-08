const dree = require("dree");
const fs = require("fs");

(function preparation() {
    if (fs.existsSync('.DS_Store')) {
        fs.unlinkSync(".DS_Store")
    }
    if (fs.existsSync('data/.DS_Store')) {
        fs.unlinkSync("data/.DS_Store")
    }
    if (fs.existsSync('data/test/.DS_Store')) {
        fs.unlinkSync("data/test/.DS_Store")
    }
    if (fs.existsSync('data/test/backend/.DS_Store')) {
        fs.unlinkSync("data/test/backend/.DS_Store")
    }
    if (fs.existsSync('data/test/backend/server/.DS_Store')) {
        fs.unlinkSync("data/test/backend/server/.DS_Store")
    }
})();

describe("The dtree would be for-loop", ()=>{


    test("Basic scan", function() {
        let tree = dree.scan("data/test")
        console.log(tree)
        // Expect 2, when hidden files can be seen (.gitignore)
        expect(tree.children.length).toEqual(2)
    })

    test("Scan with empty directory state", function() {
        let tree = dree.scan("data/test", {emptyDirectory:true})
        console.log(tree)
        // If 2, then hidden files show too
        expect(tree.children[1].isEmpty).toEqual(false)
    })

});


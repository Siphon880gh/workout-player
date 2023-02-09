const dree = require("dree");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const react = require("react")
const reactDom = require("react-dom")

const sampleFolderTree = "data/tests/test/";

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
        console.log(tree)

        // Should expect 2 because it counts hidden files like .gitignore
        expect(tree.children.length).toEqual(2)

        // Should expect false because /backend folder is not empty
        expect(tree.children[1].isEmpty).toEqual(false)
    })


    describe("Folder hash changes", function() {
        let tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
        // console.log(tree)
        let hashA1 = "", hashA2 = "", hashB = "", hashC = "";
        
        it("Should scan without changing hash value", ()=>{
            hashA1 = tree.hash;
            tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
            hashA2 = tree.hash;
            expect(hashA1).toEqual(hashA2)
        })
        
        it("Should add a file and change the hash of parent folder", ()=>{
            // Does adding a file to the folder change the folder's hash?
            fs.writeFileSync(sampleFolderTree+"temp.tmp", "foo", "utf8", (err)=>{});
            expect(fs.existsSync(sampleFolderTree+'temp.tmp')).toEqual(true); // created where we expected
            tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
            hashB = tree.hash;
            expect(hashA2).not.toEqual(hashB)
            
        })
        
        it("Should remove a file and change the hash of parent folder", ()=>{
            if(fs.existsSync(sampleFolderTree+'temp.tmp'))
                fs.unlinkSync(sampleFolderTree+'temp.tmp')
            tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
            hashC = tree.hash;
            expect(hashB).not.toEqual(hashC)
        })
    }) // Folder hash changes

}); // For-loop

describe("The dtree would be recursive", ()=>{

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

    describe("The dtree would be transformed into HTML elements in vanilla javascript", ()=>{

        const jsdomNodes = new JSDOM('<ul id="main-tree"></ul>');
        let ulTreeEl = jsdomNodes.window.document.querySelector("#main-tree");
        let tree = dree.scan(sampleFolderTree, {emptyDirectory:true, hash:true})

        test("If JS DOM can get id", function() {
            expect(ulTreeEl.id).toEqual("main-tree");
        })
        test("If JS DOM can createElement, modify element properties, and append", function() {

            /*
                Reference:
                <li id="hash1" class="file" parent="tree-main" level="0" path="F1.md"><i class="icon"></i><span class="title">F1.md</span></li>
            */

            let li = jsdomNodes.window.document.createElement(`li`);
            li.classList.add("file"); // vs dir
            li.id = "hash" + tree.hash; // vs dir
            li.setAttribute("parent", "tree-main");
            li.setAttribute("level", "0");
            li.setAttribute("path", "F1.md");

            let i = jsdomNodes.window.document.createElement("i");
            i.classList.add("icon");

            let span = jsdomNodes.window.document.createElement("span");
            span.classList.add("title");
            span.textContent = "F1.md";

            li.append(i, span)

            ulTreeEl.append(li)
            console.log(ulTreeEl.outerHTML);

            expect(li).toBeInstanceOf(jsdomNodes.window.HTMLLIElement);
            expect(ulTreeEl.outerHTML).toContain("level=");
            expect(li.textContent).toEqual("F1.md");
        })

    });

});
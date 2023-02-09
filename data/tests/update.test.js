const dree = require("dree");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const react = require("react")
const reactDom = require("react-dom")

const sampleFolderTree = "data/tests/test";

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

describe("The dtree would be for-loop", ()=>{

    test("Basic scan", function() {
        let tree = dree.scan(sampleFolderTree)
        console.log(tree)
        // Expect 2, when hidden files can be seen (.gitignore)
        expect(tree.children.length).toEqual(2)
    })

    test("Scan with empty directory state", function() {
        let tree = dree.scan(sampleFolderTree, {emptyDirectory:true})
        console.log(tree)
        // If 2, then hidden files show too
        expect(tree.children[1].isEmpty).toEqual(false)
    })

}); // For-loop

describe("The dtree would be recursive", ()=>{

    const subject = [
        "a",
        "b",
        [1,2,"3",4,"5"]
    ]
    describe("Test values", function() {
        test("Element order is maintained in array that is nested with mixed values", function() {
            expect(subject[0]).toEqual("a")
            expect(subject[2].length).toBeGreaterThan(0);
            expect(subject[2][0]).toEqual(1);
            expect(subject[2][2]).toEqual("3");
            expect(subject[2][4]).toEqual("5");
            // Test Jest is strict with types
            expect(1).not.toEqual("1")
        });
    })

    describe("Recursion for flattening", function() {
        test("Flatten nested array", function() {
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

        test("Test JS DOM get id", function() {
            expect(ulTreeEl.id).toEqual("main-tree");
        })
        test("Test JS DOM createElement, modifying element properties, and appending", function() {

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
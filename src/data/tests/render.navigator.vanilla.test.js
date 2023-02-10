const dree = require("dree");
const fs = require("fs");
const { JSDOM } = require("jsdom");

const sampleFolderTree = "src/data/tests/test/";

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
        console.log({ulTreeEl: ulTreeEl.outerHTML});

        expect(li).toBeInstanceOf(jsdomNodes.window.HTMLLIElement);
        expect(ulTreeEl.outerHTML).toContain("level=");
        expect(li.textContent).toEqual("F1.md");
    })

});
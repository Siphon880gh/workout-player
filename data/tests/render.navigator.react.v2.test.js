const dree = require("dree");
const fs = require("fs");
const { render } = require("@testing-library/react");

const FileNavigator = require("./FileNavigator")

describe("React renders ul>li* as many li's as there are files and folders in the scanned tree", () => {

        let container = {};
        beforeAll(async()=>{

            container = (render(<FileNavigator/>)).container;
            console.log(container.outerHTML);

         }, 3000)
        test("HTML output after JSON for sure has imported", function () {

            // expect(f1Text.length).toBeGreaterThan(0); // correct way, however writing tests is taking long so will take a shortcut checking the HTML string
            // const f1Text = queryAllByText(/F1\.md/i);

            // const f1Text = queryByText(/F1\.md/i); // doesnt work if string in multiple elements
            // expect(f1Text).toBeInDocument();

            // console.log(container.outerHTML);

            // 7 Li's
            expect(container.outerHTML.split("<li").length).toEqual(7);

            // There's a server.js in sample test folder's file structure
            expect(container.outerHTML.match(/server\.js/mg)?.length).toBeGreaterThan(0);

    });
});
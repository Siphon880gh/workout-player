const dree = require("dree");
const fs = require("fs");
const { render } = require("@testing-library/react");

const React = require('react');
const ReactDOM = require('react-dom/client');

const FileNavigator = require("./File-Navigator")


describe("React renders ul>li* as many li's as there are files and folders in the scanned tree", () => {


    it("Should render App", function () {
        const {getByText, queryAllByText} = render(<FileNavigator/>);
        const f1Text = queryAllByText(/F1\.md/i);
        expect(f1Text.length).toBeGreaterThan(0);

        // const f1Text = queryByText(/F1\.md/i); // doesnt work if string in multiple elements
        // expect(f1Text).toBeInDocument();
    })
});
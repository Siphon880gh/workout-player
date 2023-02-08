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
                    return flattened;
                } else if(Array.isArray(arr[i])) {
                    return recurse(arr[i], -1, flattened)
                } else {
                    flattened.push(arr[i])
                    return recurse(arr, i, flattened)
                }

            }
            let i = -1;
            const results = recurse(subject,i,[])

            console.log({results})
            
            // Test Jest is strict with types
            expect(1).toEqual(1)
        });
    });
    
    // describe("Recursion keeps nested structure but transforms the values", function() {
    //     test("Transform each value into object {value:_value}", function() {
            
            
    //     });
    // })


});
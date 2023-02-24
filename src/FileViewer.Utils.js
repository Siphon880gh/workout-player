function parseWorkoutData(data) {

        let groups = data.split(/---/gm);
        let exercises = groups.map((group,i)=>{

            // Cleaning: Trim newlines before and after workout text
            while(group.length && group[0]==='\n') {
                group = group.substring(1)
            }
            while(group.length && group[group.length-1]==="\n") {
                group = group.substring(0, group.length-1)
            }
            let lines = group.split("\n");

            // Restructuring: Reference model for creating stores
            let name = lines.shift(0);
            
            let miscvideos = lines.filter(line=>line.indexOf("MISCVIDEO ")===0)
            // console.log({miscvideos})

            let youtubes = lines.filter(line=>line.indexOf("YOUTUBE ")===0)
            // console.log({youtubes})
            
            let pictures = lines.filter(line=>line.indexOf("PICTURE ")===0)
            // console.log({pictures})
            
            let instructions = lines.filter(line=>line.indexOf("INSTRUCTION ")===0)
            // console.log({instructions})
            
            let sets = lines.filter(line=>line.indexOf("SET ")===0)
            // console.log({intervals})

            let intervals = lines.filter(line=>line.indexOf("INTERVAL ")===0)
            // console.log({intervals})
            
            // Cleaning: Another cleaning to remove keywords in text source
            miscvideos = miscvideos.map(line=>line.substring(line.indexOf(" ")+1))
            // console.log({miscvideos})
            youtubes = youtubes.map(line=>line.substring(line.indexOf(" ")+1))
            // console.log({youtubes})
            pictures = pictures.map(line=>line.substring(line.indexOf(" ")+1))
            // console.log({pictures})
            instructions = instructions.map(line=>line.substring(line.indexOf(" ")+1))
            // console.log({instructions})
            sets = sets.map(line=>line.substring(line.indexOf(" ")+1))
            // console.log({sets})
            intervals = intervals.map(line=>line.substring(line.indexOf(" ")+1))
            // console.log({intervals})
            
            // Enrich: Adding round types
            let roundType = "";
            if(sets.length && intervals.length) {
                intervals.length = 0;
                window.displayError("You can't have sets and intervals in the same exercise. Discarding intervals. If you must, then you should design a second exercise with all intervals.")
            }
            // For conditional rendering. Forgone Enum so code is less bloated.
            // debugger;
            if(sets.length) {
                roundType = "SETS";
            } else if(intervals.length) {
                roundType = "INTERVALS";
            }
            
            // debugger;
            // Enrich: Adding round types
            let roundTotal = sets.length || intervals.length || 0;


            // Validate
            // console.log(pictures);
            // console.log({group});

            // return exercise object
            return {
                name,
                roundType,
                roundTotal,
                miscvideos,
                youtubes,
                pictures,
                instructions,
                intervals,
                sets
            }

        }); // group aka exercise each

    const getWorkoutName = (() =>{
        return window.location.href.substring(window.location.href.lastIndexOf("/")+1).replaceAll(".txt", "")
    });

    let workout = {
        workoutName: getWorkoutName(),
        exercises
    }

    console.log({workout})
    return workout;
} // parseWorkoutData 

export {
    parseWorkoutData
}
function parseWorkoutData(data) {

        const removeKeywordSpace = line=>line.substring(line.indexOf(" ")+1);

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
            
            let miscvideos = lines.filter(line=>line.indexOf("MISCVIDEO ")===0).map(removeKeywordSpace)
            
            let fbreels = lines.filter(line=>line.indexOf("FBREEL ")===0).map(removeKeywordSpace)

            let youtubevids = lines.filter(line=>(line.indexOf("YOUTUBE ")===0)).map(removeKeywordSpace)

            let youtubeshorts = lines.filter(line=>(line.indexOf("YOUTUBESHORT ")===0)).map(removeKeywordSpace)
            
            let pictures = lines.filter(line=>line.indexOf("PICTURE ")===0).map(removeKeywordSpace)
            
            let instructions = lines.filter(line=>line.indexOf("INSTRUCTION ")===0).map(removeKeywordSpace)
            
            let sets = lines.filter(line=>line.indexOf("SET ")===0).map(removeKeywordSpace)

            let intervals = lines.filter(line=>line.indexOf("INTERVAL ")===0).map(removeKeywordSpace)
            
            // Enrich: Adding round types
            let roundType = "";
            if(sets.length && intervals.length) {
                intervals.length = 0;
                window.displayError("You can't have sets and intervals in the same exercise. Discarding intervals. If you must, then you should design a second exercise with all intervals.")
            }

            // For conditional rendering. Forgone Enum so code is less bloated.
            if(sets.length) {
                roundType = "SETS";
            } else if(intervals.length) {
                roundType = "INTERVALS";
            }
            
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
                fbreels,
                miscvideos,
                youtubevids,
                youtubeshorts,
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
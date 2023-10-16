function formatSecondsToHumanReadable(totalSeconds) {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Create an array to hold the result
    const timeComponents = [];

    // Check hours, minutes, and seconds, and push non-zero values to the result array
    if (hours > 0) {
        timeComponents.push(hours + ' hour' + (hours > 1 ? 's' : ''));
    }
    if (minutes > 0) {
        timeComponents.push(minutes + ' minute' + (minutes > 1 ? 's' : ''));
    }
    if (seconds > 0) {
        timeComponents.push(seconds + ' second' + (seconds > 1 ? 's' : ''));
    }

    // Join the components
    return timeComponents.join(' ');
} // formatSecondsToHumanReadable

function parseWorkoutData(data) {

        const removeKeywordSpace = line=>line.substring(line.indexOf(" ")+1);
        
        let groups = data.split(/---[\-]*/gm);
        // console.log({groups})

        let workoutDescs = [];
        if(groups.length) {
            if(groups[0].indexOf("WORKOUTDESC ")>=0) {
                console.log("WORKOUTDESC detected")
                workoutDescs = groups[0].replaceAll("WORKOUTDESC ", "").split("\n");
                groups.shift(0);
            }
        } // groups.length


        /*
         *  group: is an exercise
         *  i is the group or exercise position
         * 
         */
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
            // Exercise name

            // console.log("Exercise's lines:");
            // console.log(lines);
            
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
                var showOnceWarning = window.open("about:blank");
                showOnceWarning.document.write("<h2>Workout Notebook Error</h2>You can't have sets and intervals in the same exercise. Discarding intervals. If you must, then you should design a second same exercise with all intervals.");
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

    let totalDurationSecs = (()=>{
        let total = 0;
        let tokens = "";
        exercises.forEach(exercise=>{
            if(exercise?.intervals) {
                tokens += (" " + exercise.intervals);
            }
            if(exercise?.sets) {
                tokens += (" " + exercise.sets);
            }
        })
        tokens = tokens.replaceAll("undefined", " ");
        tokens = tokens.replaceAll(/\s+/g, " ");
        tokens = tokens.trim(); // normalize for splitting around the delim space
        tokens.split(" ").forEach(term=>{
            if(term.includes("s")) {
                let numeric = parseInt(term); // "5s" => 5
                total += (2.5 * numeric)
            } else if(term.includes("r")) {
                // Set the standard of 2.5 seconds a rep
                let numeric = parseInt(term); // "5s" => 5
                total += (2.5 * numeric)
            }
        })
        // console.log({tokens})
        
        return total;
    })(); // totalDurationSecs

    let totalDuration = formatSecondsToHumanReadable(totalDurationSecs);

    let workout = {
        workoutName: decodeURI(window.location.href.substring(window.location.href.lastIndexOf("/")+1).replaceAll(".txt", "")),
        workoutDescs, 
        exercises,
        totalDuration
    }

    // console.log({workout})
    return workout;
} // parseWorkoutData 

export {
    parseWorkoutData
}
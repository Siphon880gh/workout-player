
// window.elapsedTime=0;
// window.play = true;
// setInterval(()=>{
//   if(window.play) {
//     window.elapsedTime++;
//     // console.log(window.elapsedTime);
//   }
// },1000)

export default function setupGlobals() {

  window.playing = true; // TODO: Will add button at index.html that lets user control playing or not

// TODO: Will slide-in panel at index.html to display the error instead of showing error in console
  window.displayError = function(msg) {
      // TODO: Should appear on the website as a slide-in then slide-out, so immediately know format errors of the workout text file
      console.error(msg);
  }

  window.jumpToElementById = function(id) {

  }

window.IntuitiveDuration = class {
  constructor(input) {
    this.input = "";
  }
  // constructor(text).. validate vs displayError
  // test() method on this regex: /^[A-Za-z0-9]*$/
  // Literal dot. Only hH mM and sS
  // May test at Regex 101. After testing:

  // Make all lower case. Remove all spaces str. replace(/\s/g, '' )... add spaces after h m and s... split by space... then use include and parse float with math to accumulate on an accumulator
}


  // eslint-disable-next-line no-extend-native
  String.prototype.toTitleCase = function() {
    let newPhrase = this.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ");
    // console.log({newPhrase})
    return newPhrase
  }



}
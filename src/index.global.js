
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
    window.document.querySelector("html,body").scrollTo(0,window.document.getElementById(id).offsetTop, 1000, "easeInOutQuint")
  }

window.IntuitiveDuration = class {
  constructor(input) {
    
    if(this._validate(input)) {
      this.input = input;
    } else {
      window.displayError("Incorrect duration format")
    }
  } // constructor

  _validate(input) {
    // eslint-disable-next-line no-useless-escape
    return (/^[hms0-9\.\s]{2,}$/i).test(input)
  }

  // Tests
  // (new IntuitiveDuration("2m2s")).getSeconds();
  // (new IntuitiveDuration("1h2m2s")).getSeconds();
  getSeconds() {
    let intermediate = this.input;
    intermediate = intermediate.toLowerCase();
    intermediate = intermediate.replaceAll(" ", "");
    intermediate = intermediate.replaceAll("h", "h ")
    intermediate = intermediate.replaceAll("m", "m ")
    intermediate = intermediate.replaceAll("s", "s ")
    let intermediates = intermediate.split(" ");
    intermediates = intermediates.filter(intermediate=>intermediate.length);

    let accumulator = 0;
    for(let i = 0; i<intermediates.length; i++) {
      let token = intermediates[i];
      let num = parseFloat(token);

      if(token.includes("h")) {
        accumulator+=num*60*60;
      } else if(token.includes("m")) {
        accumulator+=num*60;
      } else {
        accumulator+=num;
      }
    }
    // console.log(accumulator)
    return accumulator;
  }
} // class IntuitiveDuration

  // Setup String method to change to title case
  // eslint-disable-next-line no-extend-native
  String.prototype.toTitleCase = function() {
    let newPhrase = this.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ");
    // console.log({newPhrase})
    return newPhrase
  }



}
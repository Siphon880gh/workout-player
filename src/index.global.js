export default function setupGlobals() {

  window.playing = true; // TODO: Will add button at index.html that lets user control playing or not

// TODO: Will slide-in panel at index.html to display the error instead of showing error in console
  window.displayError = function(msg) {
      // TODO: Should appear on the website as a slide-in then slide-out, so immediately know format errors of the workout text file
      // console.error(msg);
      alert(msg);
  }

  window.jumpToElementById = function(id) {
    window.document.querySelector("html,body").scrollTo(0,window.document.getElementById(id).offsetTop, 1000, "easeInOutQuint")
  }

  /**
   * 
   * Timemark is like 0:01, 1:00, 1:02:03
   */
  window.timemarks__getSeconds_cm = function(token) {
    let subtokens = token.split(":");
    let [h,m,s] = [0,0,0];

    if(subtokens.length>3)
      subtokens.length=3;

    switch (subtokens.length) {
      case 1: 
        s = parseInt(subtokens[0]);
        break;
      case 2: 
        m = parseInt(subtokens[0]);
        s = parseInt(subtokens[1]);
        break;
      case 3: 
        h = parseInt(subtokens[0]);
        m = parseInt(subtokens[1]);
        s = parseInt(subtokens[2]);
        break;
      default:
    }

    return (h*60*60) + (m*60) + s;
    
  } // timemarks__getSeconds_cm

  /**
   * 
   * Intuitive Duration is like 1h2m1s, 2m1s, or variations with spacing: 2m 1s, 1h 2m 1s
   */
  window.intuitiveDuration__getSeconds_cm = function(token) {
    const getSeconds = (token) => {
      let intermediate = token.toLowerCase();
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
    } // getSeconds(token)

    const isValidToken = (/^[hms0-9\.\s]{2,}$/i).test(token) // Eg. 1h2m3s
    if(isValidToken) {
      return getSeconds(token)
    } else {
      return -1;
    }
  } // intuitiveDuration__getSeconds


  // Setup String method to change to title case
  // eslint-disable-next-line no-extend-native
  String.prototype.toTitleCase = function() {
    let newPhrase = this.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ");
    // console.log({newPhrase})
    return newPhrase
  }



}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// window.elapsedTime=0;
// window.play = true;
// setInterval(()=>{
//   if(window.play) {
//     window.elapsedTime++;
//     // console.log(window.elapsedTime);
//   }
// },1000)


String.prototype.toTitleCase = function() {
  let newPhrase = this.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ");
  // console.log({newPhrase})
  return newPhrase
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

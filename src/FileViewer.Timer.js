function tickUp({playing, setElapsed, elapsed}) {
    if(playing) {
      setTimeout(()=>{
        setElapsed(elapsed+1);
      }, 1000)
    }
}

function reset({setElapsed}) {
    setElapsed(0);
}

export {
    tickUp,
    reset
};
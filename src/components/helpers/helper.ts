const muteToggleAll =  () => {
  document.querySelectorAll('audio').forEach(elm => {
    console.log('clicked')
    if(elm.muted = true) {
      elm.muted = false;
    } else {
      elm.muted = true;
    }
  })
} 

export default muteToggleAll;
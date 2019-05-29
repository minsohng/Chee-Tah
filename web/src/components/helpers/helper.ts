export const muteToggleAll =  () => {
  document.querySelectorAll('audio').forEach(elm => {
    console.log('clicked')
    if(elm.muted = true) {
      elm.muted = false;
    } else {
      elm.muted = true;
    }
  })
} 

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};


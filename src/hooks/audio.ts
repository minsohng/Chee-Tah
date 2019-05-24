import { useState, useEffect } from 'react';

export const useAudio = (url: string): [boolean, VoidFunction, VoidFunction, VoidFunction] => {
  let [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  audio.muted = true;
  const toggle = () => {
    setPlaying(!playing)
  }

  const destroy = () => {
    audio.pause();
    audio = null;
  }

  const mute = () => {
    if(audio.muted) {
      audio.muted = false;
    } else {
      audio.muted = true;
    }
  }

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },[playing]
  );
  return [playing, toggle, destroy, mute]
}
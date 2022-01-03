import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { selectIsPlaying, setIsPlaying } from "../../../redux/player/playerSlice";

export function useAudioPlayer(audioRef: any, audioProgressRef: any, audioVolumeRef: any) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const isPlaying = useAppSelector(selectIsPlaying);
  const dispatch = useAppDispatch();

  const animationRef = useRef<number>();

  function onLoadedMetadata() {
    if (audioRef.current && audioProgressRef.current && audioVolumeRef.current) {
      const seconds = Math.floor(audioRef.current.duration);
      if (seconds) setDuration(seconds);
      audioProgressRef.current.max = seconds;
      audioRef.current.value = 0;
      audioRef.current.volume = audioVolumeRef.current.value;
    }
  }

  function updateCurrentTime() {
    if (audioProgressRef.current) setCurrentTime(audioProgressRef.current.value);
  }

  function pause() {
    if (audioRef.current) audioRef.current.pause();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }

  function whilePlaying() {
    if (audioRef.current && audioProgressRef.current) {
      audioProgressRef.current.value = Math.floor(audioRef.current.currentTime);
      audioProgressRef.current.style.setProperty("--seek-before-width", `${(audioProgressRef.current.value / duration) * 100}%`);
      updateCurrentTime();
      // the song has ended go to the next song
      // if (audioProgressRef.current.value === duration) {

      //   return;
      // }
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }

  function changeAudioToPlayHead() {
    if (audioRef.current && audioProgressRef.current) {
      audioRef.current.currentTime = audioProgressRef.current.value;
      setCurrentTime(audioProgressRef.current.value);
      audioProgressRef.current.style.setProperty("--seek-before-width", `${(audioProgressRef.current.value / duration) * 100}%`);
    }
  }

  function changeAudioVolume() {
    if (audioRef.current && audioVolumeRef.current) {
      audioRef.current.volume = audioVolumeRef.current.value;
      audioVolumeRef.current.style.setProperty("--seek-before-width", `${audioVolumeRef.current.value * 1000}%`);
    }
  }

  function play() {
    if (audioRef.current) audioRef.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  function togglePlaying() {
    const prevState = isPlaying;
    dispatch(setIsPlaying(!prevState));

    if (!prevState) {
      play();
    } else {
      pause();
    }
  }

  return {
    changeAudioToPlayHead,
    currentTime,
    duration,
    isPlaying,
    setIsPlaying,
    play,
    pause,
    onLoadedMetadata,
    togglePlaying,
    changeAudioVolume,
  };
}

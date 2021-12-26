import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRange,
} from "@ionic/react";
import {
  pauseSharp,
  playSharp,
  playSkipBackSharp,
  playSkipForwardSharp,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { calculateTime } from "../utils/calculateTime";
import "./SongList.css";

interface SongListProps {}

const songList = [
  {
    title: "Chikyu-u 002",
    artist: "R.M",
    path: "./assets/audio/02 - Chikyu-u.mp3",
    duration: "9:23",
  },
  {
    title: "Untitled 02",
    artist: "Unknown Artist",
    path: "./assets/audio/02 - Untitled 02.mp3",
    duration: "7:55",
  },
  {
    title: "Extraction (Extended Mix)",
    artist: "Dosem",
    path: "./assets/audio/02 - Extraction (Extended Mix).mp3",
    duration: "6:15",
  },
];

const SongList: React.FC<SongListProps> = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioProgressRef = useRef<any>(null);
  const audioVolumeRef = useRef<any>(null);
  const animationRef = useRef<number>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [songPath, setSongPath] = useState<string>();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function onLoadedMetadata() {
    if (
      audioRef.current &&
      audioProgressRef.current &&
      audioVolumeRef.current
    ) {
      const seconds = Math.floor(audioRef.current.duration);
      if (seconds) setDuration(seconds);
      audioProgressRef.current.max = seconds;
      audioRef.current.volume = audioVolumeRef.current.value;
    }
  }

  function updateCurrentTime() {
    if (audioProgressRef.current)
      setCurrentTime(audioProgressRef.current.value);
  }

  function pause() {
    if (audioRef.current) audioRef.current.pause();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }

  function whilePlaying() {
    if (audioRef.current && audioProgressRef.current) {
      audioProgressRef.current.value = Math.floor(audioRef.current.currentTime);
      audioProgressRef.current.style.setProperty(
        "--seek-before-width",
        `${(audioProgressRef.current.value / duration) * 100}%`
      );
      updateCurrentTime();

      // if(audioProgressRef.current.value === duration) {
      //   //the song has ended go to the next song
      //   return

      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }

  function changeAudioToPlayHead() {
    if (audioRef.current && audioProgressRef.current) {
      audioRef.current.currentTime = audioProgressRef.current.value;
      setCurrentTime(audioProgressRef.current.value);
      audioProgressRef.current.style.setProperty(
        "--seek-before-width",
        `${(audioProgressRef.current.value / duration) * 100}%`
      );
    }
  }

  function changeAudioVolume() {
    if (audioRef.current && audioVolumeRef.current) {
      audioRef.current.volume = audioVolumeRef.current.value;
    }
  }

  function play() {
    if (audioRef.current) audioRef.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  function togglePlaying() {
    const prevState = isPlaying;
    setIsPlaying(!prevState);
    if (!prevState) {
      play();
    } else {
      pause();
    }
  }

  useEffect(() => {
    if (songPath && !isPlaying) {
      togglePlaying();
    }
  }, [songPath]);

  return (
    <IonPage>
      <div className="wrapper">
        <IonContent>
          Playlist
          <IonList>
            {songList.map((song) => (
              <IonItem key={`song--${song.title}`} color="light">
                {song.title}
                <IonButton
                  onClick={() => {
                    if (songPath !== song.path) {
                      setSongPath(song.path);
                    } else if (!isPlaying) {
                      togglePlaying();
                    }
                    if (isPlaying) {
                      togglePlaying();
                    }
                  }}
                  slot="start"
                >
                  {isPlaying && songPath === song.path ? (
                    <IonIcon icon={pauseSharp} />
                  ) : (
                    <IonIcon icon={playSharp} />
                  )}
                </IonButton>
              </IonItem>
            ))}
          </IonList>
          {/* current time */}
          <div className="flex jc">
            <IonButton>
              <IonIcon icon={playSkipBackSharp} />
            </IonButton>
            <IonButton
              onClick={() => {
                togglePlaying();
              }}
            >
              {isPlaying ? (
                <IonIcon icon={pauseSharp} />
              ) : (
                <IonIcon icon={playSharp} />
              )}
            </IonButton>

            <IonButton>
              <IonIcon icon={playSkipForwardSharp} />
            </IonButton>
          </div>
          <div className="flex">
            <span>{calculateTime(currentTime)}</span>
            <input
              style={{ pointerEvents: songPath ? "all" : "none" }}
              className="audioProgressbar"
              type="range"
              ref={audioProgressRef}
              onInput={changeAudioToPlayHead}
              step={1}
              min={0}
              defaultValue={0}
            />
            {/* total time*/}
            <span>{calculateTime(duration)}</span>
            {/* volume changer */}
            <input
              className="audioVolumebar"
              type="range"
              ref={audioVolumeRef}
              onChange={changeAudioVolume}
              step={0.01}
              min={0}
              max={1}
              defaultValue={0.2}
            />
          </div>
        </IonContent>
        <audio
          ref={audioRef}
          src={songPath ?? songList[0].path}
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
      </div>
    </IonPage>
  );
};

export default SongList;

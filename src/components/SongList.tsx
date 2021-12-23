import { IonButton, IonContent, IonItem, IonList, IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import "./SongList.css";

interface SongListProps {}

const songList = [
  {
    title: "Chikyu-u 002",
    artist: "R.M",
    path: "./assets/audio/02 Chikyu-u 002.mp3",
    duration: "9:23",
  },
  {
    title: "Untitled 02",
    artist: "Unknown Artist",
    path: "./assets/audio/Unknown Artist - Untitled 02.mp3",
    duration: "7:55",
  },
];

const SongList: React.FC<SongListProps> = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongPath, setCurrentSongPath] = useState("");
  const [currentSongDuration, setCurrentSongDuration] = useState(0);
  useEffect(() => {
    if (currentSongPath) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [currentSongPath]);

  useEffect(() => {
    console.log(currentSongDuration);
  }, [currentSongDuration]);

  return (
    <IonPage>
      <div className="wrapper">
        <IonContent>
          <IonList>
            {songList.map((song) => (
              <IonItem key={`song--${song.title}`} color="light">
                {song.title}
                <IonButton
                  onClick={() => {
                    if (currentSongPath !== song.path) {
                      setCurrentSongPath(song.path);
                    } else {
                      audioRef.current?.play();
                      setIsPlaying(true);
                    }
                    if (isPlaying) {
                      audioRef.current?.pause();
                      setIsPlaying(false);
                    }
                  }}
                  slot="start"
                >
                  {currentSongPath === song.path && isPlaying ? "Pause" : "Play"}
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
        <audio
          ref={audioRef}
          src={currentSongPath}
          onLoadedMetadata={() => {
            if (audioRef.current) setCurrentSongDuration(audioRef.current.duration);
          }}
        ></audio>
      </div>
    </IonPage>
  );
};

export default SongList;

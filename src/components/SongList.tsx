import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage } from "@ionic/react";
import { pauseSharp, playSharp } from "ionicons/icons";
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
  return (
    <IonPage>
      <div className="wrapper">
        <IonContent>
          Playlist ({songList.length})
          <IonList>
            {/* {songList.map((song) => (
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
                  {isPlaying && songPath === song.path ? <IonIcon icon={pauseSharp} /> : <IonIcon icon={playSharp} />}
                </IonButton>
              </IonItem>
            ))} */}
          </IonList>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default SongList;

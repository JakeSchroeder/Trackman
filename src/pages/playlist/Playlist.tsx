import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage } from "@ionic/react";
import { playSharp } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../redux/app/hooks";
import { selectAllTracks } from "../../redux/playlist/playlistSlice";

interface PlaylistProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Playlist: React.FC<PlaylistProps> = ({ match }) => {
  const allSongs = useAppSelector(selectAllTracks);
  return (
    <IonPage>
      <IonContent>
        <h1>All Songs</h1>
        <IonList>
          {allSongs.map((song) => (
            <IonItem key={`song--${song.title}`} color="light">
              {song.title}
              <IonButton slot="start">
                <IonIcon icon={playSharp} />
                {/* {isPlayingInList && selectedSong?.id === song.id ? <IonIcon icon={pauseSharp} /> : <IonIcon icon={playSharp} />} */}
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Playlist;

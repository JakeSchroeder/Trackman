import "./Playlist.css";
import { IonContent, IonHeader, IonItem, IonList, IonText } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectAllTracks, selectSelectedTrack, setTrackToPlay } from "../../redux/playlist/playlistSlice";
import { Track } from "../../redux/playlist/types";

interface PlaylistProps {}
const Playlist: React.FC<PlaylistProps> = () => {
  const allTracks = useAppSelector(selectAllTracks);
  const selectedTrack = useAppSelector(selectSelectedTrack);
  const dispatch = useAppDispatch();
  function playSong(track: Track) {
    dispatch(setTrackToPlay(track));
  }

  return (
    <>
      <IonHeader>
        <IonText color="light">
          <h1>All Songs</h1>
        </IonText>
      </IonHeader>
      <IonContent>
        <IonList>
          {allTracks.map((track, index) => (
            <IonItem
              className="Playlist__itemwrap"
              key={`${track.id}__${track.title}`}
              onClick={() => {
                playSong(track);
              }}
            >
              <div className={`Playlist__item ${track.id === selectedTrack.id ? `Playlist__item--selected` : ``}`}>
                <IonText color="light">
                  <span className="Playlist__number">{index + 1}</span>
                </IonText>
                <IonText color="light">
                  <div className="Playlist__track">
                    <span className="Playlist__title">{track.title}</span>
                    <span className="Playlist__artist">
                      {track.artists.map((artist) => {
                        return `${artist}`;
                      })}
                    </span>
                  </div>
                </IonText>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default Playlist;

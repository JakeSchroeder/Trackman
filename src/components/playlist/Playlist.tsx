import "./Playlist.css";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectAllTracks, selectSelectedTrack, setTrackToPlay } from "../../redux/playlist/playlistSlice";
import { Track } from "../../redux/playlist/types";
import { cloudUploadOutline, ellipsisHorizontal, ellipsisVertical, personCircle, search, timeOutline } from "ionicons/icons";
import { useRef } from "react";

interface PlaylistProps {}
const Playlist: React.FC<PlaylistProps> = () => {
  const allTracks = useAppSelector(selectAllTracks);
  const selectedTrack = useAppSelector(selectSelectedTrack);
  const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function playSong(track: Track) {
    dispatch(setTrackToPlay(track));
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="light">
            Trackman <IonText color="dark">(alpha)</IonText>
          </IonTitle>
          <IonButtons slot="secondary">
            <IonButton className="Toolbar__button">
              <IonIcon className="Toolbar__icon" slot="icon-only" icon={search} />
            </IonButton>
            <IonButton
              className="Toolbar__button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <IonIcon className="Toolbar__icon" slot="icon-only" icon={cloudUploadOutline} />
              <input ref={fileInputRef} type="file" accept=".mp3,audio/*" hidden></input>
            </IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton className="Toolbar__button">
              <IonIcon className="Toolbar__icon" slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        {/* <IonText color="light">
          <h1>All Songs</h1>
        </IonText> */}
      </IonHeader>
      <div className="Playlist__inner">
        <IonContent className="Playlist__content">
          <div slot="fixed" className="Playlist__columns Playlist__header">
            <span className="Header__title">#</span>
            <span className="Header__title">Title</span>
            <span className="Header__title">Album</span>
            <span className="Header__title">Date Added</span>
            <span className="Header__title">
              <IonIcon className="Header__icon" icon={timeOutline} />
            </span>
          </div>
          <IonList className="Playlist__list">
            {allTracks.map((track, index) => (
              <IonItem
                className="Playlist__itemwrap"
                key={`${track.id}__${track.title}`}
                onClick={() => {
                  playSong(track);
                }}
              >
                <div className={`Playlist__item Playlist__columns ${track.id === selectedTrack.id ? `Playlist__item--selected` : ``}`}>
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
                  <IonText color="light">
                    <span className="Playlist__album">{track.album}</span>
                  </IonText>
                  <IonText color="light">
                    <span className="Playlist__date">{track.dateAdded}</span>
                  </IonText>
                  <IonText color="light">
                    <span className="Playlist__duration">{track.duration}</span>
                  </IonText>
                </div>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </div>
    </>
  );
};

export default Playlist;

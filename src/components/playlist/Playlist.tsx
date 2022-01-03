import "./Playlist.css";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { addTracks, selectAllTracks, selectSelectedTrack, setTrackToPlay } from "../../redux/playlist/playlistSlice";
import { Track } from "../../redux/playlist/types";
import {
  cloudUploadOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  pauseSharp,
  playSharp,
  radioOutline,
  search,
  timeOutline,
} from "ionicons/icons";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import * as mmb from "music-metadata-browser";
import { IAudioMetadata } from "music-metadata-browser";
import { nanoid } from "@reduxjs/toolkit";
import { calculateTime } from "../../utils/calculateTime";
import { selectIsPlaying, setIsPlaying } from "../../redux/player/playerSlice";

interface IUpload {
  metadata: IAudioMetadata;
  file: File;
}

interface PlaylistProps {}
const Playlist: React.FC<PlaylistProps> = () => {
  const allTracks = useAppSelector(selectAllTracks);
  const selectedTrack = useAppSelector(selectSelectedTrack);
  const isPlaying = useAppSelector(selectIsPlaying);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredTrack, setHoveredTrack] = useState<Track>();
  const dispatch = useAppDispatch();

  async function onFileUpload(event: ChangeEvent<HTMLInputElement>) {
    let parsedUploads: IUpload[] = [];
    if ((event.target as HTMLInputElement).files) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length) {
        for (const file of Array.from(files)) {
          let tempMetadata: mmb.IAudioMetadata = await parseFile(file);

          parsedUploads.push({
            file: file,
            metadata: tempMetadata,
          });
        }
      }
    }

    createTrackFromUploads(parsedUploads);
  }

  async function parseFile(file: File) {
    return mmb.parseBlob(file).then((metadata: any) => {
      return metadata;
    });
  }

  function createTrackFromUploads(parsedUploads: IUpload[]) {
    const tracks = parsedUploads.map((upload) => {
      let cover = mmb.selectCover(upload.metadata.common.picture);
      let imageUrl;
      let trackUrl;
      if (cover && cover.data) {
        let blob = new Blob([cover.data], { type: "image/jpeg" });
        imageUrl = URL.createObjectURL(blob);
        trackUrl = URL.createObjectURL(upload.file);
      }

      return {
        id: nanoid(),
        title: upload.metadata.common.title,
        artists: upload.metadata.common.artists,
        album: upload.metadata.common.album,
        artwork: imageUrl,
        duration: upload.metadata.format.duration,
        path: trackUrl,
        dateAdded: Date.now(),
      } as Track;
    });
    dispatch(addTracks(tracks));
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
              onClick={(e) => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <IonIcon className="Toolbar__icon" slot="icon-only" icon={cloudUploadOutline} />
              <input ref={fileInputRef} type="file" accept=".mp3" hidden onChange={onFileUpload} multiple></input>
            </IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton className="Toolbar__button">
              <IonIcon className="Toolbar__icon" slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
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
              <IonItem className={`Playlist__itemwrap`} key={`${track.id}__${track.title}`}>
                <div
                  className={`Playlist__item ${track.id === selectedTrack?.id ? `Playlist__item--selected` : ``} Playlist__columns`}
                  onDoubleClick={() => {
                    dispatch(setTrackToPlay(track));
                  }}
                  onMouseEnter={() => {
                    setHoveredTrack(track);
                  }}
                  onMouseLeave={() => {
                    setHoveredTrack(undefined);
                  }}
                >
                  <IonText color="light">
                    <span className="Playlist__number">
                      {hoveredTrack ? (
                        <>
                          {hoveredTrack.id === track.id ? (
                            <>
                              {selectedTrack && selectedTrack.id === hoveredTrack.id && isPlaying ? (
                                <IonIcon
                                  className="Player__IconLG"
                                  slot="icon-only"
                                  icon={pauseSharp}
                                  onClick={() => {
                                    dispatch(setIsPlaying(false));
                                  }}
                                />
                              ) : (
                                <IonIcon
                                  slot="icon-only"
                                  icon={playSharp}
                                  onClick={() => {
                                    if (selectedTrack && selectedTrack.id === track.id) {
                                      dispatch(setIsPlaying(true));
                                    } else {
                                      dispatch(setTrackToPlay(track));
                                      dispatch(setIsPlaying(true));
                                    }
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              {isPlaying && selectedTrack && selectedTrack.id === track.id ? (
                                <IonIcon slot="icon-only" icon={radioOutline} />
                              ) : (
                                <>{index + 1}</>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {isPlaying && selectedTrack && selectedTrack.id === track.id ? (
                            <IonIcon slot="icon-only" icon={radioOutline} />
                          ) : (
                            <>{index + 1}</>
                          )}
                        </>
                      )}
                    </span>
                  </IonText>
                  <IonText color="light">
                    <div className="Playlist_artwrap">
                      {track.artwork!.length > 1 ? (
                        <img className="Artwork__image" src={track.artwork} />
                      ) : (
                        <div className="Artwork__fallback"></div>
                      )}
                      <div className="Playlist__track">
                        <span className="Playlist__title">{track.title}</span>
                        <span className="Playlist__artist">
                          {track.artists?.map((artist) => {
                            return `${artist}`;
                          })}
                        </span>
                      </div>
                    </div>
                  </IonText>
                  <IonText color="light">
                    <span className="Playlist__album">{track.album}</span>
                  </IonText>
                  <IonText color="light">
                    <span className="Playlist__date">{new Date(track.dateAdded).toLocaleDateString("en-US")}</span>
                  </IonText>
                  <IonText color="light">
                    <span className="Playlist__duration">{calculateTime(track.duration!)}</span>
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

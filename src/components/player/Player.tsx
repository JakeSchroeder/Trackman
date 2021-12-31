import { IonButton, IonIcon } from "@ionic/react";
import { pauseSharp, playSharp, playSkipBackSharp, playSkipForwardSharp, volumeMediumOutline } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { calculateTime } from "../../utils/calculateTime";
import "./Player.css";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { playNextTrack, playPrevTrack, selectSelectedTrack } from "../../redux/playlist/playlistSlice";
const MP3Tag = require("mp3tag.js");

console.log(MP3Tag);

interface PlayerProps {
  // id: string | undefined;
  // artwork: string | undefined;
  // songTitle: string | undefined;
  // artists: string[] | undefined;
  // audioPath: string | undefined;
}

const Player: React.FC<PlayerProps> = () => {
  const audioRef = useRef<any>(null);
  const audioProgressRef = useRef<any>(null);
  const audioVolumeRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const selectedSong = useAppSelector(selectSelectedTrack);

  const {
    changeAudioToPlayHead,
    currentTime,
    duration,
    isPlaying,
    onLoadedMetadata,
    togglePlaying,
    changeAudioVolume,
    setIsPlaying,
    play,
  } = useAudioPlayer(audioRef, audioProgressRef, audioVolumeRef);

  useEffect(() => {
    if (isPlaying) {
      play();
      setIsPlaying(true);
    }
  }, [onLoadedMetadata, isPlaying]);

  return (
    <div className="Player__wrapper">
      <div className="Player__left">
        {selectedSong.artwork ? (
          <img className="Song__artwork" width={56} height={56} src={selectedSong.artwork} alt="song's album artwork" />
        ) : (
          <div style={{ width: "56px", height: "56px", background: "gray" }}></div>
        )}
        <div className="Song__info">
          <span className="Song__title">{selectedSong.title}</span>
          <span className="Song__artists">
            {selectedSong.artists ? selectedSong.artists.map((artist: string) => <span key={`artist--${artist}`}>{artist}</span>) : ""}
          </span>
        </div>
      </div>
      <div className="Player__center">
        <div className="Player__controls">
          <IonButton
            className="Player__back"
            fill="clear"
            onClick={() => {
              dispatch(playPrevTrack());
            }}
          >
            <IonIcon slot="icon-only" icon={playSkipBackSharp} />
          </IonButton>
          <IonButton
            className="Player__toggle"
            color="light"
            shape="round"
            onClick={() => {
              togglePlaying();
            }}
          >
            {isPlaying ? (
              <IonIcon className="Player__IconLG" slot="icon-only" icon={pauseSharp} />
            ) : (
              <IonIcon slot="icon-only" icon={playSharp} />
            )}
          </IonButton>
          <IonButton
            className="Player__forward"
            fill="clear"
            onClick={() => {
              dispatch(playNextTrack());
            }}
          >
            <IonIcon slot="icon-only" icon={playSkipForwardSharp} />
          </IonButton>
        </div>
        <div className="Player__progress">
          <span className="Progress__currentTime">{calculateTime(currentTime)}</span>
          <input
            className="Player__Slider"
            type="range"
            ref={audioProgressRef}
            onChange={changeAudioToPlayHead}
            step={1}
            min={0}
            defaultValue={0}
          />

          <span className="Progress__duration">{calculateTime(duration)}</span>
        </div>
      </div>
      <div className="Player__right">
        <div className="Player__volume">
          <IonIcon className="Volume__icon" color="light" icon={volumeMediumOutline} />
          <input
            className="Player__Slider Player__Slider--volume"
            type="range"
            ref={audioVolumeRef}
            onChange={changeAudioVolume}
            step={0.001}
            min={0}
            max={0.1}
            defaultValue={0.02}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={selectedSong.path}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          dispatch(playNextTrack());
        }}
      ></audio>
    </div>
  );
};

export default Player;

import { IonButton, IonIcon } from "@ionic/react";
import { pauseSharp, playSharp, playSkipBackSharp, playSkipForwardSharp } from "ionicons/icons";
import { useRef } from "react";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { calculateTime } from "../../utils/calculateTime";
import "./Player.css";

interface PlayerProps {
  id: string | undefined;
  artwork: string | undefined;
  songTitle: string | undefined;
  artists: string[] | undefined;
  audioPath: string | undefined;
}

const Player: React.FC<PlayerProps> = ({ artwork, songTitle, artists, audioPath }) => {
  const audioRef = useRef<any>(null);
  const audioProgressRef = useRef<any>(null);
  const audioVolumeRef = useRef<any>(null);

  const { changeAudioToPlayHead, currentTime, duration, isPlaying, onLoadedMetadata, togglePlaying, changeAudioVolume } = useAudioPlayer(
    audioRef,
    audioProgressRef,
    audioVolumeRef
  );

  return (
    <div className="Player__wrapper">
      <div className="Player__left">
        {artwork ? (
          <img className="Song__artwork" width={56} height={56} src={artwork} alt="song's album artwork" />
        ) : (
          <div style={{ width: "56px", height: "56px", background: "gray" }}></div>
        )}

        <div className="Song__info">
          <span className="Song__title">{songTitle}</span>
          <span className="Song__artists">
            {artists ? artists.map((artist: string) => <span key={`artist--${artist}`}>{artist}</span>) : ""}
          </span>
        </div>
      </div>
      <div className="Player__center">
        <div className="Player__controls">
          <IonButton>
            <IonIcon icon={playSkipBackSharp} />
          </IonButton>
          <IonButton
            onClick={() => {
              togglePlaying();
            }}
          >
            {isPlaying ? <IonIcon icon={pauseSharp} /> : <IonIcon icon={playSharp} />}
          </IonButton>
          <IonButton>
            <IonIcon icon={playSkipForwardSharp} />
          </IonButton>
        </div>
        <div className="Player__progress">
          <span className="Progress__currentTime">{calculateTime(currentTime)}</span>
          <input
            className="Player__audioProgressbar"
            type="range"
            ref={audioProgressRef}
            onInput={changeAudioToPlayHead}
            step={1}
            min={0}
            defaultValue={0}
          />

          <span className="Progress__duration">{calculateTime(duration)}</span>
        </div>
      </div>
      <div className="Player__right">
        <div className="Player__volume">
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
      </div>
      <audio ref={audioRef} src={audioPath} onLoadedMetadata={onLoadedMetadata}></audio>
    </div>
  );
};

export default Player;

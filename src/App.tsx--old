import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { home, menu, pauseSharp, playSharp } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { IonReactRouter } from "@ionic/react-router";

/* Theme variables */
import "./theme/variables.css";

/* Stuffs */
import Player from "./components/player/Player";

import "./App.css";
import { useState } from "react";
import { useAppSelector } from "./redux/app/hooks";
import { selectAllPlaylists } from "./redux/playlist/playlistSlice";
import Playlist from "./pages/playlist/Playlist";
import Home from "./pages/home/Home";
import { Track } from "./redux/playlist/types";

setupIonicReact();

const App: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Track>();
  const allPlaylists = useAppSelector(selectAllPlaylists);

  return (
    <IonApp>
      <IonReactRouter>
        <div className="App__wrapper">
          <div className="App__main">
            <IonSplitPane when="sm" contentId="main-content">
              <IonMenu contentId="main-content">
                <IonList>
                  <IonItem button routerLink="/">
                    <IonIcon slot="start" icon={home}></IonIcon>
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                </IonList>
                <IonContent>
                  <IonList>
                    {allPlaylists
                      ? allPlaylists.map((playlist) => (
                          <IonItem routerLink={`/playlist/${playlist.id}`} key={playlist.title}>
                            {playlist.title}
                          </IonItem>
                        ))
                      : "None"}
                  </IonList>
                </IonContent>
              </IonMenu>
              <IonRouterOutlet id="main-content" animated={false}>
                <Route path="/" component={Home} exact />
                <Route path="/playlist/:id" component={Playlist} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </div>
          <div className="App__footer">
            <Player
              id={selectedSong?.id}
              artwork={selectedSong?.artwork}
              songTitle={selectedSong?.title}
              artists={selectedSong?.artists}
              audioPath={selectedSong?.path}
            />
          </div>
        </div>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

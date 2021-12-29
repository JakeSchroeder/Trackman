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
// import { selectAllPlaylists } from "./redux/playlist/playlistSlice";
import { Track } from "./redux/playlist/types";
import Playlist from "./components/playlist/Playlist";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <div className="App__wrapper">
        <div className="App__inner">
          <div className="App__main">
            <Playlist />
          </div>
        </div>
        <div className="App__player">
          <Player />
        </div>
      </div>
    </IonApp>
  );
};

export default App;

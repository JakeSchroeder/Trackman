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
import { home, menu } from "ionicons/icons";

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

/* Theme variables */
import "./theme/variables.css";

/* My Stuffs */
import SongList from "./components/SongList";
import Player from "./components/Player";

import "./App.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <div className="App__wrapper">
      <div className="App__main">
        <IonSplitPane when="sm" contentId="main-content">
          <IonMenu contentId="main-content">
            <IonContent>
              <IonList>
                <IonMenuToggle autoHide={false}>
                  <IonItem button>
                    <IonIcon slot="start" icon={home}></IonIcon>
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>

          <div className="ion-page" id="main-content">
            <IonContent>
              <h1>Main Content</h1>
            </IonContent>
          </div>
        </IonSplitPane>
      </div>
      <div className="App__footer">
        <Player
          artwork="./assets/images/album-cover.jpg"
          songTitle="Chikyu-u"
          artists={["R.M"]}
          audioPath="./assets/audio/02 - Chikyu-u.mp3"
        />
      </div>
    </div>
  </IonApp>
);

export default App;

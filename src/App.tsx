import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
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
import SongList from "./components/SongList";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <SongList />
  </IonApp>
);

export default App;

// <IonSplitPane when="sm" contentId="main-content">
//       <IonMenu contentId="main-content">
//         <IonHeader>
//           <IonToolbar color="secondary">
//             <IonTitle>Menu</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent>
//           <IonList></IonList>
//         </IonContent>
//       </IonMenu>
//       <div className="ion-page" id="main-content">
//         <IonHeader>
//           <IonToolbar>
//             <IonButtons slot="start">
//               <IonMenuToggle>
//                 <IonButton>
//                   <IonIcon slot="icon-only" icon={menu}></IonIcon>
//                 </IonButton>
//               </IonMenuToggle>
//             </IonButtons>
//             <IonTitle>Header</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="ion-padding">
//           <h1>Main Content</h1>
//         </IonContent>
//       </div>
//     </IonSplitPane>

import { IonContent, IonPage } from "@ionic/react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <IonPage>
      <IonContent>Home Page</IonContent>
    </IonPage>
  );
};

export default Home;

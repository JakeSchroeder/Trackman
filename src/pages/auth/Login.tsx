import { IonButton, IonCheckbox, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonText } from "@ionic/react";
import "./Login.css";
import "./Form.css";

import grid_src from "../../assets/images/background-grid.png";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <IonPage>
      <div className="Login__wrapper">
        <div className="Login__inner">
          <IonContent className="Login__content">
            <div className="Login__main">
              <div className="Login__signup">
                <IonText>Need an account?</IonText>

                <IonText color="light">Sign up</IonText>
              </div>
              <IonText color="light">
                <h1>
                  Welcome to Frontier
                  <br />
                  Stream <IonText color="primary">Your</IonText> Music Collection
                </h1>
                <p>
                  Discover a digital home for the music you own—
                  <br /> Spark new life into the songs you love most.
                </p>
              </IonText>
              <form className="Input__form" onSubmit={() => {}}>
                <IonText color="light">
                  <div className="Input__group">
                    <IonLabel className="Input__label">Email address or username</IonLabel>
                    <IonInput className="Input__text" type="text" />
                  </div>
                  <div className="Input__group">
                    <IonLabel className="Input__label">Password</IonLabel>
                    <IonInput className="Input__text" type="password" />
                  </div>
                  {/* <IonLabel className="Input__label Input__label--forgot">Forgot your password?</IonLabel> */}
                  <div className="Input__group Input__group--submit">
                    <div className="Input__group Input__group--remember">
                      <IonCheckbox className="Input__checkbox" />
                      <IonLabel className="Input__label">Remember me?</IonLabel>
                    </div>
                    <IonButton className="Input__submit" type="submit">
                      Log in
                    </IonButton>
                  </div>
                </IonText>
              </form>
            </div>
          </IonContent>
        </div>
      </div>
    </IonPage>
  );
};

export default Login;

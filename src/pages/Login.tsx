import { IonContent, IonPage } from "@ionic/react";
import LoginContainer from "../features/login-features/components/LoginContainer";

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen={true} scrollX={false} scrollY={false}>
                <LoginContainer />
            </IonContent>
        </IonPage>
    );
}

export default Login;
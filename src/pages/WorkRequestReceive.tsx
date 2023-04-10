import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ContainerWorkRequestReceive from "../features/work-request-receive-features/components/ContainerWorkRequestReceive";

const WorkRequestReceive: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Work Request Receive</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerWorkRequestReceive />
            </IonContent>
        </IonPage>
    );
}

export default WorkRequestReceive;
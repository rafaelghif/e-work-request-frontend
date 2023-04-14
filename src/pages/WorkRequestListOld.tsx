import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { Suspense } from "react";

const WorkRequestListOld: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Work Request List OLD</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Suspense fallback={<IonSpinner name="crescent" />}>

                </Suspense>

            </IonContent>
        </IonPage>
    );
}

export default WorkRequestListOld;
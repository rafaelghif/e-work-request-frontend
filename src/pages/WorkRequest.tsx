import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { lazy, Suspense } from "react";
const ContainerWorkRequest = lazy(() => import("../features/work-request-features/components/ContainerWorkRequest"));

const WorkRequest: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Work Request</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <ContainerWorkRequest />
                </Suspense>
            </IonContent>
        </IonPage>
    );
}

export default WorkRequest;
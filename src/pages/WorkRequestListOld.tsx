import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { Suspense, lazy } from "react";

const ContainerWorkRequestOldList = lazy(() => import("../features/work-request-old-features/components/ContainerWorkRequestOldList"));

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
                    <ContainerWorkRequestOldList />
                </Suspense>
            </IonContent>
        </IonPage>
    );
}

export default WorkRequestListOld;
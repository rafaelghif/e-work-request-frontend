import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { lazy, Suspense } from "react";

const ContainerWorkRequestList = lazy(() => import("../features/work-request-list-features/components/ContainerWorkRequestList"));

const WorkRequestList: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Work Request List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <ContainerWorkRequestList />
                </Suspense>

            </IonContent>
        </IonPage>
    );
}

export default WorkRequestList;
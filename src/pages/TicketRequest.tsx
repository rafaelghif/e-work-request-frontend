import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { Suspense, lazy } from "react";

const ContainerTicketRequest = lazy(() => import("../features/ticket-request-features/components/ContainerTicketRequest"));

const TicketRequest: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ticket Request</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <ContainerTicketRequest />
                </Suspense>
            </IonContent>
        </IonPage>
    );
}

export default TicketRequest;
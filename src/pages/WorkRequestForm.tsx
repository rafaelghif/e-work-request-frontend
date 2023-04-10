import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ContainerWorkRequestForm from "../features/work-request-form-features/components/ContainerWorkRequestForm";

const WorkRequestForm: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Work Request Form</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerWorkRequestForm />
            </IonContent>
        </IonPage>
    );
}

export default WorkRequestForm;
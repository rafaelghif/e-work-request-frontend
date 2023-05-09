import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ContainerWorkRequestFormEdit from "../features/work-request-form-edit-features/components/ContainerWorkRequestFormEdit";
const WorkRequestFormEdit: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Work Request Form Edit</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerWorkRequestFormEdit />
            </IonContent>
        </IonPage>
    );
}

export default WorkRequestFormEdit;
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ContainerWorkRequestIssued from "../features/work-request-issued/components/ContainerWorkRequestIssued";

const WorkRequestIssued: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Work Request Issued</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ContainerWorkRequestIssued />
      </IonContent>
    </IonPage>
  );
};

export default WorkRequestIssued;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ContainerDashboard from "../features/dashboard-features/components/ContainerDashboard";

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ContainerDashboard />
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import FabButton from "../components/FabButton";
import ContainerRegistrationNumber from "../features/registration-number-features/components/ContainerRegistrationNumber";
import ModalCreateRegistrationNumber from "../features/registration-number-features/components/ModalCreateRegistrationNumber";

const RegistrationNumber: React.FC = () => {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration Number</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerRegistrationNumber />
            </IonContent>
            <ModalCreateRegistrationNumber isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)} />
            <FabButton handleClick={() => setIsOpenModalAdd(true)} />
        </IonPage>
    );
}

export default RegistrationNumber;
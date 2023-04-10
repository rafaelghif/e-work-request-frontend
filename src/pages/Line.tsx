import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import FabButton from "../components/FabButton";
import ContainerLine from "../features/line-features/components/ContainerLine";
import ModalCreateLine from "../features/line-features/components/ModalCreateLine";

const Line: React.FC = () => {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Line</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerLine />
            </IonContent>
            <ModalCreateLine isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)} />
            <FabButton handleClick={() => setIsOpenModalAdd(true)} />
        </IonPage>
    );
}

export default Line;
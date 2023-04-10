import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import FabButton from "../components/FabButton";
import ContainerUser from "../features/user-features/components/ContainerUser";
import ModalCreateUser from "../features/user-features/components/ModalCreateUser";

const User: React.FC = () => {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>User</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerUser />
            </IonContent>
            <ModalCreateUser isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)} />
            <FabButton handleClick={() => setIsOpenModalAdd(true)} />
        </IonPage>
    );
}

export default User;
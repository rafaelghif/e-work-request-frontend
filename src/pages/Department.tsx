import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import FabButton from "../components/FabButton";
import ContainerDepartment from "../features/department-features/components/ContainerDepartment";
import ModalCreateDepartment from "../features/department-features/components/ModalCreateDepartment";

const Department: React.FC = () => {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Department</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ContainerDepartment />
            </IonContent>
            <ModalCreateDepartment isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)} />
            <FabButton handleClick={() => setIsOpenModalAdd(true)} />
        </IonPage>
    );
}

export default Department;
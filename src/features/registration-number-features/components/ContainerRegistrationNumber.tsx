import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSpinner, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import useInActiveRegistrationNumber from "../hooks/useInActiveRegistrationNumber";
import useQueryRegistrationNumber from "../hooks/useQueryRegistrationNumber";
import { RegistrationNumberInterface } from "../types/registration-number-type";
import ModalUpdateRegistrationNumber from "./ModalUpdateRegistrationNumber";
import TableRegistrationNumber from "./TableRegistrationNumber";

const ContainerRegistrationNumber: React.FC = () => {
    const { isLoading, data, isError, refetch } = useQueryRegistrationNumber();
    const { mutate } = useInActiveRegistrationNumber();
    const [presentAlert] = useIonAlert();

    const [registrationNumber, setRegistrationNumber] = useState<RegistrationNumberInterface>();
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    const handleClickBtnEdit = (data: RegistrationNumberInterface) => {
        setRegistrationNumber(data);
        setIsOpenModalUpdate(true);
    }

    const handleClickBtnInActive = (id: string) => {
        presentAlert({
            header: "Are you sure want to In Active this registration number ?",
            buttons: [
                { "text": "Cancel", role: "cancel" },
                { "text": "Delete", handler: () => handleDelete(id) }
            ]
        });
    }

    const handleDelete = (id: string) => {
        mutate(id);
    }

    return (
        <>
            <Card title="Data Registration Numbers">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            {isLoading ? (
                                <IonSpinner name="crescent" color="primary" />
                            ) : (
                                <TableRegistrationNumber data={isError ? [] : data.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} handleClickBtnInActive={(id) => handleClickBtnInActive(id)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
            <ModalUpdateRegistrationNumber isOpen={isOpenModalUpdate} data={registrationNumber} onDidDismiss={() => setIsOpenModalUpdate(false)} />
        </>
    );
}

export default ContainerRegistrationNumber;
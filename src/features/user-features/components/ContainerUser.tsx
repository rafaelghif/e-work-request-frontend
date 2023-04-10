import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import useQueryUser from "../hooks/useQueryUser";
import useInActiveUser from "../hooks/useInActiveUser";
import { UserInterface } from "../types/user-type";
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";

const ContainerUser: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const { isLoading, data, isError, refetch } = useQueryUser(search);
    const { mutate } = useInActiveUser();
    const [presentAlert] = useIonAlert();

    const [user, setUser] = useState<UserInterface>();
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    const handleClickBtnEdit = (data: UserInterface) => {
        setUser(data);
        setIsOpenModalUpdate(true);
    }

    const handleClickBtnInActive = (id: string) => {
        presentAlert({
            header: "Are you sure want to In Active this user ?",
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
            <Card title="Data Users">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonSearchbar value={search} onIonChange={(e) => setSearch(e.detail.value!)} />
                        </IonCol>
                        <IonCol size="12">
                            {isLoading ? (
                                <IonSpinner name="crescent" color="primary" />
                            ) : (
                                <TableUser data={isError ? [] : data.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} handleClickBtnInActive={(id) => handleClickBtnInActive(id)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
            <ModalUpdateUser isOpen={isOpenModalUpdate} data={user} onDidDismiss={() => setIsOpenModalUpdate(false)} />
        </>
    );
}

export default ContainerUser;
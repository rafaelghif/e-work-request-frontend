import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import useInActiveDepartment from "../hooks/useInActiveDepartment";
import useQueryDepartment from "../hooks/useQueryDepartment";
import { DepartmentInterface } from "../types/department-type";
import ModalUpdateDepartment from "./ModalUpdateDepartment";
import TableDepartment from "./TableDepartment";

const ContainerDepartment: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const { isLoading, data, isError, refetch } = useQueryDepartment(search);
    const { mutate } = useInActiveDepartment();
    const [presentAlert] = useIonAlert();

    const [department, setDepartment] = useState<DepartmentInterface>();
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    const handleClickBtnEdit = (data: DepartmentInterface) => {
        setDepartment(data);
        setIsOpenModalUpdate(true);
    }

    const handleClickBtnInActive = (id: string) => {
        presentAlert({
            header: "Are you sure want to In Active this department ?",
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
            <Card title="Data Departments">
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
                                <TableDepartment data={isError ? [] : data.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} handleClickBtnInActive={(id) => handleClickBtnInActive(id)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
            <ModalUpdateDepartment isOpen={isOpenModalUpdate} data={department} onDidDismiss={() => setIsOpenModalUpdate(false)} />
        </>
    );
}

export default ContainerDepartment;
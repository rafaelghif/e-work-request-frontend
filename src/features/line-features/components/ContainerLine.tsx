import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import useInActiveLine from "../hooks/useInActiveLine";
import useQueryLine from "../hooks/useQueryLine";
import { LineInterface } from "../types/line-type";
import ModalUpdateLine from "./ModalUpdateLine";
import TableLine from "./TableLine";

const ContainerLine: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const { isLoading, data, isError, refetch } = useQueryLine(search);
    const { mutate } = useInActiveLine();
    const [presentAlert] = useIonAlert();

    const [line, setLine] = useState<LineInterface>();
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    const handleClickBtnEdit = (data: LineInterface) => {
        setLine(data);
        setIsOpenModalUpdate(true);
    }

    const handleClickBtnInActive = (id: string) => {
        presentAlert({
            header: "Are you sure want to In Active this line ?",
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
            <Card title="Data Lines">
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
                                <TableLine data={isError ? [] : data.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} handleClickBtnInActive={(id) => handleClickBtnInActive(id)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
            <ModalUpdateLine isOpen={isOpenModalUpdate} data={line} onDidDismiss={() => setIsOpenModalUpdate(false)} />
        </>
    );
}

export default ContainerLine;
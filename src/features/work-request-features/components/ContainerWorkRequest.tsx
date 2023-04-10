import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import { useAppSelector } from "../../../redux/hook";
import { WorkRequestInterface } from "../../../types/work-request-type";
import useQueryWorkRequest from "../hooks/useQueryWorkRequest";
import ModalActionRequest from "./ModalActionWorkRequest";
import TableWorkRequest from "./TableWorkRequest";

const ContainerWorkRequest: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const user = useAppSelector((state) => state.user);
    const { isLoading, data, isError, refetch } = useQueryWorkRequest(user.id, search);
    const [workRequest, setWorkRequest] = useState<WorkRequestInterface>();
    const [isOpenAction, setIsOpenAction] = useState<boolean>(false);

    const handleClickBtnAction = (data: WorkRequestInterface) => {
        setWorkRequest(data);
        setIsOpenAction(true);
    }

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    return (
        <>
            <Card title="Data Work Requests">
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
                                <TableWorkRequest data={isError ? [] : data.data} handleClickBtnAction={(data) => handleClickBtnAction(data)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
            <ModalActionRequest isOpen={isOpenAction} data={workRequest} onDidDismiss={() => setIsOpenAction(false)} />
        </>
    );
}

export default ContainerWorkRequest;
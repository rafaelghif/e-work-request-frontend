import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import { useAppSelector } from "../../../redux/hook";
import useQueryWorkRequestReceive from "../hooks/useQueryWorkRequestReceive";
import useReceiveTicket from "../hooks/useReceiveTicket";
import TableWorkRequestReceive from "./TableWorkRequestReceive";

const ContainerWorkRequestReceive: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const user = useAppSelector((state) => state.user);
    const { isLoading, data, isError, refetch } = useQueryWorkRequestReceive(user.id, search);
    const { mutate } = useReceiveTicket();
    const [presentAlert] = useIonAlert();

    const handleClickBtnReceive = (ticketId: string) => {
        presentAlert({
            header: "Confirmation!",
            message: "Are you sure you want to receive this ticket?",
            buttons: [
                "Cancel",
                {
                    text: "OK",
                    role: "confirm",
                    handler: () => {
                        handleReceive(ticketId);
                    },
                },
            ],
        })

    }

    const handleReceive = (ticketId: string) => {
        mutate(ticketId);
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
                                <TableWorkRequestReceive data={isError ? [] : data.data} handleClickBtnReceive={(ticketId) => handleClickBtnReceive(ticketId)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
        </>
    );
}

export default ContainerWorkRequestReceive;
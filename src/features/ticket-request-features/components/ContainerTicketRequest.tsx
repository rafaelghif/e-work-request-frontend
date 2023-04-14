import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import { useAppSelector } from "../../../redux/hook";
import TableTicketRequest from "./TableTicketRequest";
import useQueryTicketRequest from "../hooks/useQueryTicketRequest";
import useHeadActionTicket from "../hooks/useHeadActionTicket";

const ContainerTicketRequest: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const user = useAppSelector((state) => state.user);
    const { isLoading, data, isError, refetch } = useQueryTicketRequest(user.id, search);
    const [presentAlert] = useIonAlert();
    const { mutate } = useHeadActionTicket();

    const handleClickBtnAction = (ticketId: string, type: string) => {
        presentAlert({
            header: "Confirmation!",
            message: `Are you sure you want to ${type} this ticket?`,
            buttons: [
                "Cancel",
                {
                    text: "OK",
                    role: "confirm",
                    handler: () => {
                        handleAction(ticketId, type);
                    },
                },
            ],
        })

    }

    const handleAction = (ticketId: string, type: string) => {
        mutate({ id: ticketId, type });
    }

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    return (
        <>
            <Card title="Data Ticket Requests">
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
                                <TableTicketRequest data={isError ? [] : data?.data} handleClickBtnAction={(ticketId, type) => handleClickBtnAction(ticketId, type)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
        </>
    );
}

export default ContainerTicketRequest;
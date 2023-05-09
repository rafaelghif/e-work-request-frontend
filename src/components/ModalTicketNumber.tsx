import { useEffect, useState } from "react";
import useQueryTicketNumber from "../hooks/useQueryTicketNumber";
import Modal from "./Modal";
import { IonButton, IonSearchbar, IonSpinner } from "@ionic/react";
import { TicketInterface } from "../types/work-request-type";

interface ModalTicketNumberProps {
    isOpen: boolean;
    onSelect: (data: TicketInterface) => void;
    onDidDismiss: () => void;
}

const ModalTicketNumber: React.FC<ModalTicketNumberProps> = ({ isOpen, onDidDismiss, onSelect }) => {
    const [search, setSearch] = useState<string>("");
    const { isLoading, data } = useQueryTicketNumber(search);

    useEffect(() => {
        return () => setSearch("");
    });
    return (
        <Modal title="Ticket Number" isOpen={isOpen} onDidDismiss={() => onDidDismiss()}>
            <IonSearchbar value={search} debounce={1500} onIonChange={(e) => setSearch(e.detail.value!)} />
            {isLoading ? (<IonSpinner name="crescent" />) : (
                <>
                    {data.data ? (
                        data.data.map((res: TicketInterface) => (
                            <IonButton key={res.id} onClick={() => onSelect(res)} expand="block" fill="clear" color="medium">
                                {res.ticketNumber}
                            </IonButton>
                        ))
                    ) : null}
                </>
            )}
        </Modal>
    );
}

export default ModalTicketNumber;
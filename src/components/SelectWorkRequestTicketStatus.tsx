import { IonSelect, IonSelectOption } from "@ionic/react";

interface SelectWorkRequestTicketStatusProps {
    value: string;
    handleChange: (ticketStatus: string) => void;
}

const SelectWorkRequestTicketStatus: React.FC<SelectWorkRequestTicketStatusProps> = ({ value, handleChange }) => {
    return (
        <IonSelect value={value} label="Ticket Status" labelPlacement="start" onIonChange={(e) => handleChange(e.detail.value!)}>
            <IonSelectOption value="All">All</IonSelectOption>
            <IonSelectOption value="Waiting Approve">Waiting Approve</IonSelectOption>
            <IonSelectOption value="Request">Request</IonSelectOption>
            <IonSelectOption value="Pending">Pending</IonSelectOption>
            <IonSelectOption value="Progress">Progress</IonSelectOption>
            <IonSelectOption value="Send to the Requestor">Send to the Requestor</IonSelectOption>
            <IonSelectOption value="Complete">Complete</IonSelectOption>
            <IonSelectOption value="Reject">Reject</IonSelectOption>
        </IonSelect>
    );
}

export default SelectWorkRequestTicketStatus;
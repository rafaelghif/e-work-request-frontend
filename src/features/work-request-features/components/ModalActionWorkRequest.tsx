import { IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { WorkRequestInterface } from "../../../types/work-request-type";
import FormAssign from "./FormAssign";
import FormPic from "./FormPic";

interface ModalActionRequestProps {
    isOpen: boolean;
    data: WorkRequestInterface | undefined;
    onDidDismiss: () => void;
}

const ModalActionRequest: React.FC<ModalActionRequestProps> = ({ isOpen, data, onDidDismiss }) => {
    const [workRequest, setWorkRequest] = useState<WorkRequestInterface>(data!);
    useEffect(() => {
        setWorkRequest(data!);
    }, [data]);
    return (
        <Modal title={`Action ${workRequest?.ticketNumber}`} isOpen={isOpen} onDidDismiss={() => onDidDismiss()}>
            {workRequest ? workRequest?.TicketAssignees[0].status === "Open" ? (
                <FormAssign data={workRequest} onDidDismiss={() => onDidDismiss()} />
            ) : (
                <FormPic data={workRequest} onDidDismiss={() => onDidDismiss()} />
            ) : (
                <IonSpinner name="crescent" />
            )}
        </Modal>
    );
}

export default ModalActionRequest;
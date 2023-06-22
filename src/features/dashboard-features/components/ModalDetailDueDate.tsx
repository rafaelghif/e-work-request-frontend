import Modal from "../../../components/Modal";
import useQueryDueDate from "../hooks/useQueryDueDate";
import TableDetailChart from "./TableDetailChart";
import { IonSpinner } from "@ionic/react";

interface ModalDetailDueDateProps {
    isOpen: boolean;
    dueDate: string;
    onDidDismiss: () => void;
}

const ModalDetailDueDate: React.FC<ModalDetailDueDateProps> = ({ isOpen, dueDate, onDidDismiss }) => {
    const { data, isLoading, isError } = useQueryDueDate(dueDate);
    return (
        <Modal isOpen={isOpen} title={`Backlog ${dueDate}`} onDidDismiss={onDidDismiss} className="modal-xl">
            {isLoading ? (
                <IonSpinner name="crescent" color="primary" />
            ) : (
                <TableDetailChart data={isError ? [] : data.data} />
            )}
        </Modal>
    );
}

export default ModalDetailDueDate;
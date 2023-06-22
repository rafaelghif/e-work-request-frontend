import Modal from "../../../components/Modal";
import useQueryOutstanding from "../hooks/useQueryOutstanding";
import TableDetailChart from "./TableDetailChart";
import { IonSpinner } from "@ionic/react";

interface ModalDetailOutstandingProps {
    isOpen: boolean;
    title: string;
    registrationNumberId: string;
    year: string;
    month: string;
    onDidDismiss: () => void;
}

const ModalDetailOutstanding: React.FC<ModalDetailOutstandingProps> = ({ isOpen, title, registrationNumberId, year, month, onDidDismiss }) => {
    const { data, isLoading, isError } = useQueryOutstanding(year, month, registrationNumberId);
    return (
        <Modal isOpen={isOpen} title={`Backlog ${title}`} onDidDismiss={onDidDismiss} className="modal-xl">
            {isLoading ? (
                <IonSpinner name="crescent" color="primary" />
            ) : (
                <TableDetailChart data={isError ? [] : data.data} />
            )}
        </Modal>
    );
}

export default ModalDetailOutstanding;
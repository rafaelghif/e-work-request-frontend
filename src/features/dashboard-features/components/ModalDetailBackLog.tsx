import Modal from "../../../components/Modal";
import useQueryBackLog from "../hooks/useQueryBackLog";
import TableDetailChart from "./TableDetailChart";
import { IonSpinner } from "@ionic/react";

interface ModalDetailBackLogProps {
    isOpen: boolean;
    title: string;
    registrationNumberId: string;
    year: string;
    month: string;
    onDidDismiss: () => void;
}

const ModalDetailBackLog: React.FC<ModalDetailBackLogProps> = ({ isOpen, title, registrationNumberId, year, month, onDidDismiss }) => {
    const { data, isLoading, isError } = useQueryBackLog(year, month, registrationNumberId);
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

export default ModalDetailBackLog;
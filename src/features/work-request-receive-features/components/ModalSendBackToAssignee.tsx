import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { SendBackToAssignee } from "../../../types/work-request-type";
import { IonItem, IonInput, IonButton } from "@ionic/react";
import SelectTicketAssigneeDepartment from "../../../components/SelectTicketAssigneeDepartment";
import useSendBack from "../hooks/useSendBack";

interface ModalSendBackToAssigneeInterface {
	isOpen: boolean;
	ticketId: string;
	onDidDismiss: () => void;
}

const ModalSendBackToAssignee: React.FC<ModalSendBackToAssigneeInterface> = ({ isOpen, ticketId, onDidDismiss }) => {
	const [formData, setFormData] = useState<SendBackToAssignee>({ ticketId: "", ticketAssigneeIds: [], remark: "" });
	const { mutate } = useSendBack();
	const handleChangeInput = (key: keyof SendBackToAssignee, value: string | string[] | number) => {
		setFormData(old => ({ ...old, [key]: value }));
	}

	useEffect(() => {
		setFormData((prevState) => ({ ...prevState, ticketId: ticketId }));
	}, [ticketId]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formData);
		setFormData((prevState) => ({ ...prevState, ticketAssigneeIds: [], remark: "" }));
		onDidDismiss();
	}

	return (
		<Modal title="Send Back to Assignee" isOpen={isOpen} onDidDismiss={onDidDismiss}>
			<form onSubmit={handleSubmit}>
				<IonItem>
					<IonInput type="text" value={formData.ticketId} label="Badge Id" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("ticketId", e.detail.value!)} disabled readonly />
				</IonItem>
				<SelectTicketAssigneeDepartment ticketId={ticketId} value={formData.ticketAssigneeIds} handleChange={(ticketAssigneeIds) => handleChangeInput("ticketAssigneeIds", ticketAssigneeIds)} />
				<IonItem>
					<IonInput type="text" value={formData.remark} label="Remark" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("remark", e.detail.value!)} required />
				</IonItem>
				<IonButton type="submit" expand="block">Submit</IonButton>
			</form>
		</Modal>
	);
};

export default ModalSendBackToAssignee;
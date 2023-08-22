import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { CreateJigType } from "../types/jig-type";
import { IonButton, IonInput, IonItem } from "@ionic/react";
import useQueryLastSequence from "../hooks/useQueryLastSequence";
import useCreateJig from "../hooks/useCreateJig";

interface ModalCreateJigProps {
	isOpen: boolean;
	onDidDismiss: () => void;
}

const ModalCreateJig: React.FC<ModalCreateJigProps> = ({ isOpen, onDidDismiss }) => {
	const { data, refetch } = useQueryLastSequence();
	const [formData, setFormData] = useState<CreateJigType>({ regNo: "", sequence: 0, location: "", maker: "", name: "", qty: 0, remark: "" });
	const { mutate } = useCreateJig();

	const handleInput = (key: keyof CreateJigType, value: string | number) => {
		setFormData((prevState) => ({ ...prevState, [key]: value }));
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formData);
		onDidDismiss();
		setFormData({ regNo: "", sequence: 0, location: "", maker: "", name: "", qty: 0, remark: "" });
	}

	useEffect(() => {
		if (isOpen) {
			refetch();
		}
	}, [isOpen, refetch]);

	useEffect(() => {
		if (data) {
			setFormData((prevState) => ({ ...prevState, regNo: `JY-${data.sequence + 1}`, sequence: data.sequence + 1 }));
		}
	}, [data]);

	return (
		<Modal title="Create Jig" isOpen={isOpen} onDidDismiss={onDidDismiss}>
			<form onSubmit={handleSubmit}>
				<IonItem>
					<IonInput value={formData.regNo} label="Registration No" labelPlacement="floating" type="text" disabled required />
				</IonItem>
				<IonItem>
					<IonInput value={formData.name} onIonInput={(e) => handleInput("name", e.detail.value!)} label="Jig Name" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData.maker} onIonInput={(e) => handleInput("maker", e.detail.value!)} label="Jig Maker" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData.location} onIonInput={(e) => handleInput("location", e.detail.value!)} label="Jig Location" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData.qty} onIonInput={(e) => handleInput("qty", e.detail.value!)} label="Jig Qty" labelPlacement="floating" type="number" min={1} required />
				</IonItem>
				<IonItem>
					<IonInput value={formData.remark} onIonInput={(e) => handleInput("remark", e.detail.value!)} label="Remark" labelPlacement="floating" type="text" />
				</IonItem>
				<IonButton type="submit" expand="block">Submit</IonButton>
			</form>
		</Modal>
	);
}

export default ModalCreateJig;
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { JigInterface, UpdateJigType } from "../types/jig-type";
import { IonButton, IonInput, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import useUpdateJig from "../hooks/useUpdateJig";

interface ModalUpdateJigProps {
	data: JigInterface | undefined;
	isOpen: boolean;
	onDidDismiss: () => void;
}

const ModalUpdateJig: React.FC<ModalUpdateJigProps> = ({ isOpen, data, onDidDismiss }) => {
	const [formData, setFormData] = useState<UpdateJigType>();
	const { mutate } = useUpdateJig();

	const handleInput = (key: keyof UpdateJigType, value: string | number) => {
		setFormData((prevState) => ({ ...prevState, [key]: value }));
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formData!);
		onDidDismiss();
	}

	useEffect(() => {
		if (data) {
			setFormData((prevState) => ({ ...prevState, id: data.id, regNo: data.regNo, sequence: data.sequence, name: data.name, maker: data.maker, location: data.location, qty: data.qty, remark: data.remark, status: data.status }));
		}
	}, [data]);

	return (
		<Modal title="Update Jig" isOpen={isOpen} onDidDismiss={onDidDismiss}>
			<form onSubmit={handleSubmit}>
				<IonItem>
					<IonInput value={formData?.regNo} label="Registration No" labelPlacement="floating" type="text" disabled required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.name} onIonInput={(e) => handleInput("name", e.detail.value!)} label="Jig Name" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.maker} onIonInput={(e) => handleInput("maker", e.detail.value!)} label="Jig Maker" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.location} onIonInput={(e) => handleInput("location", e.detail.value!)} label="Jig Location" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.qty} onIonInput={(e) => handleInput("qty", e.detail.value!)} label="Jig Qty" labelPlacement="floating" type="number" min={1} required />
				</IonItem>
				<IonItem>
					<IonSelect value={formData?.status} onIonChange={(e) => handleInput("status", e.detail.value!)} label="Status" labelPlacement="floating"  >
						<IonSelectOption value="Operation">Operation</IonSelectOption>
						<IonSelectOption value="Superseded">Superseded</IonSelectOption>
					</IonSelect>
				</IonItem>
				<IonItem>
					<IonInput value={formData?.remark} onIonInput={(e) => handleInput("remark", e.detail.value!)} label="Remark" labelPlacement="floating" type="text" />
				</IonItem>
				<IonButton type="submit" expand="block">Submit</IonButton>
			</form>
		</Modal>
	);
}

export default ModalUpdateJig;
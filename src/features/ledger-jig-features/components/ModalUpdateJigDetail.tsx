import { useEffect, useRef, useState } from "react";
import Modal from "../../../components/Modal";
import { IonButton, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { JigDetailInterface, UpdateJigDetailType } from "../types/jig-detail-type";
import { closeOutline } from "ionicons/icons";
import useUpdateJigDetail from "../hooks/useUpdateJigDetail";

interface ModalUpdateJigDetailProps {
	data: JigDetailInterface | undefined;
	isOpen: boolean;
	onDidDismiss: () => void;
}

const ModalUpdateJigDetail: React.FC<ModalUpdateJigDetailProps> = ({ data, isOpen, onDidDismiss }) => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [formData, setFormData] = useState<UpdateJigDetailType>();

	const { mutate } = useUpdateJigDetail(data?.LedgerJigId || "");

	const handleInput = (key: keyof UpdateJigDetailType, value: string | number) => {
		setFormData((prevState) => ({ ...prevState, [key]: value }));
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formData!);
		onDidDismiss();
	}

	const handleChangeAttachment = (file: File | undefined) => {
		setFormData(old => ({ ...old, picture: file }));
	}

	const handleRemoveAttachment = () => {
		if (inputFileRef.current?.value) {
			inputFileRef.current.value = "";
			setFormData((old) => ({ ...old, picture: undefined }));
		}
	}

	useEffect(() => {
		setFormData((prevState) => ({
			...prevState,
			id: data?.id,
			regNo: data?.regNo,
			approveBy: data?.approveBy,
			checkedBy: data?.checkedBy,
			makeBy: data?.makeBy,
			registrationDate: data?.registrationDate,
			machineUse: data?.machineUse,
			partNo: data?.partNo,
			partName: data?.partName,
			acquiredDate: data?.acquiredDate,
			location: data?.location,
			LedgerJigId: data?.LedgerJigId
		}));
	}, [data]);

	return (
		<Modal title="Update Jig Detail" isOpen={isOpen} onDidDismiss={onDidDismiss}>
			<form onSubmit={handleSubmit}>
				<IonItem>
					<IonInput value={formData?.regNo} onIonInput={(e) => handleInput("regNo", e.detail.value!)} label="Registration No" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.approveBy} onIonInput={(e) => handleInput("approveBy", e.detail.value!)} label="Approve" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.checkedBy} onIonInput={(e) => handleInput("checkedBy", e.detail.value!)} label="Check" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.makeBy} onIonInput={(e) => handleInput("makeBy", e.detail.value!)} label="Make" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.location} onIonInput={(e) => handleInput("location", e.detail.value!)} label="Location" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.machineUse} onIonInput={(e) => handleInput("machineUse", e.detail.value!)} label="Machine Use" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.partNo} onIonInput={(e) => handleInput("partNo", e.detail.value!)} label="Part No" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.partName} onIonInput={(e) => handleInput("partName", e.detail.value!)} label="Part Name" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.registrationDate} onIonInput={(e) => handleInput("registrationDate", e.detail.value!)} label="Registration Date" labelPlacement="floating" type="date" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.acquiredDate} onIonInput={(e) => handleInput("acquiredDate", e.detail.value!)} label="Acquired Date" labelPlacement="floating" type="date" required />
				</IonItem>
				<IonItem>
					<IonInput value={formData?.remark} onIonInput={(e) => handleInput("remark", e.detail.value!)} label="Remark" labelPlacement="floating" type="text" required />
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">
						Picture File
						{formData?.picture ? (
							<IonButton fill="clear" color="danger" className="ml-2 -mt-2" onClick={() => handleRemoveAttachment()}>Remove Picture<IonIcon icon={closeOutline} /></IonButton>
						) : null}
					</IonLabel>
					<input ref={inputFileRef} type="file" className="mt-5" onChange={(e) => handleChangeAttachment(e.target.files?.[0])} accept=".png,.jpg,.jpeg" required />
				</IonItem>
				<IonButton type="submit" expand="block" className="mt-2">Submit</IonButton>
			</form>
		</Modal>
	);
}

export default ModalUpdateJigDetail;
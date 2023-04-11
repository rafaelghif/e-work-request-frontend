import { IonButton, IonInput, IonItem } from "@ionic/react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import useUpdateDepartment from "../hooks/useUpdateDepartment";
import { DepartmentInterface } from "../types/department-type";

interface ModalUpdateDepartmentProps {
    data: DepartmentInterface | undefined;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const ModalUpdateDepartment: React.FC<ModalUpdateDepartmentProps> = ({ data, isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<DepartmentInterface>(data!);
    const { mutate } = useUpdateDepartment();

    const handleChangeInput = (key: keyof DepartmentInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData!);
        onDidDismiss();
    }

    useEffect(() => {
        setFormData(data!);
    }, [data]);

    return (
        <Modal isOpen={isOpen} title="Update Department" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonInput type="text" value={formData?.id} label="Id" labelPlacement="floating" onIonChange={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.abbreviation} label="Abbreviation" labelPlacement="floating" onIonChange={(e) => handleChangeInput("abbreviation", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateDepartment;
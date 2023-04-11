import { IonButton, IonInput, IonItem } from "@ionic/react";
import { useState } from "react";
import Modal from "../../../components/Modal";
import useCreateDepartment from "../hooks/useCreateDepartment";
import { CreateDepartmentInterface } from "../types/department-type";

interface ModalCreateDepartmentProps {
    isOpen: boolean;
    onDidDismiss: () => void;
}

const initialValue: CreateDepartmentInterface = { name: "", abbreviation: "" }

const ModalCreateDepartment: React.FC<ModalCreateDepartmentProps> = ({ isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<CreateDepartmentInterface>(initialValue);
    const { mutate } = useCreateDepartment();

    const handleChangeInput = (key: keyof CreateDepartmentInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        setFormData(initialValue);
        onDidDismiss();
    }

    return (
        <Modal isOpen={isOpen} title="Create Department" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonInput type="text" value={formData.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData.abbreviation} label="Abbreviation" labelPlacement="floating" onIonChange={(e) => handleChangeInput("abbreviation", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateDepartment;
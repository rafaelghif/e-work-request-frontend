import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
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

    const handleChangeInput = (key: keyof CreateDepartmentInterface, value: string | boolean) => {
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
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={formData.name} onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Abbreviation</IonLabel>
                    <IonInput type="text" value={formData.abbreviation} onIonChange={(e) => handleChangeInput("abbreviation", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateDepartment;
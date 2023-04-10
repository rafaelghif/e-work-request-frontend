import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import useCreateSection from "../hooks/useCreateSection";
import { CreateSectionInterface } from "../types/section-type";

interface ModalCreateSectionProps {
    departmentId: string;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const initialValue: CreateSectionInterface = { name: "", level: 0.0, departmentId: "" }

const ModalCreateSection: React.FC<ModalCreateSectionProps> = ({ departmentId, isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<CreateSectionInterface>(initialValue);
    const { mutate } = useCreateSection();

    const handleChangeInput = (key: keyof CreateSectionInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        setFormData(old => ({ ...old, name: "", level: 0.0 }));
        onDidDismiss();
    }

    useEffect(() => {
        setFormData(old => ({ ...old, departmentId: departmentId }));
    }, [departmentId]);

    return (
        <Modal isOpen={isOpen} title="Create Section" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonLabel position="floating">DepartmentId</IonLabel>
                    <IonInput type="text" value={formData.departmentId} onIonChange={(e) => handleChangeInput("departmentId", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={formData.name} onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Level</IonLabel>
                    <IonInput type="number" value={formData.level} onIonChange={(e) => handleChangeInput("level", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateSection;
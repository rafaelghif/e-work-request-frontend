import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";
import Modal from "../../../components/Modal";
import useCreateRegistrationNumber from "../hooks/useCreateRegistrationNumber";
import { CreateRegistrationNumberInterface } from "../types/registration-number-type";


interface ModalCreateRegistrationNumberProps {
    isOpen: boolean;
    onDidDismiss: () => void;
}

const initialValue: CreateRegistrationNumberInterface = { name: "", format: "", year: 0 }

const ModalCreateRegistrationNumber: React.FC<ModalCreateRegistrationNumberProps> = ({ isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<CreateRegistrationNumberInterface>(initialValue);
    const { mutate } = useCreateRegistrationNumber();

    const handleChangeInput = (key: keyof CreateRegistrationNumberInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        setFormData(initialValue);
        onDidDismiss();
    }

    return (
        <Modal isOpen={isOpen} title="Create Registration Number" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={formData.name} onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Format</IonLabel>
                    <IonInput type="text" value={formData.format} onIonChange={(e) => handleChangeInput("format", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Year</IonLabel>
                    <IonInput type="number" value={formData.year} onIonChange={(e) => handleChangeInput("year", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateRegistrationNumber;
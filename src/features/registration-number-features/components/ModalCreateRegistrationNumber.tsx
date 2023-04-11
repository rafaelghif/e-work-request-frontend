import { IonButton, IonInput, IonItem } from "@ionic/react";
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
                    <IonInput type="text" value={formData.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData.format} label="Format" labelPlacement="floating" onIonChange={(e) => handleChangeInput("format", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="number" value={formData.year} label="Year" labelPlacement="floating" onIonChange={(e) => handleChangeInput("year", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateRegistrationNumber;
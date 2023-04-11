import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import useUpdateRegistrationNumber from "../hooks/useUpdateRegistrationNumber";
import { RegistrationNumberInterface } from "../types/registration-number-type";


interface ModalCreateRegistrationNumberProps {
    data: RegistrationNumberInterface | undefined;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const ModalUpdateRegistrationNumber: React.FC<ModalCreateRegistrationNumberProps> = ({ data, isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<RegistrationNumberInterface>(data!);
    const { mutate } = useUpdateRegistrationNumber();

    const handleChangeInput = (key: keyof RegistrationNumberInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        onDidDismiss();
    }

    useEffect(() => {
        setFormData(data!);
    }, [data])

    return (
        <Modal isOpen={isOpen} title="Update Registration Number" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonLabel position="floating">Id</IonLabel>
                    <IonInput type="text" value={formData?.id} onIonChange={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={formData?.name} onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Format</IonLabel>
                    <IonInput type="text" value={formData?.format} onIonChange={(e) => handleChangeInput("format", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Year</IonLabel>
                    <IonInput type="number" value={formData?.year} onIonChange={(e) => handleChangeInput("year", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Last Number</IonLabel>
                    <IonInput type="number" value={formData?.lastNumber} onIonChange={(e) => handleChangeInput("lastNumber", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateRegistrationNumber;
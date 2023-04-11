import { IonButton, IonInput, IonItem } from "@ionic/react";
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
                    <IonInput type="text" value={formData?.id} label="Id" labelPlacement="floating" onIonChange={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.format} label="Format" labelPlacement="floating" onIonChange={(e) => handleChangeInput("format", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="number" value={formData?.year} label="Year" labelPlacement="floating" onIonChange={(e) => handleChangeInput("year", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="number" value={formData?.lastNumber} label="Last Number" labelPlacement="floating" onIonChange={(e) => handleChangeInput("lastNumber", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateRegistrationNumber;
import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import useUpdateSection from "../hooks/useUpdateSection";
import { SectionInterface } from "../types/section-type";

interface ModalUpdateSectionProps {
    data: SectionInterface | undefined;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const ModalUpdateSection: React.FC<ModalUpdateSectionProps> = ({ data, isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<SectionInterface>(data!);
    const { mutate } = useUpdateSection();

    const handleChangeInput = (key: keyof SectionInterface, value: string | number | boolean) => {
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
        <Modal isOpen={isOpen} title="Update Section" onDidDismiss={() => onDidDismiss()}>
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
                    <IonLabel position="floating">Level</IonLabel>
                    <IonInput type="text" value={formData?.level} onIonChange={(e) => handleChangeInput("level", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateSection;
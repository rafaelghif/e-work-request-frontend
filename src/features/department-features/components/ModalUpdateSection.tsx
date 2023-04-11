import { IonButton, IonInput, IonItem } from "@ionic/react";
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
                    <IonInput type="text" value={formData?.id} label="Id" labelPlacement="floating" onIonChange={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.level} label="Level" labelPlacement="floating" onIonChange={(e) => handleChangeInput("level", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateSection;
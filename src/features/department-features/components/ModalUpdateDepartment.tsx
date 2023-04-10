import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
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

    const handleChangeInput = (key: keyof DepartmentInterface, value: string | boolean) => {
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
                    <IonLabel position="floating">Id</IonLabel>
                    <IonInput type="text" value={formData?.id} onIonChange={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={formData?.name} onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Abbreviation</IonLabel>
                    <IonInput type="text" value={formData?.abbreviation} onIonChange={(e) => handleChangeInput("abbreviation", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateDepartment;
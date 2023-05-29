import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { UpdateWorkRequestOldType } from "../../../types/work-request-old-type";
import { IonButton, IonInput, IonItem } from "@ionic/react";
import useUpdateWorkRequestOldList from "../hooks/useUpdateWorkRequestOldList";

interface ModalEditWorkRequestOldInterface {
    data?: UpdateWorkRequestOldType | undefined;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const ModalEditWorkRequestOld: React.FC<ModalEditWorkRequestOldInterface> = ({ isOpen, data, onDidDismiss }) => {
    const [formData, setFormData] = useState<UpdateWorkRequestOldType>();
    const { mutate } = useUpdateWorkRequestOldList();

    const handleChangeInput = (key: keyof UpdateWorkRequestOldType, value: string) => {
        setFormData((old) => ({ ...old, [key]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData!);
        onDidDismiss();
    }

    useEffect(() => {
        setFormData((old) => ({ ...old, id: data?.id, woNo: data?.woNo, location: data?.location, description: data?.description, remark: data?.remark, receivedDate: data?.receivedDate, completedDate: data?.completedDate }));
    }, [data]);

    return (
        <Modal title="Update Work Request" isOpen={isOpen} onDidDismiss={onDidDismiss}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonInput value={formData?.id} label="Id" labelPlacement="floating" onIonInput={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput value={formData?.woNo} label="WO No" labelPlacement="floating" onIonInput={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput value={formData?.location} label="Location" labelPlacement="floating" onIonInput={(e) => handleChangeInput("location", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput value={formData?.description} label="Description" labelPlacement="floating" onIonInput={(e) => handleChangeInput("description", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput value={formData?.remark} label="Remark" labelPlacement="floating" onIonInput={(e) => handleChangeInput("remark", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput type="date" value={formData?.receivedDate} label="Receive Date" labelPlacement="floating" onIonInput={(e) => handleChangeInput("receivedDate", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="date" value={formData?.completedDate} label="Complete Date" labelPlacement="floating" onIonInput={(e) => handleChangeInput("completedDate", e.detail.value!)} required />
                </IonItem>
                <IonButton type="submit" expand="block">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalEditWorkRequestOld;
import { IonButton, IonInput, IonItem, IonSpinner } from "@ionic/react";
import { lazy, Suspense, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import useUpdateLine from "../hooks/useUpdateLine";
import { LineInterface } from "../types/line-type";

const SelectDepartment = lazy(() => import("../../../components/SelectDepartment"));

interface ModalCreateLineProps {
    data: LineInterface | undefined;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const ModalUpdateLine: React.FC<ModalCreateLineProps> = ({ data, isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<LineInterface>(data!);
    const { mutate } = useUpdateLine();

    const handleChangeInput = (key: keyof LineInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        onDidDismiss();
    }

    useEffect(() => {
        setFormData(data!);
    }, [data]);

    return (
        <Modal isOpen={isOpen} title="Update Line" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonInput type="text" value={formData?.id} label="Id" labelPlacement="floating" onIonChange={(e) => handleChangeInput("id", e.detail.value!)} required disabled />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectDepartment value={formData?.DepartmentId} handleChange={(departmentId) => handleChangeInput("DepartmentId", departmentId)} />
                    </Suspense>
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateLine;
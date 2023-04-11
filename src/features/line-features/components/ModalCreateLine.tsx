import { IonButton, IonInput, IonItem, IonSpinner } from "@ionic/react";
import { lazy, Suspense, useState } from "react";
import Modal from "../../../components/Modal";
import useCreateLine from "../hooks/useCreateLine";
import { CreateLineInterface } from "../types/line-type";

const SelectDepartment = lazy(() => import("../../../components/SelectDepartment"));

interface ModalCreateLineProps {
    isOpen: boolean;
    onDidDismiss: () => void;
}

const initialValue: CreateLineInterface = { name: "", DepartmentId: "" }

const ModalCreateLine: React.FC<ModalCreateLineProps> = ({ isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<CreateLineInterface>(initialValue);
    const { mutate } = useCreateLine();

    const handleChangeInput = (key: keyof CreateLineInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        setFormData(initialValue);
        onDidDismiss();
    }

    return (
        <Modal isOpen={isOpen} title="Create Line" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonInput type="text" value={formData.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectDepartment value={formData.DepartmentId} handleChange={(departmentId) => handleChangeInput("DepartmentId", departmentId)} />
                    </Suspense>
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateLine;
import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonSpinner } from "@ionic/react";
import { lazy, Suspense, useState } from "react";
import Modal from "../../../components/Modal";
import useCreateUser from "../hooks/useCreateUser";
import { CreateUserInterface } from "../types/user-type";

const SelectDepartment = lazy(() => import("../../../components/SelectDepartment"));
const SelectSection = lazy(() => import("../../../components/SelectSection"));
const SelectLine = lazy(() => import("../../../components/SelectLine"));

interface ModalCreateUserProps {
    isOpen: boolean;
    onDidDismiss: () => void;
}

const initialValue: CreateUserInterface = { badgeId: "", password: "", name: "", email: "", role: "", DepartmentId: "", SectionId: "", LineId: "" }

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<CreateUserInterface>(initialValue);
    const { mutate } = useCreateUser();

    const handleChangeInput = (key: keyof CreateUserInterface, value: string | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        setFormData(initialValue);
        onDidDismiss();
    }

    return (
        <Modal isOpen={isOpen} title="Create User" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonLabel position="floating">BadgeId</IonLabel>
                    <IonInput type="text" value={formData.badgeId} minlength={8} maxlength={8} onIonChange={(e) => handleChangeInput("badgeId", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" value={formData.password} onIonChange={(e) => handleChangeInput("password", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={formData.name} onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" value={formData.email} onIonChange={(e) => handleChangeInput("email", e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Role</IonLabel>
                    <IonSelect value={formData.role} onIonChange={(e) => handleChangeInput("role", e.detail.value!)}>
                        <IonSelectOption value="BASIC">Basic</IonSelectOption>
                        <IonSelectOption value="ADMIN">Admin</IonSelectOption>
                        <IonSelectOption value="SUPER USER">Super User</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Department</IonLabel>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectDepartment value={formData.DepartmentId} handleChange={(departmentId) => handleChangeInput("DepartmentId", departmentId)} />
                    </Suspense>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Section</IonLabel>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectSection value={formData.SectionId} departmentId={formData.DepartmentId} handleChange={(sectionId) => handleChangeInput("SectionId", sectionId)} />
                    </Suspense>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Line</IonLabel>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectLine value={formData.LineId} departmentId={formData.DepartmentId} handleChange={(lineId) => handleChangeInput("LineId", lineId)} />
                    </Suspense>
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalCreateUser;
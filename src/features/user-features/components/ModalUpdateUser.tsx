import { IonButton, IonInput, IonItem, IonSelect, IonSelectOption, IonSpinner } from "@ionic/react";
import { lazy, Suspense, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import useUpdateUser from "../hooks/useUpdateUser";
import { UpdateUserInterface, UserInterface } from "../types/user-type";

const SelectDepartment = lazy(() => import("../../../components/SelectDepartment"));
const SelectSection = lazy(() => import("../../../components/SelectSection"));
const SelectLine = lazy(() => import("../../../components/SelectLine"));

interface ModalUpdateUserProps {
    data: UserInterface | undefined;
    isOpen: boolean;
    onDidDismiss: () => void;
}

const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({ data, isOpen, onDidDismiss }) => {
    const [formData, setFormData] = useState<UpdateUserInterface>(data!);
    const { mutate } = useUpdateUser();

    const handleChangeInput = (key: keyof UpdateUserInterface, value: string | number | boolean) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        onDidDismiss();
    }

    useEffect(() => {
        setFormData(old => ({
            ...old,
            id: data?.id!,
            badgeId: data?.badgeId!,
            password: data?.password!,
            name: data?.name!,
            email: data?.email!,
            role: data?.role!,
            DepartmentId: data?.DepartmentId!,
            SectionId: data?.SectionId!
        }));
    }, [data]);

    return (
        <Modal isOpen={isOpen} title="Create User" onDidDismiss={() => onDidDismiss()}>
            <form onSubmit={handleSubmit}>
                <IonItem>
                    <IonInput type="text" value={formData?.badgeId} label="BadgeId" labelPlacement="floating" minlength={8} maxlength={8} onIonChange={(e) => handleChangeInput("badgeId", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="password" value={formData?.password} label="Password" labelPlacement="floating" onIonChange={(e) => handleChangeInput("password", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="text" value={formData?.name} label="Name" labelPlacement="floating" onIonChange={(e) => handleChangeInput("name", e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="email" value={formData?.email} label="Email" labelPlacement="floating" onIonChange={(e) => handleChangeInput("email", e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonSelect value={formData?.role} label="Role" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("role", e.detail.value!)}>
                        <IonSelectOption value="BASIC">Basic</IonSelectOption>
                        <IonSelectOption value="ADMIN">Admin</IonSelectOption>
                        <IonSelectOption value="SUPER USER">Super User</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectDepartment value={formData?.DepartmentId} handleChange={(departmentId) => handleChangeInput("DepartmentId", departmentId)} />
                    </Suspense>
                </IonItem>
                <IonItem>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectSection value={formData?.SectionId} departmentId={formData?.DepartmentId} handleChange={(sectionId) => handleChangeInput("SectionId", sectionId)} />
                    </Suspense>
                </IonItem>
                <IonItem>
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <SelectLine value={formData?.LineId} departmentId={formData?.DepartmentId} handleChange={(lineId) => handleChangeInput("LineId", lineId)} />
                    </Suspense>
                </IonItem>
                <IonButton type="submit" expand="block" className="mt-3">Submit</IonButton>
            </form>
        </Modal>
    );
}

export default ModalUpdateUser;
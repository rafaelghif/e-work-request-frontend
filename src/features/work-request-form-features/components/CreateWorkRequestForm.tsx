import { IonItem, IonInput, IonTextarea, IonSpinner, IonButton } from "@ionic/react";
import { lazy, Suspense, useEffect, useState } from "react";
import SelectMultipleDepartment from "../../../components/SelectMultipleDepartment";
import { useAppSelector } from "../../../redux/hook";
import useCreateWorkRequest from "../hooks/useCreateWorkRequest";
import { CreateWorkRequestFormInterface } from "../types/work-request-form-type";

const SelectDepartment = lazy(() => import("../../../components/SelectDepartment"));
const SelectLine = lazy(() => import("../../../components/SelectLine"));
const SelectRegistrationNumber = lazy(() => import("../../../components/SelectRegistrationNumber"));

const CreateWorkRequestForm: React.FC = () => {
    const department = useAppSelector((state) => state.department);
    const line = useAppSelector((state) => state.line);
    const [formData, setFormData] = useState<CreateWorkRequestFormInterface>({ title: "", description: "", jigToolNo: "", qty: 0, expectDueDate: "", RequesterLineId: "", RequesterDepartmentId: "", AssigneeDepartmentIds: [], RegistrationNumberId: "" });
    const { mutate } = useCreateWorkRequest();

    const handleChangeInput = (key: keyof CreateWorkRequestFormInterface, value: string | number | string[]) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleChangeInputRequestDepartment = (key: keyof CreateWorkRequestFormInterface, value: string | number) => {
        setFormData(old => ({ ...old, [key]: value, RequesterLineId: "" }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        setFormData(old => ({ ...old, title: "", description: "", jigToolNo: "", qty: 0, expectDueDate: "", AssigneeDepartmentIds: [], RegistrationNumberId: "" }));
    }

    useEffect(() => {
        setFormData(old => ({ ...old, RequesterDepartmentId: department.id, RequesterLineId: line.id }));
    }, [department, line]);

    return (
        <form onSubmit={handleSubmit}>
            <IonItem className="mt-2">
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectRegistrationNumber value={formData.RegistrationNumberId} handleChange={(registrationNumberId) => handleChangeInput("RegistrationNumberId", registrationNumberId)} />
                </Suspense>
            </IonItem>
            <IonItem>
                <IonInput type="text" value={formData.title} label="Title" labelPlacement="floating" onIonChange={(e) => handleChangeInput("title", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonTextarea value={formData.description} label="Description" labelPlacement="floating" onIonChange={(e) => handleChangeInput("description", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput type="text" value={formData.jigToolNo} label="M/C Jig Tool No" labelPlacement="floating" onIonChange={(e) => handleChangeInput("jigToolNo", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput type="number" value={formData.qty} label="Qty" labelPlacement="floating" onIonChange={(e) => handleChangeInput("qty", parseInt(e.detail.value?.toString()!))} />
            </IonItem>
            <IonItem>
                <IonInput type="date" value={formData.expectDueDate} label="Except Due Date" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("expectDueDate", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectDepartment value={formData.RequesterDepartmentId} label="Requester Department" handleChange={(departmentId) => handleChangeInputRequestDepartment("RequesterDepartmentId", departmentId)} />
                </Suspense>
            </IonItem>
            <IonItem>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectLine value={formData.RequesterLineId} label="Requester Line" departmentId={formData.RequesterDepartmentId} handleChange={(lineId) => handleChangeInput("RequesterLineId", lineId)} />
                </Suspense>
            </IonItem>
            <IonItem>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectMultipleDepartment value={formData.AssigneeDepartmentIds} label="Assignee Department" handleChange={(department) => handleChangeInput("AssigneeDepartmentIds", department)} />
                </Suspense>
            </IonItem>
            <IonButton type="submit" expand="block" fill="clear" className="mt-3">Submit</IonButton>
        </form>
    );
}

export default CreateWorkRequestForm;
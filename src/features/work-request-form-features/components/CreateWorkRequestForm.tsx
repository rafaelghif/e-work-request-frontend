import { IonItem, IonLabel, IonInput, IonTextarea, IonSpinner, IonButton, IonNote } from "@ionic/react";
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
                <IonLabel position="stacked">Registration Number Type</IonLabel>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectRegistrationNumber value={formData.RegistrationNumberId} handleChange={(registrationNumberId) => handleChangeInput("RegistrationNumberId", registrationNumberId)} />
                </Suspense>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Title</IonLabel>
                <IonInput type="text" value={formData.title} onIonChange={(e) => handleChangeInput("title", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonTextarea value={formData.description} onIonChange={(e) => handleChangeInput("description", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">M/C Jig Tool No</IonLabel>
                <IonInput type="text" value={formData.jigToolNo} onIonChange={(e) => handleChangeInput("jigToolNo", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Qty</IonLabel>
                <IonInput type="number" value={formData.qty} onIonChange={(e) => handleChangeInput("qty", parseInt(e.detail.value?.toString()!))} />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Except Due Date</IonLabel>
                <IonInput type="date" value={formData.expectDueDate} onIonChange={(e) => handleChangeInput("expectDueDate", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Requester Department</IonLabel>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectDepartment value={formData.RequesterDepartmentId} handleChange={(departmentId) => handleChangeInputRequestDepartment("RequesterDepartmentId", departmentId)} />
                </Suspense>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Requester Line</IonLabel>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectLine value={formData.RequesterLineId} departmentId={formData.RequesterDepartmentId} handleChange={(lineId) => handleChangeInput("RequesterLineId", lineId)} />
                </Suspense>
                <IonNote slot="helper">If you have a line, select it. </IonNote>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Assignee Department</IonLabel>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectMultipleDepartment value={formData.AssigneeDepartmentIds} handleChange={(department) => handleChangeInput("AssigneeDepartmentIds", department)} />
                </Suspense>
            </IonItem>
            <IonButton type="submit" expand="block" fill="clear" className="mt-3">Submit</IonButton>
        </form>
    );
}

export default CreateWorkRequestForm;
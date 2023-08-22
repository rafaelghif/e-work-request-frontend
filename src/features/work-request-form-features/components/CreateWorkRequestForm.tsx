import { IonItem, IonInput, IonTextarea, IonSpinner, IonButton, IonLabel, IonIcon } from "@ionic/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import SelectMultipleDepartment from "../../../components/SelectMultipleDepartment";
import { useAppSelector } from "../../../redux/hook";
import useCreateWorkRequest from "../hooks/useCreateWorkRequest";
import { CreateWorkRequestFormInterface } from "../types/work-request-form-type";
import { closeOutline } from "ionicons/icons";

const SelectDepartment = lazy(() => import("../../../components/SelectDepartment"));
const SelectLine = lazy(() => import("../../../components/SelectLine"));
const SelectRegistrationNumber = lazy(() => import("../../../components/SelectRegistrationNumber"));

const CreateWorkRequestForm: React.FC = () => {
    const department = useAppSelector((state) => state.department);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const line = useAppSelector((state) => state.line);
    const [formData, setFormData] = useState<CreateWorkRequestFormInterface>({ description: "", jigToolNo: "-", qty: 0, expectDueDate: "", RequesterLineId: "", RequesterDepartmentId: "", AssigneeDepartmentIds: [], RegistrationNumberId: "", attachmentFile: undefined });
    const { mutate } = useCreateWorkRequest();

    const handleChangeInput = (key: keyof CreateWorkRequestFormInterface, value: string | number | string[]) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    const handleChangeInputRequestDepartment = (key: keyof CreateWorkRequestFormInterface, value: string | number) => {
        setFormData(old => ({ ...old, [key]: value, RequesterLineId: "" }));
    }

    const handleRemoveAttachment = () => {
        if (inputFileRef.current?.value) {
            inputFileRef.current.value = "";
            setFormData((old) => ({ ...old, attachmentFile: undefined }));
        }
    }

    const handleChangeAttachment = (file: File | undefined) => {
        setFormData(old => ({ ...old, attachmentFile: file }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        if (inputFileRef.current?.files) {
            inputFileRef.current.value = "";
        }
        setFormData(old => ({ ...old, description: "", jigToolNo: "-", qty: 0, expectDueDate: "", AssigneeDepartmentIds: [], RegistrationNumberId: "", attachmentFile: undefined }));
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
                <IonTextarea value={formData.description} label="Description" labelPlacement="floating" onIonChange={(e) => handleChangeInput("description", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput type="text" value={formData.jigToolNo} label="M/C Jig Tool No" labelPlacement="floating" onIonChange={(e) => handleChangeInput("jigToolNo", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput type="number" value={formData.qty} label="Qty" labelPlacement="floating" onIonChange={(e) => handleChangeInput("qty", parseInt(e.detail.value?.toString()!))} min={0} />
            </IonItem>
            <IonItem>
                <IonInput type="date" value={formData.expectDueDate} label="Except Due Date" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("expectDueDate", e.detail.value!)} />
            </IonItem>
            <IonItem>
                <Suspense fallback={<IonSpinner name="crescent" />}>
                    <SelectDepartment value={formData.RequesterDepartmentId} label="Requester Department" handleChange={(departmentId) => handleChangeInputRequestDepartment("RequesterDepartmentId", departmentId)} isDisabled={true} />
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
            <IonItem>
                <IonLabel position="stacked">
                    Attachment File
                    {formData?.attachmentFile ? (
                        <IonButton fill="clear" color="danger" className="ml-2 -mt-2" onClick={() => handleRemoveAttachment()}>Remove Attachment<IonIcon icon={closeOutline} /></IonButton>
                    ) : null}
                </IonLabel>
                <input ref={inputFileRef} type="file" className="mt-5" onChange={(e) => handleChangeAttachment(e.target.files?.[0])} accept=".png,.jpg,.jpeg,.pdf,.zip,.xlsx,.xls,.txt,.csv,.docx" />
            </IonItem>
            <IonButton type="submit" expand="block" fill="clear" className="mt-3">Submit</IonButton>
        </form>
    );
}

export default CreateWorkRequestForm;
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonSpinner, IonTextarea } from "@ionic/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { WorkRequestInterface } from "../../../types/work-request-type";
import useAssignTicket from "../hooks/useAssignTicket";
import { AssignTicketInterface } from "../types/work-request-type";

const SelectPic = lazy(() => import("../../../components/SelectPic"));

interface FormAssignProps {
    data: WorkRequestInterface;
    onDidDismiss: () => void;
}

export const FormAssign: React.FC<FormAssignProps> = ({ data, onDidDismiss }) => {
    const [formData, setFormData] = useState<AssignTicketInterface>({ id: data.id, ticketAssigneeId: data.TicketAssignees[0].id, PersonInChargeId: "", ticketStatus: "Progress", remark: "" });
    const { mutate } = useAssignTicket();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        onDidDismiss();
    }

    const handleChangeInput = (key: keyof AssignTicketInterface, value: string | boolean) => {
        if (key === "ticketStatus" && value === "Reject") {
            setFormData(old => ({ ...old, [key]: value, remark: "" }));
        } else {
            setFormData(old => ({ ...old, [key]: value }));
        }
    }

    useEffect(() => {
        setFormData(old => ({ ...old, id: data.id }));
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonSelect value={formData.ticketStatus} onIonChange={(e) => handleChangeInput("ticketStatus", e.detail.value!)}>
                    <IonSelectOption value="Progress">Progress</IonSelectOption>
                    <IonSelectOption value="Reject">Reject</IonSelectOption>
                </IonSelect>
            </IonItem>
            {formData.ticketStatus === "Progress" ? (
                <>
                    <IonItem>
                        <IonLabel position="stacked">PIC</IonLabel>
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <SelectPic value={formData.PersonInChargeId} handleChange={(personInChargeId) => handleChangeInput("PersonInChargeId", personInChargeId)} />
                        </Suspense>
                    </IonItem>
                    <IonButton type="submit" expand="block" fill="clear">Submit</IonButton>
                </>
            ) : (
                <>
                    <IonItem>
                        <IonLabel position="stacked">Remark</IonLabel>
                        <IonTextarea value={formData?.remark} onIonChange={(e) => handleChangeInput("remark", e.detail.value!)} />
                    </IonItem>
                    <IonButton type="submit" expand="block" fill="clear">Submit</IonButton>
                </>
            )}


        </form>
    );
}

export default FormAssign;
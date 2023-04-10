import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { WorkRequestInterface } from "../../../types/work-request-type";
import usePicActionTicket from "../hooks/usePicActionTicket";
import { PicActionTicketInterface } from "../types/work-request-type";

interface FormAsFormPicProps {
    data: WorkRequestInterface;
    onDidDismiss: () => void;
}

export const FormPic: React.FC<FormAsFormPicProps> = ({ data, onDidDismiss }) => {
    const [formData, setFormData] = useState<PicActionTicketInterface>({ id: data.id, ticketAssigneeId: data.TicketAssignees[0].id, ticketStatus: "Progress", timeTaken: "", remark: "" });
    const [timeTaken, setTimeTaken] = useState<number>(0);
    const [timeTakenSuffix, setTimeTakenSuffix] = useState<string>("Minutes");
    const { mutate } = usePicActionTicket();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
        onDidDismiss();
    }

    const handleChangeInput = (key: keyof PicActionTicketInterface, value: string | boolean) => {
        if (key === "ticketStatus" && value === "Complete") {
            setTimeTaken(0);
            setTimeTakenSuffix("Minutes");
            setFormData(old => ({ ...old, [key]: value, timeTaken: "", remark: "" }));
        } else {
            setFormData(old => ({ ...old, [key]: value }));
        }
    }

    const handleChangeTimeTaken = (val: number) => {
        setTimeTaken(val);
        setFormData(old => ({ ...old, timeTaken: `${val} ${timeTakenSuffix}` }));
    }
    return (
        <form onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonSelect value={formData.ticketStatus} onIonChange={(e) => handleChangeInput("ticketStatus", e.detail.value!)}>
                    <IonSelectOption value="Progress">Progress</IonSelectOption>
                    <IonSelectOption value="Complete">Complete</IonSelectOption>
                    <IonSelectOption value="Pending">Pending</IonSelectOption>
                </IonSelect>
            </IonItem>
            {formData.ticketStatus === "Progress" || formData.ticketStatus === "Pending" ? (
                <>
                    <IonItem>
                        <IonLabel position="floating">Remark</IonLabel>
                        <IonTextarea value={formData.remark} onIonChange={(e) => handleChangeInput("remark", e.detail.value!)} />
                    </IonItem>
                </>
            ) : (
                <div className="flex w-full">
                    <div className="w-9/12">
                        <IonItem>
                            <IonLabel position="floating">Time Taken</IonLabel>
                            <IonInput type="number" min={1} value={timeTaken} onIonChange={(e) => handleChangeTimeTaken(parseInt(e.detail.value!))} />
                        </IonItem>
                    </div>
                    <div className="w-3/12">
                        <IonItem>
                            <IonLabel position="stacked">Suffix</IonLabel>
                            <IonSelect value={timeTakenSuffix} onIonChange={(e) => setTimeTakenSuffix(e.detail.value!)}>
                                <IonSelectOption value="Minutes">Minutes</IonSelectOption>
                                <IonSelectOption value="Hours">Hours</IonSelectOption>
                                <IonSelectOption value="Days">Days</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </div>
                </div>
            )}
            <IonButton type="submit" expand="block" fill="clear">Submit</IonButton>
        </form>
    );
}

export default FormPic;
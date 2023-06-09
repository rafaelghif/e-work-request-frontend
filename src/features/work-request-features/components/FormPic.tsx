import { IonButton, IonInput, IonItem, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { WorkRequestInterface } from "../../../types/work-request-type";
import usePicActionTicket from "../hooks/usePicActionTicket";
import { PicActionTicketInterface } from "../types/work-request-type";

interface FormAsFormPicProps {
    data: WorkRequestInterface;
    onDidDismiss: () => void;
}

export const FormPic: React.FC<FormAsFormPicProps> = ({ data, onDidDismiss }) => {
    const [formData, setFormData] = useState<PicActionTicketInterface>({ id: data.id, ticketAssigneeId: data.TicketAssignees[0].id, ticketStatus: "Progress", timeTaken: "", actionTaken: "", remark: "" });
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
            setFormData(old => ({ ...old, [key]: value, timeTaken: "", actionTaken: "", remark: "" }));
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
                <IonSelect value={formData.ticketStatus} label="Status" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("ticketStatus", e.detail.value!)}>
                    <IonSelectOption value="Progress">Progress</IonSelectOption>
                    <IonSelectOption value="Complete">Complete</IonSelectOption>
                    <IonSelectOption value="Pending">Pending</IonSelectOption>
                </IonSelect>
            </IonItem>
            {formData.ticketStatus === "Progress" || formData.ticketStatus === "Pending" ? (
                <>
                    <IonItem>
                        <IonTextarea value={formData.remark} label="Remark" labelPlacement="floating" onIonChange={(e) => handleChangeInput("remark", e.detail.value!)} required />
                    </IonItem>
                </>
            ) : (
                <div>
                    <div className="flex w-full">
                        <div className="w-9/12">
                            <IonItem>
                                <IonInput type="number" min={1} value={timeTaken} label="Time Taken" labelPlacement="floating" onIonChange={(e) => handleChangeTimeTaken(parseInt(e.detail.value?.toString()!))} required />
                            </IonItem>
                        </div>
                        <div className="w-3/12">
                            <IonItem>
                                <IonSelect value={timeTakenSuffix} label="Suffix" labelPlacement="stacked" onIonChange={(e) => setTimeTakenSuffix(e.detail.value!)}>
                                    <IonSelectOption value="Minutes">Minutes</IonSelectOption>
                                    <IonSelectOption value="Hours">Hours</IonSelectOption>
                                    <IonSelectOption value="Days">Days</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </div>
                    </div>
                    <IonItem>
                        <IonTextarea label="Action Taken" labelPlacement="stacked" value={formData.actionTaken} onIonChange={(e) => handleChangeInput("actionTaken", e.detail.value!)} required />
                    </IonItem>
                </div>
            )}
            <IonButton type="submit" expand="block" fill="clear">Submit</IonButton>
        </form>
    );
}

export default FormPic;
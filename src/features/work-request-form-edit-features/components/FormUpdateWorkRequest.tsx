import { Suspense, lazy, useEffect, useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { TicketInterface } from "../../../types/work-request-type";
import { EditWorkRequestInterface } from "../types/work-request-form-edit-type";
import useUpdateWorkRequest from "../hooks/useUpdateWorkRequest";

const SelectTicket = lazy(() => import("./SelectTicket"));

const FormUpdateWorkRequest: React.FC = () => {
    const [ticket, setTicket] = useState<TicketInterface>({ id: "", ticketNumber: "", description: "", expectDueDate: "", jigToolNo: "", qty: 0, attachmentFile: "" });
    const [formData, setFormData] = useState<EditWorkRequestInterface>({ id: "", description: "", expectDueDate: "", jigToolNo: "", qty: 0, ticketNumber: "", attachmentFile: undefined });
    const { mutate } = useUpdateWorkRequest();

    const handleChangeData = (key: keyof EditWorkRequestInterface, data: string | number) => {
        setFormData((old) => ({ ...old, [key]: data }));
    }

    const handleChangeAttachment = (file: File | undefined) => {
        setFormData(old => ({ ...old, attachmentFile: file }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    }

    useEffect(() => {
        if (ticket.id !== "") {
            setFormData((old) => ({ ...old, id: ticket.id }));
        }
    }, [ticket]);
    return (
        <form onSubmit={handleSubmit}>
            <Suspense fallback={<IonSpinner name="crescent" />}>
                <SelectTicket value={formData} setValue={(data) => setFormData(data)} handleChangeData={(key, data) => handleChangeData(key, data)} handleChangeAttachment={(file) => handleChangeAttachment(file)} handleChange={(ticket) => setTicket(ticket)} />
            </Suspense>
            <IonButton type="submit" expand="block" fill="clear" className="mt-3">Submit</IonButton>
        </form>
    );
}

export default FormUpdateWorkRequest;
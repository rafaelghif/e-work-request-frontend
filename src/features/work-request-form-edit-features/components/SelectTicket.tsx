import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonTextarea } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import ModalTicketNumber from "../../../components/ModalTicketNumber";
import { TicketInterface } from "../../../types/work-request-type";
import { closeOutline } from "ionicons/icons";
import { EditWorkRequestInterface } from "../types/work-request-form-edit-type";

interface SelectTicketProps {
    value: EditWorkRequestInterface;
    setValue: (data: EditWorkRequestInterface) => void;
    handleChangeData: (key: keyof EditWorkRequestInterface, data: string | number) => void;
    handleChangeAttachment: (file: File | undefined) => void;
    handleChange: (data: TicketInterface) => void;
}

export const SelectTicket: React.FC<SelectTicketProps> = ({ handleChange, value, setValue, handleChangeData, handleChangeAttachment }) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<TicketInterface>({ id: "", ticketNumber: "", description: "", expectDueDate: "", jigToolNo: "", qty: 0, attachmentFile: "" });

    const handleSelect = (data: TicketInterface) => {
        handleChange(data);
        setValue({ id: data.id, ticketNumber: data.ticketNumber, description: data.description, jigToolNo: data.jigToolNo, qty: data.qty, expectDueDate: data.expectDueDate, attachmentFile: undefined });
        setSelectedItem(data);
        setIsOpen(false);
    }

    const handleRemoveAttachment = () => {
        if (inputFileRef.current?.value) {
            inputFileRef.current.value = "";
            handleChangeAttachment(undefined);
        }
    }

    useEffect(() => {
        if (selectedItem.id !== "") {
            if (inputFileRef.current?.value) {
                inputFileRef.current.value = selectedItem.attachmentFile
            }
        }
    }, [selectedItem]);

    return (
        <>
            <IonItem>
                <IonInput label="Ticket Number" value={selectedItem.ticketNumber} labelPlacement="stacked" readonly onClick={() => setIsOpen(true)} />
            </IonItem>
            {selectedItem.id !== "" ? (
                <>
                    <IonItem>
                        <IonInput type="text" label="Id" value={value.id} labelPlacement="stacked" disabled />
                    </IonItem>
                    <IonItem>
                        <IonTextarea label="Description" value={value.description} onIonChange={(e) => handleChangeData("description", e.detail.value!)} labelPlacement="stacked" />
                    </IonItem>
                    <IonItem>
                        <IonInput type="text" label="M/C Jig Tool No" value={value.jigToolNo} onIonChange={(e) => handleChangeData("jigToolNo", e.detail.value!)} labelPlacement="stacked" />
                    </IonItem>
                    <IonItem>
                        <IonInput type="number" label="Qty" value={value.qty} onIonChange={(e) => handleChangeData("qty", e.detail.value!)} labelPlacement="stacked" />
                    </IonItem>
                    <IonItem>
                        <IonInput type="date" label="Expect Due Date" value={value.expectDueDate} onIonChange={(e) => handleChangeData("expectDueDate", e.detail.value!)} labelPlacement="stacked" />
                    </IonItem>
                    <IonItem className="mt-5">
                        {selectedItem.attachmentFile ? `${selectedItem.attachmentFile.split("/").pop()}` : ""}
                        <IonLabel position="stacked">
                            Attachment File
                            {value?.attachmentFile ? (
                                <IonButton fill="clear" color="danger" className="ml-2 -mt-2" onClick={() => handleRemoveAttachment()}>Remove Attachment<IonIcon icon={closeOutline} /></IonButton>
                            ) : null}
                        </IonLabel>
                        <input ref={inputFileRef} type="file" className="mt-5" onChange={(e) => handleChangeAttachment(e.target.files?.[0])} accept=".png,.jpg,.jpeg,.pdf,.zip,.xlsx,.xls,.txt,.csv,.docx" />
                    </IonItem>
                </>
            ) : null}
            <ModalTicketNumber isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} onSelect={(data) => handleSelect(data)} />
        </>
    );
}

export default SelectTicket;
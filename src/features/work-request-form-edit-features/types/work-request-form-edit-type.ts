export interface EditWorkRequestInterface {
    id: string;
    ticketNumber: string;
    description: string;
    jigToolNo: string;
    qty: number;
    expectDueDate: string;
    attachmentFile: File | undefined;
}
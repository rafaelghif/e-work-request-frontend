export interface CreateWorkRequestFormInterface {
    description: string;
    jigToolNo: string;
    qty: number;
    expectDueDate: string;
    RequesterDepartmentId: string;
    RequesterLineId: string;
    AssigneeDepartmentIds: string[];
    RegistrationNumberId: string;
    attachmentFile: File | undefined;
}
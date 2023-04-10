export interface CreateWorkRequestFormInterface {
    title: string;
    description: string;
    jigToolNo: string;
    qty: number;
    expectDueDate: string;
    RequesterDepartmentId: string;
    RequesterLineId: string;
    AssigneeDepartmentIds: string[];
    RegistrationNumberId: string;
}
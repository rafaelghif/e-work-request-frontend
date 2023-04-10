export interface LineInterface {
    id: string;
    name: string;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    DepartmentId: string;
    Department: {
        name: "";
    }
}

export interface CreateLineInterface {
    name: string;
    DepartmentId: string;
}
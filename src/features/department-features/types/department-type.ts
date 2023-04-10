export interface DepartmentInterface {
    id: string;
    name: string;
    abbreviation: string;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDepartmentInterface {
    name: string;
    abbreviation: string;
}
export interface SectionInterface {
    id: string;
    name: string;
    level: number;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    DepartmentId: string;
}

export interface CreateSectionInterface {
    name: string;
    level: number;
    departmentId: string;
}
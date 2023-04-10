export interface UserInterface {
    id: string;
    badgeId: string;
    password: string;
    name: string;
    email: string;
    role: string;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    DepartmentId: string;
    SectionId: string;
    LineId: string;
    Department: {
        name: string;
    }
    Section: {
        name: string;
    }
    Line: {
        name: string;
    }
}

export interface CreateUserInterface {
    badgeId: string;
    password: string;
    name: string;
    email: string;
    role: string;
    DepartmentId: string;
    SectionId: string;
    LineId: string;
}

export interface UpdateUserInterface {
    id: string;
    badgeId: string;
    password: string;
    name: string;
    email: string;
    role: string;
    DepartmentId: string;
    SectionId: string;
    LineId: string;
}
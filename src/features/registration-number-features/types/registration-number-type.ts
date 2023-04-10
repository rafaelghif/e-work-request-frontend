export interface RegistrationNumberInterface {
    id: string;
    name: string;
    format: string;
    year: number;
    lastNumber: number;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRegistrationNumberInterface {
    name: string;
    format: string;
    year: number;
}
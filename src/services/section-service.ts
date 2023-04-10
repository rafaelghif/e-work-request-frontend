import { CreateSectionInterface, SectionInterface } from "../features/department-features/types/section-type";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getSectionService = async (departmentId: string): Promise<any> => {
    try {
        const response = await axiosGet(`/section/departmentId/${departmentId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getSectionActiveService = async (departmentId: string): Promise<any> => {
    try {
        const url = departmentId !== "" ? `/section/active/departmentId/${departmentId}` : "/section/active";
        const response = await axiosGet(url);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createSectionService = async (payload: CreateSectionInterface): Promise<any> => {
    try {
        const response = await axiosPost("/section", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateSectionService = async (payload: SectionInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/section", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const inActiveSectionService = async (SectionId: string): Promise<any> => {
    try {
        const response = await axiosDelete(`/section/sectionId/${SectionId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
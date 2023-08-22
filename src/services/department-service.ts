import { CreateDepartmentInterface, DepartmentInterface } from "../features/department-features/types/department-type";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getDepartmentService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/department?search=${search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getDepartmentActiveService = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/department/active`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getTicketAssigneeDepartment = async (ticketId: string): Promise<any> => {
    try {
        const response = await axiosGet(`/department/ticketAssignee/ticketId/${ticketId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createDepartmentService = async (payload: CreateDepartmentInterface): Promise<any> => {
    try {
        const response = await axiosPost("/department", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateDepartmentService = async (payload: DepartmentInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/department", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const inActiveDepartmentService = async (departmentId: string): Promise<any> => {
    try {
        const response = await axiosDelete(`/department/departmentId/${departmentId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
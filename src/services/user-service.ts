import { CreateUserInterface, UpdateUserInterface } from "../features/user-features/types/user-type";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getUserService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/user?search=${search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getPicService = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/user/pic`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createUserService = async (payload: CreateUserInterface): Promise<any> => {
    try {
        const response = await axiosPost("/user", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateUserService = async (payload: UpdateUserInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/user", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const inActiveUserService = async (userId: string): Promise<any> => {
    try {
        const response = await axiosDelete(`/user/userId/${userId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
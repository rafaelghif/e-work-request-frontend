import { RegistrationNumberInterface } from './../features/registration-number-features/types/registration-number-type';
import { CreateRegistrationNumberInterface } from "../features/registration-number-features/types/registration-number-type";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getRegistrationNumberService = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/registration-number`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getRegistrationNumberActiveService = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/registration-number/active`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createRegistrationNumberService = async (payload: CreateRegistrationNumberInterface): Promise<any> => {
    try {
        const response = await axiosPost("/registration-number", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateRegistrationNumberService = async (payload: RegistrationNumberInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/registration-number", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const inActiveRegistrationNumberService = async (registrationNumberId: string): Promise<any> => {
    try {
        const response = await axiosDelete(`/registration-number/registrationNumberId/${registrationNumberId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
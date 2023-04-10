import { AxiosResponse } from "axios";
import axiosClient from "../libs/axios";

export interface DefaultDataResponseInterface<T = any> {
    status: number;
    title: string;
    message: string;
    token?: string;
    data: T;
}

export const axiosGet = async (url: string): Promise<AxiosResponse> => {
    try {
        const response = await axiosClient.get(url);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const axiosPost = async (url: string, payload: any, multipart: boolean = false): Promise<AxiosResponse> => {
    try {
        var postOptions = {}
        if (multipart) {
            postOptions = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        }
        const response = await axiosClient.post(url, payload, postOptions);
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const axiosPatch = async (url: string, payload: any): Promise<AxiosResponse> => {
    try {
        const response = await axiosClient.patch(url, payload);
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}
export const axiosDelete = async (url: string): Promise<AxiosResponse> => {
    try {
        const response = await axiosClient.delete(url);
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}
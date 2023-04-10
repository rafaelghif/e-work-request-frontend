import { CreateLineInterface, LineInterface } from "../features/line-features/types/line-type";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getLineService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/line?search=${search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getLineActiveService = async (departmentId: string): Promise<any> => {
    try {
        const url = departmentId !== "" ? `/line/active/departmentId/${departmentId}` : "/line/active";
        const response = await axiosGet(url);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createLineService = async (payload: CreateLineInterface): Promise<any> => {
    try {
        const response = await axiosPost("/line", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateLineService = async (payload: LineInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/line", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const inActiveLineService = async (lineId: string): Promise<any> => {
    try {
        const response = await axiosDelete(`/line/lineId/${lineId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
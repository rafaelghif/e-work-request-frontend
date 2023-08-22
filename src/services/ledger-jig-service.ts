import { CreateJigDetailType, UpdateJigDetailType } from "../features/ledger-jig-features/types/jig-detail-type";
import { CreateJigType, JigInterface, UpdateJigType } from "../features/ledger-jig-features/types/jig-type";
import { axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getJigs = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/ledger-jig?search=${search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getJigDetails = async (jigId: string): Promise<any> => {
    try {
        const response = await axiosGet(`/ledger-jig/detail/jigId/${jigId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getJigDetailHistories = async (jigDetailId: string): Promise<any> => {
    try {
        const response = await axiosGet(`/ledger-jig/detail/jigDetailId/${jigDetailId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getLastSequence = async (): Promise<JigInterface> => {
    try {
        const response = await axiosGet("/ledger-jig/lastSequence");
        return Promise.resolve(response.data);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createJigService = async (payload: CreateJigType): Promise<any> => {
    try {
        const response = await axiosPost("/ledger-jig", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createJigDetailService = async (payload: CreateJigDetailType): Promise<any> => {
    try {
        const response = await axiosPost("/ledger-jig/detail", payload, true);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateJigService = async (payload: UpdateJigType): Promise<any> => {
    try {
        const response = await axiosPatch("/ledger-jig", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const updateJigDetailService = async (payload: UpdateJigDetailType): Promise<any> => {
    try {
        const response = await axiosPatch("/ledger-jig/detail", payload, true);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
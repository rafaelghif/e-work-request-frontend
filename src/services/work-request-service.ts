import { AssignTicketInterface, PicActionTicketInterface } from "../features/work-request-features/types/work-request-type";
import { CreateWorkRequestFormInterface } from "../features/work-request-form-features/types/work-request-form-type";
import { axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getWorkRequestCountService = async (): Promise<any> => {
    try {
        const response = await axiosGet("/work-request/count");
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request?search=${search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestReceiveCountService = async (): Promise<any> => {
    try {
        const response = await axiosGet("/work-request/count-receive");
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestReceiveService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/receive?search=${search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const createWorkRequestService = async (payload: CreateWorkRequestFormInterface): Promise<any> => {
    try {
        const response = await axiosPost("/work-request/create", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const assignTicketService = async (payload: AssignTicketInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/work-request/assign", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const picActionTicketService = async (payload: PicActionTicketInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/work-request/pic-action", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const receiveTicketService = async (payload: string): Promise<any> => {
    try {
        const response = await axiosPatch("/work-request/receive", { id: payload });
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestYear = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/year`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestMonth = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/month`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestList = async (payload: { search: string, ticketStatus: string; year: string; month: string }) => {
    try {
        const response = await axiosGet(`/work-request/all/ticketStatus/${payload.ticketStatus}/year/${payload.year}/month/${payload.month}?search=${payload.search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestComments = async (payload: string) => {
    try {
        const response = await axiosGet(`/work-request/comment/ticketId/${payload}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
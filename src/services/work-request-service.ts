import { HeadActionTicketInterface } from "../features/ticket-request-features/types/ticket-request-type";
import { AssignTicketInterface, PicActionTicketInterface } from "../features/work-request-features/types/work-request-type";
import { EditWorkRequestInterface } from "../features/work-request-form-edit-features/types/work-request-form-edit-type";
import { CreateWorkRequestFormInterface } from "../features/work-request-form-features/types/work-request-form-type";
import { SendBackToAssignee } from "../types/work-request-type";
import { axiosGet, axiosPatch, axiosPost } from "./api-service";

export const getWorkRequestCountService = async (): Promise<any> => {
    try {
        const response = await axiosGet("/work-request/count");
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getTicketNumberService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/ticket-number?search=${search}`);
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

export const getWorkTicketRequestCountService = async (): Promise<any> => {
    try {
        const response = await axiosGet("/work-request/ticket-request/count");
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getTicketRequestService = async (search: string): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/ticket-request?search=${search}`);
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
        const response = await axiosPost("/work-request/create", payload, true);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const headActionTicketService = async (payload: HeadActionTicketInterface): Promise<any> => {
    try {
        const response = await axiosPatch("/work-request/head-action", payload);
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

export const sendBackService = async (payload: SendBackToAssignee): Promise<any> => {
    try {
        const response = await axiosPatch("/work-request/sendBack", payload);
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

export const getWorkRequestType = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/type`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestDepartment = async (): Promise<any> => {
    try {
        const response = await axiosGet(`/work-request/department`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getWorkRequestList = async (payload: { search: string, ticketStatus: string, type: string, department: string, year: string, month: string }) => {
    try {
        const response = await axiosGet(`/work-request/all/ticketStatus/${payload.ticketStatus}/type/${payload.type}/department/${payload.department}/year/${payload.year}/month/${payload.month}?search=${payload.search}`);
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

export const updateWorkRequestService = async (payload: EditWorkRequestInterface) => {
    try {
        const response = await axiosPatch("/work-request/update", payload, true);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
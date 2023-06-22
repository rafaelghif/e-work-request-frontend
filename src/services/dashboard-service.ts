import { axiosGet } from "./api-service";

export const getBackLogService = async (year: string, month: string, registrationNumberId: string): Promise<any> => {
    try {
        const response = await axiosGet(`/dashboard/backlog/year/${year}/month/${month}/registrationNumberId/${registrationNumberId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getChartBackLogService = async (year: string, month: string): Promise<any> => {
    try {
        const response = await axiosGet(`/dashboard/backlog/chart/year/${year}/month/${month}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getOutstandingService = async (year: string, month: string, registrationNumberId: string): Promise<any> => {
    try {
        const response = await axiosGet(`/dashboard/outstanding/year/${year}/month/${month}/registrationNumberId/${registrationNumberId}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getChartOutstandingService = async (year: string, month: string): Promise<any> => {
    try {
        const response = await axiosGet(`/dashboard/outstanding/chart/year/${year}/month/${month}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}


export const getChartDueDateService = async (year: string, month: string): Promise<any> => {
    try {
        const response = await axiosGet(`/dashboard/dueDate/chart/year/${year}/month/${month}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}

export const getDueDateService = async (dueDate: string): Promise<any> => {
    try {
        const response = await axiosGet(`/dashboard/dueDate/date/${dueDate}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
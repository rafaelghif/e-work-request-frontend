import { axiosGet } from "./api-service";

export const getWorkRequestOld = async (payload: { type: string, year: string, month: string, search: string }): Promise<any> => {
    try {
        const response = await axiosGet(`/ticket/all/type/${payload.type}/year/${payload.year}/month/${payload.month}?search=${payload.search}`);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
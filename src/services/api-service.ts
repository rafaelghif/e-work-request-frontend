import axiosClient from "../libs/axios";

export const axiosGet = async (url: string) => {
    try {
        const response = await axiosClient.get(url);
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const axiosPost = async (url: string, payload: any, multipart: boolean = false) => {
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
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const axiosPatch = async (url: string, payload: any) => {
    try {
        const response = await axiosClient.patch(url, payload);
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const axiosDelete = async (url: string) => {
    try {
        const response = await axiosClient.delete(url);
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
import { LoginInterface } from "../features/login-features/types/login-type";
import { axiosPost } from "./api-service";

export const authenticationService = async (payload: LoginInterface): Promise<any> => {
    try {
        const response = await axiosPost("/authentication", payload);
        return Promise.resolve(response);
    } catch (err: any) {
        return Promise.reject(err);
    }
}
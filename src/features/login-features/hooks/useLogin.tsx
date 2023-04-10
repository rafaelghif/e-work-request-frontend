import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../../redux/hook";
import { setAuth } from "../../../redux/slice/authSlice";
import { setDepartment } from "../../../redux/slice/departmentSlice";
import { setLine } from "../../../redux/slice/lineSlice";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { setSection } from "../../../redux/slice/sectionSlice";
import { setUser } from "../../../redux/slice/userSlice";
import { authenticationService } from "../../../services/authentication-service";
import { setToken } from "../../../services/local-storage-service";
import { errorToast, successToast } from "../../../services/toast-service";
import { LoginInterface } from "../types/login-type";

const useLogin = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    return useMutation({
        mutationFn: (formData: LoginInterface) => authenticationService(formData),
        onMutate: () => {
            dispatch(setLoading(true));
        },
        onError: async (error: any) => {
            dispatch(setLoading(false));
            errorToast(error);
        },
        onSuccess: async (response: any) => {
            const { data, message } = response;
            const { token, user, department, section, line } = data;
            setToken(token);
            dispatch(setUser(user));
            dispatch(setDepartment(department));
            dispatch(setSection(section));
            dispatch(setLine(line));
            await successToast(message);
            dispatch(setAuth(true));
        },
        onSettled: (_, err) => {
            dispatch(setLoading(false));
            if (err === null) {
                history.replace("/dashboard");
            }
        },
    });
}

export default useLogin;
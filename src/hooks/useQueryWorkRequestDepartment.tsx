import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { errorToast } from "../services/toast-service";
import { getWorkRequestDepartment } from "../services/work-request-service";

const useQueryWorkRequestDepartment = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-department"],
        queryFn: () => getWorkRequestDepartment(),
        onError: async (error) => {
            dispatch(setLoading(false));
            await errorToast(error);
        },
        onSettled: async () => {
            dispatch(setLoading(false));
        },
        refetchOnWindowFocus: false,
        retry: false
    });
}

export default useQueryWorkRequestDepartment;
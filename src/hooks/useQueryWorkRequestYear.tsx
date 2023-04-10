import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { errorToast } from "../services/toast-service";
import { getWorkRequestYear } from "../services/work-request-service";

const useQueryWorkRequestYear = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-year"],
        queryFn: () => getWorkRequestYear(),
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

export default useQueryWorkRequestYear;
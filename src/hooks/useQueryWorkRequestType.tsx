import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { errorToast } from "../services/toast-service";
import { getWorkRequestType } from "../services/work-request-service";

const useQueryWorkRequestType = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-type"],
        queryFn: () => getWorkRequestType(),
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

export default useQueryWorkRequestType;
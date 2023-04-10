import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getWorkRequestService } from "../../../services/work-request-service";

const useQueryWorkRequest = (userId: string, search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request", { userId: userId, search: search }],
        queryFn: () => getWorkRequestService(search),
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

export default useQueryWorkRequest;
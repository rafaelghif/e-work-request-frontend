import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getWorkRequestReceiveService } from "../../../services/work-request-service";

const useQueryWorkRequestReceive = (userId: string, search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-receive", { userId: userId, search: search }],
        queryFn: () => getWorkRequestReceiveService(search),
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

export default useQueryWorkRequestReceive;
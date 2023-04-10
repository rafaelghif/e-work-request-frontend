import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { errorToast } from "../services/toast-service";
import { getWorkRequestComments } from "../services/work-request-service";

const useQueryWorkRequestComment = (ticketId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-comment", { ticketId: ticketId }],
        queryFn: () => getWorkRequestComments(ticketId),
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

export default useQueryWorkRequestComment;
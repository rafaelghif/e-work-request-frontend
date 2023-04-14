import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getTicketRequestService } from "../../../services/work-request-service";

const useQueryTicketRequest = (userId: string, search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["ticket-request", { userId: userId, search: search }],
        queryFn: () => getTicketRequestService(search),
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

export default useQueryTicketRequest;
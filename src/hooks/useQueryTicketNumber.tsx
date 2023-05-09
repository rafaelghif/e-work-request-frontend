import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { errorToast } from "../services/toast-service";
import { getTicketNumberService } from "../services/work-request-service";

const useQueryTicketNumber = (search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["ticket-number", { search: search }],
        queryFn: () => getTicketNumberService(search),
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

export default useQueryTicketNumber;
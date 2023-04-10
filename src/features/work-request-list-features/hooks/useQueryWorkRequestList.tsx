import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getWorkRequestList } from "../../../services/work-request-service";

const useQueryWorkRequestList = (search: string, ticketStatus: string, year: string, month: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-list", { search, ticketStatus, year, month }],
        queryFn: () => getWorkRequestList({ search, ticketStatus, year, month }),
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

export default useQueryWorkRequestList;
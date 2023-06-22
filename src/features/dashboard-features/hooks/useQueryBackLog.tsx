import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getBackLogService } from "../../../services/dashboard-service";

const useQueryBackLog = (year: string, month: string, registrationNumberId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["backlog", { year, month, registrationNumberId }],
        queryFn: () => getBackLogService(year, month, registrationNumberId),
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

export default useQueryBackLog;
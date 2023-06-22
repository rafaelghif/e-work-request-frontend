import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getOutstandingService } from "../../../services/dashboard-service";

const useQueryOutstanding = (year: string, month: string, registrationNumberId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["outstanding", { year, month, registrationNumberId }],
        queryFn: () => getOutstandingService(year, month, registrationNumberId),
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

export default useQueryOutstanding;
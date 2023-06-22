import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getChartOutstandingService } from "../../../services/dashboard-service";

const useQueryChartOutstanding = (year: string, month: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["chart-outstanding", { year, month }],
        queryFn: () => getChartOutstandingService(year, month),
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

export default useQueryChartOutstanding;
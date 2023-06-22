import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getChartDueDateService } from "../../../services/dashboard-service";

const useQueryChartDueDate = (year: string, month: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["chart-dueDate", { year, month }],
        queryFn: () => getChartDueDateService(year, month),
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

export default useQueryChartDueDate;
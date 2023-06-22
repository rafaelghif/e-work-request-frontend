import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getDueDateService } from "../../../services/dashboard-service";

const useQueryDueDate = (dueDate: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["dueDate", { dueDate }],
        queryFn: () => getDueDateService(dueDate),
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

export default useQueryDueDate;
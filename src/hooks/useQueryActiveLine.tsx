import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { getLineActiveService } from "../services/line-service";
import { errorToast } from "../services/toast-service";

const useQueryActiveLine = (departmentId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["active-lines", { departmentId: departmentId }],
        queryFn: () => getLineActiveService(departmentId),
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

export default useQueryActiveLine;
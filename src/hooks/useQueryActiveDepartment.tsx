import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { getDepartmentActiveService } from "../services/department-service";
import { errorToast } from "../services/toast-service";

const useQueryActiveDepartment = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["active-departments"],
        queryFn: () => getDepartmentActiveService(),
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

export default useQueryActiveDepartment;
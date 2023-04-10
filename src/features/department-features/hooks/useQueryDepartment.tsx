import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { getDepartmentService } from "../../../services/department-service";
import { errorToast } from "../../../services/toast-service";

const useQueryDepartment = (search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["departments", { search: search }],
        queryFn: () => getDepartmentService(search),
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

export default useQueryDepartment;
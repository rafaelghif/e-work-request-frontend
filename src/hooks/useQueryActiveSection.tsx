import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { getSectionActiveService } from "../services/section-service";
import { errorToast } from "../services/toast-service";

const useQueryActiveSection = (departmentId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["active-sections", { departmentId: departmentId }],
        queryFn: () => getSectionActiveService(departmentId),
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

export default useQueryActiveSection;
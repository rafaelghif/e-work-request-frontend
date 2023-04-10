import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { getSectionService } from "../../../services/section-service";
import { errorToast } from "../../../services/toast-service";

const useQuerySection = (departmentId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["sections", { departmentId: departmentId }],
        queryFn: () => getSectionService(departmentId),
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

export default useQuerySection;
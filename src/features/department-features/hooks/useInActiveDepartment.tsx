import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { inActiveDepartmentService } from "../../../services/department-service";
import { errorToast, successToast } from "../../../services/toast-service";

const useInActiveDepartment = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (departmentId: string) => inActiveDepartmentService(departmentId),
        onMutate: () => {
            dispatch(setLoading(true));
        },
        onError: async (error) => {
            dispatch(setLoading(false));
            await errorToast(error);
        },
        onSuccess: async (response) => {
            await successToast(`${response.message}`);
            queryClient.invalidateQueries({
                queryKey: ["departments"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });
}

export default useInActiveDepartment;
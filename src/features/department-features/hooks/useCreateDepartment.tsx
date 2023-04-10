import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { CreateDepartmentInterface } from "../types/department-type";
import { createDepartmentService } from "../../../services/department-service";

const useCreateDepartment = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateDepartmentInterface) => createDepartmentService(payload),
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

export default useCreateDepartment;
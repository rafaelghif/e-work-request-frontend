import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { CreateWorkRequestFormInterface } from "../types/work-request-form-type";
import { createWorkRequestService } from "../../../services/work-request-service";

const useCreateWorkRequest = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateWorkRequestFormInterface) => createWorkRequestService(payload),
        onMutate: () => {
            dispatch(setLoading(true));
        },
        onError: async (error) => {
            dispatch(setLoading(false));
            await errorToast(error);
        },
        onSuccess: async (response) => {
            await successToast(`${response.message}`, 2500);
            queryClient.invalidateQueries({
                queryKey: ["work-requests"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });
}

export default useCreateWorkRequest;